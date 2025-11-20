"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react"
import Link from "next/link"
import { useBg } from "@/context/BackgroundContext"
import { Bitcount_Grid_Single } from "next/font/google";
import { motion, useMotionValue, useAnimationFrame } from "motion/react"
import { animate } from "motion";
import { buttonLevels } from "@/utils/gameConfig";
import { TicTacToe, Darkness, MoveAround } from "./LevelDesign";

const bitcount = Bitcount_Grid_Single({
  variable: "--font-bitcount",
  subsets: ["latin"],
});



export default function ChoiceButtons({user, count, setCount}){

    const router = useRouter()
    const searchParams = useSearchParams()

    const [userWin, setUserState] = useState(false)

    const {flashRed} = useBg()

    const [levelStep, setLevelStep] = useState(0);

    const [attemptAmount, setAttempt] = useState(0)
    
    const level = buttonLevels[count];
    useEffect(() => {
        if (!level) {
            setUserState(true);    // means you win
        }
    }, [level]);

    useEffect(()=>{
        const stored = Number(sessionStorage.getItem("furthestLevel") || 0);
        if (count > stored) {
            sessionStorage.setItem("furthestLevel", count);
        }

    }, [count]);

    useEffect(()=>{
        const stored = Number(sessionStorage.getItem("attemptNo") || 0);
        if (attemptAmount > stored) {
            sessionStorage.setItem("attemptNo", attemptAmount);
        }

    }, [attemptAmount]);

    useEffect(() => {
        if (userWin) {
            router.push(`/result?${searchParams.toString()}&result=${userWin? "rejected":"accepted"}`);
        }
    }, [userWin])
    if (!level) {
        return null; // prevents crash on initial render
    }
    const maxStep = level.type === "normal" 
            ? level.class.length - 1
            : level.speedMultiplyer?.length - 1 || 0;

    const incr = () => {

        if (levelStep < maxStep) {
            setLevelStep(levelStep + 1); 
        } else {
            setCount(count + 1); 
            setLevelStep(0); 
        }

    }


    return(
        <div className={`mt-10 text-lg text-red-500 duration-200  ${bitcount.className}`}>
            {level.type == "tictactoe" ? <TicTacToe levelStep={levelStep} setLevelStep={setLevelStep} count={count} setCount={setCount} attemptAmount={attemptAmount} setAttempt={setAttempt}/> : null}
            {level.type == "darkness" ? <Darkness levelStep={levelStep} setLevelStep={setLevelStep} count={count} setCount={setCount} attemptAmount={attemptAmount}  setAttempt={setAttempt}/> : null}
            {level.type == "movearound" ? <MoveAround levelStep={levelStep} setLevelStep={setLevelStep} count={count} setCount={setCount} attemptAmount={attemptAmount}  setAttempt={setAttempt}/> : null}
                <div className="px-5 mt-4 ">
                    
                    <div className={`flex flex-row justify-between items-center ${bitcount.className}`}>
                        {(level.type === "normal" || level.type === "motion") ?
                        <div className="z-2 w-20 px-4 py-3 bg-white border-2 rounded-xl text-center">
                            <Link className="hover:font-medium" href={`/result?${searchParams.toString()}&result=accepted`}>
                            yes
                            </Link>
                        </div>
                         : null}
                        {/* {level.type}
                        {count} */}
                        <div className="w-20 text-center relative">

                        {level.type === "normal" && (
                            <div>
                                <div
                                    onClick={() => {
                                    incr();
                                    flashRed();
                                    setAttempt(attemptAmount + 1)
                                    }}
                                    className={`${level.class[levelStep]} !w-20 hover:font-medium border-2 bg-white px-4 py-3 rounded-xl`}
                                >
                                    no
                                </div>
                            </div>

                        )}

                        {level.type === "motion" && (
                            <motion.div
                                onClick={() => {
                                incr();
                                flashRed();
                                setAttempt(attemptAmount + 1)
                                }}
                                animate={{ x: level.animate.x, y: level.animate.y }}
                                transition={{
                                duration:
                                    (level.speedMultiplyer[levelStep] || 1),
                                repeat: Infinity,
                                repeatDelay: 0,
                                ease: "linear",
                                }}
                                className="overflow-hidden z-1 w-20 bg-white border-2 px-4 py-3 rounded-xl text-center"
                            >
                                no
                            </motion.div>
                        )}

                    </div>
                    </div>     
                </div>
        </div>
    )
}