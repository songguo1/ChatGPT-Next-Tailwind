import { AppContext } from "@/components/AppContext";
import Menubutton from "@/components/common/Menubutton";
import Button from "@/components/common/Togglebutton";
import { ActionType } from "@/reducers/AppReducer";
import { useContext } from "react";
import { MdInfo } from "react-icons/md";

export default function Toolbar() {
  const { state ,dispatch} = useContext(AppContext);
  console.log(state.themeMode)
  return (
    <nav className="absolute bottom-0 w-full left-0 bg-gray-700 flex p-2 justify-between ">
      <Button onClick={()=>{
        dispatch({
            type:ActionType.UPDATE,
            field:"themeMode",
            value:state.themeMode=="dark"?"light":"dark"
        })
      }}></Button>
      <Menubutton icon={MdInfo} variant="text"></Menubutton>
    </nav>
  );
}
