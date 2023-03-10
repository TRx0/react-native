import { Text, View,TextInput, TouchableOpacity,StyleSheet,SafeAreaView,FlatList } from "react-native";
import React, {useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../firebase/config"
import { useSelector } from "react-redux"
import {
  addDoc,
  collection,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
export default function CommentsScreen({ route }) {
  const postId = route.params.postID;
  const [comments, setComments] = useState("");
  const [allComments, setAllComments] = useState([]);

 
const {userId,nickname} = useSelector((state) => state.auth)
  useEffect(() => {
    getAllPost()
  }, [])


      const createPost = async () => {
          try {
      const commentRef = doc(db, "posts", postId);    
      const docRef = await addDoc(collection(commentRef, "comments"), {
          comments, nickname
        });
      console.log("Document written with ID: ", docRef.id);
        } catch (e) {
      console.error("Error adding document: ", e);
    }
    }
  const getAllPost = async () => {
    try {
      
      const q = query(collection(db, "posts"));
      const qa = doc(q, postId)
      const qax = collection(qa, "comments")


       const unsubscribe = onSnapshot(qax, (querySnapshot) => {
         const arr = [];
         
         querySnapshot.forEach((doc) => {
          
                arr.push({ ...doc.data(), id: doc.id });
           setAllComments(arr)
            console.log(arr)
  });
})    
   } catch (error) {
    console.log(error)
   }
 }

  return (

    <View style={styles.container}>
        <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.comment}>{item.nickname}</Text>
              <Text style={styles.comment}>{item.comments}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <View style={styles.wrappInput }>
        <TextInput style={styles.input} value={comments} onChangeText={(value) => setComments(value)}placeholder="Сomment..." ></TextInput>
        <TouchableOpacity style={styles.button} onPress={createPost}><AntDesign name="arrowup" size={24} color="#fff" /></TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "flex-end"
  },
  image: {
    height: 240,
    width: "100%",
    marginBottom: 32,
    marginTop: 32,
    borderRadius: 8,
  },
  items: { flex: 1 },
  item: {
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  comment: { fontSize: 13, lineHeight: 18, marginBottom: 8 },
  commentDate: { fontSize: 10, lineHeight: 12, color: "#BDBDBD" },
  wrappInput: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
    right: 16,
  },
  input: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    padding: 16,
  },
   commentContainer: {
    borderWidth: 1,
    borderColor: "#20b2aa",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
});