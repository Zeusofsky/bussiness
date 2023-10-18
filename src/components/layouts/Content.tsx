import { FC, ReactElement, ReactNode } from "react";
import { 
  Box, 
  // Card, 
  Paper, 
  useTheme
} from "@mui/material";
import { Title } from "./Title";

interface ContentProps {
    children: ReactNode;
}

export const Content: FC<ContentProps> = ({ children }): ReactElement => {
  const theme = useTheme();
  var mnuHeaderHeight = 70
  // document.getElementById("sidebarMnuHeader")?.clientHeight
  var footerHeight = 20
  // document.getElementById("footer")?.clientHeight
  const height: string = 
    'calc(100% - ' 
    + (mnuHeaderHeight? mnuHeaderHeight : 0 + (footerHeight? footerHeight : 0)).toString() 
    + ')'
  return (
    <Box
      sx={{
          minHeight: height,
          maxWidth: "100vw",
          mb:2,
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
          // 'whitesmoke',
          fontFamily:'B Nazanin',
      }}
    >
      <Title/>
      <Paper
        sx={{
          display:'flex',
          justifyContent:'center',
          mt:2,
          mx:'auto', 
          p:2,
          // height:'100%', 
          width:{xs:'98%', sm:'96%', md:'94%', lg:'92%', xl:'90%'}, 
          boxShadow:2,
          backgroundColor:'inherit'
        }}
      >
        {children}
      </Paper>
    </Box>
  )
}

