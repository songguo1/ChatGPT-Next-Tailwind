import { AppContext } from "@/components/AppContext";
import Menubutton from "@/components/common/Menubutton";
import Button from "@/components/common/Togglebutton";
import { ActionType } from "@/reducers/AppReducer";
import { useContext } from "react";
import { HiPlus } from "react-icons/hi";
import { LuPanelLeft } from "react-icons/lu";

export default function Menubar() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <nav className="flex space-x-3">
      <Menubutton icon={HiPlus} variant="outline" className="flex-1">
        新建对话
      </Menubutton>
      <Menubutton
        icon={LuPanelLeft}
        onClick={() => {
          dispatch({
            type:ActionType.UPDATE,
            field:"displayNavigation",
            value:false
          })
        }}
        variant="outline"
      ></Menubutton>
    </nav>
  );
}
