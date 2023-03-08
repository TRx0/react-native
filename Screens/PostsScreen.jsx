import React, { useEffect, useState } from "react";
import { moduleName } from "react-native";
import { View, Text, StyleSheet, Image,FlatList,Button} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "./nastedScreens/DefaultPostsScreen";
import CommentsScreen from "./nastedScreens/CommentsScreen";
import MapScreen from "./nastedScreens/MapScreen"
const NestedScreen  = createStackNavigator();


export default function PostsScreen() {
   
    return (
        <NestedScreen.Navigator >
            <NestedScreen.Screen name="DefaultScreen" options={{tabBarShowLabel: false}} component={DefaultPostsScreen } />
            <NestedScreen.Screen name="Comments" component={CommentsScreen} />
            <NestedScreen.Screen name="Map" component={MapScreen} />
        </NestedScreen.Navigator>
    )
}
