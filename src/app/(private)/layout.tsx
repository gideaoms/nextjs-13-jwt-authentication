"use client";

import { Header } from "@/components/header";
import * as SessionContext from "@/contexts/session";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Layout(props: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { onInit, user } = SessionContext.useContext();
  const router = useRouter();

  useEffect(function () {
    if (user) {
      setIsLoading(false);
      return;
    }
    onInit({
      onSuccess() {
        setIsLoading(false);
      },
      onError() {
        router.replace("/sign-in");
      },
    });
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
