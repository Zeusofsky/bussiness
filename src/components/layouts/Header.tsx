import { FC, ReactElement } from "react";
// import { Container, Grid,  useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "./Navbar";


export const Header: FC = (): ReactElement => {
  //  const theme = useTheme();
  // var mnuHeaderHeight = document.getElementById("sidebarMnuHeader")?.clientHeight
  return (
    <Box
      sx={{
        width: "100%",
        height: 70,
        // backgroundColor: 'rgba(11, 105, 255, 0.5)',
        // backgroundColor: "whitesmoke",
        // theme.palette.background.paper,
        boxShadow:3,
        fontFamily:'B Nazanin',
      }}
    >
      <Navbar />
    </Box>
    );
  };
  
  export default Header;