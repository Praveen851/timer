import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/StackParamList.types";
import { MainScreenNames } from "../utils/screenNames";

export type NavigationProps = NativeStackScreenProps<
    MainStackParamList,
    MainScreenNames
>;

const HistoryScreen = (Props: NavigationProps) => {
    return (
        <View style={styles.container}>
            <Text>History Screen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HistoryScreen;
