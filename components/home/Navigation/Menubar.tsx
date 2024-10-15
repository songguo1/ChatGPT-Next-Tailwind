import { AppContext } from "@/components/AppContext";
import Menubutton from "@/components/common/Menubutton";
import Button from "@/components/common/Togglebutton";
import { useContext } from "react";
import { HiPlus } from "react-icons/hi";
import { LuPanelLeft } from "react-icons/lu";

export default function Menubar() {
  const { state, setState } = useContext(AppContext);
  return (
    <nav className="flex space-x-3">
      <Menubutton icon={HiPlus} variant="outline" className="flex-1">
        新建对话
      </Menubutton>
      <Menubutton
        icon={LuPanelLeft}
        onClick={() => {
          setState((v) => {
            return { ...v, displayNavigation: false };
          });
        }}
        variant="outline"
      ></Menubutton>
    </nav>
  );
}
