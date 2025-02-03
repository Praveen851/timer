import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
    createNativeStackNavigator,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { MainStackParamList } from "./navigation/StackParamList.types";
import { MainScreenNames } from "./utils/screenNames";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";

type NavigationProps = NativeStackScreenProps<
    MainStackParamList,
    MainScreenNames
>;

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen
                    name={MainScreenNames.HomeScreen}
                    component={HomeScreen}
                />
                <Stack.Screen
                    name={MainScreenNames.HistoryScreen}
                    component={HistoryScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
