"use client"
import Menubutton from "@/components/common/Menubutton";
import { AppContext } from "@/components/AppContext";
import { LuPanelLeft } from "react-icons/lu";
import { useContext } from "react";

export default function Menu(){
    const { state, setState } = useContext(AppContext);

    return(
        <Menubutton
        icon={LuPanelLeft}
        className={`${ state.displayNavigation? "hidden":""} absolute left-4 top-4`}
        onClick={() => {
          setState((v) => {
            return { ...v, displayNavigation: true };
          });
        }}
        variant="outline"
      ></Menubutton>
    )
}
