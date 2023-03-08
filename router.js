import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import LoginScreen from './Screens/LoginScreen'
import RegistrationScreen from './Screens/RegistrationScreen'
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";

  
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

 export const useRoute = (isAuth) => { 
    if (!isAuth) { 
        return <MainStack.Navigator >
                    <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                    <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
                </MainStack.Navigator>
   } return <Tab.Navigator initialRouteName="PostsScreen" options={{} } >
       <Tab.Screen name="PostsScreen" component={PostsScreen} options={{
            tabBarShowLabel: false,
             tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={24} color={color } />
             }} />
         <Tab.Screen name="CreatePostsScreen" component={CreatePostsScreen} 
             
             options={{
                 tabBarShowLabel: false,
                 tabBarIcon: ({ color }) => <AntDesign
                 name="plus" size={24} color={color } />
             }}/>
     <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
            tabBarShowLabel: false,
             tabBarIcon: ({ color }) => <AntDesign  name="user" size={24} color={color} />
             }}/>
        </Tab.Navigator>
  }