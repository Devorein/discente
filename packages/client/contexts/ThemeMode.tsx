import { PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useLocalStorage } from 'hooks';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo
} from 'react';
import { createMuiTheme } from 'utils';

export interface IThemeModeContext {
  themeMode: PaletteMode;
  setThemeMode: Dispatch<SetStateAction<PaletteMode>>;
}

const ThemeModeContext = createContext<IThemeModeContext>({
  themeMode: 'light',
  setThemeMode: () => null
});

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useLocalStorage<PaletteMode>(
    'theme.mode',
    'light'
  );

  const context = useMemo(
    () => ({
      themeMode,
      setThemeMode
    }),
    [themeMode]
  );

  const theme = useMemo(() => createMuiTheme(themeMode), [themeMode]);

  return (
    <ThemeModeContext.Provider value={context}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}
