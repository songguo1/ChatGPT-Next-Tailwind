"use client";

import { Action, ActionType, initState, reducer, State } from "@/reducers/AppReducer";
import {
  createContext,
  Dispatch,
  useMemo,
  useReducer,

} from "react";

type AppContextProps = {
  state: State;
  dispatch: Dispatch<Action>;
};
//导出context
export const AppContext = createContext<AppContextProps>(null!);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer,initState);
  const valueContext = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <AppContext.Provider value={valueContext}>{children}</AppContext.Provider>
  );
}
