"use client";
import Menubutton from "@/components/common/Menubutton";
import Menubar from "./Menubar";
import { AppContext } from "@/components/AppContext";
import { useContext } from "react";
import Toolbar from "@/components/home/Navigation/Toolbar"
import ChatList from "./ChatList";

export default function Navigation() {
  const { state } = useContext(AppContext);
  return (
    <nav
      className={`${
        state.displayNavigation ? "" : "hidden"
      } relative h-full w-1/5 bg-gray-800 text-gray-300 p-4`}
    >
      <Menubar />
      <ChatList/>
      <Toolbar/>
    </nav>
  );
}
