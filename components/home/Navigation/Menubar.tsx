import Menubutton from "@/components/common/Menubutton";
import Button from "@/components/common/Togglebutton";
import { HiPlus } from "react-icons/hi";
import { LuPanelLeft } from "react-icons/lu";


export default function Menubar(){
    return(
       
        <nav className="flex space-x-3" >
        
        <Menubutton icon={HiPlus} variant="outline" className="flex-1">新建对话</Menubutton>
        <Menubutton icon={LuPanelLeft} variant="outline"></Menubutton>
        </nav>
       
    )
}