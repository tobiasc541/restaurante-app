import "./globals.css";
import type { Metadata } from "next";
export const metadata:Metadata={title:"Mesa — Tu restaurante, conectado",description:"Mesas, mozos, cuenta en vivo, propinas y reseñas verificadas."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="es"><head><link rel="manifest" href="/manifest.webmanifest"/><meta name="apple-mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-title" content="MESA"/></head><body>{children}</body></html>}