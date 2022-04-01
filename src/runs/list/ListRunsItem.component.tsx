import {getRunStatusIcon} from "../../common/utils/Run.utils";
import {ListItem} from "react-native-elements";
import {DATE_FORMAT} from "../../common/utils/Date.utils";
import React, { useEffect, useState } from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {Colors} from "../../common/utils/Color.utils";
import {lastUpdatedRun, runIsMine, runIsNew} from "../../common/utils/MyRuns";
import {AuthContainer} from "../../Provider.component";

export type ListRunsItemComponentProps = {
    run: RunResource,
    onSelectRun: (run: RunResource) => void
}

//use a react PureComponent to limit number of render when used in animated flat list
export function ListRunsItemComponent ({onSelectRun, run} : ListRunsItemComponentProps) {
    const {authenticatedUser} = AuthContainer.useContainer();

    const [isNewOrUpdated, setIsNewOrUpdated] = useState<boolean>();
    const [isNew, setIsNew] = useState<boolean>();

    async function checkIsNewOrUpdated() {
        setIsNewOrUpdated(((await runIsNew(run, authenticatedUser?.id) && runIsMine(run, authenticatedUser?.id)) || lastUpdatedRun(run, authenticatedUser?.id)));
    }

    async function checkIsNew() {
        setIsNew((await runIsNew(run, authenticatedUser?.id) && runIsMine(run, authenticatedUser?.id)));
    }

    useEffect(() => {
        const promise = checkIsNewOrUpdated();

        return () =>{
            Promise.reject(promise);
        }
    }, []);

    useEffect(() => {
        const promise = checkIsNew();

        return () =>{
            Promise.reject(promise);
        }
    }, []);

    if (typeof isNewOrUpdated === "undefined") {
        return null;
    }

    if (typeof isNew === "undefined") {
        return null;
    }

    return (
        <ListItem bottomDivider onPress={() => onSelectRun(run)} containerStyle={ isNewOrUpdated ? {backgroundColor: Colors.GREEN} : false}>
            {getRunStatusIcon(run.status)}
            <ListItem.Content>
                <ListItem.Title style={{fontFamily: 'Montserrat-Medium'}}>{isNew ? "**New** " : ''}{`${run.title.toUpperCase()} ${run.waypoints.get(0)?.nickname}`}</ListItem.Title>
                <ListItem.Subtitle style={{color: Colors.GREY, fontFamily: 'Montserrat-Regular'}}>{
                    run
                        .begin_at
                        .toFormat(DATE_FORMAT)
                }</ListItem.Subtitle>
            </ListItem.Content>

            <ListItem.Chevron color="grey"/>
        </ListItem>
    )
    
}
