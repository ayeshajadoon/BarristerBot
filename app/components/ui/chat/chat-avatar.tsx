import { User2 } from "lucide-react";
import Image from "next/image";

export default function ChatAvatar({ role }: { role: string }) {
  if (role === "user") {
    return (
      <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        <User2 className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 select-none items-center rounded-md border bg-white text-white shadow">
      <Image
        src="/icon.png"
        alt="Bot"
        width={45}
        height={45}
        priority
      />
    </div>
  );
}
