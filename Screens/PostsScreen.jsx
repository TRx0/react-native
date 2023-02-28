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
        <View style={styles.container }>
            <FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                <View>
                    <Image source={{ uri: item.photo }} style={styles.image} />
                    <Text style={styles.h3}>{route.params.nameValue}</Text>
                    <View style={{flex:1,flexDirection:"row", marginBottom:34}}>
                        <Text style={styles.comments}>
                            <EvilIcons name="comment" size={24} color="black" />
                        </Text>
                        <Text style={styles.locationValue}>{route.params.locationValue}</Text>
                    </View>
                    
                </View>} />
            
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    },
    image: {
        height: 240,
        borderRadius: 8,
        marginBottom:8,
    },
    h3: {
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 19,
        color: "#212121",
        marginBottom:11
    },
    locationValue: {
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: "#212121",
        textDecorationLine: "underline",
        marginLeft: "auto"
    },
    comments: {

    }
});