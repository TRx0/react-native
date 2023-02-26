import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useState } from 'react';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";


import { useRoute } from './router';
 

export default function App() {
  const routing = useRoute({})

 
  return (
    <NavigationContainer >
      {routing}
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



        