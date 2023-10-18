import {useContext} from 'react'
import { SidebarContext } from '../context'

export const useSidebarContext = () => {
  return useContext(SidebarContext)
}