import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Main from "./Login/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login/LoginScreen";
import { render } from "react-dom";

const Stack = createStackNavigator();

export default function App({}) {
  const [font, setFont] = useState(false);
  useEffect(() => {
    async function setFont() {
      setFont = await Font.loadAsync({
        Library: require("./assets/fonts/library.ttf"),
      });
    }
    setFont(true);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./logo3.png")}></Image>
      <Text style={styles.logoText}>여술램프</Text>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback
        style={styles.loginBox}
        onPress={() => {
          LoginScreen;
        }}
      >
        <Image
          source={require("./kakao_login_medium_narrow.png")}
          onLoadEnd={() => setIsLoading({ loading: true })}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0E8E0",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 250,
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Library",
    marginTop: 20,
    marginBottom: 200,
  },
  // loginBox: {
  //   flex: 0.5,
  //   marginTop: 100,
  //   marginBottom: 20,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
