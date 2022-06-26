import React, { useState,useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import Axios from "axios";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {TextInputComponent} from "../../common/component/TextInput.component";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {Formik, FormikHelpers} from "formik";
import {useRoute} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/native";
import {VehiclePhoto} from "../../common/resources/Vehicle.resource";

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
    <View>
      <ButtonComponent 
                title="supprimer l'image"
                onPress={deleteVehiclePhoto}/>
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
});
