import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#5f5f60 #2b2b2b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "rgb(91, 91, 90, .5)",
              width: '0.55em'
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "#6b6b6b",
              minHeight: 24,
              border: "3px solid #2b2b2b",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
          },
          MuiTooltip: {
            tooltip: {
              fontsize: "1em",
            },
          },
          typography: {
            allVariants: {
              fontFamily: 'B Nazanin',
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: grey[600],
          },
          colorSecondary: {
            '&$checked': {
              color: grey[800],
            },
          },
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            allVariants: {
              fontFamily: 'B Nazanin',
            },
          }
        }

    }
    },
    breakpoints: {
      values: {
        xs: 425,
        sm: 768,
        md: 1024,
        lg: 1200,
        xl: 1440,
      },
    },
  });

