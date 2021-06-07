import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import BRLCurrencyFormat from "../../utils/BRLCurrencyFormat";
import { useTheme } from "react-native-paper";

export default (props) => {
  const style = StyleSheet.create({
    component: {
      marginTop: Dimensions.get("screen").width * 0.05,
      width: Dimensions.get("screen").width * 0.8,
      height: Dimensions.get("screen").height * 0.1,
      padding: 10,
      marginLeft: Dimensions.get("screen").width * 0.1,
      marginRight: Dimensions.get("screen").width * 0.1,
      borderRadius: 10,
    },
    centerComponent: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    totalInvestments: {
      fontSize: 24,
      fontWeight: "bold",
    },
    sideStats: {
      marginTop: Dimensions.get("screen").width * 0.01,
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  return (
    <View style={style.component}>
      <View style={style.centerComponent}>
        <Text style={[useTheme().styles.textStyle, style.totalInvestments]}>
          R$ {BRLCurrencyFormat(props.totalInvestments)}
        </Text>
        <View style={style.sideStats}>
          <Text style={useTheme().styles.textStylePrimary}>
            Total em investimentos
          </Text>
          <Text style={useTheme().styles.textStylePrimary}>
            {props.walletDescription}
          </Text>
        </View>
      </View>
    </View>
  );
};
