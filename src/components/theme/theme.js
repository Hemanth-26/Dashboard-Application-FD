import { createTheme } from "@mui/material";
// import infoIcon from 'assets/images/icon/info.png';

const appTheme = {
  primary: "#E85A4F",
  secondary: "#E98074",
  lightBrown: "#D8C3A5",
  white: "#ffffff",
  textColor: "#606E87",
  black: "#1A1A1A",
  fontBlack: "#535353",
  dark: "#1C2125",
  inputColor: "#9C9C9C",
  popUpBg: "#272E36",
  error: "#e74747",
  success: "#E85A4F",
};

const theme = createTheme({
  palette: {
    primary: {
      main: appTheme.primary,
    },
    secondary: {
      main: appTheme.secondary,
    },
  },
  typography: {
    fontFamily: [
      "montserrat-regular",
      "sf-pro-text",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    // MuiList: {
    //   styleOverrides: {
    //     root: {
    //       // minWidth: "30rem",
    //       margin: "0 0.2rem",
    //       borderRadius: "0.5rem",
    //       // backgroundColor: '#efeeee',
    //     },
    //   },
    // },
    // MuiListItem: {
    //   styleOverrides: {
    //     root: {
    //       marginTop: "1rem",
    //       marginNottom: "1rem",
    //       backgroundColor: "#efeeee",
    //     },
    //   },
    // },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: appTheme.white,
          borderRadius: "1.2rem",
          boxShadow: "0px 3px 10px #00000029",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          maxWidth: "none",
          minWidth: "7rem",
          fontSize: "1.2rem",
          fontWeight: "300",
          "&.fixed-label-width": {
            minWidth: "11rem",
            "&.default-cursor": {
              cursor: "default",
            },
          },
          "&.align-top .MuiTab-wrapper": {
            justifyContent: "flex-start",
          },
          "@media(max-width: 767px)": {
            minWidth: "72px !important",
          },
        },
        wrapper: {
          height: "100%",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "&.btn-tabs .MuiButtonBase-root": {
            backgroundColor: appTheme.black,
            color: appTheme.fontBlack,
            transition: "all 0.5s linear",
            "&.Mui-selected": {
              backgroundColor: appTheme.primary,
              color: appTheme.white,
              borderRadius: "0.5rem",
              transition: "all 0.5s linear",
            },
            "&:first-child": {
              borderTopLeftRadius: "0.5rem",
              borderBottomLeftRadius: "0.5rem",
            },
            "&:last-child": {
              borderTopRightRadius: "0.5rem",
              borderBottomRightRadius: "0.5rem",
            },
          },
          "&.indicator-none .MuiTabs-indicator": {
            display: "none !important",
          },
          "&.btn-monitors .MuiButtonBase-root": {
            padding: "0",
            flexGrow: 1,
            "&.Mui-selected .monitors": {
              backgroundColor: appTheme.primary,
              color: appTheme.white,
              transition: "all 0.5s linear",
            },
          },
          "&.btn-monitors .MuiTab-wrapper": {
            paddingRight: "0.5rem",
          },
        },
      },
    },
    MuiTabScrollButton: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 7px 1px rgba(0, 0, 0 , .50)",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        // root: {
        //     '&.dark .MuiMenu-paper ': {
        //         backgroundColor: appTheme.black,
        //         color: appTheme.primary,
        //         borderRadius: '0.5rem',
        //         borderTopRightRadius: '0.2rem',
        //         padding: '0.2rem 0.8rem'
        //     },

        // },
        paper: {
          "&.MuiMenu-paper ": {
            backgroundColor: appTheme.secondary,
            color: appTheme.white,
            borderRadius: "0.5rem",
            // borderTopRightRadius: '0.2rem',
            padding: "0.2rem 0.8rem",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "& svg ": {
            marginRight: "0.5rem !important",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "& svg": {
            fill: "#E85A4F",
          },
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          "& .MuiTextField-root": {
            minWidth: "100% !important",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        },
      },
    },
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          display: "none",
        },
      },
    },
    MuiYearCalendar: {
      // styleOverrides: {
      //     root: {
      //         "& ::-webkit-scrollbar": {
      //             width: '8px',
      //             backgroundColor: '#272e36',
      //             borderRadius: '10px',
      //         }
      //     }
      // }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "16px",
          "& input": {
            padding: 0,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: `${appTheme.secondary}ac !important`,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: appTheme.primary,
          backgroundColor: appTheme.white,
          fontWeight: "600",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          width: "100% !important",
        }
      }
    }
  },
});

export default theme;
