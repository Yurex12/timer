import { useTimer } from '../context/timers-context';
import Button from './UI/Button';

function Timers() {
  const { isRunning, startTimer, stopTimer } = useTimer();
  return (
    <header>
      <h1>React Timer</h1>
      <Button onClick={isRunning ? stopTimer : startTimer}>
        {isRunning ? 'Stop' : 'Start'} Timers
      </Button>
    </header>
  );
}

export default Timers;
