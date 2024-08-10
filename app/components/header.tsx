import Image from "next/image";
import LogoutButton from "./buttons/LogoutButton";

export default function Header() {
  return (
    <div className="z-10 w-full bg-white p-4 rounded-lg items-center justify-between font-mono text-sm lg:flex">
      

      <div className="grid grid-cols-3 w-full">
          <a
            href=""
            className="flex flex-col items-center justify-center font-nunito text-lg font-bold gap-2"
          >
            <span><h1>BarristerBot</h1></span>
           
          </a>
          <h2 className="flex flex-col p-5">Your rights, on demand.</h2>
          <div className="flex flex-col">Dark</div>
          
          <div className="flex flex-col right-0 items-end">
            
          <LogoutButton />
          </div>
        </div>
        
    </div>
  );
}
