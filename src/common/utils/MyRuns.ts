/*
    Check if the run was updated during the last hour
*/

import {RunResource} from "../resources/Run.resource";
import {DateTime} from "luxon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {List} from "immutable";

export function lastUpdatedRun(run :RunResource, userId: any): boolean {
    const ONE_HOUR = 60 * 60 * 1000;
    let now = DateTime.local();
    
    //the run was updated during the last hour
    if((now - run.updated_at) < ONE_HOUR){
        //the run was not acknowledged after the last update
        if(isNaN(run.acknowledged_at) || run.updated_at > run.acknowledged_at){
            //the runner object the authenticated user is driving
            return !!run.runners.find(runner => runner.user?.id === userId);
        } 
        return false;
    }
    
    return false;
}

//Check if the run is for the logged user and if it is new
export function runIsMine(run: RunResource, userId: any) {
    return !!run.runners.find(runner => runner.user?.id == userId);
}

//Check if the run is for the logged user and if it is new
export async function runIsNew(run: RunResource, userId: any): Promise<boolean> {
    const getMyRunsList = await AsyncStorage.getItem('myRuns');
    if (!getMyRunsList) {
        return true;
    }

    const myRunsList: RunResource[] = JSON.parse(getMyRunsList!);
    for (let i = 0; i < myRunsList.length; i++) {
        if (myRunsList[i].id != run.id) {
            return true;
        }else{
            return false;
        }
    }
    return false;
}


//Check the fields changes

//function that check the schedule differences between the run and the same run of myRunsList
export async function checkScheduleChanges(run: RunResource): boolean {	
    await AsyncStorage.getItem('myRuns').then((myRuns) => {
        if(myRuns){
            const myRunsList: any[] = JSON.parse(myRuns!);
            if(myRunsList){
                for (let i = 0; i < myRunsList.length; i++) {
                    if (myRunsList[i].id == run.id) {
                        console.log(myRunsList[i].begin_at+" "+run.begin_at);
                        if (myRunsList[i].begin_at != run.begin_at) {
                            return true;
                        }else{
                            return false;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    });
}	

//function that check the waypoints differences between the run and the same run of myRunsList
export async function checkWaypointsChanges(run: RunResource) : boolean {
    await AsyncStorage.getItem('myRuns').then((myRuns) => {
        if(myRuns){
            const myRunsList: any[] = JSON.parse(myRuns!);
            if(myRunsList){
                for (let i = 0; i < myRunsList.length; i++) {
                    if (myRunsList[i].id != run.id) {
                        //for each waypoints of the run and each waypoints of the storedRun
                        run.waypoints.forEach((wp, index) => {
                            const wp2 = myRunsList[i].waypoints[index];
                            if(wp.nickname != wp2.nickname){
                                return true;
                            }
                            return false;
                        });
                    }
                    return false;
                }
            }
            return true;
        }
        return true;
    });
    

}

//Function that checks the run informations differences between the run and the same run of myRunsList
export async function checkInfoChanges(run: RunResource): boolean {
    await AsyncStorage.getItem('myRuns').then((myRuns) => {
        if(myRuns){
            const myRunsList: any[] = JSON.parse(myRuns!);
            const storedRun: RunResource = myRunsList.find((r) => r.id == run.id);

            if(storedRun){
                if(storedRun.nb_passenger != run.nb_passenger){
                    return true;
                }
                if(storedRun.runinfo != run.runinfo){
                    return true;
                }
                if(storedRun.name_contact != run.name_contact){
                    return true;
                } 
                if(storedRun.num_contact != run.num_contact){
                    return true;
                }
               
                return true;
            }
        }
        return true;
    });  
}

//Function that checks the runners and vehicles differences between the run and the same run of myRunsList
export async function checkRunnersChanges(run: RunResource): boolean {
    await AsyncStorage.getItem('myRuns').then((myRuns) => {
        if(myRuns){
            const myRunsList: any[] = JSON.parse(myRuns!);
            const storedRun: RunResource = myRunsList.find((r) => r.id == run.id);

            if(storedRun){
                //for each runners of the run and each runners of the storedRun
                run.runners.forEach((r, index) => {
                    const r2 = storedRun.runners[index];
                    if(r.user?.id != r2.user?.id){
                        return true;
                    }
                    if(r.vehicle_category?.type != r2.vehicle_category?.type){
                        return true;
                    }
                    if(r.vehicle?.id != r2.vehicle?.id){
                        return true;
                    }
                });
                
                return false;
            }
        }
        return true;
    });  
}
