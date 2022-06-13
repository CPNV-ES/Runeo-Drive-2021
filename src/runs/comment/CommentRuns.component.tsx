import React, {useState} from "react";
import {ScrollView} from "react-native";
import {LogsDetailRunComponent} from "./LogsDetailRun.component";
import {useRoute} from "@react-navigation/native";
import {RunsContainer} from "../../Provider.component";
import {RunDetailParams} from "../Runs.component";

export function CommentRunsComponent() {
    const runsContainer = RunsContainer.useContainer();

    const route = useRoute();
    const {runId} = route.params as RunDetailParams;

    const currentRun = runsContainer.items.find(run => run.id === runId)

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <LogsDetailRunComponent currentRun={currentRun}/>
        </ScrollView>
    );
}
