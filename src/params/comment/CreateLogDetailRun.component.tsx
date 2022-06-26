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

    const onSubmit = async (values: { description: string }, {setSubmitting, setFieldError}: FormikHelpers<any>) => {
        const data = {
            description: values.description,
            loggable_id : runId,
            loggable_type: "App\\Models\\Run",
            action: "created",
            user_id: authContainer.authenticatedUser?.id
        }

        Axios.post(`/runs/${runId}/logs`, data)
            .then(() => {
                console.log("Log created");
                navigation.navigate("list");
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
