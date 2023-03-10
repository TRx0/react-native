import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "./nastedScreens/DefaultPostsScreen";
import CommentsScreen from "./nastedScreens/CommentsScreen";
import MapScreen from "./nastedScreens/MapScreen"
const NestedScreen  = createStackNavigator();


export default function PostsScreen() {
   
    return (
        <NestedScreen.Navigator >
            <NestedScreen.Screen name="DefaultScreen"  component={DefaultPostsScreen } />
            <NestedScreen.Screen name="Comments" component={CommentsScreen} />
            <NestedScreen.Screen name="Map" component={MapScreen} />
        </NestedScreen.Navigator>
    )
}
