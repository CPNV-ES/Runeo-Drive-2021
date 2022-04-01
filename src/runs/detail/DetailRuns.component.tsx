import {ScrollView} from "react-native";
import React, {Fragment, useState, useEffect} from "react";
import {DetailRunsScheduleComponent} from "./DetailRunsSchedule.component";
import {DetailRunsCourseComponent} from "./DetailRunsCourse.component";
import {DetailRunsInfoComponent} from "./DetailRunsInfo.component";
import {DetailRunsRunnersComponent} from "./DetailRunsRunners.component";
import {DetailRunsContactBtn} from "./DetailRunsContactBtn.component";
import {DetailRunsStatusControlBtn} from "./DetailRunsStatusControlBtn";
import {DetailRunsAcknowledgeUpdateComponent} from "./DetailRunsAcknowledgeUpdate.component";
import {useRunFromRouteParam} from "../../common/hook/Run.hook";
import {lastUpdatedRun, runIsMine, runIsNew, detailsChanges, checkScheduleChanges, checkWaypointsChanges, checkInfoChanges, checkRunnersChanges } from "../../common/utils/MyRuns";
import {AuthContainer} from "../../Provider.component";

export function DetailRunsComponent() {
    const currentRun = useRunFromRouteParam();
    const {authenticatedUser} = AuthContainer.useContainer();
    const [isNewOrUpdated, setIsNewOrUpdated] = useState<boolean>();
    const [isMine, setIsMine] = useState<boolean>();
    
    if(currentRun){
        async function checkIsNewOrUpdated() {
            setIsNewOrUpdated(((await runIsNew(currentRun!, authenticatedUser?.id) && runIsMine(currentRun!, authenticatedUser?.id))));
        }

        async function checkIsMine() {
            setIsMine(await runIsMine(currentRun!, authenticatedUser?.id));
        }

        useEffect(() => {
            const promise = checkIsNewOrUpdated();

            return () =>{
                Promise.reject(promise);
            }
        }, []);

        useEffect(() => {
            const promise = checkIsMine();

            return () =>{
                Promise.reject(promise);
            }
        }, []);

        if (typeof isNewOrUpdated === "undefined") {
            return null;
        }

        if (typeof isMine === "undefined") {
            return null;
        }
    
    }else {
        console.error("No run matching provided found for provided run id ")
        return <Fragment/>;
    }

    
    return (
        <ScrollView style={{backgroundColor: 'white'}}>
                   
            {isNewOrUpdated ? <DetailRunsAcknowledgeUpdateComponent setIsNewOrUpdated={setIsNewOrUpdated} currentRun={currentRun}/> : false}

            <DetailRunsStatusControlBtn currentRun={currentRun}/>

            <DetailRunsContactBtn currentRun={currentRun}/>

            <DetailRunsScheduleComponent currentRun={currentRun} highlighted={isNewOrUpdated && checkScheduleChanges(currentRun) ? true : false}/>

            <DetailRunsCourseComponent currentRun={currentRun} highlighted={isNewOrUpdated && checkWaypointsChanges(currentRun) ? true : false}/>

            <DetailRunsInfoComponent currentRun={currentRun} highlighted={isNewOrUpdated && checkInfoChanges(currentRun) ? true : false}/>

            <DetailRunsRunnersComponent currentRun={currentRun} highlighted={isNewOrUpdated && checkRunnersChanges(currentRun) ? true : false}/>
        </ScrollView>
    )
}