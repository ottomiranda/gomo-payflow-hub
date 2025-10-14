import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  unreadMessages: number;
  setUnreadMessages: (count: number) => void;
  overdueBills: boolean;
  setOverdueBills: (overdue: boolean) => void;
  currentLine: string;
  setCurrentLine: (line: string) => void;
  availableLines: string[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [overdueBills, setOverdueBills] = useState(true);
  const [currentLine, setCurrentLine] = useState("+41 79 123 4567");
  const availableLines = ["+41 79 123 4567", "+41 78 987 6543"];

  return (
    <NavigationContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        unreadMessages,
        setUnreadMessages,
        overdueBills,
        setOverdueBills,
        currentLine,
        setCurrentLine,
        availableLines,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
