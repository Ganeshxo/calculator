"use client"
import React, { useEffect, useRef,useState } from 'react'
import { FaDeleteLeft } from "react-icons/fa6";
import { IoSunny, IoMoon } from "react-icons/io5";
import { motion } from 'framer-motion';
import { Cinzel,Instrument_Sans,Prompt } from 'next/font/google';
const c = Cinzel({weight :["600"],display:"swap",subsets:['latin']});
const i = Instrument_Sans({weight :["500"],display:"swap",subsets:['latin']});
const p = Prompt({weight :["600"],display:"swap",subsets:['latin']});
function Page() {
    const [darkMode,setDarkMode] = useState(false);
    const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);
    const toggleTheme = ()=> {
      setDarkMode(to => !to);
      inputRef.current?.focus();
    }
    const isResult = useRef(false);
    const [input,setInput] = useState("");
    const handleClick = (e) =>{
       const value = e.target.innerHTML;
       setInput((prev) => { const newVal = prev === "Error" ? value : prev + value;
        isResult.current = false;
       setTimeout(() => {
        if (inputRef.current) {
        inputRef.current.scrollLeft = inputRef.current.scrollWidth;
       }
       }, 0);

      return newVal;
      });
        inputRef.current?.focus();
    }
    const handleDelete = () =>{
       setInput((prev) => prev === "Error" ? "" : prev.slice(0, -1));
        inputRef.current?.focus();
        isResult.current = false;
    }
    const handleClear =()=>{
       setInput("")
        inputRef.current?.focus();
        isResult.current = false;
    }
   const handleEvalute =()=>{ 
    if (input.trim() === ""){
       inputRef.current?.focus();
      return;
    }
    try {
    const val = input
      .replace(/÷/g, "/")
      .replace(/x/g, "*");
    const result = eval(val);
    if(result === undefined || isNaN(result)){
      setInput("Error")
    }
    else{
    setInput(result.toString());
    isResult.current = true;
    }
     } catch (error) {
        setInput("Error");
     }
      inputRef.current?.focus();
    };
    const handleKeys =(e)=>{
       const allowedKeys = [
      "Enter","Backspace","ArrowLeft", "ArrowRight","0", "1", "2", "3", "4", "5", "6", "7", "8", "9","+", "-", "*", "/", "%", ".", "x", "÷"
    ];
     if (e.key === "Enter") {
      e.preventDefault();
      handleEvalute();
     return;
    }

    if (!allowedKeys.includes(e.key) && !(e.key.length === 1 && "+-*/%.x÷".includes(e.key))){
           e.preventDefault(); 
    }
    if (e.key === "*" || e.key === "/") {
    e.preventDefault();
    isResult.current = false;
    setInput(prev => prev + (e.key === "*" ? "x" : "÷"));
    }
     else if ("+-*/%.x÷".includes(e.key)) {
      isResult.current = true;
   }
  }
    const inputRef = useRef(null);
    useEffect(() => {
      inputRef.current?.focus();
     }, []);
    useEffect(() => {
      if (input === "Error") {
       const timer = setTimeout(() => {
       setInput("");
       }, 2000);
       return () => clearTimeout(timer);
      }
    }, [input]);
  return (
    <div className={`w-screen h-screen transition-colors duration-700 ${darkMode ? "bg-zinc-900 text-white" : "bg-slate-100 text-black"}`}>
      <h1 className={`${c.className} text-2xl md:text-3xl pt-36 text-center uppercase duration-700`}>Calculator<span className='ml-2'><button className={`${darkMode ? " text-yellow-300":"text-violet-800 bg-slate-300"} cursor-pointer px-4 py-1 rounded-full border-2 border-zinc-700 text-lg transition`} onClick={toggleTheme}>{darkMode ? <IoSunny/> : <IoMoon/>}</button></span></h1>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1,y:-100}} transition={{duration:1}} className={`w-3/4 sm:w-2xs md:w-80 h-1/2 mx-auto mt-32 p-5 rounded-xl transition-colors duration-700 ${darkMode ? "bg-zinc-800 shadow-[1px_1px_10px_9px_#383838]":"bg-slate-300 shadow-[1px_1px_10px_9px_#ababab]"}`}>
        <motion.input type='text' readOnly={isMobile} animate={input === "Error" ? { x: [0, -10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }} ref={inputRef} value={input} onKeyDown={handleKeys} onChange={(e)=> { const value = e.target.value; isResult.current = false; setInput((prev)=>(prev === "Error" ? "" : value))}} className={`${i.className} ${darkMode ? "border-zinc-700 shadow-[inset_1px_1px_5px_3px_#5e5e5e]":"border-slate-500 shadow-[inset_1px_1px_5px_3px_#ababab]"} px-4 border-4 rounded-xl w-full h-20 overflow-x-auto whitespace-nowrap outline-none text-end text-3xl ${input === "Error" ? "text-red-600" : (isResult.current ? "text-blue-600" : "")}`}/>
        <div className={`${c.className} grid grid-cols-4 grid-rows-5 items-center justify-items-center h-3/4 mt-6 text-xl gap-3 text-white`}>
        <button type='button' className={`${p.className} w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 text-red-500 rounded-full cursor-pointer active:scale-90 transition-transform duration-100`} onClick={handleClear}>C</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 text-lime-400 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>%</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 text-lime-400 rounded-full cursor-pointer text-3xl active:scale-90 transition-transform duration-100' onClick={handleClick}>÷</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-red-600 bg-red-500 rounded-full cursor-pointer pl-2 lg:pl-3 active:scale-90 transition-transform duration-100' onClick={handleDelete}><FaDeleteLeft /></button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>7</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>8</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>9</button>
        <button type='button' className={`${i.className} w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 text-lime-400 rounded-full cursor-pointer pb-1 active:scale-90 transition-transform duration-100`} onClick={handleClick}>x</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>4</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>5</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>6</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 text-lime-400 rounded-full cursor-pointer text-3xl active:scale-90 transition-transform duration-100' onClick={handleClick}>-</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>1</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>2</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>3</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 text-lime-400 rounded-full cursor-pointer text-3xl active:scale-90 transition-transform duration-100' onClick={handleClick}>+</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>00</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer active:scale-90 transition-transform duration-100' onClick={handleClick}>0</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-slate-500 bg-slate-600 rounded-full cursor-pointer pb-1.5 lg:pb-2 active:scale-90 transition-transform duration-100' onClick={handleClick}>.</button>
        <button type='button' className='w-10 lg:w-12 h-10 lg:h-12 hover:bg-green-600 bg-green-500 rounded-full cursor-pointer text-3xl active:scale-90 transition-transform duration-100' onClick={handleEvalute}>=</button>
        </div>
      </motion.div>
       {input === "Error" && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${c.className} text-center -mt-20 text-red-600`}>Invalid expression</motion.p>)}
    </div>
  )
}

export default Page