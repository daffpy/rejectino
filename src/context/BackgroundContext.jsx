"use client"

import { useContext, useState, createContext } from "react"

const BgContext = createContext()

export function FlashProvider({children}){
    const [color, setColor] = useState("transparent")

    const flashRed = () =>{
        setColor("red-500")
        setTimeout(() => setColor("transparent"), 300)
    }
    const flashGreen = () => {
        setColor("green-500")
        setTimeout(() => setColor("transparent"), 500)
    }
    return(
        <BgContext.Provider value={{color, flashRed, flashGreen}}>
            {children}
        </BgContext.Provider>
    )
}

export function useBg(){
    return useContext(BgContext)
}

