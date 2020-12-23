import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import ReadStoryScreen from "./screens/ReadStoryScreen";
import WriteStoryScreen from "./screens/WriteStoryScreen";
import LoginScreen from "./screens/LoginScreen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Write: { screen: WriteStoryScreen },
    Read: { screen: ReadStoryScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        console.log(routeName);
        if (routeName === "Write") {
          return (
            <Image
              source={require("./assets/write.png")}
              style={{ width: 40, height: 40 }}
            />
          );
        } else if (routeName === "Read") {
          return (
            <Image
              source={require("./assets/read.png")}
              style={{ width: 40, height: 40 }}
            />
          );
        }
      },
    }),
  }
);

const SwitchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  TabNavigator: { screen: TabNavigator },
});

const AppContainer = createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
