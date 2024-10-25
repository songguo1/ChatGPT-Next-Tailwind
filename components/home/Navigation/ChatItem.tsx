import { Chat } from "@/types/chat";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    setEditing(false);
  }, [selected]);
  return (
    <li
      onClick={() => onSelected(item)}
      key={item.id}
      className={`relative group border-2 border-sky-800 border-indigo-500 flex items-center p-3 rounded-md space-x-3 cursor-pointer hover: hover:bg-gray-500 ${
        selected ? "pr-[3.5em] bg-sky-400 text-white hover:bg-sky-400" : ""
      }`}
    >
      <div>{Deleting ? <PiTrashBold /> : <PiChatBold />}</div>
      {selected && Editing ? (
        <input
          autoFocus={true}
          className="flex-1 min-w-0 bg-transparent outline-none"
          defaultValue={item.title}
        />
      ) : (
        <div className="truncate w-full flex-1 ">{item.title}</div>
      )}

      <div
        className={`absolute rounded-md group-hover:from-gray-800 right-0 h-full w-10 bg-gradient-to-l from-gray-900
              ${selected ? "from-sky-800 group-hover:from-sky-800" : ""}`}
      />
      {selected && (
        <div className="absolute right-1 flex ">
          {Editing || Deleting? (
            <>
              <button
                className="p-1 hover:text-white"
                onClick={(e) => {
                    setDeleting(false)
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
                  setDeleting(false)
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
