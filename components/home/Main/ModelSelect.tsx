"use client";
import { AppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";
import { useContext } from "react";
import { PiLightningFill, PiShootingStarFill } from "react-icons/pi";

export default function ModelSelect() {
  const models = [
    {
      id: "deepseek-chat",
      name: "DeepSeek V2.5",
      iconPath: "images/deepseek.png",
    },
    // {
    //   id: "gpt-4",
    //   name: "GPT-4",
    //   icon: PiShootingStarFill,
    // },
  ];
  const {
    state: { currentModel },
    dispatch,
  } = useContext(AppContext);
  return (
    <div className="flex bg-gray-300 dark:bg-gray-900 p-1  rounded-xl">
      {models.map((item) => {
        const selected=item.id===currentModel
        return (
          <button
          
            key={item.id}
            onClick={() => {
              dispatch({
                type: ActionType.UPDATE,
                field: "currentModel",
                value: item.id,
              });
            }}
            className={`group hover:text-gray-900 hover:dark:text-gray-100 flex justify-center items-center space-x-2 py-2.5 min-w-[148px] text-sm font-medium border rounded-lg
                ${selected? "border-gray-200 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100":"boder-transparent text-gray-500 "}`}
          >
            <span className={`group-hover:text-primary-500 transition-colors duration-100 ${selected? "text-green-700":""}`}>
              <img src={item.iconPath} alt={item.name} className="w-6 h-6" />
            </span>
            <span className="transition-colors duration-100">{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}
