import {RunResource} from "../../common/resources/Run.resource";
import {StyleSheet, Text} from "react-native";
import React, {Fragment} from "react";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import {InlineTextComponent} from "../../common/component/text/InlineText.component";
import {ImportantTextComponent} from "../../common/component/text/ImportantText.component";
import {Colors} from "../../common/utils/Color.utils";

export interface InfoDetailRunsComponentProps {
    currentRun: RunResource,
    highlighted: Boolean
}

export function DetailRunsInfoComponent({currentRun, highlighted}: InfoDetailRunsComponentProps) {
    return (
        <CardComponentWithIcon title={"Informations"} icon={"info-circle"} 
        style={ highlighted ? { borderWidth: 7, borderStyle: 'solid', borderColor: Colors.GREEN, margin: 5, padding: 10, borderRadius: 10 } :
            { borderWidth: 7, borderStyle: 'solid', borderColor: Colors.WHITE, margin: 5, padding: 10, borderRadius: 10 }}>
             <InlineTextComponent>
                <Text style={styles.textRegular}>Nombre de passager : </Text>
                <ImportantTextComponent>{currentRun.nb_passenger}</ImportantTextComponent>
            </InlineTextComponent>

            <Text style={styles.textInfo}>{currentRun.runinfo}</Text>

            {currentRun.name_contact ? (
                <InlineTextComponent>
                    <Text style={styles.textRegular}>Contact : </Text>
                    <Text style={styles.textContact}>{currentRun.name_contact} {currentRun.num_contact}</Text>
                </InlineTextComponent>
            ) : <Fragment/>}
        </CardComponentWithIcon>
    )
}

const styles = StyleSheet.create({
    textContact: {
        fontFamily: 'Montserrat-Regular',
    },

    textInfo: {
        fontFamily: 'Montserrat-Regular',
        marginTop: 10,
        marginBottom: 10
    },

    textRegular: {
        color: Colors.GREY,
        fontFamily: 'Montserrat-Regular',
    },
});
