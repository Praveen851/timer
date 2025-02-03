export type MainStackParamList = {
    HomeScreen: undefined;
    HistoryScreen: undefined;
    AddTimerScreen: undefined;
};

export type TimerType = {
    id: string;
    name: string;
    duration: number;
    category: string;
    remainingTime: number;
    status: "Running" | "Paused" | "Completed";
    lastUpdated: number;
    isChecked: boolean;
};

export type SuccessModalPropTypes = {
    completedTimersQueue: TimerType[];
    onClose: () => void;
};

export type TimerContextType = {
    timers: TimerType[];
    addTimer: (
        name: string,
        duration: number,
        category: string,
        checked: boolean
    ) => void;
    startTimer: (id: string) => void;
    pauseTimer: (id: string) => void;
    resetTimer: (id: string) => void;
    startAllTimersInCategory: (category: string) => void;
    pauseAllTimersInCategory: (category: string) => void;
    resetAllTimersInCategory: (category: string) => void;
    completedTimersQueue: TimerType[];
    setCompletedTimersQueue: React.Dispatch<React.SetStateAction<TimerType[]>>;
};
