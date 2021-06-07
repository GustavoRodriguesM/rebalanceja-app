import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors, ProgressBar, useTheme } from "react-native-paper";
import BRLCurrencyFormat from "../../utils/BRLCurrencyFormat";

export default (props) => {
  const style = StyleSheet.create({
    component: {
      borderColor: "#1f1f1f", //props.bgColor,
      backgroundColor: "#1f1f1f", //'#161616',
      borderWidth: 1,
      marginTop: Dimensions.get("screen").width * 0.05,
      width: Dimensions.get("screen").width * 0.5,
      height: Dimensions.get("screen").height * 0.15,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10,
      elevation: 4,
    },
    sideStats: {
      marginTop: Dimensions.get("screen").width * 0.05,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  return (
    <View style={style.component}>
      <Text
        style={[
          { fontWeight: "bold", fontSize: 16 },
          useTheme().styles.textStylePrimary,
        ]}
      >
        {props.gridName}
      </Text>
      <Text style={useTheme().styles.textStyle}>
        R$ {BRLCurrencyFormat(props.totalInvestment)}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: Dimensions.get("screen").height * 0.01,
          marginBottom: Dimensions.get("screen").height * 0.01,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={useTheme().styles.textStyle}>Atual</Text>
          <Text style={useTheme().styles.textStyle}> {props.actual || 0}%</Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={useTheme().styles.textStyle}>Objetivo</Text>
          <Text style={useTheme().styles.textStyle}>
            {props.objective || 0}%
          </Text>
        </View>
      </View>
      <ProgressBar
        progress={props.actual / props.objective}
        color={useTheme().colors.primary}
      />
    </View>
  );
};
