import React, { useCallback} from 'react';
import { } from "react-native";
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {Provider} from 'react-redux'
import { store } from './redax/store';
import Main from './components/Main';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


 SplashScreen.preventAutoHideAsync();


export default function App() {
const [fontsLoaded] = useFonts({
  'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
  });
 const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container } onLayout={onLayoutRootView}>
    <Provider store={store} >
        <Main />
      </Provider>
      </View>
    
  );
  
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
});




        