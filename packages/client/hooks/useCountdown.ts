import { useEffect, useState } from 'react';

const useCountdown = (targetSeconds: number) => {
  const [countDown, setCountDown] = useState(targetSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prevCountDown) => {
        return prevCountDown - 1 < 0 ? 0 : prevCountDown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return countDown;
};

export { useCountdown };
