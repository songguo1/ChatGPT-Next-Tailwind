"use client"; // 确保当前组件为客户端组件

import { useEffect, useRef } from "react";
import "./button.scss";

export default function Button({onClick}:{
  onClick: () => void;
}) {
  const btnRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    if (btnRef.current) {
      btnRef.current.classList.toggle("active");
    }
    onClick(); // 调用传入的 onClick 函数
  };

  return (
    <div
      ref={btnRef}
      onClick={handleClick}
      className="button"
    ></div>
  );
}
