import { FC, ReactElement, ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
import {
  Content,
  Footer,
  Header,
  Main,
  SideBar, 
} from "../components";
import { useTemplateDirectionContext } from "../hooks";


interface LayoutProps {
  children: ReactNode;
}
export const MainLayout: FC<LayoutProps> = ({ children }): ReactElement => {
  const { rtl } = useTemplateDirectionContext()
  const flexDirection: string = rtl ? "row-reverse" : "row"

  return (
    <Box
      sx={{
          display: "flex",
          flexDirection: {flexDirection},
          maxHeight: "100vh",
          maxWidth: "100vw",
          flexGrow: 1,
          fontFamily:'B Nazanin',
      }}

    >
      <CssBaseline />
      <SideBar />
      <Main >
        <Header />
          <Content>
            {children}
          </Content>
        <Footer />
      </Main>
    </Box>
  );
};
