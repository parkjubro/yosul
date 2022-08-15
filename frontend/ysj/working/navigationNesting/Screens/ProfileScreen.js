import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MyPosts from "../components/Profile/MyPost";
import UserProfile from "../components/Profile/UserProfile";

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>넣을 화면</Text>
    </View>
  );
}

//   <View style={styles.container}>
//   <View style={styles.logoContainer}>
//       <Image source={{uri:INSTAGRAM_LOGO, height:100, width:100}} />
//   </View>
//   <LoginForm navigation={navigation}/>
// </View>
const ProfileScreen = () => {
  return (
      <View style={styles.containertop}>
        <UserProfile />
        <Tab.Navigator
          screenOptions={() => ({
            tabBarActiveTintColor: "#C0E8E0",
            tabBarInactiveTintColor: "grey",
            swipeEnabled: true,
            adaptive: true,
            tabBarIndicatorStyle: {
              backgroundColor: "white",
            },
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: "900",
            },
          })}
        >
          <Tab.Screen name="내가 쓴 글" component={MyPosts} />
          <Tab.Screen name="게시물 다시보기" component={HomeScreen} />
          <Tab.Screen name="찜한 전통주" component={HomeScreen} />
        </Tab.Navigator>
      </View>
  );
};

const styles = StyleSheet.create({
  containertop: {
    paddingTop:
      Platform.OS === "ios"
        ? Constants.statusBarHeight
        : StatusBar.currentHeight,
      flex:1
  },
  container: {
    backgroundColor: "gray",
    flex: 1,
  },
  ProfileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom:60
  },
});

export default ProfileScreen;
