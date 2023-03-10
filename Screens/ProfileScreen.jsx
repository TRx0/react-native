import { Text, View , TouchableOpacity, StyleSheet, FlatList, Image, ImageBackground} from "react-native";
import React, {useEffect, useState} from "react";
import { authSighOutUser} from "../redax/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebase/config"
import { EvilIcons } from '@expo/vector-icons';
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
export default function ProfileScreen() {

  const dispatch = useDispatch()
  const { userId,nickname } = useSelector((state) => state.auth)
  const [userPosts, setUserPosts] = useState([]);

  const signOut = () => {
    dispatch(authSighOutUser());
  };

  const getUserPosts = async() => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const arr = [];
         querySnapshot.forEach((doc) => {
              
                arr.push({ ...doc.data() });
                setUserPosts(arr)
  });
})


  }


  useEffect(() => {
    getUserPosts()
  }, [])



  return (
    <View style={styles.container}>
     
     
      <ImageBackground source={require('../assets/Photo_BG.png')} style={{ width: "100%", height: "100%", position: "relative" }}></ImageBackground>
      <View style={styles.snapContainer}>
        <Image source={require('../assets/Avatar.png')} style={{ position: "absolute", top: "-10%"}}></Image>
        <Text style={styles.nickname }>{nickname}</Text>
        <TouchableOpacity style={styles.btnOut} onPress={signOut}>
            <Ionicons
              style={{ marginRight: 16 }}
              name="exit-outline"
              size={24}
              color="#BDBDBD"
        />
        
      </TouchableOpacity>
      <FlatList data={userPosts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) =>
          <View  >
          <Image source={{ uri: item.photo }} style={styles.image} />
          <Text style={styles.h3}>{item.nameValue}</Text>
            <View style={{flex:1,flexDirection:"row", marginBottom:34, justifyContent:"space-between"} }>
            
                        <TouchableOpacity style={styles.comments} title={"Comment" } onPress={() => navigation.navigate("Comments", {postID: item.id})}>
                            <EvilIcons name="comment" size={24} color="black" />
                        </TouchableOpacity>
                    <View >
                        <TouchableOpacity style={{ flex: 1, flexDirection: "row",  }} onPress={() => navigation.navigate("Map", {location: item.location} )}>
                            <EvilIcons name="location" size={24} color="black" />
                            <Text style={styles.locationValue }>{item.locationValue}</Text>
                            </TouchableOpacity>
                            </View>
                    </View>
            </View>} />
          </View>
       
         
        
     
    </View>
  );
}
const styles = StyleSheet.create({
  
  btnOut: {
    position: "absolute",
    right: 16,
    top: 22,
    
  },
  snapContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: 'white',
    top: "20%",
    display: "flex",
     alignItems:"center",
    borderRadius: 25,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16 
  },
  container: {
    display: "flex",
   
    
  },
  nickname: {
    marginBottom: 33,
    fontSize: 33,
    lineHeight: 35,
    
  },
    image: {
      height: 240,
      width: 343,
        borderRadius: 8,
      marginBottom: 8,
        
    },
    h3: {
        
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