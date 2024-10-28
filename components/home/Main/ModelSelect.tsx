"use client";
import { AppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";
import { useContext } from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Sparkles, Zap, Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function ModelSelect() {
  const [isOpen, setIsOpen] = useState(false);
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
  {
    return (
      <>
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-64 h-12 justify-between text-lg px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center">
                <img 
                  src={models.find(m => m.id === currentModel)?.iconPath || models[0].iconPath} 
                  className="mr-2 h-5 w-5" 
                />
                <span>{models.find(m => m.id === currentModel)?.name || models[0].name}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-purple-200 dark:border-purple-700">
            {models.map((item) => {
              const selected = item.id === currentModel;
              return (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => {
                    dispatch({
                      type: ActionType.UPDATE,
                      field: "currentModel",
                      value: item.id,
                    });
                  }}
                  className="flex items-center p-3 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer transition-all duration-200 text-base group"
                >
                  <img
                    src={item.iconPath}
                    alt={item.name}
                    className="mr-2 h-5 w-5 text-purple-500 group-hover:text-purple-600 transition-colors"
                  />
                  <span className="text-gray-700 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                    {item.name}
                  </span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
}
