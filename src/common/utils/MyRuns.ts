import {RunResource} from "../resources/Run.resource";
import {DateTime} from "luxon";
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
