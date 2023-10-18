import { 
    SidebarContext, 
    TemplateDirectionContext,
    ColorModeContext,
 } from './context';
import { ContextProvider } from './contextProvider';

export interface ColorModeContextType {
    colorMode: 'light' | 'dark';
    toggleColorMode: () => void;
}
export { 
    SidebarContext, 
    TemplateDirectionContext, 
    ColorModeContext, 
    ContextProvider 
}