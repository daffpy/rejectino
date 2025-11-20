import { Bitcount_Grid_Single } from "next/font/google";
import {CopyIcon} from "./Emoticon";
import { motion, useMotionValue, useAnimationFrame, spring } from "motion/react"
import { springCustom } from "@/utils/transition";

const bitcount = Bitcount_Grid_Single({
  variable: "--font-bitcount",
  subsets: ["latin"],
});

export default function NoPage(){

    return (
        <div className="drop-shadow-md w-[800px] mx-8">
            <div className={`${bitcount.className} text-3xl text-red-500 rounded-2xl bg-white p-8`}>
                Test
            </div>
        </div>
    )
}