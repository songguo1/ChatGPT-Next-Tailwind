"use client"; // 确保当前组件为客户端组件

import { useEffect } from "react";
import "./button.scss";

export default function Button() {
    useEffect(() => {
        const btn = document.getElementById("btn");
        const handleClick = () => {
          btn?.setAttribute('class', btn.getAttribute("class") === "button active" ? "button" : "button active");
        };
      
        btn?.addEventListener("click", handleClick);
      
        // 清理函数，避免内存泄漏
        return () => {
          btn?.removeEventListener("click", handleClick);
        };
      }, []);  // 添加依赖数组
      

  return <div id="btn" className="button"></div>;
}
