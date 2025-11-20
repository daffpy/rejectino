"use client"

import { useState } from "react"

import { FireIcon } from "./Emoticon"
import Link from "next/link"

export function TicTacToe({levelStep, setLevelStep,count, setCount, attemptAmount, setAttempt}){
    const initialBoard = [
        ["","",""],
        ["","O",""],
        ["","",""]
    ]
    const [board, setBoard] = useState(initialBoard)
    const [isWin, setResult] = useState("playing")

    function findAllEmptyCell(board) {
        const emptyCells = [];

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] === "") {
                    emptyCells.push({ row: r, col: c });
                }
            }
        }

        return emptyCells;
    }

    function getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function endGameCell(board){
        const emptyBoard = findAllEmptyCell(board)
        const [a, b] = emptyBoard;
        // console.log(emptyBoard,a,b)
        const col_yes = a["col"]
        const row_yes = a["row"]

        const col_no = b["col"]
        const row_no = b["row"]

        const newArray = board.map(rows => [...rows]);
        newArray[row_yes][col_yes] = "yes"
        newArray[row_no][col_no] = "no"
        setBoard(newArray)
    }

    function findYesNo(board) {
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] === "yes" ||  board[r][c] === "no") {
                    return [r, c];
                }
            }
        }
        return null;
    }

    function fillRandomCell(board){
        if(board.some(row => row.includes("yes")) || board.some(row => row.includes("no"))){
            const [row,col] = findYesNo(board)
            const newArray = board.map(rows => [...rows]);
            newArray[row][col] = "O"

            setBoard(newArray)
            if(checkOWin(newArray,row,col)){
                setResult("lose");
                return;
            }
            console.log(newArray)
            return newArray
        }
        const emptyBoard = findAllEmptyCell(board)
        const randomSeq = emptyBoard[getRandomInt(0,emptyBoard.length)]

        const col = randomSeq["col"]
        const row = randomSeq["row"]
        // console.log(col,row)

        const newArray = board.map(rows => [...rows]);
        newArray[row][col] = "O"

        setBoard(newArray)
        if(checkOWin(newArray,row,col)){
            setResult("lose");
            return;
        }
        if(findAllEmptyCell(newArray).length == 2){
            endGameCell(newArray)
        }
        return newArray

    }

    function checkXWin(array, row, col) {
        const rowWin = array[row].every(v => v === "X");
        const colWin = array.map(r => r[col]).every(v => v === "X");
        const mainD = [array[0][0], array[1][1], array[2][2]].every(v => v === "X");
        const antiD = [array[0][2], array[1][1], array[2][0]].every(v => v === "X");

        return rowWin || colWin || mainD || antiD;
    }
    function checkOWin(array, row, col) {
        const rowWin = array[row].every(v => v === "O");
        const colWin = array.map(r => r[col]).every(v => v === "O");
        const mainD = [array[0][0], array[1][1], array[2][2]].every(v => v === "O");
        const antiD = [array[0][2], array[1][1], array[2][0]].every(v => v === "O");

        return rowWin || colWin || mainD || antiD;
    }
    return (
        <div className="absolute z-3 bg-white w-full h-80">
            {isWin == "lose"?
            <>
            <div className="bg-white/95 back absolute w-full h-full flex justify-center">
                
                <div className="text-base text-center p-4 border-2">
                    <p className="font-medium text-2xl">
                        Uh oh.. You Lost!
                    </p>
                    <p>
                        its okay, you only lost this game, but not my love for you
                    </p>
                    <br/>
                    <p className="font-medium">
                        so... do you want to be my partner?
                    </p>
                    <br/>
                    <div className="flex justify-between px-6 text-xl">
                        <div className=" hover:font-medium">
                            yes
                        </div>
                        <div className="hover:font-medium"
                        onClick={() => {
                            setBoard(initialBoard)
                            setResult("playing")
                            setAttempt(attemptAmount + 1)
                        }}
                        >
                            no
                        </div>
                    </div>
                </div>

            </div>
            </>
            :null
            
            }
            <div className="grid grid-cols-3 grid-rows-3 h-full text-center text-6xl">
                {board.map((row,rIdx)=>
                    row.map((col, cIdx)=>{
                        return(
                            col == "X" || col == "O" || col == "" ?
                                <div key={col + cIdx} className="font-mono border flex justify-center items-center"
                                    onClick={() => {
                                        if (board[rIdx][cIdx] !== "") return;

                                        const newArray = board.map(row => [...row]);
                                        newArray[rIdx][cIdx] = "X";

                                        setBoard(newArray);           
                                        if(checkXWin(newArray,rIdx,cIdx)){
                                            setResult("win")
                                            setLevelStep(levelStep + 1)
                                            setCount(count+1)
                                            return;
                                        }
                                        fillRandomCell(newArray);
                                    }}
                                
                                >{col}</div>
                                : col == "yes" ?
                                    <div key={col + cIdx} className="z-2 font-medium  text-3xl bg-white border flex justify-center items-center">
                                        yes
                                    </div>
                                    
                                    : 
                                    
                                    <div key={col + cIdx} className="z-2 font-medium text-3xl bg-white border flex justify-center items-center"
                                        onClick={() => {

                                            const newArray = board.map(row => [...row]);
                                            newArray[rIdx][cIdx] = "X";
                                            

                                            setBoard(newArray);       

                                            if(checkXWin(newArray,rIdx,cIdx)){
                                                setResult("win")
                                                setLevelStep(levelStep + 1)
                                                setCount(count+1)
                                                return;
                                            }  

                                            fillRandomCell(newArray);

                                            if (checkOWin(newArray, rIdx, cIdx)) {
                                                setResult("lose");
                                                return;
                                            }    
                                            setResult("win")
                                            setLevelStep(levelStep + 1)
                                            setCount(count+1)
                                            setAttempt(attemptAmount + 1)
                                        }}
                                        >
                                            no
                                    </div>
                        
                    )

                    })

                )}
            </div>
            {isWin}
            {count}
        </div>
    )
}

