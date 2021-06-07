import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default (props) => {
  return (
    <Button
      mode="contained"
      loading={props.isLoading}
      disabled={props.isLoading}
      style={[
        { backgroundColor: useTheme().colors.primary },
        useTheme().styles.textStyle,
      ]}
      onPress={props.onPress}
    >
      {props.title}
    </Button>
  );
};
