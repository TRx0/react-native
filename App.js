import React, { useState,useEffect} from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {Provider} from 'react-redux'
import { store } from './redax/store';
import Main from './components/Main';
 
const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/Roboto-Regular.ttf"),
  });
};

export default function App() {
 

 
  return (
    <Provider store={store}>
        <Main/>
    </Provider>
    
  );
  
}





        