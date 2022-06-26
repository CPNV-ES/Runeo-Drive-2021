import React from "react";
import {View, Text} from "react-native";
import {AuthContainer, UsersContainer} from "../Provider.component";
import {ButtonComponent} from "../common/component/ButtonComponent";
import {TextInputComponent} from "../common/component/TextInput.component";
import {Formik, FormikHelpers} from "formik";
import Axios from "axios";
import {unmountComponentAtNode} from "react-dom";
import {useNavigation} from "@react-navigation/native";


export function UpdateDisplayNameComponent() {

    /**
     * Get current user from the container
     * @type {UsersContainer}
     */
    const authContainer = AuthContainer.useContainer();
    const userContainer = authContainer.authenticatedUser;
    const navigation = useNavigation();


    const initialValues = {
        name: userContainer?.name
    }

    const onSubmit = async (values: { name: string }, {setSubmitting, setFieldError}: FormikHelpers<any>) => {
        Axios.patch(`/users/${userContainer?.id}`, {name: values.name})
            .then(() => {
                authContainer.refreshAuthenticated();
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
                        name={"name"}
                        formik={formik}
                        inputProps={{
                            placeholder: "Votre nom d'affichage"
                        }}/>

                    <ButtonComponent
                        title="Mettre à jour"
                        onPress={formik.handleSubmit}
                        disabled={formik.isSubmitting || !formik.isValid}/>
                </View>
            )}

        </Formik>
    )

}


