import {VehicleResource,VehiclePhoto} from "../resources/Vehicle.resource";
import Axios from "axios";
import {List} from "immutable";
import {useCacheHelper} from "../utils/CacheHelper.utils";
import {DataContainerInterface} from "./DataContainer.interface";
import {CommentResource} from "../resources/Comment.resource";
import {DateTime} from "luxon";

export interface VehiclesContainer {
    postComment: (vehicle: VehicleResource, comment: string) => void,
    getVehiclePhotos: (vehicle:VehicleResource) => Promise<VehiclePhoto[]>,
    getVehiclePhoto: (vehicle: VehicleResource,vehiclePhotoId:number) => Promise<VehiclePhoto> 
}

export function useVehiclesContainer(): DataContainerInterface<VehicleResource> & VehiclesContainer {
    const cacheHelper = useCacheHelper<VehicleResource>("VEHICLE", parseVehicleResource);
    const refresh = (): Promise<void> => {
        return getVehiclesFromAPi()
            .then(fetchedVehicles => cacheHelper.insertItems(List(fetchedVehicles))).catch(error => error.text);
    }

    const postComment = (vehicle: VehicleResource, comment: string) => postCommentOnVehiculeFromAPI(vehicle, comment)
        .then(comment => {
            const updatedVehicle = {
                ...vehicle,
                comments: vehicle.comments.push(comment)
            }

            return cacheHelper.insertItems(List([updatedVehicle]))
        })
    const getVehiclePhotos = (vehicle: VehicleResource) => getVehiclesPhotosFromAPI(vehicle)
    const getVehiclePhoto= (vehicle: VehicleResource,vehiclePhotoId:number) => getVehiclesPhotoFromAPI(vehicle,vehiclePhotoId)
    return {
        items: cacheHelper.items,
        readFromCache: cacheHelper.readFromCache,
        empty: cacheHelper.empty,
        refresh,
        postComment,
        getVehiclePhotos,
        getVehiclePhoto
    }
}

function getVehiclesFromAPi(): Promise<VehicleResource[]> {
    return Axios.get("/cars").then(res => res.data);
}
function getVehiclesPhotosFromAPI(vehicle: VehicleResource): Promise<VehiclePhoto[]> {
    return Axios.get(`/cars/${vehicle.id}/photos`).then(res => res.data);
}

function postVehiclesPhotoFromAPI(vehicle: VehicleResource,vehiclePhoto: VehiclePhoto): Promise<VehiclePhoto>{
    return Axios.post(`/cars/${vehicle.id}/photos`, {
        
    }).then(res => res.data as VehiclePhoto);
}

function getVehiclesPhotoFromAPI(vehicle: VehicleResource,vehiclePhotoId: number): Promise<VehiclePhoto>{
    return Axios.get(`/cars/${vehicle.id}/photos/${vehiclePhotoId}`).then(res => res.data as VehiclePhoto);
}

function patchVehiclesPhotoFromAPI(vehicle: VehicleResource,vehiclePhoto: VehiclePhoto): Promise<VehiclePhoto>{
    return Axios.patch(`/cars/${vehicle.id}/photos/${vehiclePhoto.id}`, {
        title: vehiclePhoto.title
    }).then(res => res.data as VehiclePhoto);
}

function deleteVehiclesPhotoFromAPI(vehicle: VehicleResource,vehiclePhoto: VehiclePhoto): Promise<VehiclePhoto>{
    return Axios.delete(`/cars/${vehicle.id}/photos/${vehiclePhoto.id}`).then(res => res.data as VehiclePhoto);
}

function parseVehicleResource(vehiclesFromAPi: any): VehicleResource {
    return {
        ...vehiclesFromAPi,
        comments: List(vehiclesFromAPi.comments).map(parseCommentResource)
    }
}

function parseCommentResource(commentFromApi: any): CommentResource {
    return {
        ...commentFromApi,
        created_at: DateTime.fromISO(commentFromApi.created_at),
    }
}

function postCommentOnVehiculeFromAPI(vehicle: VehicleResource, comment: string): Promise<CommentResource> {
    return Axios.post(`/cars/${vehicle.id}/comments`, {
        content: comment
    }).then(res => parseCommentResource(res.data));
}
