"use client";
import { groupByDate } from "@/common/util";
import { Chat } from "@/types/chat";
import { useEventBusContext } from "@/components/EventBusContext";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { PiChatBold, PiTrashBold } from "react-icons/pi";
import ChatItem from "./ChatItem";
import { AppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

export default function ChatList() {
  /**
   * @description: 聊天列表数据
   * @type {chatList[]}
   */

  const [chatList, setChatList] = useState<Chat[]>([]);
  /**
   * @description: 选中的聊天项
   * @type {chatList}
   */
  const {state:{selectedChat},dispatch}=useContext(AppContext)

  /**
   * @description: 页码
   * @type {number}
   */
  const pageRef=useRef(1)
  /**
   * @description: 聊天列表分组数据
   * @type {[string, chatList[]][]}
   */
  const groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [chatList]);
  /**
   * @description: 事件总线
   */
  const { subscribe, unsubscribe } = useEventBusContext();

  /**
   * @description: 获取聊天列表数据
   */
  const getData=async()=>{
    const res=await fetch(`/api/chat/list?page=${pageRef.current}`,{
      method:"GET"
    })
    if(!res.ok){
      console.error("获取聊天列表失败")
      return
    }
    const {data}=await res.json()
    if(pageRef.current===1){
      setChatList(data.list)
    }
    else{
      setChatList((prev)=>prev.concat(data.list))
    }
    
  }
    
  /**
   * @description: 初始化
   */
  useEffect(()=>{
    getData()
  },[])

  /**
   * @description: 监听分页事件
   */
  useEffect(() => {
    const callback: EventListener = () => {
        pageRef.current = 1
        getData()
    }
    subscribe("fetchChatList", callback)
    return () => unsubscribe("fetchChatList", callback)
}, [])

  /**
   * @description: 监听事件
   */
  useEffect(() => {
    const callback: EventListener = () => {
      console.log("fetchChatList");
    };
    subscribe("fetchChatList", callback);
    return () => unsubscribe("fetchChatList", callback);
  }, []);

  
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
                const selected = selectedChat?.id === item.id;
                return (
                  <ChatItem
                    item={item}
                    selected={selected}
                    onSelected={(chat) => {
                      dispatch({
                        type:ActionType.UPDATE,
                        field:"selectedChat",
                        value:chat
                      })
                    }}
                  ></ChatItem>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
