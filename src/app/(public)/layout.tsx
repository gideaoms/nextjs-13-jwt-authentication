"use client";

import { ReactNode, useEffect, useState } from "react";
import * as SessionContext from "@/contexts/session";
import { useRouter } from "next/navigation";

export default function Layout(props: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const { startSession, user } = SessionContext.useContext();
  const router = useRouter();

  useEffect(function () {
    if (user) {
      setIsLoading(false);
      return;
    }
    startSession({
      onSuccess() {
        router.replace("/");
      },
      onError() {
        setIsLoading(false);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return props.children;
}
