import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TimerType } from "../types";
import { useTimer } from "../context/TimerContext";

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

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffff",
    },

    timerCard: {
        backgroundColor: "#ffffff",
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 6,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    timerName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    timerDetail: {
        fontSize: 14,
        color: "#555",
    },
});
