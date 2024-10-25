import { Message, Chat } from "@/types/chat"


// 实现一种类似于Redux的全局状态管理
export type State={
    displayNavigation:boolean
    themeMode:"dark"|"light"
    currentModel: string
    messageList:Message[]
    streamingId: string
    selectedChat?:Chat
}

// 定义动作类型
export enum ActionType{
    UPDATE="UPDATE",
    ADD_MESSAGE="ADD_MESSAGE",
    UPDATE_MESSAGE="UPDATE_MESSAGE",
    REMOVE_MESSAGE = "REMOVE_MESSAGE"
}

// 消息相关的动作类型
type MessageAction={
    //action类型
    type:ActionType.ADD_MESSAGE | ActionType.UPDATE_MESSAGE | ActionType.REMOVE_MESSAGE
    //消息内容
    message:Message
}

// 模型类型的更改
type UpdateAction = {
    //action类型
    type: ActionType.UPDATE
    //字段名
    field: string
    //字段值
    value: any
}

//联合类型
export type Action = UpdateAction | MessageAction

// 初始状态
export const initState:State={
    //导航栏是否显示
    displayNavigation:true,
    //光暗模式
    themeMode:"light",
    //模型类型
    currentModel:"gpt-3.5-turto",
    //消息类型
    messageList:[],
    streamingId:""
}

// 状态管理的 reducer 函数
// reducer 函数用于处理状态更新
export function reducer(state:State,action:Action){
    switch(action.type){
        //改变模型类型
        case ActionType.UPDATE:
            // 改变模型类型
            return {...state,[action.field]:action.value}

        //添加消息
        case ActionType.ADD_MESSAGE: {
            // 点击用户点击发送按钮或者响应数据发送，向消息列表中添加新消息
            const messageList = state.messageList.concat([action.message])
                return { ...state, messageList }
            }

        //消息流更新消息
        case ActionType.UPDATE_MESSAGE: {
            // 更新消息列表中的指定消息
            const messageList = state.messageList.map((message) => {
                if (message.id === action.message.id) {
                    return action.message
                }
                return message
            })
            return { ...state, messageList }
        }
        case ActionType.REMOVE_MESSAGE: {
            const messageList = state.messageList.filter((message) => {
                return message.id !== action.message.id
            })
            return { ...state, messageList }
        }
        default: throw new Error() 
    }
        
}