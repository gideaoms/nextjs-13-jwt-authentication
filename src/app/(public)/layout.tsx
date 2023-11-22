"use client";

import { ReactNode, useEffect, useState } from "react";
import * as SessionContext from "@/contexts/session";
import { useRouter } from "next/navigation";

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
        router.replace("/");
      },
      onError() {
        setIsLoading(false);
      },
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return props.children;
}
