import React, { useCallback, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import { WalletService } from "../services/WalletService";
import { useFocusEffect } from "@react-navigation/core";
import AquisitionConfigSubscreen from "./subscreens/stock-screen/AquisitionConfigSubscreen";
import { useTheme } from "react-native-paper";
import AquisitionFixedIncomeSubscreen from "./subscreens/stock-screen/AquisitionFixedIncomeSubscreen";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import NewVariableIncomeSubscreen from "./subscreens/stock-screen/variable-income/NewVariableIncomeSubscreen";
import AlterVariableIncomeSubscreen from "./subscreens/stock-screen/variable-income/AlterVariableIncomeSubscreen";

const Stack = createStackNavigator();

export default (props) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchMyAPI();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMyAPI();
    }, [])
  );

  const fetchMyAPI = async () => {
    let walletLocal = await new WalletService().getActiveWallet();
    setDescription(walletLocal.description);
  };

  return (
    <Stack.Navigator
      initialRouteName={"AquisitionConfigSubscreen"}
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        activeTintColor: useTheme().colors.primary,
        contentContainerStyle: {
          backgroundColor: useTheme().colors.viewBackground,
        },
      }}
    >
      <Stack.Screen
        name="AquisitionConfigSubscreen"
        component={AquisitionConfigSubscreen}
      />

      <Stack.Screen
        name="AquisitionFixedIncomeSubscreen"
        component={AquisitionFixedIncomeSubscreen}
      />

      <Stack.Screen
        name="NewVariableIncomeSubscreen"
        component={NewVariableIncomeSubscreen}
      />
      <Stack.Screen
        name="AlterVariableIncomeSubscreen"
        component={AlterVariableIncomeSubscreen}
      />
    </Stack.Navigator>
  );
};
