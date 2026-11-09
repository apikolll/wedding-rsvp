"use client";

import { useActionState } from "react";
import { IconLock } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { login, type LoginState } from "./actions";

const labelClass = "text-taupe uppercase tracking-[2px] text-[10px]";
const inputClass =
  "bg-ivory/70 rounded-sm h-11 border border-ink/12 placeholder:text-sm text-base font-serif";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm rounded-xl bg-ivory/80 p-7 shadow-[0_20px_48px_-24px_rgb(42_39_34/0.45)] backdrop-blur-md">
        <div className="text-center">
          <p className={labelClass}>Admin</p>
          <h1 className="mt-2 font-samantha text-4xl text-ink">
            Shafini &amp; Shahril
          </h1>
          <p className="mt-2 font-serif text-sm text-taupe">
            Log in to view RSVPs and invite links.
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="username" className={labelClass}>
              Username
            </label>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              autoCapitalize="none"
              defaultValue={state.username}
              required
              autoFocus
              aria-invalid={!!state.error}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-invalid={!!state.error}
              aria-describedby={state.error ? "login-error" : undefined}
              className={inputClass}
            />
          </div>

          {state.error && (
            <p
              id="login-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {state.error}
            </p>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="h-12 w-full gap-2 bg-wine text-[13px] uppercase tracking-[2px] text-ivory hover:bg-wine/90"
          >
            {pending ? (
              <Spinner />
            ) : (
              <>
                <IconLock stroke={1.75} className="size-4" />
                Log in
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
