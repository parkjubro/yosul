import React, { useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
    Dimensions
} from 'react-native';

const sampleData = new Array(100).fill(0);
const window = Dimensions.get("window");

// FlatList props에 대해 더 알아보기

function CollapsibleFlatList (props) {
    const { headerHeight, tabBarHeight, tabRoute, listArrRef, isTabFocused } = props;

    // 띄울 데이터
    const renderItem = useCallback(({item, index})=>{
        return (
            <View style={{ ...styles.itemContainer, backgroundColor: index % 2 === 0? "#587498": "#E86850" }}>
                <Text style={styles.itemText}>
                    {index}
                </Text>
            </View>
        );
    }, []);

    // 키 값을 가져옴(내 게시물 : 1, 찜한 게시물 : 2, 내 전통주 : 3)
    const keyExtractor = useCallback((item, index) => index.toString(), []);

    // 띄울 화면
    return (
        <View style={styles.rootContainer}>
            <Animated.FlatList
                ref={(ref)=>{ // 현재 인덱스를 foundIndex로 받음
                    let foundIndex = listArrRef.current.findIndex((e) => e.key === tabRoute.key);

                    if (foundIndex === -1) {
                        listArrRef.current.push({
                            key: tabRoute.key,
                            value: ref
                        });
                    } else {
                        listArrRef.current[foundIndex] = {
                            key: tabRoute.key,
                            value: ref
                        }
                    }
                }}
                data={sampleData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={{
                    paddingTop: headerHeight,
                    minHeight: window.height + headerHeight - tabBarHeight
                }}
                scrollEventThrottle={16}
                onScroll={
                    isTabFocused?
                    Animated.event(
                    [{ nativeEvent: { contentOffset: { y: props.scrollY } } }],
                    { useNativeDriver: true }
                    ):
                    null
                }
                onMomentumScrollBegin={props.onMomentumScrollBegin}
                onMomentumScrollEnd={props.onMomentumScrollEnd}
                onScrollEndDrag={props.onScrollEndDrag}
                bounces={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    itemContainer: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    itemText: {
        fontSize: 25,
        color: "#FFD800"
    },
});

export default CollapsibleFlatList;