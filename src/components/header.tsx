"use client";

import * as SessionContext from "@/contexts/session";
import Link from "next/link";

export function Header() {
  const session = SessionContext.useContext();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <Link
        href="/"
        className="flex items-center flex-shrink-0 text-white mr-6"
      >
        <span className="font-semibold text-xl tracking-tight">@MyProject</span>
      </Link>
      <div className="flex items-center w-auto">
        <div className="text-sm flex items-center">
          <Link
            href="/profile"
            className="block text-white hover:text-white mr-4"
          >
            Profile
          </Link>
          <button
            onClick={session.signOut}
            className="block text-red-600 hover:text-red-700 mr-4 bg-white py-1 px-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
