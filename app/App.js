import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screen_login from "../Screens/Login";
import Home from "../Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../Components/Header";
import Tab_bottom from "../Screens/Tab_bottom"
import Scanner from "../Screens/Scanner"
import Schedule from "../Screens/Schedule"
import Notify from "../Screens/Notify"
import Personal from "../Screens/Personal"

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitle: () => <CustomHeader />,
          headerStyle: {
            height: 180,
            backgroundColor: "#2b83f9",
          },
          headerLeftContainerStyle: {
            marginTop: -40,
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="Login" component={Screen_login} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Tab_bottom"
          component={Tab_bottom}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
