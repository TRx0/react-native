import React from "react";
import { StyleSheet } from "react-native";
import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputEmailHandler = (text) => setEmail(text);
  const inputPasswordHandler = (text) => setPassword(text);
  const onLogin = () => {
    console.log("Email:", email, ", Password:", password)
   }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container }>
      <ImageBackground source={require('../assets/Photo_BG.png')} style={{width:"100%", height:"100%", position: "relative",  }}></ImageBackground>
      <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: 'white', top: "40%", display: "flex", alignItems: "center", borderRadius: 25 ,paddingTop: 32,paddingLeft: 16,paddingRight:16  }}>
          <Text style={styles.h2}>Войти</Text>
      
          <TextInput
            placeholder="Адрес электронной почты"
            value={email}
            onChangeText={inputEmailHandler}
            style={styles.input}
            />
        
      <TextInput
        placeholder="Пароль"
        style={styles.input}
        value={password}
        onChangeText={inputPasswordHandler}
          />
          
        <Pressable style={styles.submitButton} onPress={onLogin }>
          <Text style={styles.buttonText }>Войти</Text>
          </Pressable>
          <Button onPress={() => navigation.navigate("Registration")} title="Нет аккаунта? Зарегистрироваться" ></Button>
          
        </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  h2: {

    // fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '30',
    lineHeight: '35',
    color: '#212121',
    justifyContent: "center",
    marginBottom: 33
  },
  input: {
    width: 343,
    height: 56,
    background: 'black',
    fontSize: 16,
    lineHeight: 19,
    borderColor: 'black',
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 16
  },
  container:{
    display: "flex",
    alignItems: "center",
    
  },
  submitButton: {
    backgroundColor: '#FF6C00',
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderRadius: 100,
    height: 50,
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19
  }
});