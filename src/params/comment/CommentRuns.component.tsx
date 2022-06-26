import React, {Fragment, useState} from "react";
import {ScrollView} from "react-native";
import {LogsDetailRunComponent} from "./LogsDetailRun.component";
import {useRoute} from "@react-navigation/native";
import {RunsContainer} from "../../Provider.component";
import {RunDetailParams} from "../../runs/Runs.component";
import {CreateLogDetailRunsComponent} from "./CreateLogDetailRun.component";

export function CommentRunsComponent() {
    const runsContainer = RunsContainer.useContainer();

    const route = useRoute();
    const {runId} = route.params as RunDetailParams;


    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <LogsDetailRunComponent runId={runId}/>
            <CreateLogDetailRunsComponent runId={runId}/>
        </ScrollView>
    );
}
