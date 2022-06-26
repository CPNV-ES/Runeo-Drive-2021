import React from "react";
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import Axios from "axios";
import {TextInputComponent} from "../../common/component/TextInput.component";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {Formik} from "formik";
import {useRoute} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/native";
import {VehiclePhoto} from "../../common/resources/Vehicle.resource";

const {width} = Dimensions.get("window");
const height = width * 0.6
export interface VehiclePhotoUpdate {
  vehicleId: number, 
  vehiclePhoto: VehiclePhoto
}
export function VehiclePhotoUpdateComponent() {
  
  const navigation = useNavigation();
  const route = useRoute();
  const {vehicleId} = route.params as VehiclePhotoUpdate;
  const {vehiclePhoto} = route.params as VehiclePhotoUpdate;
  let initialValues = {
    newTitle: vehiclePhoto.title
}
  const deleteVehiclePhoto = async () => {
    return Axios.delete(`/cars/${vehicleId}/photos/${vehiclePhoto.id}`).then(() => {
      navigation.navigate("list")
    });
  }
  const updateVehiclePhoto = async (values:{newTitle:string}) => {
    Axios.patch(`/cars/${vehicleId}/photos/${vehiclePhoto.id}?title=${values.newTitle}`).then(() => {
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
