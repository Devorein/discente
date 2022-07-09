import { createTheme, PaletteMode, Theme as MaterialUITheme } from '@mui/material';

declare module '@emotion/react' {
  export interface Theme extends MaterialUITheme { }
}

export function createMuiTheme(themeMode: PaletteMode) {
  return createTheme({
    palette: {
      mode: themeMode
    }
  });
}
