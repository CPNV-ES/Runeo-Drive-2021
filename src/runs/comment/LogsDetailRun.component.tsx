import React, {} from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {SwipeListView} from "react-native-swipe-list-view";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
} from "react-native";


export function LogsDetailRunComponent(props: { currentRun: RunResource}) {
    const {currentRun} = props;
    console.log(currentRun.logs);
    const listData = Array(20)
        .fill("")
        .map((_, i) => ({ key: `${i}`, text: `${i}` }));

    return (
        <SwipeListView
            data={listData}
            renderItem={({ item }) => (
                <View style={styles.rowFront}>
                    <Text>{item.text}</Text>
                </View>
            )}
            renderHiddenItem={({ item }) => (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <Text>Right</Text>
                </View>
            )}
        />
    );
}

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