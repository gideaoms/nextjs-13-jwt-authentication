import { ReactNode } from "react";
import { Header } from "@/components/header";

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-6">{props.children}</main>
    </>
  );
}
