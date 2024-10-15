"use client";
import Menubutton from "@/components/common/Menubutton";
import Menubar from "./Menubar";
import { AppContext } from "@/components/AppContext";
import { useContext } from "react";

export default function Navigation() {
  const { state, setState } = useContext(AppContext);
  return (
    <nav
      className={`${
        state.displayNavigation ? "" : "hidden"
      } h-full w-1/5 bg-gray-800 text-gray-300 p-4`}
    >
      <Menubar />
    </nav>
  );
}
