import ChatInput from "./ChatInput";
import Example from "./Example";
import Menu from "./Menu";
import MessageList from "./MessageList";
import Welcome from "./Welcome";

export default function Main() {
  return (
    <div className="flex-1 relative">{/*这一步简直是天才！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！我的妈*/}
      <main className="overflow-y-auto w-full h-full text-gray-900 bg-gray-100  dark:text-gray-100 dark:bg-gray-900">
        <Menu></Menu>
        {/* <Welcome></Welcome> */}
        {/* <Example></Example> */}
        <MessageList />
        <ChatInput></ChatInput>
      </main>
    </div>
  );
}
