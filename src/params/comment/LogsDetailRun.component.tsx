import React, {useEffect, useState} from "react";
import {RunsContainer} from "../../Provider.component";
import {SwipeListView} from "react-native-swipe-list-view";
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,} from "react-native";
import {LogResource} from "../../common/resources/Log.resource";
import {RunResource} from "../../common/resources/Run.resource";
import Axios from "axios";
import {useNavigation} from "@react-navigation/native";


export function LogsDetailRunComponent(props: { runId: number }) {

    /**
     * @type {RunResource}
     * @memberof LogsDetailRunComponent
     * @description current run
     */
    const runsContainer = RunsContainer.useContainer();
    const {runId} = props;
    const [logs, setLogs] = useState<LogResource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    /**
     * Render a row of logs in the list view
     * @param {LogResource} log
     */
    const renderRow = (log: LogResource) => (
        <TouchableHighlight
            onPress={() => {
                console.log("Pressed row:", log.item.id);
                }
            }
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>{log.item.description}</Text>
            </View>
        </TouchableHighlight>
    )

    const deleteRow = (logId: number) => {
        return Axios.delete(`/runs/${runId}/logs/${logId}`).then(() => {
            console.log("Deleted row:", logId);
            navigation.navigate("list");
        })
    }

    /**
     * Render Hidden row in SwipeListView
     * @param {any} data
     */
    const renderHiddenItem = (data: any) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() =>  deleteRow(data.item.id)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    )

    /**
     * Get logs of current run
     */
    useEffect(() => {
        runsContainer.getLogs(runId).then((logs) => {
            setLogs(logs);
            setIsLoading(false);
        })
    });
    return (
        <View>
            {isLoading ? <Text>Loading...</Text> :
                <View style={styles.container}>
                    <SwipeListView
                        data={logs}
                        renderItem={renderRow}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-75}
                        leftOpenValue={0}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                    />
                </View>
            }
        </View>
    );
}


/**
 * Stylesheet for the component
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisible: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#ddd',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    trash: {
        width: 25,
        height: 25,
        marginRight: 7,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 5,
    },
    details: {
        fontSize: 12,
        color: '#999',
    },
});