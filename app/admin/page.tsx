"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetRSVP from "@/hooks/use-get-rsvp";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import useRSVPStream from "@/hooks/use-rsvp-stream";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { LinkList } from "./component/link-drawer";
import { useGetLinks } from "./hooks/use-get-links";
import { Button } from "@/components/ui/button";
import { Status, User } from "@/generated/prisma-client";

dayjs.extend(LocalizedFormat);

const AdminPage = () => {
  useRSVPStream();
  const { data, isPending, isError, error } = useGetRSVP();
  const { data: links, isPending: isLinksPending } = useGetLinks();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredData = useMemo(() => {
    if (!search && !filter) return data;

    return data?.filter(
      (a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) &&
        a.reference?.referenceId === filter,
    );
  }, [data, search, filter]);

  const total = useMemo(() => {
    if (isPending) return;

    return data?.filter((item) => {
      if (!filter) return true;
      return item.reference?.referenceId === filter;
    })?.length;
  }, [data, filter, isPending]);

  const hadir = useMemo(() => {
    if (isPending) return;

    return data
      ?.filter((item) => {
        if (item.status !== "accept") return false;
        if (!filter) return true;
        return item.reference?.referenceId === filter;
      })
      .reduce((acc, cur) => acc + cur.pax, 0);
  }, [data, isPending, filter]);

  const tidakHadir = useMemo(() => {
    if (isPending) return;

    return data?.filter((item) => {
      if (item.status !== "decline") return false;
      if (!filter) return true;
      return item.reference?.referenceId === filter;
    });
  }, [data, isPending, filter]);

  const getTotalPax = useCallback(
    (id: string, status: Status) => {
      if (!id || !status || isLinksPending) return;

      if (status === "accept") {
        return data
          ?.filter(
            (item) => item.status === "accept" && item.reference?.id === id,
          )
          .reduce((acc, cur) => acc + cur.pax, 0);
      }

      if (status === "decline") {
        return data?.filter(
          (item) => item.status === "decline" && item.reference?.id === id,
        ).length;
      }
    },
    [data, isLinksPending],
  );

  if (isPending)
    return <Spinner className="absolute top-1/2 left-1/2 size-6" />;

  if (isError)
    return (
      <h1 className="absolute top-1/2 left-1/2 -translate-1/2 text-red-700">
        {error?.message || "Failed to fetch data"}
      </h1>
    );

  return (
    <main className="px-5 pb-10 max-h-screen overflow-scroll">
      <div className="mt-10">
        <h1 className="font-allura text-5xl text-center italic">RSVP data</h1>
      </div>
      <div className="flex justify-between gap-3 my-10 flex-col md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-gray-500 font-medium text-sm tracking-wide">
              Jumlah orang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold font-serif">{total}</h1>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-gray-500 font-medium text-sm tracking-wide">
              Hadir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold font-serif text-green-700">
              {hadir}
            </h1>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-gray-500 font-medium text-sm tracking-wide">
              Tidak hadir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold font-serif text-red-700">
              {tidakHadir?.length}
            </h1>
          </CardContent>
        </Card>
      </div>
      <div className="text-right">
        <LinkList />
      </div>

      <div className="flex gap-2 items-center overflow-scroll mt-2 scrollbar-none">
        {!!links?.length &&
          links.map((link) => (
            <Button
              key={link.id}
              variant={filter === link.referenceId ? "default" : "outline"}
              onClick={() => setFilter(link.referenceId)}
              className="cursor-pointer p-5 h-20"
            >
              {link.name}

              {!!link.user.length ? (
                <>
                  <Badge
                    variant={"secondary"}
                    className="text-green-700 bg-green-100"
                  >
                    {getTotalPax(link.id, "accept") || 0} hadir
                  </Badge>
                  <Badge
                    variant={"secondary"}
                    className="text-red-700 bg-red-100"
                  >
                    {getTotalPax(link.id, "decline") || 0} tidak hadir
                  </Badge>
                </>
              ) : (
                <Badge variant={"secondary"}>{0}</Badge>
              )}
            </Button>
          ))}

        {(filter || search) && (
          <Button
            variant={"ghost"}
            size={"xs"}
            className="ml-3 text-red-500 hover:bg-red-100 hover:text-red-500 cursor-pointer"
            onClick={() => {
              setFilter("");
              setSearch("");
            }}
          >
            <IconTrash />
            Clear
          </Button>
        )}
      </div>

      <InputGroup className="max-w-full my-5">
        <InputGroupInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <InputGroupAddon>
          <IconSearch stroke={2} />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {filteredData?.length} results
        </InputGroupAddon>
      </InputGroup>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25 text-center">Nama</TableHead>
            <TableHead className="text-center">Status Kehadiran</TableHead>
            <TableHead className="text-center">Bilangan kehadiran</TableHead>
            <TableHead className="text-center">Ucapan</TableHead>
            <TableHead className="text-center">Jemputan</TableHead>
            <TableHead className="text-center">Tarikh</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData?.map((item) => (
            <TableRow key={item.id} className="text-center">
              <TableCell className="font-medium font-serif text-lg uppercase tracking-wide">
                {item.name}
              </TableCell>
              <TableCell>
                <Badge
                  className={clsx(
                    "uppercase rounded-sm",
                    item.status === "accept" &&
                      "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 text-[12px]",
                    item.status === "decline" &&
                      "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
                  )}
                  variant={"secondary"}
                >
                  {item.status === "accept" ? "Hadir" : "Tidak hadir"}
                </Badge>
              </TableCell>
              <TableCell className="font-serif text-lg">
                {item.pax || "N/A"} orang
              </TableCell>
              <TableCell className="text-center text-pretty capitalize max-w-100 whitespace-break-spaces font-serif text-lg">
                {item.notes || "N/A"}
              </TableCell>
              <TableCell>{item?.reference?.name ?? "Afiq"}</TableCell>
              <TableCell>{dayjs(item.createdAt).format("LLL")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default AdminPage;
