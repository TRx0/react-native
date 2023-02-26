import { Text, View, StyleSheet, Button, Image} from "react-native";
import React, { useState, useEffect } from "react";
import { Camera, CameraType } from 'expo-camera';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { SimpleLineIcons } from '@expo/vector-icons';
export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [nameValue, onChangeName] = useState();
  const [locationValue, onChangeLocation] = useState();

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(photo.uri)
    
    setLocation((prevState) => ({
      ...prevState,
      locationCoords: location.coords,
    }));
    console.log(location)
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



  const sendPhoto = () => {
    navigation.navigate("PostsScreen", {photo, location,nameValue,locationValue})
  }
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
    function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  

  return (
    <View style={ styles.container}>
      <Camera style={styles.camera} ref={setCamera } type={type}>
        {photo && <View style={styles.takePhotoContainer }>
          <Image source={{ uri: photo }} style={{ width: 200,
    height: 200,} } />
        </View> }
        <TouchableOpacity style={styles.snapContainer }  onPress={takePhoto}>
          <SimpleLineIcons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </Camera>
      <View style={{
         }}>
        <EvilIcons name="location" size={24} color="black" />
        {location && <TextInput style={styles.input }  placeholder="Назва..." >
           {location.coords.longitude },  {location.coords.latitude }
        </TextInput> }
      
        </View> 
      <TextInput style={styles.input} value={location } onChangeText={text => onChangeLocation(text)} placeholder="Місцевість...">

      </TextInput>
      <View style={{alignItems: "center"}}>
        <TouchableOpacity style={styles.snapSendContainer }  onPress={sendPhoto}>
          <Text style={styles.snap }>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: 200,
    
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 70,
    height: 70,
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
  }
});