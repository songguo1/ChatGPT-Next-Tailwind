import { AppContext } from "@/components/AppContext";
import { useEventBusContext } from "@/components/EventBusContext";
import { ActionType } from "@/reducers/AppReducer";
import { Chat } from "@/types/chat";
import { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { PiChatBold, PiTrashBold } from "react-icons/pi";
type Props = {
  item: Chat;
  selected: boolean;
  onSelected: (chat: Chat) => void;
};

export default function ChatItem({ item, selected, onSelected }: Props) {
  const [Editing, setEditing] = useState<boolean>(false);
  const [Deleting, setDeleting] = useState<boolean>(false);
  const { publish } = useEventBusContext();
  const { dispatch } = useContext(AppContext);

  //标题
  const [title, setTitle] = useState<string>(item.title);
  useEffect(() => {
    setEditing(false);
  }, [selected]);
  //更新标题请求
  async function updateChat() {
    const response = await fetch("/api/chat/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item.id, title }),
    });
    if (!response.ok) {
      console.log(response.statusText);
      return;
    }
    const { code } = await response.json();
    if (code === 0) {
      //重新获取聊天列表
      publish("fetchChatList");
    }
  }

  //更新标题请求
  async function deleteChat() {
    const response = await fetch(`/api/chat/delete?id=${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(response.statusText);
      return;
    }
    const { code } = await response.json();
    if (code === 0) {
      //重新获取聊天列表
      publish("fetchChatList");
      //删除消息列表
      dispatch({ type: ActionType.UPDATE, field: "selectedChat", value: null });
    }
  }

  return (
    <li
      onClick={() => onSelected(item)}
      key={item.id}
      className={`relative group border-2 border-primary px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg transition-all duration-300 ease-in-out hover:from-purple-500 hover:to-blue-500 hover:border-secondary hover:scale-105 flex items-center p-3 rounded-md space-x-3 cursor-pointer ${
        selected ? "pr-[3.5em] text-white" : ""
      }`}
    >
      <div>{Deleting ? <PiTrashBold /> : <PiChatBold />}</div>
      {selected && Editing ? (
        <input
          autoFocus={true}
          className="flex-1 min-w-0 bg-transparent outline-none"
          defaultValue={item.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <div className="truncate w-full flex-1 ">{item.title}</div>
      )}

    
      {selected && (
        <div className="absolute right-1 flex ">
          {Editing || Deleting ? (
            <>
              <button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  if (Editing) {
                    updateChat();
                  }
                  if (Deleting) {
                    deleteChat();
                  }

                  setDeleting(false);
                  setEditing(false);
                  e.stopPropagation();
                }}
              >
                <MdCheck />
              </button>
              <button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  if (Deleting) {
                    console.log("deleting");
                  }
                  setDeleting(false);
                  setEditing(false);
                  e.stopPropagation();
                }}
              >
                <MdClose />
              </button>
            </>
          ) : (
            <>
              <button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  setEditing(true);
                  e.stopPropagation();
                }}
              >
                <AiOutlineEdit />
              </button>
              <button
                className="p-1 hover:text-white"
                onClick={(e) => {
                  setDeleting(true);
                  e.stopPropagation();
                }}
              >
                <MdDeleteOutline />
              </button>
            </>
          )}
        </div>
      )}
    </li>
  );
}
