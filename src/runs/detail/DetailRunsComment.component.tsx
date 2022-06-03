import {RunResource} from "../../common/resources/Run.resource";
import {Alert, StyleSheet, Text, View} from "react-native";
import React, {Fragment} from "react";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import {InlineTextComponent} from "../../common/component/text/InlineText.component";
import {ImportantTextComponent} from "../../common/component/text/ImportantText.component";
import {Colors} from "../../common/utils/Color.utils";
import {Formik} from "formik";
import {ButtonComponent} from "../../common/component/ButtonComponent";
import {useNavigation} from "@react-navigation/native";

export interface InfoDetailRunsComponentProps {
    currentRun: RunResource
}

    export function DetailRunsCommentComponent({currentRun}: InfoDetailRunsComponentProps) {
    const navigation = useNavigation();

    const onChangePress = () => {
        navigation.navigate('comment', {
            run: currentRun
        });
    }
    return (
        <CardComponentWithIcon title={"Plus d'informations"} icon={"info-circle"}>
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

