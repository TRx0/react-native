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
  Image
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputLoginHandler = (text) => setLogin(text);
  const inputEmailHandler = (text) => setEmail(text);
  const inputPasswordHandler = (text) => setPassword(text);
  const onRegister = () => {
    console.log("Login:", login,", Email:", email, ", Password:", password)
   }
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container }>
      <ImageBackground source={require('../assets/Photo_BG.png')} style={{width:"100%", height:"100%", position: "relative" }}></ImageBackground>
          <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: 'white', top: "20%", display: "flex", alignItems: "center", borderRadius: 25, paddingTop: 92, paddingLeft: 16, paddingRight: 16 }}>
            <Image source={require('../assets/Avatar.png')} style={{position:"absolute", top: "-10%"} }></Image>
          <Text style={styles.h2}>Регистрация</Text>
      
    <TextInput
        placeholder="Логин"
        value={login}
        style={styles.input}   
        onChangeText={inputLoginHandler}
            />
            
      <TextInput
        placeholder="Адрес электронной почты"
        value={email}
        onChangeText={inputEmailHandler}
        style={styles.input}
          
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        style={styles.input}
        onChangeText={inputPasswordHandler}
            />
            
        <Pressable style={styles.submitButton} onPress={onRegister } >
          <Text style={styles.buttonText }>Зарегистрироваться</Text>
          </Pressable>
              <Button onPress={() => navigation.navigate("Login")} title='Уже есть аккаунт? Войти'></Button>
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