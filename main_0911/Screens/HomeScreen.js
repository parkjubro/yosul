import React, { useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  View,
  Dimensions,
  StatusBar,
  Animated,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import firebase from "../firebase";
import { regionCode } from "../regionCode";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const images = {
  "그린영농조합": require('../assets/brewery/greenyoungnong.png'),
  "밝은세상영농조합": require('../assets/brewery/balguensaesang.png'),
  "배상면주가" : require('../assets/brewery/baesangmyeon.png'),
  "배혜정도가": require('../assets/brewery/baehyejungdoga.png'),
  "산머루농원": require('../assets/brewery/sanmeoru.png'),
  "술샘": require('../assets/brewery/soolsam1.png'),
  "좋은술":require('../assets/brewery/joeunsool.png'),
};

const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState("경기도");
  const [areaCode, setAreaCode] = useState("31");
  const [breweryInfo, setBreweryInfo] = useState([]);
  const [filteredBreweryInfo, setFilteredBreweryInfo] = useState([]);
  const globalCollection = firebase.firestore().collection("global");

  const getBreweryInfo = async () => {
    const dataSnapShot = (await globalCollection.doc("breweries").get()).data();
    const data = [];
    data.push(Object.values(dataSnapShot));
    setBreweryInfo(data[0]);
    // console.log(breweryInfo);
  };

  const getRegion = (text) => {
    setRegion(text);
    for (let i = 0; i < regionCode.length; i++) {
      if (text === regionCode[i]["name"]) {
        setAreaCode(regionCode[i]["code"]);
        break;
      }
    }
    filterBreweryInfo(areaCode);
  };

  const filterBreweryInfo = () => {
    const data1 = [];
    for (let i = 0; i < breweryInfo.length; i++) {
      if (breweryInfo[i]["areaCode"] === areaCode) {
        data1.push({ ...breweryInfo[i] });
      }
    }
    data1.sort(function compare(a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    const data2 = []
    for (var d of data1){
      let key = d['name']
        data2.push({...d, ...{image: images[d['name']]}})
      }
      
    setFilteredBreweryInfo(data2);
  };

  useEffect(() => {
    getBreweryInfo();
  }, []);

  useEffect(() => {
    filterBreweryInfo(areaCode);
  }, [breweryInfo]);

  console.log(filteredBreweryInfo.image);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-width * 0.8, 0, width * 0.8],
    });
    return (
      <View style={{ width, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.framestyle}>
          <Pressable
            style={styles.imagewrapper}
            onPress={() =>
              navigation.push("BreweryDetailScreen", {
                id: index,
                item: item,
              })
            }
          >
            <Animated.Image
              source={ item.image }
              style={{ ...styles.imagestyle, transform: [{ translateX }] }}
            />
          </Pressable>
        </View>
        <View style={{ marginTop: 5, marginRight: 110 }}>
          <Text style={{ fontSize: 8, color: "#444" }}>
            출처 : 카카오맵 로드뷰 (https://map.kakao.com)
          </Text>
        </View>
        <View style={styles.brewery_info}>
          <Text style={styles.activityText}>{item.activityName}</Text>
          <Text style={styles.breweryName}>{item.name}</Text>
        </View>
        <View style={{ top: -15 }}>
          <TouchableOpacity
            onPress={
              // (text) => setRegion(text) 우선 변경 안되게
              console.log("지역변경")
            }
          >
            <Text style={styles.areaText}>{region}</Text>
          </TouchableOpacity>
          {/* <Button title="변경" onPress={() => getRegion(region)}></Button> */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={filteredBreweryInfo.slice(0, 7)}
        keyExtractor={(item, index) => index}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop:
      Platform.OS === "ios"
        ? getStatusBarHeight(true)
        : StatusBar.currentHeight,
  },
  today_brewery: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  width: {
    flexDirection: "row",
    width: width,
    // paddingLeft: 10,
    justifyContent: "center",
  },
  brewery_photo: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  brewery_info: {
    // position: "absolute",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
    marginBottom: 30,
  },
  activityText: {
    // backgroundColor: "red",
    color: "gray",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "400",
  },
  breweryName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  today_beer: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 50,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  beer_photo: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  beer_info: {
    marginLeft: 30,
    justifyContent: "center",
  },
  underbar: {
    marginTop: 35,
    marginBottom: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  imagestyle: {
    width: ITEM_WIDTH * 1.2,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  imagewrapper: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 18,
    // backgroundColor: "black",
  },
  framestyle: {
    borderRadius: 18,
    padding: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  area: {
    marginTop: 15,
    position: "absolute",
    right: width * 0.435,
    paddingTop: width * 0.1,
  },
  areaText: {
    fontSize: 17,
    opacity: 0.35,
    alignItems: "center",
  },
});

export default HomeScreen;
