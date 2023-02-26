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
        return <MainStack.Navigator initialRouteName="Login">
        
          <MainStack.Screen name="Registration" component={RegistrationScreen} />
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen name="PostsScreen" component={PostsScreen} />
        </MainStack.Navigator>
     } return <Tab.Navigator initialRouteName="PostsScreen"  >
       <Tab.Screen name="PostsScreen" component={PostsScreen} options={{
           
             tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={24} color={color } />
             }} />
         <Tab.Screen name="CreatePostsScreen" component={CreatePostsScreen} 
             
             options={{
                 
                 tabBarIcon: ({ color }) => <AntDesign
                 name="plus" size={24} color={color } />
             }}/>
          <Tab.Screen name="ProfileScreen" component={ProfileScreen}  options={{
             tabBarIcon: ({ color }) => <AntDesign  name="user" size={24} color={color} />
             }}/>
        </Tab.Navigator>
  }