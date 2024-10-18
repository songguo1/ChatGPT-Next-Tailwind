import ChatInput from "./ChatInput";
import Example from "./Example";
import Menu from "./Menu";
import MessageList from "./MessageList";
import Welcome from "./Welcome";

export default function Main(){
    return(
    <main className="overflow-y-auto flex-1 text-gray-900 bg-gray-100 dark:flex-1 dark:text-gray-100 dark:bg-gray-900">
        <Menu></Menu>
        {/* <Welcome></Welcome> */}
        {/* <Example></Example> */}
        <MessageList/>
        <ChatInput></ChatInput>
        </main>
    )
}