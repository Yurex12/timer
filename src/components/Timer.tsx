import Container from './UI/Container.tsx';
import { Timer as TimerProps, useTimer } from '../context/timers-context.tsx';
import { useEffect, useState } from 'react';

export default function Timer({ name, duration }: TimerProps) {
  const { isRunning } = useTimer();
  const [count, setCount] = useState(duration * 1000);

  useEffect(() => {
    if (count === 0) return;
    let timer: number;

    if (isRunning) {
      timer = setInterval(() => {
        setCount((curCount) => curCount - 50);
      }, 50);
    }
    return () => clearInterval(timer);
  }, [count, isRunning]);

  const remainingCount = (count / 1000).toFixed(2);
  return (
    <Container as='article'>
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={count} />
      </p>
      <p>{count ? remainingCount : 'Completed'}</p>
    </Container>
  );
}
