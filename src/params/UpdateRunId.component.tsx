import {useNavigation} from "@react-navigation/native";
import {Formik, FormikHelpers} from "formik";
import React, {useEffect} from "react";
import {View, StyleSheet} from "react-native";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {TextInputComponent} from "../../common/component/TextInput.component";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function UpdateRunIdComponent() {

    const navigation = useNavigation();
    const [runId, setRunId] = React.useState("0");

    const onSubmit = async (values: { runId: string }, {setSubmitting, setFieldError}: FormikHelpers<any>) => {
        if(!isNaN(parseInt(values.runId))){
            await AsyncStorage.setItem("@runId", values.runId);
            setRunId(values.runId);
            navigation.navigate("list");
        }
    }

    const initialValues = {
        runId: runId
    }

    useEffect(() => {
        (async () => {
            const runId = await AsyncStorage.getItem("@runId");
            if(runId) {
                setRunId(runId);
            }
            else {
                setRunId("1")
            }
        })();
    })
    return (
        <CardComponentWithIcon title={`Votre id de run choisi : ${runId}`} icon={"info-circle"}>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}>
                        {(formik) => (
                            <View>
                                <TextInputComponent
                                    name={"runId"}
                                    formik={formik}
                                    inputProps={{
                                        placeholder: "Nouveau id de run"
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


