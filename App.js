import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screens/LoginScreen'
import RegistrationScreen from './Screens/RegistrationScreen'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
//     const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Black": require("./assets/Roboto-Black.ttf"),
//     "Roboto-Bold": require("./assets/Roboto-Bold.ttf"),
//   });
// };
//   const [isReady, setIsReady] = useState(false)
// if (!isReady) {
//     return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)}/>
// }
  const MainStack = createStackNavigator();
  return (
    
    <NavigationContainer >
      
      <MainStack.Navigator initialRouteName="Login">
        
          <MainStack.Screen name="Registration" component={RegistrationScreen} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        
        </MainStack.Navigator>
      
    </NavigationContainer>
    
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});



