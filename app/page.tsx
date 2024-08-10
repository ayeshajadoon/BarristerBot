import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

import GoogleButton from "./components/buttons/GoogleButton";
import LoginButton from "./components/buttons/LoginButton";
import LogoutButton from "./components/buttons/LogoutButton";
import ToggleButton from "./components/buttons/ToggleButton";

export default async function Home() {
  const session = (await getServerSession()) || {};

  if (Object.keys(session).length !== 0) {
    redirect("/home");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-8 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-end font-mono text-sm lg:flex">
        <div className="flex h-48 w-full items-center justify-between bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:bg-none">
          <ToggleButton/>
          <div className="px-2"></div>
          {Object.keys(session).length === 0 ? (
            <LoginButton />
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
      <Image
            className="rounded-xl"
            src="/bot_logo.png"
            alt="bot Logo"
            width={300}
            height={300}
          />
      <h2 className="text-3xl font-bold text-center mb-9 lg:mb-0">
        Know your rights, fight the fights.
      </h2>

      <div className="relative mb-8 flex place-items-center lg:my-0">
       
      </div>
      <div className="grid grid-cols-1 gap-y-4 mt-8">
        <GoogleButton />
       
      </div>
      <div>
        
      </div>
    </main>
  );
}
