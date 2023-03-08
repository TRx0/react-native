import { Text, View , TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import { authSighOutUser} from "../redax/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {

const dispatch = useDispatch()

  const signOut = () => {
    dispatch(authSighOutUser());
  };
  return (
    <View>
      <Text>Profile Screen</Text>
      <TouchableOpacity style={styles.btnOut} onPress={signOut}>
            <Ionicons
              style={{ marginRight: 16 }}
              name="exit-outline"
              size={24}
              color="#BDBDBD"
            />
          </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  
  btnOut: {
    position: "absolute",
    top: 24,
    right: 19,
  }
});