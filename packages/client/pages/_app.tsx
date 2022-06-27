import { Document } from 'components';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { createQueryClient } from 'utils';
import '../styles/style.css';

const queryClient = createQueryClient();

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Document queryClient={queryClient}>
        <Component {...pageProps} />
      </Document>
    )
  );
}

export default App;
