"use client";
import {useEffect,useRef,useState} from "react";

export function ShinyText({text,className="",speed=2,color="#b5b5b5",shineColor="#ffffff",spread=120,direction="left",delay=0,disabled=false}:{text:string;className?:string;speed?:number;color?:string;shineColor?:string;spread?:number;direction?:"left"|"right";delay?:number;disabled?:boolean}){
 return <span className={`mesaShinyText ${className}`} style={{backgroundImage:`linear-gradient(${spread}deg,${color} 0%,${color} 35%,${shineColor} 50%,${color} 65%,${color} 100%)`,animationDuration:`${Math.max(.2,speed)+Math.max(0,delay)}s`,animationDirection:direction==="right"?"reverse":"normal",animationPlayState:disabled?"paused":"running"}}>{text}</span>;
}
export function CountDownPrice({from=399000,to=100000,duration=1.6}:{from?:number;to?:number;duration?:number}){
 const el=useRef<HTMLSpanElement>(null);const [value,setValue]=useState(from);
 useEffect(()=>{const node=el.current;if(!node)return;let raf=0;let start:number|null=null;let done=false;const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;const observer=new IntersectionObserver(entries=>{if(!entries[0]?.isIntersecting||done)return;done=true;if(reduce){setValue(to);return}const step=(time:number)=>{if(start===null)start=time;const t=Math.min(1,(time-start)/(duration*1000));const eased=1-Math.pow(1-t,3);setValue(Math.round((from+(to-from)*eased)/1000)*1000);if(t<1)raf=requestAnimationFrame(step);else setValue(to)};raf=requestAnimationFrame(step);observer.disconnect()},{threshold:.3});observer.observe(node);return()=>{observer.disconnect();cancelAnimationFrame(raf)}},[from,to,duration]);
 return <span ref={el} aria-label={`Precio promocional ${to.toLocaleString("es-AR")} pesos`}>$ {value.toLocaleString("es-AR")}</span>;
}
