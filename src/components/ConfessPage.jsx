"use client"

import { useSearchParams } from "next/navigation"
import { redirect } from "next/navigation"
import ChoiceButtons from "./ChoiceButton"
import { useState } from "react"
import { Bitcount_Grid_Single } from "next/font/google";

const bitcount = Bitcount_Grid_Single({
  variable: "--font-bitcount",
  subsets: ["latin"],
});

export default function ConfessPageLayout(){
    const s_params = useSearchParams()
    const user = s_params.get("crush")

    if(user === null || user === ""){
        redirect("/")
    }
    const [count, setCount] = useState(0)

    return (
        <div className="drop-shadow-md  mt-30 w-[400px]">
            <div className={`${bitcount.className} text-lg text-red-500 rounded-2xl bg-white p-8`}>
                <p>
                    Hi [{user}], had a crush on you for a little while
                </p>
                <br/>
                <p className="font-medium "> 
                    do you want to be my partner?
                </p>
            </div>
            <ChoiceButtons user={user} count={count} setCount={setCount}/>
        </div>
    )
}