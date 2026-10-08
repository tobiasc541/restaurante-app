"use client";
import {useEffect,useState} from "react";
import {createClient} from "@supabase/supabase-js";
const db=createClient("https://oietadzixpglmkiokihj.supabase.co","sb_publishable_lbPUme-0Y7hjHWdcdGS2nA_Miy8rnzx");
export default function AccessPage(){
const [role,setRole]=useState("waiter");
const [staff,setStaff]=useState<any[]>([]);
const [staffId,setStaffId]=useState("");
const [authorized,setAuthorized]=useState(false);
const [loading,setLoading]=useState(true);
const [busy,setBusy]=useState(false);
const [result,setResult]=useState<any>(null);
const [error,setError]=useState("");
useEffect(()=>{(async()=>{const {data}=await db.rpc("mesa_my_access");const ok=data?.role==="owner"||data?.role==="manager";setAuthorized(ok);if(ok){const {data:bootstrap}=await db.rpc("bootstrap_mesa");const list=(bootstrap?.staff||[]).filter((x:any)=>x.active&&x.role==="waiter");setStaff(list);setStaffId(list[0]?.id||"")}setLoading(false)})()},[]);
const generate=async()=>{setBusy(true);setError("");setResult(null);try{const {data}=await db.auth.getSession();if(!data.session)throw Error("Iniciá sesión como dueño");const response=await db.functions.invoke("mesa-staff-access",{body:{role,staff_id:role==="waiter"?staffId:null}});if(response.error)throw Error(response.data?.error||response.error.message);setResult(response.data)}catch(e:any){setError(e.message)}finally{setBusy(false)}};
return <main style={{minHeight:"100vh",background:"#eee6dd",fontFamily:"Arial,sans-serif",padding:32}}><section style={{maxWidth:520,margin:"40px auto",padding:30,background:"white",borderRadius:20}}><h1>Mesa · Accesos</h1>{loading?<p>Cargando...</p>:!authorized?<p>Ingresá primero como dueño desde <a href="/">Mesa</a>.</p>:<><p>Generá el usuario y la clave privada para cada empleado.</p><label>Panel<select value={role} onChange={e=>setRole(e.target.value)} style={{display:"block",width:"100%",padding:12,margin:"8px 0 16px"}}><option value="waiter">Mozo</option><option value="cashier">Facturación</option></select></label>{role==="waiter"&&<label>Empleado<select value={staffId} onChange={e=>setStaffId(e.target.value)} style={{display:"block",width:"100%",padding:12,margin:"8px 0 16px"}}>{staff.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>}<button disabled={busy||(role==="waiter"&&!staffId)} onClick={generate} style={{padding:14,background:"black",color:"white",border:0,borderRadius:10}}>{busy?"Generando...":"Generar o renovar clave"}</button>{error&&<p role="alert" style={{color:"red"}}>{error}</p>}{result&&<div style={{background:"#e9f8ed",padding:18,marginTop:20,borderRadius:12,overflowWrap:"anywhere"}}><p>Usuario: <b>{result.email}</b></p><p>Clave: <b>{result.pin}</b></p><button onClick={()=>navigator.clipboard.writeText("Usuario: "+result.email+"\nClave: "+result.pin+"\nAcceso: "+location.origin+"/personal")}>Copiar credenciales</button><p>Si renovás una clave, la anterior deja de funcionar.</p></div>}</>}<p><a href="/personal">Ingresar como empleado</a> · <a href="/">Volver</a></p></section></main>
}