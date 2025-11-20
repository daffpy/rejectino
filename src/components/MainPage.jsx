"use client";

import { useState, useEffect } from "react";
import { Bitcount_Grid_Single } from "next/font/google";
import {CopyIcon} from "./Emoticon";
import { motion, useMotionValue, useAnimationFrame, spring } from "motion/react"
import { springCustom } from "@/utils/transition";

const bitcount = Bitcount_Grid_Single({
  variable: "--font-bitcount",
  subsets: ["latin"],
});

export default function MainPageLayout(){

    const [nameInput, setNameInput] = useState("")
    const [crushInput, setCrushInput] = useState("")
    const [origin, setOrigin] = useState("");
    const [isCopied, setCopied] = useState("copy the link!")

    const [letterArray, setLetterPosition] = useState(["n", "o"])

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLetterPosition(prev => [prev[1], prev[0]])
        }, 1000)
        return () => clearTimeout(timeout)
    }, [letterArray]);

    return (
        <div className="drop-shadow-md w-[800px] mx-8">
            <div className={`${bitcount.className} text-3xl text-red-500 rounded-2xl bg-white p-8`}>
                <div className="flex font-semibold justify-center hover:scale-[1.15] duration-200">
                    Rejecti-
                    <div className="flex">
                        {
                            letterArray.map((letter, idx)=>{
                                return (
                                <motion.div
                                 className="text-red-500"
                                 key={letter + idx}
                                 layout
                                 transition={springCustom}
                                 initial={{ scale: 0.8 }}
                                 animate={{ scale: 1 }}
                                 >
                                    {letter}
                                </motion.div>)
                            })
                        }
                    </div>
                </div>
                <br/>
                <div className="text-base">

                
                <p>
                    tired of getting rejected? or wanted to confess your feelings without having to deal with direct rejection?
                </p>
                <br/>
                <p>
                    don't worry i got you covered, i will make sure they will have a "hard" time deciding it
                </p>
                <br/>

                <div className="flex flex-col">
                    <div className="font-medium">
                        What is their name?
                    </div>
                    <div>
                        &gt;
                        <input maxLength={30} size={30} type="text" className=" px-2 outline-none border-none focus:outline-none focus:ring-0 focus:border-none shadow-none"
                        onChange={(e) => {
                            setCrushInput(e.target.value)
                            setCopied("copy the link!")


                        }}
                        
                        >
                            
                        </input>
                    </div>
                    <div className="font-medium">
                        What is your name?
                    </div>
                    <div>
                        &gt;
                        <input maxLength={30} size={30} type="text" className=" px-2 outline-none border-none focus:outline-none focus:ring-0 focus:border-none shadow-none"
                        onChange={(e) => {
                            setNameInput(e.target.value)
                            setCopied("copy the link!")


                        }}
                        
                        >
                            
                        </input>
                    </div>

                </div>
                <div className="pt-5 font-medium" 
                >
                    {isCopied}
                </div>
                <div className="flex gap-1">
                    <div className="w-5 fill-red-500 cursor-pointer">
                        <CopyIcon onClick={() => 
                            {navigator.clipboard.writeText(`${origin}/confess?crush=${crushInput}&user=${nameInput}`)
                            setCopied("copied!")
                            
                            }}/>
                    </div>
                    
                    <div id="linkUrl" className="italic">
                        {origin}/confess?crush={crushInput}&user={nameInput}
                    </div> 
                </div>
                </div>
            </div>
        </div>
    )
}