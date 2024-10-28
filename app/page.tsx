"use client"
import { AppContext } from "@/components/AppContext";
import Main from "@/components/home/Main";
import Navigation from "@/components/home/Navigation/index";
import { useContext } from "react";
import "@/public/style/globals.css";

export default function Home() {
  const {state}=useContext(AppContext)
  return (
   <div className={`${state.themeMode=="dark"?"dark":""} h-full flex`}>
    <Navigation/>
    <Main/>
    </div>
  );
}
