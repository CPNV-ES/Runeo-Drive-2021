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
import AsyncStorage from "@react-native-async-storage/async-storage";

let formData = new FormData();
export interface VehiclePhotoTaker {
  vehicleId: number
}
const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);
export function VehiclePhotoTakerComponent() {
  const navigation = useNavigation();
  const route = useRoute();
  const {vehicleId} = route.params as VehiclePhotoTaker;
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedImage,setCapturedImage] = useState()
  const [isPreview, setIsPreview] = useState(false);
  const [token,setToken] = useState("")
  const [isCameraReady, setIsCameraReady] = useState(false);
  let initialValues = {
    title: ""
};

  useEffect(() => {
    onHandlePermission();
    if(token==""){getToken()};
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("apiToken");
    if(token!=null) setToken(token);
  }
  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status == 'granted');
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }
  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7 };
      const data = await cameraRef.current.takePictureAsync(options);
      setCapturedImage(data);
      await cameraRef.current.pausePreview();
      setIsPreview(true);
    }
  };
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setCapturedImage(null)
    setIsPreview(false);
  };
  const SendPhoto = async (values: { title: string }, {setSubmitting, setFieldError}: FormikHelpers<any>) => {
    const data = new FormData();
    let picture = {
      uri: capturedImage.uri,
      type: "image/jpeg",
      name: "photo.jpg"
    }
    
    data.append('photo', picture);
    data.append('title', values.title);
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", 
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token
      },   
    };
    Axios.post(`cars/${vehicleId}/photos`, data, config)
    .then(() => {
      navigation.navigate("list")
    })
  }
  return (
    <View style={styles.container}>
    <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
      />
    <View style={styles.container}>
      {!isPreview && (
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
            <MaterialIcons name='flip-camera-ios' size={28} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isCameraReady}
            onPress={onSnap}
            style={styles.capture}
          />
        </View>
      )}
      {isPreview && (
        <View>
          <TouchableOpacity
            onPress={cancelPreview}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <AntDesign name='close' size={32} color='#fff' />
          </TouchableOpacity>
        <Formik 
          initialValues = {initialValues}
          onSubmit={SendPhoto}>
          {(formik) => (
            <View style={styles.saveForm}>
              <TextInputComponent
                name={"title"}
                style={styles.textInput}
                formik={formik}
                inputProps={{
                    placeholder: "My Photo"
                }}/>
              <ButtonComponent
                  title="sauvegarder"
                  onPress={formik.handleSubmit}
                  style={styles.saveButton}
                  disabled={formik.isSubmitting || !formik.isValid}/>
            </View>
          )}
          </Formik>
        </View>
      )}
      
    </View>
    
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: '#fff'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  capture: {
    backgroundColor: '#5A45FF',
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A45FF',
    opacity: 0.7
  },
  textInput: {
    position: 'absolute',
    bottom: 70
  },
  saveButton: {
    position: 'absolute',
    bottom: 70
  },
  saveForm:{
    width: '100%',
    height: '100%',
    top: "30%"
  }
});
