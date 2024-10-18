"use client"
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import example from "@/public/data/example.json";
import Menubutton from "@/components/common/Menubutton";
import { useMemo, useState } from "react";

export default function Example() {
  const [showFull, setShowFull] = useState<boolean>(false);
  const list = useMemo(() => {
    if (showFull) {
      return example;
    } else {
      return example.slice(0, 15);
    }
  }, [showFull]);
  return (
    <div className="relative px-20">
      <div className="absolute t-20 b-4 text-4xl ">
        <MdOutlineTipsAndUpdates />
      </div>
      <ul className="flex justify-center flex-wrap gap-3.5">
        {list.map((item) => {
          return (
            <li key={item.act}>
              <Menubutton>{item.act}</Menubutton>
            </li>
          );
        })}
      </ul>
      {!showFull && (
                <>
                    <p className='p-2'>...</p>
                    <div className='flex items-center w-full space-x-2'>
                        <hr className='flex-1 border-t border-dotted border-gray-800 dark:border-gray-600' />
                        <Menubutton
                            variant='text'
                            onClick={() => {
                                setShowFull(true)
                            }}
                        >
                            显示全部
                        </Menubutton>
                        <hr className='flex-1 border-t border-dotted border-gray-800 dark:border-gray-600' />
                    </div>
                </>
            )}
    </div>
  );
}
