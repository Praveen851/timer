import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useTimer } from "../context/TimerContext";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";

const AddTimerScreen = () => {
    const { addTimer } = useTimer();
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [category, setCategory] = useState("");
    const [checked, setChecked] = useState(false);

    const handleSave = () => {
        if (!name || !duration || !category) {
            return alert("All fields are required!");
        }
        addTimer(name, parseInt(duration), category, checked);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Timer</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter timer name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Duration (seconds)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter duration"
                keyboardType="numeric"
                value={duration}
                onChangeText={setDuration}
            />

            <Text style={styles.label}>Category</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter category"
                value={category}
                onChangeText={setCategory}
            />
            <View style={styles.checkBoxContainer}>
                <Text style={styles.label}>Set halfway alert</Text>
                <Checkbox
                    status={checked ? "checked" : "unchecked"}
                    onPress={() => setChecked(!checked)}
                    color="skyblue"
                />
            </View>
            <Button title="Save Timer" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "white",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    checkBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
    },
});

export default AddTimerScreen;
