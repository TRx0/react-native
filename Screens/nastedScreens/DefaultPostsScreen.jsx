import React, {useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,FlatList,Button, TouchableOpacity} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebase/config"
import { TextInput } from "react-native-gesture-handler";
import { EvilIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import {
  collection,
  getDocs,
  query,
    where,doc,onSnapshot
} from "firebase/firestore";
import { useSelector } from "react-redux";

export default function DefaultPostsScreen({ route, navigation }) {
    const {userId} = useSelector((state) => state.auth)

    const [posts, setPosts] = useState([]);

 console.log(posts);
     const getAllPosts = async () => {
         const q = query(collection(db, "posts"), where("userId", "==", userId));
         
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const arr = [];
            querySnapshot.forEach((doc) => {
                arr.push({ ...doc.data(), id: doc.id });
                setPosts(arr)
  });
 

})



        // const querySnapshot = await getDocs(q);
        //  const arr = []
         
        //  querySnapshot.forEach((doc) => {
      
        //      arr.push({ ...doc.data(), id: doc.id });
             
             
//   });
  };
    
    
    useEffect(() => {
        getAllPosts()
        
     },[])
    
    return (
        <View style={styles.container }>
            <FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                <View>
                    <Image source={{ uri: item.photo }} style={styles.image} />
                    <Text style={styles.h3}>{item.nameValue}</Text>
                    <View style={{flex:1,flexDirection:"row", marginBottom:34, justifyContent:"space-between"}}>
                        <TouchableOpacity style={styles.comments} title={"Comment" } onPress={() => navigation.navigate("Comments")}>
                            <EvilIcons name="comment" size={24} color="black" />
                        </TouchableOpacity>
                        <View >
                        <TouchableOpacity style={{ flex: 1, flexDirection: "row",  }} onPress={() => navigation.navigate("Map", {location} )}>
                            <EvilIcons name="location" size={24} color="black" />
                            <Text style={styles.locationValue }>{item.locationValue}</Text>
                            </TouchableOpacity>
                            </View>
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
        
        
        borderRadius: 2,
    },
    comments: {

    }
});