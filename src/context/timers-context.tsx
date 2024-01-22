import { ReactNode, createContext, useContext, useReducer } from 'react';

export type Timer = {
  name: string;
  duration: number;
};

type TimerState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimerState & {
  addTimer: (timerData: Timer) => void;
  startTimer: () => void;
  stopTimer: () => void;
};

// type TimerContextProps = {
//   isRunning: boolean;
//   timers: Timer[];
//   addTimer: (timerData: Timer) => void;
//   startTimer: () => void;
//   stopTimer: () => void;
// };
// const TimerContext = createContext({} as TimerContextProps);

const TimerContext = createContext<TimersContextValue | null>(null);

type TimerProviderProps = {
  children: ReactNode;
};

const initialState: TimerState = {
  isRunning: false,
  timers: [],
};

type AddTimerAction = {
  type: 'ADD_TIMER';
  payload: Timer;
};
type StopTimerAction = {
  type: 'STOP_TIMER';
};
type StartTimerAction = {
  type: 'START_TIMER';
};

type Action = StartTimerAction | StopTimerAction | AddTimerAction;

function reducer(state: TimerState, action: Action): TimerState {
  const { type } = action;
  switch (type) {
    case 'START_TIMER':
      return {
        ...state,
        isRunning: true,
      };
    case 'STOP_TIMER':
      return {
        ...state,
        isRunning: false,
      };
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };

    default:
      return state;
  }
}

export function TimerProvider({ children }: TimerProviderProps) {
  const [{ isRunning, timers }, dispatch] = useReducer(reducer, initialState);

  function addTimer(timerData: Timer) {
    dispatch({ type: 'ADD_TIMER', payload: timerData });
  }
  function startTimer() {
    dispatch({ type: 'START_TIMER' });
  }
  function stopTimer() {
    dispatch({ type: 'STOP_TIMER' });
  }

  const value: TimersContextValue = {
    addTimer,
    startTimer,
    stopTimer,
    isRunning,
    timers,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context)
    throw new Error('useTimer must be used within a ShoppingCartProvider');

  return context;
}
