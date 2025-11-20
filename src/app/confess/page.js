"use client"

export const dynamic = "force-dynamic";

import Image from "next/image";
import ConfessPageLayout from "@/components/ConfessPage";
import {useBg } from "@/context/BackgroundContext";

export default function Home() {
  const {color} = useBg()
  return (
    <div className="before:z-[-1] h-full before:absolute before:w-full before:bg-repeat before:bg-[length:44px_44px] before:h-full relative before:bg-[url('/heartbiggest.svg')] before:top-0 before:left-0 before:invert before:brightness-0">
    <div className={`absolute w-full h-full bg-${color} opacity-50 animate-[ping_0.3s_ease] duration-200`}>

    </div>
    <div className="justify-center flex">
      <ConfessPageLayout/>
    </div>
    
    
    </div>
    
  );
}
