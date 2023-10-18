import React 
// , { useEffect } 
from "react";
import { CssBaseline, PaletteMode } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ToastContainer } from 'react-toastify';
import { theme as globalTheme } from "../styles/GlobalStyle";
import AppRoutes from "../routes/routes";
import { useColorModeContext } from "../hooks";
import { ColorModeContextType } from "../context";
import 'react-toastify/dist/ReactToastify.css';


const getDesignTokens = (colorMode: PaletteMode) => ({
  palette: {
    mode: colorMode ? "dark" : "light",
    ...(colorMode === 'light'
      ? {
          // palette values for light mode paper:'#eaeaef' default:'#e1e1e6' #c7d9ef main:#d5d5d8
          primary: {
            main: '#a9c0d5',
          },
          divider: grey[600],
          background: {
            default: '#e4ecf6', 
            paper: '#ebebf4',
          },
          text: {
            primary: grey[900],
            secondary: grey[700],
            disabled: grey[700],
          },
        }
      : {
          // palette values for dark mode  paper'#010d1b' main=default=040821
          primary: {
            main: '#040821',
          },
          divider: grey[700],
          background: {
            default: '#080e34',
            paper: '#0d1e31',
          },
          text: {
            primary: '#f5f5f5',
            secondary: grey[500],
            disabled: grey[300],
          },
        }),
  },
});

export const App = () => {
  // useEffect(() => {
  //   window.onbeforeunload = function (e) {
  //     window.onunload = function () {
  //       console.log('onbeforeunload && onunload ... ')
  //       // window.localStorage.isMySessionActive = "false";
  //     }
  //     return undefined;
  //   };

  //   window.onload = function () {
  //     console.log('onload ... ')

  //     // window.localStorage.isMySessionActive = "true";
  //   };
  // }, []);
  // useEffect(() => {
  //   console.log("useEffect ================================================");

  //   const token = localStorage.getItem('token');
  //   console.log("token get", token);

  //   const handleTabClose = (event: BeforeUnloadEvent) => {
  //     console.log('BeforeUnloadEvent...');
  //     window.onunload = function () {
  //       console.log('UnloadEvent...');
  //       localStorage.removeItem('token');
  //       return undefined;
  //     };
  //     // event.preventDefault();
  
  //     // console.log('before unload event triggered');
  //     // localStorage.removeItem('persist:root');

  //     // return (event.returnValue =
  //     //   'Are you sure you want to exit?');
  //   };
  //   window.onload = function () {
  //     console.log('loadEvent... && localStorage.getItem("token")= ', localStorage.getItem("token"))

  //     if(!localStorage.getItem("token"))  {
  //       console.log("token set", token)
  //       localStorage.setItem("token", token!);
  //     }

  //     // window.localStorage.isMySessionActive = "true";
  //   };

  //   window.addEventListener('beforeunload', handleTabClose);
  
  //   return () => {
  //     console.log('APP session token: ', localStorage.getItem('token'))

  //     window.removeEventListener('beforeunload', handleTabClose);
  //   };
  // }, []);

  const { colorMode } = useColorModeContext() as ColorModeContextType;
  const theme = React.useMemo(() =>createTheme(globalTheme, getDesignTokens(colorMode)), [colorMode]);
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes/>
        </EmotionThemeProvider>
      </MuiThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
      <ToastContainer />
    </React.Fragment>
  );
}

