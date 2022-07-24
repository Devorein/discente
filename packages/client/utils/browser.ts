// source: https://github.com/vercel/next.js/discussions/18072
// update URL without Next.js re-rendering the page
export function silentlyUpdateURL(newUrl: string) {
  window.history.replaceState(
    { ...window.history.state, as: newUrl, url: newUrl },
    '',
    newUrl
  );
}
