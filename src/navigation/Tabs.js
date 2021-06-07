import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import HomeScreen from "../screens/HomeScreen";
import InvestmentScreen from "../screens/InvestmentScreen";
import StockScreen from "../screens/StockScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useTheme } from "react-native-paper";

const BottomTabs = createBottomTabNavigator();

export default (props) => {
  return (
    <>
      <BottomTabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "HomeScreen":
                iconName = "home";
                break;
              case "InvestmentScreen":
                iconName = "balance-scale";
                break;
              case "StockScreen":
                iconName = "dollar-sign";
                break;
              case "ProfileScreen":
                iconName = "user-alt";
                break;
            }

            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeBackgroundColor: useTheme().colors.tabsMenu.active,
          inactiveBackgroundColor: useTheme().colors.tabsMenu.inactive,
          activeTintColor: "#fff",
          inactiveTintColor: useTheme().colors.tabsMenu.inactiveTintColor,
          showLabel: true,
          labelStyle: {
            marginBottom: 5,
          },
          style: {
            borderTopWidth: 0,
            height: Dimensions.get("screen").height * 0.07,
          },
        }}
      >
        <BottomTabs.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Início" }}
        />
        <BottomTabs.Screen
          name="InvestmentScreen"
          component={InvestmentScreen}
          options={{ title: "Rebalancear" }}
        />
        <BottomTabs.Screen
          name="StockScreen"
          component={StockScreen}
          options={{ title: "Ativos" }}
        />
        <BottomTabs.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: "Perfil" }}
        />
      </BottomTabs.Navigator>
    </>
  );
};
