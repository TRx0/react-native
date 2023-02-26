import React, {useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,FlatList} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { TextInput } from "react-native-gesture-handler";
import { EvilIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();


export default function PostsScreen({ route }) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (route.params) { 
            setPosts(prevState => [...prevState, route.params])
        }
       console.log(route.params)
        
     },[route.params])
    
    return (
        <View>
            <FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                <View>
                    <Image source={{ uri: item.photo }} style={{ height: 200, marginBottom: 10 }} />
                    <Text > {route.params.nameValue}</Text>
                    <Text >{location.coords.longitude },  {location.coords.latitude }</Text>
                </View>} />
            
        </View>
    )
}