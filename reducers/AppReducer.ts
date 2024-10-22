import { Message } from "@/types/chat"

// 实现一种类似于Redux的全局状态管理
export type State={
    displayNavigation:boolean
    themeMode:"dark"|"light"
    currentModel: string
    messageList:Message[]
    streamingId: string
}

// 定义动作类型
export enum ActionType{
    UPDATE="UPDATE",
    ADD_MESSAGE="ADD_MESSAGE",
    UPDATE_MESSAGE="UPDATE_MESSAGE"
}

// 消息相关的动作类型
type MessageAction={
    type:ActionType.ADD_MESSAGE | ActionType.UPDATE_MESSAGE
    message:Message
}

//更新相关的动作类型
type UpdateAction = {
    type: ActionType.UPDATE
    field: string
    value: any
}

//联合类型
export type Action = UpdateAction | MessageAction

// 初始状态
export const initState:State={
    displayNavigation:true,
    themeMode:"light",
    currentModel:"gpt-3.5-turto",
    messageList:[],
    streamingId:""
}

// 状态管理的 reducer 函数
export function reducer(state:State,action:Action){
    switch(action.type){
        case ActionType.UPDATE:
            return {...state,[action.field]:action.value}
        case ActionType.ADD_MESSAGE: {
            const messageList = state.messageList.concat([action.message])
                return { ...state, messageList }
            }
        case ActionType.UPDATE_MESSAGE: {
            const messageList = state.messageList.map((message) => {
                if (message.id === action.message.id) {
                    return action.message
                }
                return message
            })
            return { ...state, messageList }
        }
        default: throw new Error() 
    }
        
}