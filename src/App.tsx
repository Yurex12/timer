import AddTimer from './components/AddTimer.tsx';
import Header from './components/Header.tsx';
import Timers from './components/Timers.tsx';
import { TimerProvider } from './context/timers-context.tsx';

function App() {
  return (
    <TimerProvider>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
    </TimerProvider>
  );
}

export default App;
