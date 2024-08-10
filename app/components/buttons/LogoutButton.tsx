"use client";

import { signOut } from "next-auth/react";

import type { ClientSafeProvider } from "next-auth/react";

export default function LogoutButton({ auth }: { auth?: ClientSafeProvider }) {
  return (
    <button
      type="button"
      className="right-0 w-20 mt-4 rounded-md bg-blue-900 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
}
