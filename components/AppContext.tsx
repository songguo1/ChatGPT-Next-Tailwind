"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";

type State = {
  displayNavigation: boolean;
};

type AppContextProps = {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
};

const defaultState: State = { displayNavigation: true };

//导出context
export const AppContext = createContext<AppContextProps>({
  state: defaultState,
  setState: () => {},
});

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState({
    displayNavigation: true,
  });
  const valueContext = useMemo(() => {
    return { state, setState };
  }, [state, setState]);
  return (
    <AppContext.Provider value={valueContext}>{children}</AppContext.Provider>
  );
}
