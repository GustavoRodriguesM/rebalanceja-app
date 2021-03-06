import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import {
  useTheme,
  Appbar,
  Portal,
  FAB,
  Provider,
  Snackbar,
  Image,
} from "react-native-paper";
import { WalletService } from "../../../services/WalletService";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AquisitionListSubscreen from "./AquisitionListSubscreen";
import { AquisitionService } from "../../../services/AquisitionService";
import Toast from "react-native-toast-message";

const Tab = createMaterialTopTabNavigator();

export default (props) => {
  const [description, setDescription] = useState([]);

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const fetchMyAPI = async () => {
    let walletLocal = await new WalletService().getActiveWallet();
    setDescription(walletLocal.description);
  };

  useEffect(() => {
    fetchMyAPI();
  }, []);

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      fetchMyAPI();
    });
  }, []);

  return (
    <>
      <View
        style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}
      >
        <View style={{ height: Dimensions.get("window").height }}>
          <Appbar.Header>
            <Appbar.Content
              title={description}
              subtitle={"Ativos"}
              style={[{ alignItems: "center" }, useTheme().styles.textStyle]}
            />
          </Appbar.Header>
          <Tab.Navigator
            initialRouteName="AquisitionsCategory1"
            tabBarOptions={{
              indicatorStyle: {
                backgroundColor: useTheme().colors.primary,
              },
              scrollEnabled: true,
              activeTintColor: useTheme().colors.primary,
              contentContainerStyle: {
                backgroundColor: useTheme().colors.viewBackground,
              },
            }}
          >
            <Tab.Screen
              name="AquisitionsCategory1"
              options={{ title: "A????es" }}
              component={AquisitionListSubscreen}
              initialParams={{ idCategory: 1 }}
            />
            <Tab.Screen
              name="AquisitionsCategory2"
              options={{ title: "FIIs" }}
              component={AquisitionListSubscreen}
              initialParams={{ idCategory: 2 }}
            />
            <Tab.Screen
              name="AquisitionsCategory3"
              options={{ title: "Stocks" }}
              component={AquisitionListSubscreen}
              initialParams={{ idCategory: 3 }}
            />
            <Tab.Screen
              name="AquisitionsCategory4"
              options={{ title: "REITs" }}
              component={AquisitionListSubscreen}
              initialParams={{ idCategory: 4 }}
            />
            <Tab.Screen
              name="AquisitionsCategory5"
              options={{ title: "Renda Fixa" }}
              component={AquisitionListSubscreen}
              initialParams={{ idCategory: 5 }}
            />
            <Tab.Screen
              name="AquisitionsCategory6"
              options={{ title: "Criptomoeda" }}
              component={AquisitionListSubscreen}
              initialParams={{ idCategory: 6 }}
            />
          </Tab.Navigator>
        </View>
        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={"plus"}
              color={useTheme().colors.viewBackground}
              fabStyle={{
                backgroundColor: useTheme().colors.primary,
              }}
              actions={[
                {
                  icon: require("../../../../assets/imgs/variable-income-icon.png"),
                  label: "Renda vari??vel",
                  onPress: async () => {
                    if (!(await new AquisitionService().permitAdd())) {
                      onStateChange({ open: false });
                      Toast.show({
                        type: "error",
                        position: "bottom",
                        text1: "Poxa!",
                        text2: "Para adicionar mais ativos, mude seu plano!",
                      });
                      return;
                    }
                    let wallet = await new WalletService().getActiveWallet();
                    props.navigation.navigate("NewVariableIncomeSubscreen", {
                      idWallet: wallet.idWallet,
                    });
                  },
                },
                {
                  icon: require("../../../../assets/imgs/fixed-income-icon.png"),
                  label: "Renda fixa",
                  onPress: async () => {
                    if (!(await new AquisitionService().permitAdd())) {
                      onStateChange({ open: false });
                      Toast.show({
                        type: "error",
                        position: "bottom",
                        text1: "Poxa!",
                        text2: "Para adicionar mais ativos, mude seu plano!",
                      });
                      return;
                    }
                    let wallet = await new WalletService().getActiveWallet();
                    props.navigation.navigate(
                      "AquisitionFixedIncomeSubscreen",
                      { idWallet: wallet.idWallet }
                    );
                  },
                },
              ]}
              onStateChange={onStateChange}
              onPress={async () => {}}
            />
          </Portal>
        </Provider>
      </View>
    </>
  );
};

//{getStockListCard()}
