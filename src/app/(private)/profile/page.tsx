"use client";

import { useSession } from "@/contexts/session";

export default function Page() {
  const session = useSession();
  return <div>Email: {session.user?.email}</div>;
}
