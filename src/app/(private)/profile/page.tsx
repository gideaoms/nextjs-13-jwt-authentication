"use client";

import * as SessionContext from "@/contexts/session";

export default function Page() {
  const session = SessionContext.useContext();
  return <div>Email: {session.user?.email}</div>;
}
