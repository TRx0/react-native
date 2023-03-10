import { View,StyleSheet } from "react-native";
import React from "react";
import MapView, {Marker} from "react-native-maps"
export default function MapScreen({ route }) {
    const latitude = route.params.location.latitude
    const longitude = route.params.location.longitude
 

  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1 }} initialRegion={{ longitude: longitude, latitude: latitude, latitudeDelta: 0.1, longitudeDelta: 0.0421 }}>
        <Marker coordinate={{ latitude: latitude, longitude: longitude}} />
        </MapView>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    }
});