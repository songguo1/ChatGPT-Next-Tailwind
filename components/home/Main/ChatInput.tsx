"use client";
import { AppContext } from "@/components/AppContext";
import Menubutton from "@/components/common/Menubutton";
import { useEventBusContext } from "@/components/EventBusContext";
import { ActionType } from "@/reducers/AppReducer";
import { Message, MessageRequestBody } from "@/types/chat";
import { ACTION } from "next/dist/client/components/app-router-headers";
import { title } from "process";
import { useContext, useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { PiLightningFill, PiStopBold } from "react-icons/pi";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4, v4 } from "uuid";

export default function ChatInput() {
  //输入框内容
  const [messageText, setMessageText] = useState("");
  //消息终止状态
  const stopRef = useRef(false);

  //当前聊天id
  const chatIdRef = useRef("");

  //获取当前聊天id
  const {
    state: { messageList, currentModel, streamingId, selectedChat },
    dispatch,
  } = useContext(AppContext);

  //发布事件
  const { publish } = useEventBusContext();

  //切换聊天页时更换id
  useEffect(() => {
    if (chatIdRef.current === selectedChat?.id) {
      return;
    }
    chatIdRef.current = selectedChat?.id ?? "";
    //如果切换消息页时，正在生成消息，则停止生成
    stopRef.current = true;
  }, [selectedChat]);

  //创建或更新消息页
  async function createOrUpdateMessage(message: Message) {
    const response = await fetch("/api/message/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message,title:messageText}),
    });
    if (!response.ok) {
      console.log(response.statusText);
      return;
    }
    const { data } = await response.json();
    if (!chatIdRef.current) {
      chatIdRef.current = data.message.chatId;
      publish("fetchChatList");
      dispatch({
        type: ActionType.UPDATE,
        field: "selectedChat",
        value:{id:chatIdRef.current,} 
      });
    }
    return data.message;
  }

  async function deleteMessage(id: string) {
    const response = await fetch(`/api/message/delete$id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(response.statusText);
      return;
    }
    const { data } = await response.json();
    return data.message;
  }

  //点击发送消息事件
  async function send() {
    const message = await createOrUpdateMessage({
      id: "",
      role: "user",
      content: messageText,
      chatId: chatIdRef.current,
    });

    dispatch({ type: ActionType.ADD_MESSAGE, message });

    const messages = messageList.concat([message]);
    doSend(messages);
  }

  //重新发送事件
  async function resend() {
    const messages = [...messageList];
    if (
      messages.length !== 0 &&
      messages[messages.length - 1].role === "assistant"
    ) {
      const result = await deleteMessage(messages[messages.length - 1].id);
      if (!result) {
        console.log("delete message error");
        return;
      }

      //消息列表删除上一条消息
      dispatch({
        type: ActionType.REMOVE_MESSAGE,
        message: messages[messages.length - 1],
      });
      messages.splice(messages.length - 1, 1);
    }
    doSend(messages);
  }

  //发送请求
  async function doSend(messages: Message[]) {
    //如果切换聊天页，消息状态置为停止，需要再置为开始
    stopRef.current = false;

    const body: MessageRequestBody = {
      messages,
      model: currentModel,
    };
    //发送框清空
    setMessageText("");
    //消息流控制器
    const controller = new AbortController();

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
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
    const responseMessage: Message = await createOrUpdateMessage({
      id: "",
      role: "assistant",
      content: "",
      chatId: chatIdRef.current,
    });

    dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage });
    dispatch({
      type: ActionType.UPDATE,
      field: "streamingId",
      value: responseMessage.id,
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let content = "";
    while (!done) {
      if (stopRef.current) {
        controller.abort();
        break;
      }
      const result = await reader.read();
      done = result.done;
      const chunk = decoder.decode(result.value);
      content += chunk;

      //更新消息内容
      dispatch({
        type: ActionType.UPDATE_MESSAGE,
        message: { ...responseMessage, content },
      });
    }
    createOrUpdateMessage({ ...responseMessage, content });
    dispatch({
      type: ActionType.UPDATE,
      field: "streamingId",
      value: "",
    });
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
              onClick={() => {
                stopRef.current = true;
              }}
            >
              停止生成
            </Menubutton>
          ) : (
            <Menubutton
              icon={MdRefresh}
              variant="primary"
              className="font-medium"
              onClick={() => {
                resend();
              }}
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
          .&nbsp;基于
          <a
            className="font-medium py-[1px] border-b border-dotted border-black/60 hover:border-black/0 dark:border-gray-200 dark:hover:border-gray-200/0 animated-underline"
            href="https://github.com/songguo1/ChatGPT-Next-Tailwind"
            target="_blank"
          >DeepSeek</a>
          提供的接口
        </footer>
      </div>
    </div>
  );
}
