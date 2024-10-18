"use client";
import { groupByDate } from "@/common/util";
import { chatList } from "@/type/chat";
import { useMemo, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { PiChatBold, PiTrashBold } from "react-icons/pi";
import ChatItem from "./ChatItem";

export default function ChatList() {
  const [chatList, setChatList] = useState<chatList[]>([
    {
      id: 1,
      title: "React入门实战教程",
      updateTime: Date.now(),
    },
    {
      id: 2,
      title: "如何使用Next.js创建React项目1111111111",
      updateTime: Date.now() + 1,
    },
    {
      id: 3,
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
  ]);
  const [selectedItem, setSelectedItem] = useState<chatList>();
  const groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [chatList]);
  return (
    <div className="flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto">
      {groupList.map(([data, list]) => {
        return (
          <div key={data}>
            <div className="sticky top-0 z-10 p-3 text-sm text-2xl font-semibold text-sky-100">
              {data}
            </div>
            <ul className="mt-2 flex flex-col space-y-2">
              {list.map((item) => {
                const selected = selectedItem?.id === item.id;
                return (
                  <ChatItem item={item} selected={selected} onSelected={(chat)=>{
                    setSelectedItem(chat)
                  }}></ChatItem>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
