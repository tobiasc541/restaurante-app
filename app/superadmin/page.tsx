"use client";
import {useEffect,useState} from "react";
import {createClient} from "@supabase/supabase-js";
import Link from "next/link";
const supabase=createClient("https://oietadzixpglmkiokihj.supabase.co","sb_publishable_lbPUme-0Y7hjHWdcdGS2nA_Miy8rnzx");
type Overview=Record<string,unknown>;
export default function Superadmin(){
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [user,setUser]=useState<string|null>(null);
 const [data,setData]=useState<Overview|null>(null);const [loading,setLoading]=useState(true);const [error,setError]=useState("");
 async function load(){
  setLoading(true);setError("");
  const {data:session}=await supabase.auth.getUser();
  if(!session.user){setUser(null);setData(null);setLoading(false);return;}
  setUser(session.user.email||"Usuario");
  const {data:result,error:e}=await supabase.rpc("mesa_platform_overview");
  if(e){setData(null);setError(e.message);}else setData(result as Overview);
  setLoading(false);
 }
 useEffect(()=>{void load();const {data:{subscription}}=supabase.auth.onAuthStateChange(()=>{void load()});return()=>subscription.unsubscribe()},[]);
 async function login(e:React.FormEvent){e.preventDefault();setError("");const {error:e2}=await supabase.auth.signInWithPassword({email,password});setPassword("");if(e2)setError("No se pudo iniciar sesión. Revisá las credenciales.");else await load();}
 async function logout(){await supabase.auth.signOut();setData(null);setUser(null);}
 const obj=data&&typeof data==="object"&&!Array.isArray(data)?data:{};
 const entries=Object.entries(obj);
 return <main style={{minHeight:"100vh",background:"#0b1020",color:"#f8fafc",fontFamily:"system-ui,sans-serif",padding:"min(5vw,48px)"}}>
 <div style={{maxWidth:1150,margin:"0 auto"}}>
 <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,marginBottom:38}}>
 <div><div style={{fontSize:12,letterSpacing:3,color:"#93c5fd",fontWeight:800}}>MESA · ACCESO RESTRINGIDO</div><h1 style={{fontSize:"clamp(28px,4vw,46px)",margin:"12px 0 4px"}}>Centro de control</h1><p style={{color:"#94a3b8"}}>Administración superior de la plataforma</p></div>
 {user&&<button onClick={logout} style={{background:"#1e293b",color:"white",border:"1px solid #334155",padding:"12px 18px",borderRadius:12,cursor:"pointer"}}>Cerrar sesión</button>}
 </header>
 {loading?<p>Verificando acceso seguro…</p>:!user?
 <form onSubmit={login} style={{maxWidth:430,background:"#141e32",border:"1px solid #334155",borderRadius:20,padding:28,display:"grid",gap:16}}>
 <h2 style={{margin:0}}>Ingresar como administrador</h2><p style={{color:"#94a3b8",margin:0}}>Usá tu cuenta de MESA. Los permisos se verifican en la base de datos.</p>
 <label>Correo<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} style={{display:"block",width:"100%",marginTop:8,padding:13,borderRadius:10,border:"1px solid #475569",background:"#0b1020",color:"white",boxSizing:"border-box"}}/></label>
 <label>Contraseña<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} style={{display:"block",width:"100%",marginTop:8,padding:13,borderRadius:10,border:"1px solid #475569",background:"#0b1020",color:"white",boxSizing:"border-box"}}/></label>
 <button type="submit" style={{padding:14,background:"#3b82f6",color:"white",border:0,borderRadius:10,fontWeight:700,cursor:"pointer"}}>Ingresar</button>
 <Link href="/" style={{color:"#93c5fd"}}>Volver a MESA</Link></form>
 :error?<section style={{background:"#2a1822",padding:24,borderRadius:16,border:"1px solid #7f1d1d"}}><h2>Acceso no autorizado o servicio no disponible</h2><p>{error}</p><p>Este panel solo muestra datos si la base de datos autoriza la cuenta.</p></section>
 :<><p style={{color:"#94a3b8"}}>Sesión: {user}</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:16,marginTop:25}}>
 {entries.filter(([_,v])=>v===null||["string","number","boolean"].includes(typeof v)).map(([k,v])=><article key={k} style={{background:"#141e32",border:"1px solid #334155",borderRadius:18,padding:23}}><div style={{fontSize:12,color:"#94a3b8",wordBreak:"break-word"}}>{k.replaceAll("_"," ").toUpperCase()}</div><div style={{fontSize:29,fontWeight:800,marginTop:10}}>{String(v??"—")}</div></article>)}</div>
 {entries.filter(([_,v])=>typeof v==="object"&&v!==null).map(([k,v])=><section key={k} style={{marginTop:20,background:"#141e32",border:"1px solid #334155",borderRadius:18,padding:22}}><h2>{k.replaceAll("_"," ")}</h2><pre style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere",fontSize:13,color:"#cbd5e1"}}>{JSON.stringify(v,null,2)}</pre></section>)}
 {!entries.length&&<p>La consulta administrativa no devolvió métricas.</p>}
 <p style={{color:"#94a3b8",marginTop:32}}>Panel de consulta. Las acciones de cobro, suspensión y renovación requieren operaciones administrativas protegidas y auditables.</p></>}
 </div></main>;
}