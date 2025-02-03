import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/StackParamList.types";
import { MainScreenNames } from "../utils/screenNames";

export type NavigationProps = NativeStackScreenProps<
    MainStackParamList,
    MainScreenNames
>;

const HomeScreen = ({ navigation }: NavigationProps) => {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <Button
                title="Click"
                onPress={() => navigation.navigate("HistoryScreen")}
            />
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

export default HomeScreen;
