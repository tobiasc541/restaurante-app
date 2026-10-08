import {NextRequest,NextResponse} from "next/server";
export const dynamic="force-dynamic";
export async function GET(req:NextRequest){
 const q=(req.nextUrl.searchParams.get("q")||"").trim().slice(0,160);
 if(q.length<5)return NextResponse.json({results:[]});
 const results:any[]=[];const seen=new Set<string>();
 function add(name:string,lat:any,lon:any,zone:string){
  const y=Number(lat),x=Number(lon);if(!name||!Number.isFinite(y)||!Number.isFinite(x)||y< -56||y> -21||x< -74||x> -53)return;
  if(seen.has(name))return;seen.add(name);results.push({place_id:String(results.length),display_name:name,lat:y,lon:x,zone});
 }
 const tasks=[
  (async()=>{const url="https://apis.datos.gob.ar/georef/api/direcciones?max=12&direccion="+encodeURIComponent(q);const r=await fetch(url,{signal:AbortSignal.timeout(6500)});if(!r.ok)return;const j=await r.json();for(const d of j.direcciones||[])add(d.nomenclatura,d.ubicacion?.lat,d.ubicacion?.lon,d.localidad_censal?.nombre||d.departamento?.nombre||"");})(),
  (async()=>{const url="https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&countrycodes=ar&q="+encodeURIComponent(q);const r=await fetch(url,{headers:{"Accept-Language":"es","User-Agent":"MESA restaurant address finder"},signal:AbortSignal.timeout(6500)});if(!r.ok)return;const j=await r.json();for(const p of j){const a=p.address||{};add(p.display_name,p.lat,p.lon,a.suburb||a.town||a.city||a.village||a.municipality||a.county||"");}})()
 ];
 await Promise.allSettled(tasks);
 return NextResponse.json({results:results.slice(0,12)});
}
