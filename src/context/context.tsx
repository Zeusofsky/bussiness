import { createContext } from "react";
import { ColorModeContextType } from ".";

export const SidebarContext = createContext({
    menuTitle: '', setMenuTitle: (mnuTitle: string) => {}, 
    sideBarWidth: 0, setSideBarWidth: (sideBarWidth: number) => {}, 
    sideBarTitleHeight: 0, setSideBarTitleHeight: (sideBarTitleHeight: number) => {}});

export const TemplateDirectionContext = createContext({rtl: true, setRtl: (rtl: boolean) => {}});

export const ColorModeContext = createContext<ColorModeContextType | null>(null);
