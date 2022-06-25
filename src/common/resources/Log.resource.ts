
import {CommonResource} from "./Common.resource";

export interface LogResource extends CommonResource {
    updated_at: string,
    description: string,
    created_at: string,
    action: string
}

