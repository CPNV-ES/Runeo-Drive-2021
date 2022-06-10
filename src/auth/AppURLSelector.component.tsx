import React from "react";
import {Formik, FormikHelpers} from "formik";
import * as yup from 'yup';
import {Text, View} from "react-native";
import {TextInputComponent} from "../common/component/TextInput.component";
import {AuthContainer} from "../Provider.component";
import {ButtonComponent} from "../common/component/ButtonComponent";

const DEFAULT_APIURL = "https://runeo.mycpnv.ch/api";

export function AppURLSelectorComponent() {
    const authContainer = AuthContainer.useContainer();
    let initialValues = {
        ApiUrl: ""
    };
    authContainer.getAPIURL().then((url:string) =>{
        initialValues.ApiUrl = url
    });
    const onSubmit = async (values: { ApiUrl: string }, {setSubmitting, setFieldError}: FormikHelpers<any>) => {
        setSubmitting(true);
        await authContainer.updateAPIURL(values.ApiUrl);
    };
    
    return(
        <Formik
            onSubmit={onSubmit}
            validationSchema={
                yup.object().shape({
                    ApiUrl: yup.string().min(5).required()
                })}
            initialValues={initialValues}>
            {(formik) => (
                <View style ={{ marginBottom: 25 }}>
                    <Text style={{fontFamily: 'Montserrat-ExtraBold', marginLeft: 10}}>URL de l'application</Text>
                    <TextInputComponent
                        name={"ApiUrl"}
                        formik={formik}
                        inputProps={{
                            placeholder: DEFAULT_APIURL
                        }}/>

                    <ButtonComponent
                        title="sauvegarder"
                        onPress={formik.handleSubmit}
                        disabled={formik.isSubmitting || !formik.isValid}/>
                </View>
            )}

        </Formik>
    );
};
