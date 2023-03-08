import { Text, View, StyleSheet, Button, Image, KeyboardAvoidingView, Platform,TouchableWithoutFeedback, Keyboard,} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Camera, CameraType } from 'expo-camera';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nameValue, onChangeName] = useState();
  const [locationValue, onChangeLocation] = useState();
  const {userId, nickname} = useSelector((state) => state.auth)

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(photo.uri)
    
    setLocation((prevState) => ({
      ...prevState,
      locationCoords: location.coords,
    }));
    
  }

 useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    
    })();
  }, []);


  const sendPhoto =  () => {
    uploadPostToServer()
    navigation.navigate("DefaultScreen", { photo })
      
  }
  const uploadPostToServer = async () => {
   const photo =  await uploadImageToServer()
   try {
  const docRef = await addDoc(collection(db, "posts"), {
    photo, nameValue,locationValue, location: location.coords,nickname,userId
    
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
    
  }

 const uploadImageToServer = async (catalog, image) => {
  const response = await fetch(photo);
  const file = await response.blob();
  const uniqPostId = Date.now().toString();
  const storageRef = ref(storage, `${catalog}/${uniqPostId}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(downloadURL)
    return downloadURL;
    
  } catch (erorr) {
    console.error("error.code", erorr.code);
    console.error("error.message", erorr.message);
  }
};



  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
    function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  if (!permission) {

    return <View />;
  }

  if (!permission.granted) {

    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={ styles.container}>
        <Camera style={styles.camera} ref={setCamera } type={type}>
            {photo && <View style={styles.takePhotoContainer }>
              <Image source={{ uri: photo }} style={{ width: 200,height: 200,} } />
                      </View> }
              <TouchableOpacity style={styles.snapContainer }  onPress={takePhoto}>
                  <SimpleLineIcons name="camera" size={24} color="white" />
          </TouchableOpacity>
            <TouchableOpacity style={styles.switchContainer} onPress={toggleCameraType}>
                 <Octicons name="arrow-switch" size={24} color="white" />
              </TouchableOpacity>
        </Camera>
        
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <TextInput style={styles.input} onChangeText={text => onChangeName(text)} placeholder="Назва..." />
            <View style={{flexDirection: "row"}}>
                <EvilIcons name="location" size={24} color="black" />           
                <TextInput style={styles.input} onChangeText={text => onChangeLocation(text)} placeholder="Місцевість..."   />              
            </View> 
        </KeyboardAvoidingView>
        
        <View style={{alignItems: "center"}}>
            <TouchableOpacity style={styles.snapSendContainer }  onPress={sendPhoto}>
              <Text style={styles.snap }>Опублікувати</Text>
            </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  camera: {
    height: 300,
    alignItems: "center",
    marginBottom: 32,
  },
  snap: {
    fontWeights: 400,
    fontSize: 16,
    lineHeight: 19,
    
    color: "#fff",
    
  },
  snapContainer: {
    marginTop: 170,
    
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 70,
    height: 70,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    
  },
  switchContainer: {
  
  bottom: -5,  
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 50,
    height: 50,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    
  },
  takePhotoContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderColor: "#fff",
    borderWidth: 1,
  },
  snapSendContainer: {
    width: 343,
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"

  },
  input: {
    height: 35,
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
    fontWeights: 400,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 32,
    width: 323
  }
});