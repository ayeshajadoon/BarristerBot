"use client";

import { signIn } from "next-auth/react";

import type { ClientSafeProvider } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";



export default function ToggleButton({ auth }: { auth?: ClientSafeProvider }) {
  const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        
        <button onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")} className="w-8 h-8 ml-4 mr-4 text-gray-400 shadow dark:text-gray-400 mt-4 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>

        </button>
    )
}
