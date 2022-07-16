import {
  createTheme,
  PaletteMode,
  Theme as MaterialUITheme
} from '@mui/material';
import { blue } from '@mui/material/colors';

declare module '@emotion/react' {
  export interface Theme extends MaterialUITheme { }
}

const spacing = (factor: number) => {
  return `${0.25 * factor}rem`;
};

export function createMuiTheme(themeMode: PaletteMode) {
  const secondaryTextColor = themeMode === 'dark' ? '#ddd' : '#888';
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
        styleOverrides: {
          h4: {
            fontSize: '1.75rem',
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
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: secondaryTextColor
          }
        }
      }
    }
  });
}
