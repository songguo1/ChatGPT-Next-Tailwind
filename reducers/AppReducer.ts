//实现一种类似于Redux的全局状态管理
export type State={
    displayNavigation:boolean
    themeMode:"dark"|"light"
}

export enum ActionType{
    UPDATE="UPDATE"
}

export type Action={
    type:ActionType.UPDATE,
    field: string,
    value:any
}

export const initState:State={
    displayNavigation:true,
    themeMode:"light"
}

export function reducer(state:State,action:Action){
    switch(action.type){
        case ActionType.UPDATE:
            return {...state,[action.field]:action.value}
        default: throw new Error() 
    }
        
}