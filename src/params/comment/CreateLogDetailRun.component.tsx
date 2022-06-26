import React, {useEffect, useState} from "react";
import {SafeAreaView, View, Text} from "react-native";
import {Formik, FormikHelpers} from "formik";
import {Input} from "react-native-elements";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {RunResource} from "../../common/resources/Run.resource";
import {AuthContainer, NetworkContainer, RunsContainer, VehiclesContainer} from "../../Provider.component";
import {TextInputComponent} from "../../common/component/TextInput.component";
import Axios from "axios";
import {useNavigation} from "@react-navigation/native";
import * as Location from 'expo-location';

export function CreateLogDetailRunsComponent(props: { runId: number}) {
    const {runId} = props;
    const authContainer = AuthContainer.useContainer();
    const navigation = useNavigation();

    const initialValues = {
        description: ""
    }

    /**
     * Ask for permission to access location
     */
    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }
        })();
    })

    let location = Location.getCurrentPositionAsync({})

    const onSubmit = async (values: { description: string }, {setSubmitting, setFieldError}: FormikHelpers<any>) => {
        location.then(async (data) => {
            const {latitude, longitude} = data.coords;
            const response = await Axios.post(`/runs/${runId}/logs`, {
                description: values.description + " - " + latitude + " - " + longitude
            });
            if (response.status === 201) {
                navigation.navigate("list");
            } else {
                setFieldError("description", "Error creating log");
            }
            setSubmitting(false);
        })
    }
    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}>
            {(formik) => (
                <View>
                    <TextInputComponent
                        name={"description"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Votre commentaire"
                        }}/>

                    <ButtonComponent
                        title="Ajouter"
                        onPress={formik.handleSubmit}
                        disabled={formik.isSubmitting || !formik.isValid}/>
                </View>
            )}

        </Formik>
    )
}
