"use client"
import Menubutton from "@/components/common/Menubutton";
import { AppContext } from "@/components/AppContext";
import { LuPanelLeft } from "react-icons/lu";
import { useContext } from "react";
import { ActionType } from "@/reducers/AppReducer";

export default function Menu(){
    const { state, dispatch } = useContext(AppContext);

    return(
        <Menubutton
        icon={LuPanelLeft}
        className={`${ state.displayNavigation? "hidden":""} absolute left-4 top-4`}
        onClick={() => {
          dispatch({
            type:ActionType.UPDATE,
            field:"displayNavigation",
            value:true
          })
        }}
        variant="outline"
      ></Menubutton>
    )
}
