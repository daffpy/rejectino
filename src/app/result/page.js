import Image from "next/image";
import ResultPageLayout from "@/components/ResultPage";

export default function Home() {
  return (
    <div className="before:z-[-1] h-full before:absolute before:w-full before:bg-repeat before:bg-[length:44px_44px] before:h-full relative before:bg-[url('/heartbiggest.svg')] before:top-0 before:left-0 before:invert before:brightness-0">
      <div className="flex justify-center pt-30">
        <ResultPageLayout/>
      </div>
    </div>
  );
}
