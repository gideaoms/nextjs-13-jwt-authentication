"use client";

import { Header } from "@/components/header";
import * as SessionContext from "@/contexts/session";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Layout(props: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { startSession, user } = SessionContext.useContext();
  const router = useRouter();

  useEffect(function () {
    if (user) {
      setIsLoading(false);
      return;
    }
    startSession({
      onSuccess() {
        setIsLoading(false);
      },
      onError() {
        router.replace("/sign-in");
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <div>{props.children}</div>
    </div>
  );
}
