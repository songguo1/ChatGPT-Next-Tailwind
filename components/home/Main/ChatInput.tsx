"use client";
import { AppContext } from "@/components/AppContext";
import Menubutton from "@/components/common/Menubutton";
import { ActionType } from "@/reducers/AppReducer";
import { Message, MessageRequestBody } from "@/types/chat";
import { ACTION } from "next/dist/client/components/app-router-headers";
import { useContext, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { PiLightningFill,PiStopBold } from "react-icons/pi";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4, v4 } from "uuid";

export default function ChatInput() {
  const [messageText, setMessageText] = useState("");
  //消息终止状态
  const stopRef=useRef(false)

  const {
    state: { messageList, currentModel, streamingId },
    dispatch,
  } = useContext(AppContext);

  async function send() {
    const message: Message = {
        id: uuidv4(),
        role: "user",
        content: messageText
    }
    dispatch({ type: ActionType.ADD_MESSAGE, message })
    const messages = messageList.concat([message])
    doSend(messages)
}

async function resend() {
    const messages = [...messageList]
    if (
        messages.length !== 0 &&
        messages[messages.length - 1].role === "assistant"
    ) {
        dispatch({
            type: ActionType.REMOVE_MESSAGE,
            message: messages[messages.length - 1]
        })
        messages.splice(messages.length - 1, 1)
    }
    doSend(messages)
}

  async function doSend(messages:Message[]) {
    const body: MessageRequestBody = {
      messages,
      model: currentModel,
    };
    //发送框清空
    setMessageText("");
    //消息流控制器
    const controller=new AbortController()

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal:controller.signal,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.log(response.statusText);
      return;
    }
    if (!response.body) {
      console.log("body error");
      return;
    }
    const responseMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: "",
    };

    dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let content = "";
    while (!done) {
      if(stopRef.current){

        controller.abort()
        stopRef.current=false
        break
      }
      const result = await reader.read();
      done = result.done;
      const chunk = decoder.decode(result.value);
      content += chunk;
      dispatch({
        type: ActionType.UPDATE_MESSAGE,
        message: { ...responseMessage, content },
      });
    }
    setMessageText("");
  }
  return (
    // 这里的输入框的样式的定位直接相对
    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4">
        {messageList.length !== 0 &&
          (streamingId !== "" ? (
            <Menubutton
              icon={PiStopBold}
              variant="primary"
              className="font-medium"
              onClick={()=>{
                stopRef.current=true
              }}
            >
              停止生成
            </Menubutton>
          ) : (
            <Menubutton
              icon={MdRefresh}
              variant="primary"
              className="font-medium"
            >
              重新生成
            </Menubutton>
          ))}

        <div className="flex items-end w-full border border-back/10 dark:border-gray-800/50 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-4">
          <div className="mx-3 mb-2.5">
            <PiLightningFill></PiLightningFill>
          </div>
          <TextareaAutosize
            className="outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white resize-none border-0"
            placeholder="输入一条消息..."
            rows={1}
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
          />
          <Menubutton
            className="mx-3 rounded-lg"
            icon={FiSend}
            disabled={messageText.trim() === "" || streamingId !== ""}
            variant="primary"
            onClick={send}
          />
        </div>
        <footer className="text-center text-sm text-gray-700 dark:text-gray-300 px-4 pb-6">
          ©{new Date().getFullYear()}&nbsp;{" "}
          <a
            className="font-medium py-[1px] border-b border-dotted border-black/60 hover:border-black/0 dark:border-gray-200 dark:hover:border-gray-200/0 animated-underline"
            href="https://github.com/songguo1/ChatGPT-Next-Tailwind"
            target="_blank"
          >
            松果猿
          </a>
          .&nbsp;基于第三方提供的接口
        </footer>
      </div>
    </div>
  );
}
