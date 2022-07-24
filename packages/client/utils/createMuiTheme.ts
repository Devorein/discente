import {
  createTheme,
  darken,
  PaletteMode,
  Theme as MaterialUITheme
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';

declare module '@emotion/react' {
  export interface Theme extends MaterialUITheme {}
}

const spacing = (factor: number) => {
  return `${0.25 * factor}rem`;
};

export function createMuiTheme(themeMode: PaletteMode) {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: blue[600]
      }
    },
    typography: {
      fontFamily: "'Albert Sans', sans-serif"
    },
    transitions: {
      duration: {
        short: 250
      }
    },
    components: {
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontSize: '0.75rem',
            width: 30,
            height: 30
          }
        }
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            subtitle1: 'span',
            subtitle2: 'span'
          }
        },
        styleOverrides: {
          h3: {
            fontSize: '2rem',
            fontWeight: 600
          },
          h4: {
            fontSize: '1.75rem',
            fontWeight: 600
          },
          h5: {
            fontSize: '1.5rem',
            fontWeight: 600
          },
          h6: {
            fontSize: '1.25rem',
            fontWeight: 600
          },
          body2: {
            fontWeight: 500,
            opacity: 0.9
          },
          subtitle1: {
            fontSize: '.9rem',
            fontWeight: 500
          },
          subtitle2: {
            opacity: 0.75,
            fontSize: '.8rem'
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontWeight: 600
          }
        }
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            '&.Mui-error': {
              fontWeight: 500
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600
          }
        },
        defaultProps: {
          disableFocusRipple: true,
          disableRipple: true,
          disableTouchRipple: true
        }
      },
      MuiMenuItem: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true
        }
      },
      MuiMenu: {
        defaultProps: {
          elevation: 1
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            paddingTop: spacing(2),
            paddingBottom: spacing(2)
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: 'none'
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-root': {
              backgroundColor:
                themeMode === 'dark' ? darken(grey[900], 0.1) : grey[300],
              fontWeight: 600
            }
          }
        }
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            '& .MuiTableRow-root:nth-child(even)': {
              backgroundColor: themeMode === 'dark' ? grey[900] : grey[100]
            }
          }
        }
      }
    }
  });
}
