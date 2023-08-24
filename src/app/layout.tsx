import "@/main.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Provider } from "@/contexts/session";

const inter = Inter({ subsets: ["latin"] });

export default function Layout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{props.children}</Provider>
      </body>
    </html>
  );
}
