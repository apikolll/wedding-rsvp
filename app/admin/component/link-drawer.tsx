import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IconCheck, IconCopy, IconLink } from "@tabler/icons-react";
import { CreateLinkDialog } from "./create-link-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function LinkList() {
  const [linkCopied, setLinkCopied] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch("/api/link");
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    },
    queryKey: ["reference"],
  });

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    } catch (error) {
      console.log("Error copy link", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>
          <IconLink stroke={2} />
          Manage Links
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-w-sm md:min-w-xl">
        <DrawerHeader>
          <DrawerTitle>Manage Reference Links</DrawerTitle>
          <DrawerDescription>
            You can view and manage existing links here.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <div className="text-right">
            <CreateLinkDialog />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map(
                (item: { id: string; name: string; referenceId: string }) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge>{item.referenceId}</Badge>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <p>
                          {`https://cintahathiafiq.com?ref=${item.referenceId}`}
                        </p>
                        <Button
                          variant={"ghost"}
                          size={"icon-sm"}
                          disabled={linkCopied}
                          onClick={() =>
                            handleCopyLink(
                              `https://cintahathiafiq.com?ref=${item.referenceId}`,
                            )
                          }
                        >
                          {linkCopied ? (
                            <IconCheck stroke={2} size={12} color="green" />
                          ) : (
                            <IconCopy stroke={2} size={12} />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
