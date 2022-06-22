import React, {useState} from "react";
import {RunResource} from "../../common/resources/Run.resource";
import {SwipeListView} from "react-native-swipe-list-view";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from "react-native";


export function LogsDetailRunComponent(props: { currentRun: RunResource }) {
    const {currentRun} = props;
    console.log(currentRun.getLogs);

    const [listData, setListData] = useState(
        Array(20)
            .fill('')
            .map((_, i) => ({key: `${i}`, text: `item #${i}`}))
    );

    /**
     * On swipe row, delete the row
     * @param rowMap
     * @param rowKey
     */
    const onSwipeDeleteElement = (rowMap: string, rowKey: string) => {
        //TODO: delete the row
    }

    /**
     * Render Item listed in the data source
     * @param listData
     */
    const renderItem = listData => (
        <TouchableHighlight
            onPress={() => console.log(`I have been clicked ${listData.item.text}`)}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>{listData.item.text}</Text>
            </View>
        </TouchableHighlight>
    );

    /**
     * Render the hidden buttons in each row.
     * @param listData
     * @param rowMap
     */
    const renderHiddenItem = ({listData}, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => console.log("Right button")}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-75}
                leftOpenValue={0}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />
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