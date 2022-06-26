import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {AuthContainer, UsersContainer} from "../Provider.component";
import {ButtonComponent} from "../common/component/ButtonComponent";
import {TextInputComponent} from "../common/component/TextInput.component";
import {Formik, FormikHelpers} from "formik";
import Axios from "axios";
import {unmountComponentAtNode} from "react-dom";
import {useNavigation} from "@react-navigation/native";
import {CardComponentWithIcon} from "../common/component/Card.component";


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
        <CardComponentWithIcon title={`Votre nom d'affichage actuel : ${userContainer?.name}`} icon={"info-circle"}>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
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
                </View>
            </View>
        </CardComponentWithIcon>

    )
}
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
    },
    container: {
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
    },
    buttonWrapper: {
        flex: 1,
        padding: 5
    },
    buttonTitle: {
        marginVertical: 5,
    }
})


