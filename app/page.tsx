"use client";
import {useState} from "react";
import {ArrowRight,Bell,Check,ChevronRight,CircleDollarSign,Clock3,CreditCard,LayoutDashboard,Menu,ReceiptText,Search,Sparkles,Star,UsersRound,UtensilsCrossed,WalletCards} from "lucide-react";

const requests=[["Mesa 14","Pide la cuenta","hot"],["Mesa 07","Llamó al mozo","wait"],["Mesa 03","Sin solicitudes","ok"]];
export default function Home(){
 const [role,setRole]=useState<"owner"|"waiter">("owner"); const [mobile,setMobile]=useState(false);
 return <main>
  <header><a className="brand" href="#"><i>M</i><b>Mesa</b></a><nav><a href="#producto">Producto</a><a href="#experiencia">Experiencia</a><a href="#resenas">Reseñas</a><a href="#precio">Precio</a></nav><div className="headActions"><button className="ghost">Ingresar</button><button className="dark">Empezar <ArrowRight size={15}/></button><button className="hamb" onClick={()=>setMobile(!mobile)}><Menu/></button></div></header>
  {mobile&&<div className="mobileNav"><a href="#producto">Producto</a><a href="#experiencia">Experiencia</a><a href="#resenas">Reseñas</a><a href="#precio">Precio</a></div>}
  <section className="hero">
   <div className="blob pink"/><div className="blob green"/>
   <div className="heroText">
    <div className="switch"><button className={role==="owner"?"on":""} onClick={()=>setRole("owner")}>Dueño</button><button className={role==="waiter"?"on":""} onClick={()=>setRole("waiter")}>Mozo</button></div>
    <span className="tag">{role==="owner"?"LA OPERACIÓN, EN TIEMPO REAL":"UN TURNO MÁS SIMPLE"}</span>
    <h1>{role==="owner"?<>Tu mesa pide.<br/>Tu equipo responde.</>:<>Atendé mejor.<br/>Corré menos.</>}</h1>
    <p>{role==="owner"?"Mesas, mozos, cuenta en vivo, propinas y reseñas verificadas. Todo desde el celular, sin comprar hardware.":"Recibí llamados, tomá mesas, cargá consumos y cerrá el turno con todas tus métricas claras."}</p>
    <div className="ctaRow"><button className="primary">{role==="owner"?"Crear mi restaurante":"Entrar como mozo"} <ArrowRight size={18}/></button><button className="outline">Ver cómo funciona</button></div>
    <div className="trust"><span><Check/>Sin hardware extra</span><span><Check/>Mobile-first</span><span><Check/>QR por mesa</span></div>
   </div>
   <div className="phoneWrap">
    <div className="float top"><Bell/> Mesa 14 te necesita</div>
    <div className="phone">
     <div className="phoneTop"><div><small>Buenas noches</small><h3>Juan 👋</h3></div><em>● En turno</em></div>
     <div className="mini"><div><b>8</b><small>mesas</small></div><div><b>4,9</b><small>⭐ atención</small></div><div><b>$42k</b><small>propinas</small></div></div>
     <div className="requests">{requests.map(([a,b,c])=><div className="request" key={a}><i className={c}/><div><b>{a}</b><small>{b}</small></div><ChevronRight/></div>)}</div>
     <button className="phoneBtn">Ver todas las mesas</button>
    </div>
    <div className="float bottom"><ReceiptText/> Cuenta lista · $48.500</div>
   </div>
  </section>
  <section className="stats" id="producto"><div><b>$1.840.500</b><span>facturado hoy</span></div><div><b>124</b><span>mesas atendidas</span></div><div><b>4,8 ★</b><span>experiencia</span></div></section>
  <section className="split section" id="experiencia">
   <div><span className="tag greenText">MESA INTELIGENTE</span><h2>El QR deja de ser un menú. Se convierte en servicio.</h2><p className="lead">Cada mesa tiene una sesión viva: puede llamar al mozo, ver su consumo, pedir la cuenta, pagar y valorar la experiencia.</p>
    <div className="features">{[[Bell,"Llamar al mozo","La solicitud llega al mozo asignado en segundos."],[ReceiptText,"Ver mi cuenta","El cliente ve todo lo consumido en tiempo real."],[CreditCard,"Dividir y pagar","Cuenta lista, propina digital y cierre sin fricción."]].map(([Icon,t,d]:any)=><div className="feature" key={t}><i><Icon/></i><div><b>{t}</b><p>{d}</p></div></div>)}</div>
   </div>
   <div className="tableCard"><div className="tableTop"><b>Mesa 08</b><span><Check/> conectada</span></div><h3>¿Qué necesitás?</h3><div className="actions">{[[Bell,"Llamar al mozo"],[UtensilsCrossed,"Ver menú"],[ReceiptText,"Mi cuenta"],[WalletCards,"Pedir cuenta"]].map(([Icon,t]:any)=><button key={t}><Icon/><b>{t}</b></button>)}</div><div className="total"><span>Tu consumo</span><b>$34.600</b></div></div>
  </section>
  <section className="dashSection section">
   <div className="center"><span className="tag">TU RESTAURANTE, CLARO</span><h2>Todo lo importante, sin ruido.</h2><p className="lead">Una operación gastronómica completa, diseñada primero para el celular y después para escritorio.</p></div>
   <div className="dashboard"><aside><div className="brand"><i>M</i><b>Mesa</b></div>{[[LayoutDashboard,"Inicio"],[UtensilsCrossed,"Mesas"],[UsersRound,"Personal"],[Star,"Reseñas"],[CircleDollarSign,"Propinas"]].map(([Icon,t]:any,i)=><button className={i===0?"selected":""} key={t}><Icon/>{t}</button>)}</aside><div className="dashMain"><div className="dashHead"><div><small>Miércoles 7 de octubre</small><h3>Buenas tardes.</h3></div><button className="dark">+ Nueva mesa</button></div><div className="metrics"><div className="metric big"><span>Facturación de hoy</span><b>$1.840.500</b><em>+18% vs. ayer</em></div><div className="metric"><span>Atención promedio</span><b>1m 08s</b><em>↓ 14s</em></div><div className="metric"><span>Propinas</span><b>$147.000</b><em>+9%</em></div></div><div className="activity"><div className="activityHead"><b>Actividad en vivo</b><span>● Ahora</span></div>{[["Mesa 12","Cuenta solicitada","hace 12 s"],["Mesa 04","Juan tomó la mesa","hace 28 s"],["Mesa 19","Nueva orden · $18.400","hace 1 min"]].map(x=><div className="activityRow" key={x[0]}><b>{x[0]}</b><span>{x[1]}</span><small>{x[2]}</small></div>)}</div></div></div>
  </section>
  <section className="reviews section" id="resenas"><div><span className="tag greenText">RESEÑAS QUE VALEN</span><h2>Opiniones de gente que realmente comió ahí.</h2><p className="lead">La reseña nace después de una visita real. Mesa cerrada, identidad verificada y comentario asociado a la experiencia.</p><span className="verified"><Check/> Visita verificada</span></div><div className="reviewCard"><div className="stars">★★★★★</div><p>“Nos atendieron rapidísimo y la cuenta llegó sin tener que esperar al mozo.”</p><div className="reviewer"><i>TC</i><div><b>Tobias C.</b><small>Visita verificada · Mesa 11</small></div></div></div></section>
  <section className="section discover"><div className="center"><span className="tag">DESCUBRIR</span><h2>¿Qué querés comer hoy?</h2><p className="lead">Buscá por plato, no solamente por restaurante.</p></div><div className="search"><Search/><input placeholder="Milanesa napolitana, sushi, café..."/><button>Buscar</button></div><div className="places">{[["El Club","Milanesas","4,8","$$"],["Don Pietro","Pastas","4,7","$$"],["Casa Nori","Sushi","4,9","$$$"]].map(x=><div className="place" key={x[0]}><div className="art"><Sparkles/></div><div className="placeInfo"><div><b>{x[0]}</b><small>{x[1]}</small></div><strong><Star fill="currentColor"/>{x[2]} · {x[3]}</strong></div></div>)}</div></section>
  <section className="pricing section" id="precio"><div><span className="tag greenText">SIMPLE DE ACTIVAR</span><h2>Entrá rápido. Operá desde el primer día.</h2><p className="lead">Alta simple, activación inicial y mantenimiento mensual bajo.</p></div><div className="priceCard"><span>Activación inicial</span><b>$100.000</b><p>Configuración del restaurante, mesas, personal, menú y acceso completo.</p><hr/><div><span>Mantenimiento mensual</span><strong>Desde $20.000</strong></div><button className="primary wide">Crear mi restaurante <ArrowRight/></button></div></section>
  <section className="last"><div><span className="tag">MESA</span><h2>La atención de tu restaurante, en otro nivel.</h2><p>Sin aparatos. Sin vueltas. Desde el celular.</p><button className="primary">Empezar ahora <ArrowRight/></button></div></section>
  <footer><div className="brand"><i>M</i><b>Mesa</b></div><span>Producto gastronómico mobile-first.</span></footer>
 </main>
}