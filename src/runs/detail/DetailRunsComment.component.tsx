import {RunResource} from "../../common/resources/Run.resource";
import {Alert, StyleSheet, Text, View} from "react-native";
import React, {Fragment, useEffect} from "react";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export interface InfoDetailRunsComponentProps {
    currentRun: RunResource
}

export function DetailRunsCommentComponent() {
    const navigation = useNavigation();

    const onChangePress = async () => {
        const runIdFromStorage = await AsyncStorage.getItem("@runId");
        navigation.navigate("comment", {runId: runIdFromStorage});
    }
    return (
        <CardComponentWithIcon title={`Plus d'informations pour le run choisis`} icon={"info-circle"}>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <ButtonComponent titleStyle={styles.buttonTitle} title="Commentaires" onPress={onChangePress}/>
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

