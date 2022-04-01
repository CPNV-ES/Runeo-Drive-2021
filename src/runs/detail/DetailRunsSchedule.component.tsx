import {Text} from "react-native";
import React from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {DATE_FORMAT} from "../../common/utils/Date.utils";
import {CardComponentWithIcon} from "../../common/component/Card.component";
import {InlineTextComponent} from "../../common/component/text/InlineText.component";
import {ImportantTextComponent} from "../../common/component/text/ImportantText.component";
import {Colors} from "../../common/utils/Color.utils";

export interface DetailRunsScheduleComponent {
    currentRun: RunResource,
    highlighted: Boolean
}

export function DetailRunsScheduleComponent({currentRun, highlighted}: DetailRunsScheduleComponent) {
    return (
        <CardComponentWithIcon title={"Horaires"} icon={"clock"} 
            style={ highlighted ? { borderWidth: 7, borderStyle: 'solid', borderColor: Colors.GREEN, margin: 5, padding: 10, borderRadius: 10 } :
                { borderWidth: 7, borderStyle: 'solid', borderColor: Colors.WHITE, margin: 5, padding: 10, borderRadius: 10 }}>
            <InlineTextComponent>
                <Text>Prévu </Text>
                <ImportantTextComponent>{currentRun.begin_at.toFormat(DATE_FORMAT)}</ImportantTextComponent>
            </InlineTextComponent>
        </CardComponentWithIcon>
    )
}