export function Darkness({levelStep, setLevelStep, count, setCount, attemptAmount, setAttempt}){
    const [isLight, setLight] = useState(false)
    return(
        <div className="font-medium text-base px-2">
            <div className="px-4 flex gap-1.5 items-center">
                <FireIcon onClick={() => setLight(true)} className="w-4 fill-red-500"/>
                <div>
                    Hint: <span className="italic">prometheus</span>
                </div>
            </div>
            <div className="flex justify-between px-3 pt-5">
                <div className="z-2 w-20 px-4 py-3 bg-white border-2 rounded-xl text-center">
                    yes
                </div>
                {isLight ?
                    <div className="z-2 w-20 px-4 py-3 duration-200 bg-white border-2 rounded-xl text-center"
                    onClick={() => {
                        setLevelStep(levelStep + 1)
                        setCount(count+1)
                        setAttempt(attemptAmount+1)
                    }}
                    >
                        no
                    </div>
                    : null
                }
            </div>

        </div>
    )
}

export function MoveAround({levelStep, setLevelStep, count, setCount, attemptAmount, setAttempt}){
    return(
        <div className={`flex flex-row justify-between items-center`}>
                        
            <div className="z-2 w-20 mx-4 px-4 py-3 bg-white border-2 rounded-xl text-center">
                <div>
                    yes
                </div>
            </div>
            <div className="w-20 mt-250 right-0 text-center absolute">
                <div>
                    <div
                        onClick={() => {
                            setLevelStep(levelStep + 1)
                            setCount(count+1)
                            setAttempt(attemptAmount+1)

                        }}
                        className={`!w-20 hover:font-medium border-2 bg-white px-4 py-3 rounded-xl`}
                    >
                        no
                    </div>
                </div>
            </div>
        </div>
    )
}