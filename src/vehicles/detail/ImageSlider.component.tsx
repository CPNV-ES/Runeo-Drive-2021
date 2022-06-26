import React,{ useEffect, useState } from "react";
import {View, Image,ScrollView,Dimensions,Text,StyleSheet} from 'react-native'
import {VehicleResource,VehiclePhoto} from "../../common/resources/Vehicle.resource";
import {VehiclesContainer} from "../../Provider.component"
import Axios from "axios";


const {width} = Dimensions.get("window");
const height = width * 0.6
export interface commentDetailVehiclesComponentProps {
    currentVehicle: VehicleResource
}
//taken from the following video: https://www.youtube.com/watch?v=otr_x0wKgvU
export function ImageSliderComponent({currentVehicle}: commentDetailVehiclesComponentProps) {
    const vehiclesContainer = VehiclesContainer.useContainer();
    var state = {
        active: 0
    }
    const [isLoading, setLoading] = useState(true);
    const [photos, setPhotos] = useState(new Array<VehiclePhoto>());
    useEffect(() => {
        if(isLoading){
            vehiclesContainer.getVehiclePhotos(currentVehicle)
            .then((response) => {
                setPhotos(response)
                setLoading(false)
                console.log(photos)
            })
        }
    },)
    return (
        <View>
            {isLoading ? <Text>Loading...</Text> :
                <View style={styles.container}>
                    <ScrollView 
                        pagingEnabled 
                        showsHorizontalScrollIndicator={false} 
                        horizontal 
                        style ={styles.scrollView}
                        onScroll={(e)=> state.active = Math.ceil(e.nativeEvent.contentOffset.x/e.nativeEvent.layoutMeasurement.width)}
                    >
                        {photos.map((photo:VehiclePhoto,index:number) => (
                            <Image
                            key={index}
                            source={{uri: photo.url}}
                            style={styles.photo}/>
                        ))}
                    </ScrollView>
                    <View style={styles.pagination}>
                    {photos.map((photo:any,index:number) => (
                            <Text key={index} style={index==state.active ? styles.pagingActiveText:styles.pagingText}>⬤</Text>
                    ))}
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{ width,height },
    scrollView:{ width,height },
    photo:{width,height,resizeMode:'cover'},
    pagination:{ flexDirection:'row',position:'absolute',bottom:0,alignSelf:'center' },
    pagingText:{color:"#888", margin: 3},
    pagingActiveText:{color:"#fff", margin: 3}
})

