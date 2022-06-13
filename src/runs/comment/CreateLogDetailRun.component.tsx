import React, {useState} from "react";
import {SafeAreaView, View, Text} from "react-native";
import {Formik} from "formik";
import {Input} from "react-native-elements";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {RunResource} from "../../common/resources/Run.resource";
import {NetworkContainer, RunsContainer, VehiclesContainer} from "../../Provider.component";

export function CreateLogDetailRunsComponent(props: { currentRun: RunResource}) {
    const runsContainer = RunsContainer.useContainer();
    const networkContainer = NetworkContainer.useContainer();
    const {currentRun} = props;

    return (
        <SafeAreaView>
            <View>
                <Formik
                    initialValues={{content: ''}}
                    onSubmit={(value, {resetForm}) => {
                        runsContainer.postLog(currentRun, value.content).then(r => {
                            resetForm();
                        });
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View style={{paddingHorizontal: 10}}>
                            <Input
                                onChangeText={handleChange('content')}
                                onBlur={handleBlur('content')}
                                value={values.content}
                                placeholder='Ajouter une entrée'
                            />
                            <ButtonComponent disabled={!networkContainer.isInternetReachable} onPress={handleSubmit}
                                             title='Ajouter'/>
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    );
}
