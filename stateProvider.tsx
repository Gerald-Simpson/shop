'use client';

import { createContext, useState, useContext } from 'react';

export const GlobalContext = createContext({});

function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  let [showBasket, basketChange] = useState(false);
  return (
    <GlobalContext.Provider value={{ showBasket, basketChange }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  useContext(GlobalContext);
}
export default GlobalContextProvider;
