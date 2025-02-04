import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { TimerType, TimerContextType } from "../types";
import * as Notifications from "expo-notifications";

const TimerContext = createContext<TimerContextType | undefined>(undefined);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
    const [timers, setTimers] = useState<TimerType[]>([]);
    const timerIntervals = useRef<Map<string, NodeJS.Timeout>>(new Map());
    const [completedTimersQueue, setCompletedTimersQueue] = useState<
        TimerType[]
    >([]);

    useEffect(() => {
        Notifications.requestPermissionsAsync().then(({ status }) => {
            if (status !== "granted") {
                Alert.alert(
                    "Permission Required",
                    "Enable notifications to get alerts."
                );
            }
        });

        const loadTimers = async () => {
            const storedTimers = await AsyncStorage.getItem("timers");
            if (storedTimers) {
                let parsedTimers: TimerType[] = JSON.parse(storedTimers);
                setTimers(parsedTimers);
            }
        };
        loadTimers();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("timers", JSON.stringify(timers));
    }, [timers]);

    const scheduleHalfwayNotification = async (timer: TimerType) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Halfway There! ⏳",
                body: `Your timer "${timer.name}" is halfway done!`,
                sound: "default",
            },
            trigger: null,
        });
    };

    const addTimer = (
        name: string,
        duration: number,
        category: string,
        checked: boolean
    ) => {
        const newTimer: TimerType = {
            id: uuid.v4() as string,
            name,
            duration,
            category,
            remainingTime: duration,
            status: "Paused",
            lastUpdated: Date.now(),
            isChecked: checked,
        };
        setTimers((prev) => [...prev, newTimer]);
        Alert.alert("Success", "Timer added successfully!");
    };

    const startTimer = (id: string) => {
        if (timerIntervals.current.has(id)) return;

        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === id && timer.status !== "Completed"
                    ? { ...timer, status: "Running", lastUpdated: Date.now() }
                    : timer
            )
        );

        const interval = setInterval(() => {
            setTimers((prevTimers) =>
                prevTimers.map((timer) => {
                    if (timer.id === id && timer.status === "Running") {
                        if (timer.remainingTime > 1) {
                            const halfwayTime = Math.ceil(timer.duration / 2);
                            if (
                                timer.isChecked &&
                                timer.remainingTime === halfwayTime
                            ) {
                                scheduleHalfwayNotification(timer);
                            }
                            return {
                                ...timer,
                                remainingTime: timer.remainingTime - 1,
                                lastUpdated: Date.now(),
                            };
                        } else {
                            clearInterval(interval);
                            timerIntervals.current.delete(id);
                            setCompletedTimersQueue((prevQueue) => [
                                ...prevQueue,
                                {
                                    ...timer,
                                    remainingTime: 0,
                                    status: "Completed",
                                },
                            ]);
                            return {
                                ...timer,
                                remainingTime: 0,
                                status: "Completed",
                            };
                        }
                    }
                    return timer;
                })
            );
        }, 1000);

        timerIntervals.current.set(id, interval);
    };

    const pauseTimer = (id: string) => {
        if (timerIntervals.current.has(id)) {
            clearInterval(timerIntervals.current.get(id));
            timerIntervals.current.delete(id);
        }
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === id
                    ? { ...timer, status: "Paused", lastUpdated: Date.now() }
                    : timer
            )
        );
    };

    const resetTimer = (id: string) => {
        if (timerIntervals.current.has(id)) {
            clearInterval(timerIntervals.current.get(id));
            timerIntervals.current.delete(id);
        }
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === id
                    ? {
                          ...timer,
                          remainingTime: timer.duration,
                          status: "Paused",
                          lastUpdated: Date.now(),
                      }
                    : timer
            )
        );
    };

    const startAllTimersInCategory = (category: string) => {
        timers
            .filter(
                (timer) =>
                    timer.category === category && timer.status !== "Completed"
            )
            .forEach((timer) => startTimer(timer.id));
    };

    const pauseAllTimersInCategory = (category: string) => {
        timers
            .filter(
                (timer) =>
                    timer.category === category && timer.status === "Running"
            )
            .forEach((timer) => pauseTimer(timer.id));
    };

    const resetAllTimersInCategory = (category: string) => {
        timers
            .filter((timer) => timer.category === category)
            .forEach((timer) => resetTimer(timer.id));
    };

    return (
        <TimerContext.Provider
            value={{
                timers,
                addTimer,
                startTimer,
                pauseTimer,
                resetTimer,
                startAllTimersInCategory,
                pauseAllTimersInCategory,
                resetAllTimersInCategory,
                completedTimersQueue,
                setCompletedTimersQueue,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) throw new Error("useTimer must be used within TimerProvider");
    return context;
};
