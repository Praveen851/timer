import { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useTimer } from "../context/TimerContext";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList, TimerType } from "../types";
import { MainScreenNames } from "../utils/screenNames";
import * as Progress from "react-native-progress";
import SuccessModal from "./SuccessModal";

export type NavigationProps = NativeStackScreenProps<
    MainStackParamList,
    MainScreenNames
>;

const HomeScreen = ({ navigation }: NavigationProps) => {
    const {
        timers,
        startTimer,
        pauseTimer,
        resetTimer,
        pauseAllTimersInCategory,
        resetAllTimersInCategory,
        startAllTimersInCategory,
        completedTimersQueue,
        setCompletedTimersQueue,
    } = useTimer();

    const [expandedCategories, setExpandedCategories] = useState<
        Record<string, boolean>
    >({});

    const groupedTimers = timers.reduce((acc, timer) => {
        if (!acc[timer.category]) acc[timer.category] = [];
        acc[timer.category].push(timer);
        return acc;
    }, {} as Record<string, TimerType[]>);

    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleModalClose = () => {
        setCompletedTimersQueue((prevQueue) => prevQueue.slice(1));
    };

    const navigateToHistoryScreen = () =>
        navigation.navigate(MainScreenNames.HistoryScreen);

    const navigateToAddTimerScreen = () =>
        navigation.navigate(MainScreenNames.AddTimerScreen);

    return (
        <View style={styles.container}>
            {completedTimersQueue.length > 0 && (
                <SuccessModal
                    completedTimersQueue={completedTimersQueue}
                    onClose={handleModalClose}
                />
            )}
            {timers.length === 0 ? (
                <Text>Start adding timers by clicking the plus icon</Text>
            ) : (
                <FlatList
                    data={Object.keys(groupedTimers)}
                    keyExtractor={(item) => item}
                    renderItem={({ item: category }) => (
                        <View style={styles.categoryContainer}>
                            <TouchableOpacity
                                style={styles.categoryHeader}
                                onPress={() => toggleCategory(category)}
                            >
                                <Text style={styles.categoryTitle}>
                                    {category}
                                </Text>
                                <View style={styles.bulkActions}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            startAllTimersInCategory(category)
                                        }
                                    >
                                        <Text style={styles.button}>▶</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() =>
                                            pauseAllTimersInCategory(category)
                                        }
                                    >
                                        <Text style={styles.button}>⏸</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() =>
                                            resetAllTimersInCategory(category)
                                        }
                                    >
                                        <Text style={styles.button}>🔄</Text>
                                    </TouchableOpacity>
                                    <Ionicons
                                        name={
                                            expandedCategories[category]
                                                ? "chevron-up"
                                                : "chevron-down"
                                        }
                                        size={20}
                                        color="black"
                                    />
                                </View>
                            </TouchableOpacity>

                            {expandedCategories[category] && (
                                <FlatList
                                    data={groupedTimers[category]}
                                    keyExtractor={(timer) => timer.id}
                                    renderItem={({ item }) => {
                                        const progress =
                                            1 -
                                            item.remainingTime / item.duration;
                                        return (
                                            <View style={styles.timerCard}>
                                                <Text style={styles.timerName}>
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    style={styles.timerDetail}
                                                >
                                                    Time Left:{" "}
                                                    {item.remainingTime}s
                                                </Text>
                                                <Text
                                                    style={styles.timerDetail}
                                                >
                                                    Status: {item.status}
                                                </Text>
                                                <Progress.Bar
                                                    progress={progress}
                                                    width={null}
                                                    height={10}
                                                    color={
                                                        progress === 0
                                                            ? "gray"
                                                            : "#007bff"
                                                    }
                                                    borderRadius={5}
                                                    style={styles.progressBar}
                                                />

                                                <View
                                                    style={
                                                        styles.buttonContainer
                                                    }
                                                >
                                                    <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={() =>
                                                            startTimer(item.id)
                                                        }
                                                        disabled={
                                                            item.status !==
                                                            "Paused"
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.buttonText
                                                            }
                                                        >
                                                            Start
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={() =>
                                                            pauseTimer(item.id)
                                                        }
                                                        disabled={
                                                            item.status !==
                                                            "Running"
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.buttonText
                                                            }
                                                        >
                                                            Pause
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={() =>
                                                            resetTimer(item.id)
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.buttonText
                                                            }
                                                        >
                                                            Reset
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                            )}
                        </View>
                    )}
                />
            )}
            <TouchableOpacity
                style={styles.fab1}
                onPress={navigateToHistoryScreen}
            >
                <MaterialIcons name="history" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.fab2}
                onPress={navigateToAddTimerScreen}
            >
                <MaterialIcons name="add" size={28} color="white" />
            </TouchableOpacity>
        </View>
    );
};
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffff",
    },
    categoryContainer: {
        marginBottom: 12,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
    },
    categoryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#e0e0e0",
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold",
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
    fab1: {
        position: "absolute",
        bottom: 20,
        left: 20,
        backgroundColor: "#007bff",
        padding: 16,
        borderRadius: 50,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    fab2: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#007bff",
        padding: 16,
        borderRadius: 50,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonContainer: { flexDirection: "row", marginTop: 8 },
    button: {
        flex: 1,
        backgroundColor: "#007bff",
        padding: 8,
        borderRadius: 5,
        margin: 4,
    },
    buttonText: { textAlign: "center", color: "white" },
    progressBar: { marginTop: 8, marginBottom: 12 },
    bulkActions: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
});
export default HomeScreen;
