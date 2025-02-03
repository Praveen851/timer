import React from "react";
import { View, Text, FlatList } from "react-native";
import { TimerType } from "../types";
import { useTimer } from "../context/TimerContext";
import { styles } from "./HomeScreen";

const HistoryScreen = () => {
    const { timers } = useTimer();
    const completedTimers: TimerType[] = timers.reduce((acc, timer) => {
        if (timer.status === "Completed") acc.push(timer);
        return acc;
    }, [] as TimerType[]);
    return (
        <View style={styles.container}>
            {completedTimers.length === 0 ? (
                <Text>No timer has completed yet</Text>
            ) : (
                <FlatList
                    data={completedTimers}
                    keyExtractor={(timer) => timer.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.timerCard}>
                                <Text style={styles.timerName}>
                                    {item.name}
                                </Text>
                                <Text style={styles.timerDetail}>
                                    Completed at:{" "}
                                    {new Date(
                                        item.lastUpdated
                                    ).toLocaleString()}
                                </Text>
                            </View>
                        );
                    }}
                />
            )}
        </View>
    );
};

export default HistoryScreen;
