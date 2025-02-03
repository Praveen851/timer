import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParamList } from "./types";
import { MainScreenNames } from "./utils/screenNames";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AddTimerScreen from "./screens/AddTimerScreen";
import { TimerProvider } from "./context/TimerContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
    const Stack = createNativeStackNavigator<MainStackParamList>();
    return (
        <ThemeProvider>
            <TimerProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="HomeScreen">
                        <Stack.Screen
                            name={MainScreenNames.HomeScreen}
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name={MainScreenNames.HistoryScreen}
                            component={HistoryScreen}
                        />
                        <Stack.Screen
                            name={MainScreenNames.AddTimerScreen}
                            component={AddTimerScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </TimerProvider>
        </ThemeProvider>
    );
}
