import React from "react";
import { Appbar } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";

const AppBar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Appbar.Header
            style={{ backgroundColor: theme === "dark" ? "#333" : "#fff" }}
        >
            <Appbar.Content title="Home" />
            <Appbar.Action icon="theme-light-dark" onPress={toggleTheme} />
        </Appbar.Header>
    );
};

export default AppBar;
