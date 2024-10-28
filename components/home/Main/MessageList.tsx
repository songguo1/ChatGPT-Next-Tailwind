"use client"
import { AppContext } from "@/components/AppContext"
import Markdown from "@/components/common/Markdown"
import { ActionType } from "@/reducers/AppReducer"
import { Message } from "@/types/chat"
import { useContext, useEffect } from "react"
import { SiOpenai } from "react-icons/si"

export default function MessageList() {
    const {
        state: { messageList, streamingId,selectedChat },dispatch
    } = useContext(AppContext)

    /**
     * 点击侧边栏某个聊天选项时，获取聊天消息列表
     * @param chatId 
     * @returns 
     */
    async function getData(chatId: string) {
        const response = await fetch(`/api/message/list?chatId=${chatId}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log(response.statusText)
            return
        }
        const { data } = await response.json()
        dispatch({
            type: ActionType.UPDATE,
            field: "messageList",
            value: data.list
        })
    }

    useEffect(() => {
        if (selectedChat) {
            getData(selectedChat.id)
        } else {
            dispatch({
                type: ActionType.UPDATE,
                field: "messageList",
                value: []
            })
        }
    }, [selectedChat])

    return (
        <div className='w-full pt-10 pb-48 dark:text-gray-300'>
            <ul>
                {messageList.map((message) => {
                    const isUser = message.role === "user"
                    return (
                        <li
                            key={message.id}
                            className={`${
                                isUser
                                    ? "bg-white dark:bg-gray-800"
                                    : "bg-gray-50 dark:bg-gray-700"
                            }`}
                        >
                            <div className='w-full max-w-4xl mx-auto flex space-x-6 px-4 py-6 text-lg'>
                                <div className='text-3xl leading-[1]'>
                                    {isUser ? <img className="w-7" src="images/user.svg" ></img> : <img className="w-10" src="images/assistant.png"></img>}
                                </div>
                                <div className='flex-1'>
                                    <Markdown>{`${message.content}${message.id===streamingId ? "▍" : ""}`}</Markdown>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}