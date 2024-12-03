import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screen_login from "../Screens/Login";
import Home from "../Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../Components/Header";
import Tab_bottom from "../Screens/Tab_bottom";
import Certification from "../Screens/Certifications";
import Declare from "../Screens/Declare";
import DocHealth from "../Screens/DocHealth";
import ResVacxin from "../Screens/ResVacxin";
import HealthFacilities from "../Screens/HealthFacilities";
import More from "../Screens/More";
import Advise from "../Screens/Advise";
import Passpore from "../Screens/Passpore";
import HandBook from "../Screens/HandBook";
import InfoUser from "../Screens/InfoUser"
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
            height: 120,
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
        <Stack.Screen name="Certification" component={Certification} options={{ headerShown: false }} />
        <Stack.Screen name="InfoUser" component={InfoUser} options={{headerShown: false}}/>
        <Stack.Screen name="Declare" component={Declare} options={{ headerShown: false }} />
        <Stack.Screen name="DocHealth" component={DocHealth} options={{ headerShown: false }} />
        <Stack.Screen name="ResVacxin" component={ResVacxin} options={{ headerShown: false }} />
        <Stack.Screen name="HealthFacilities" component={HealthFacilities} options={{ headerShown: false }} />
        <Stack.Screen name="Advise" component={Advise} options={{ headerShown: false }} />
        <Stack.Screen name="Passpore" component={Passpore} options={{ headerShown: false }} />
        <Stack.Screen name="More" component={More} options={{ headerShown: false }} />
        <Stack.Screen name="HandBook" component={HandBook} options={{ headerShown: false }} />
        <Stack.Screen name="Personal" component={Personal} options={{headerShown: false}} />
        <Stack.Screen name="Tab_bottom" component={Tab_bottom} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
 
  );
}
