import React, {useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,FlatList,Button, TouchableOpacity} from "react-native";
import { db } from "../../firebase/config"
import { EvilIcons } from '@expo/vector-icons';
import {
  collection,query,onSnapshot
} from "firebase/firestore";
import { useSelector } from "react-redux";

export default function DefaultPostsScreen({ route, navigation }) {
    const {userId,nickname, email} = useSelector((state) => state.auth)
    const [posts, setPosts] = useState([]);
    console.log(posts)
     const getAllPosts = async () => {
         const q = query(collection(db, "posts"));
         
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const arr = [];
            querySnapshot.forEach((doc) => {
                

                arr.push({ ...doc.data(), id: doc.id});
                setPosts(arr)
                
  });
})
  };
    
    
    useEffect(() => {
        getAllPosts()
        
     },[])
    
    return (
        <View style={styles.container}>
            <View style={{display:"flex", flexDirection:"row", marginBottom:32} }>
                <Image source={require('../../assets/Avatar.png')} style={{ width: 60, height: 60 }}></Image>
                <View style={{justifyContent:"center",marginLeft:8} }>
                        <Text style={styles.nickname}>{nickname}</Text>
                        <Text style={styles.nickname}>{email}</Text>
                    </View>
                    </View>
            <FlatList style={{marginBottom:55}} data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
                <View >
                    <Image source={{ uri: item.photo }} style={styles.image} />
                    <Text style={styles.h3}>{item.nameValue}</Text>
                    <View style={{flex:1,flexDirection:"row", marginBottom:34, justifyContent:"space-between"}}>
                        <TouchableOpacity style={styles.comments} title={"Comment" } onPress={() => navigation.navigate("Comments", {postID: item.id})}>
                            <EvilIcons name="comment" size={24} color="black" />
                        </TouchableOpacity>
                        <View>
                        <TouchableOpacity style={{ flex: 1, flexDirection: "row",  }} onPress={() => navigation.navigate("Map", {location: item.location} )}>
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
      paddingTop:32,
    },
    image: {
        height: 240,
        borderRadius: 8,
        marginBottom:8,
    },
    h3: {
        
      
        fontSize: 16,
        lineHeight: 19,
        color: "#212121",
        marginBottom:11
    },
    locationValue: {
        
    
        fontSize: 16,
        lineHeight: 19,
        color: "#212121",
        textDecorationLine: "underline",
        
        
        borderRadius: 2,
    },
    comments: {

    },
    nickname: {
        
        fontWeight: 500,
        fontSize: 13,
        lineHeight:15
    },
    email: {

    }
});