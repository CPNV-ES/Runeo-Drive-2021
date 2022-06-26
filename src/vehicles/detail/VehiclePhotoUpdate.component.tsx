import React,{ useState, useEffect } from "react";
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import Axios from "axios";
import {TextInputComponent} from "../../common/component/TextInput.component";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {Formik} from "formik";
import {useRoute} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/native";
import {VehiclePhoto} from "../../common/resources/Vehicle.resource";
import AsyncStorage from "@react-native-async-storage/async-storage";
const {width} = Dimensions.get("window");
const height = width * 0.6
export interface VehiclePhotoUpdate {
  vehicleId: number, 
  vehiclePhoto: VehiclePhoto
}
export function VehiclePhotoUpdateComponent() {
  
  const navigation = useNavigation();
  const route = useRoute();
  const [token,setToken] = useState("")
  const {vehicleId} = route.params as VehiclePhotoUpdate;
  const {vehiclePhoto} = route.params as VehiclePhotoUpdate;
  let initialValues = {
    newTitle: vehiclePhoto.title
}
useEffect(() => {
  if(token==""){getToken()};
}, []);
  const getToken = async () => {
    const token = await AsyncStorage.getItem("apiToken");
    if(token!=null) setToken(token);
  }
  const deleteVehiclePhoto = async () => {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", 
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },   
    };
    console.log(token)
    return Axios.delete(`/cars/${vehicleId}/photos/${vehiclePhoto.id}`,config).then(() => {
      navigation.navigate("list")
    });
  }
  const updateVehiclePhoto = async (values:{newTitle:string}) => {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", 
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },    
    };
    console.log(token)
    Axios.patch(`/cars/${vehicleId}/photos/${vehiclePhoto.id}?title=${values.newTitle}`,null,config).then(() => {
      navigation.navigate("list")
    });
  }
  return (
    <View style={styles.container}>
      <ButtonComponent 
                title="supprimer l'image"
                onPress={deleteVehiclePhoto}/>
      <Image
        key={"image"+vehiclePhoto.id}
        source={{uri: vehiclePhoto.url}}
        
        style={styles.photo}/>
      <Formik
        initialValues={initialValues}
        onSubmit={updateVehiclePhoto}>
          {(formik) =>(
            <View>
              <TextInputComponent 
                name={"newTitle"} 
                formik={formik} 
                inputProps={{
                  placeholder: "My Photo"
                }}/>
              <ButtonComponent 
                title="sauvegarder"
                onPress={formik.handleSubmit}/>
            </View>
          )}
        </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  photo:{
    width,
    height,
    resizeMode:'cover'
},
});
