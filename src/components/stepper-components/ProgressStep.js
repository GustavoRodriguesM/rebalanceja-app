import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default (props) => {
  if (props.hide) return null;
  return (
    <View style={useTheme().styles.defaultBackgroundWithFlex}>
      {props.children}
    </View>
  );
};
