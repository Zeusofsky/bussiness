import React from "react";
import { useState } from "react";
import { 
    SidebarContext,  
    TemplateDirectionContext, 
    ColorModeContext
} from "./context";

interface ContextProviderProps{
    children: React.ReactNode
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
    const toggleColorMode = () => {
      setColorMode(() => (colorMode === 'light' ? 'dark' : 'light'));
    }

    const [rtl, setRtl] = useState<boolean>(true);
// 'اطلاعات ورودی اولیه در داشبورد یکپارچه ی پروژه های شرکت آسفالت طوس'
    const [menuTitle, setMenuTitle] = useState<string>('پروژه های شرکت آسفالت طوس');

    const [sideBarWidth, setSideBarWidth] = useState<number>(0)
    const [sideBarTitleHeight, setSideBarTitleHeight] = useState<number>(0)

    return (
        <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
            <TemplateDirectionContext.Provider value={{ rtl, setRtl }}>
                <SidebarContext.Provider value={{ menuTitle, setMenuTitle, sideBarWidth, 
                    setSideBarWidth, sideBarTitleHeight, setSideBarTitleHeight }}>
                    {children}
                </SidebarContext.Provider>
            </TemplateDirectionContext.Provider>
        </ColorModeContext.Provider>
    );
  };