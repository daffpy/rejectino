"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"
import { Bitcount_Grid_Single } from "next/font/google";
import { FaceSadIcon } from "./Emoticon";
import { useRouter } from "next/navigation";
import Image from "next/image";


const bitcount = Bitcount_Grid_Single({
  variable: "--font-bitcount",
  subsets: ["latin"],
});

export default function ResultPageLayout(){
    const [isAccepted, setAcceptance] = useState(false)
    const s_params = useSearchParams()
    const crush = s_params.get("crush")
    const user = s_params.get("user")
    const result = s_params.get("result")
    const [highestLevel, setHighest] = useState(0);
    const [attemptAmount, setAttempt] = useState(0);

    useEffect(() => {
        const saved = Number(sessionStorage.getItem("furthestLevel") || 0);
        const totalAttempt = Number(sessionStorage.getItem("attemptNo") || 0);
        setAttempt(totalAttempt)
        setHighest(saved);
    }, []);

    useEffect(() => {
        const crush = s_params.get("crush")
        const user = s_params.get("user")
        const result = s_params.get("result")


        const router = useRouter();

        if (!user || !result) {
            router.push("/");
            return null;
        }

        if (result === "accepted") {
            setAcceptance(true)
        }
    }, [s_params])



    return(
        <div className="drop-shadow-md w-[800px] mx-8">
            <div className={`${bitcount.className} text-2xl text-red-500 rounded-2xl bg-white p-8`}>
                {isAccepted ? 
                <>
                <div className="">
                    <div className="text-center font-semibold">
                        Yay!! you didn't ended up rejecting me!
                    </div>
                    <br/>
                    <div className="text-base">
                        <p>
                            I just wanted to tell you that my feelings towards you are 100% genuine from the bottom of my heart

                        </p>
                        <br/>
                        <p>
                            i really hoped that you genuinely accepted this request on your own terms, and i hope it doesn't felt forced at all.

                        </p>
                        <br/>
                        <p>
                            Interestingly, you've rejected me in <span className="font-semibold">{highestLevel} different ways</span> with a total of <span className="font-semibold">{attemptAmount} attempts!</span>  

                        </p>
                        <br/>
                        <p>
                            but thankfully im confident enough to know that u will give in eventually.
                        </p>
                        <br/>
                        <p>
                            Love you <span className="font-semibold">{crush}</span>, very excited for our upcoming adventure together.
                        </p>
                        <br/>
                        <p className="right-10 absolute">
                            from <span className="font-semibold">{user}</span>
                        </p>
                        <p className="invisible">
                            <span className="font-semibold right-10">{user}</span>
                        </p>
                    </div>
                    
                    {/* <div className="flex justify-center">
                        <div className="absolute">
                            <Image className="" src={"/images/marriage.png"}
                            width={350}
                            height={350}
                            alt="apalah"
                            
                            />
                            <div className=" absolute top-16 left-14 w-22">
                                <div className="truncate">
                                    crush
                                </div>
                            </div>
                            <div className="absolute top-22 right-18">
                                {user}
                            </div>

                        </div>
                    </div> */}

                </div> 
                </>
                :
                <>
                <div className="flex gap-x-2 items-center font-semibold justify-center hover:scale-[1.15] duration-200">
                    You Won! by rejecting me 
                    <FaceSadIcon className="w-5 fill-red-500"/>
                </div>
                <br/>
                <div className="font-normal text-base">
                   <p>
                        For some reason, u tried ur hardest to reject me.. and succeded.
                   </p>
                   <br/>
                   <p>
                    That is pretty impressive that you have such level of dislike against me, such that you would rather overcome every difficulties in order to reject me
                   </p>
                   <br/>
                   <p>
                    Although, that is how love works, it's about how hard one's determination to hold a relationship, and it is better to be honest about how you feel about someone
                   </p>
                   <br/>
                   <p>
                    In the end love is not forced and wont be forced on you, but it doesnt hurt to try for the last time.
                   </p>
                   <br/>
                   <p className="font-medium">
                    So, will you be my partner?
                   </p>
                </div>
                </>
                }
            </div>
        </div>
    )
}