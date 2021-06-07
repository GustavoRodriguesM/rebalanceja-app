import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FinancialSupportSubscreen from "./subscreens/investiment-screen/FinancialSupportSubscreen";
import RebalancingSubscreen from "./subscreens/investiment-screen/RebalancingSubscreen";

const Stack = createStackNavigator();

export default (props) => {
  return (
    <Stack.Navigator
      initialRouteName="RebalancingSubscreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="RebalancingSubscreen"
        component={RebalancingSubscreen}
      />
      <Stack.Screen
        name="FinancialSupportSubscreen"
        component={FinancialSupportSubscreen}
      />
    </Stack.Navigator>
  );
};
