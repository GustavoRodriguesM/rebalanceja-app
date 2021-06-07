import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useTheme, IconButton, Colors, Badge } from "react-native-paper";

export default (props) => {
  return (
    <>
      <View style={style.component}>
        <Text style={useTheme().styles.textStyle}>Olá, {props.name}</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Badge
            size={10}
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              backgroundColor: "#fff",
            }}
          ></Badge>
          <IconButton
            icon={"bell"}
            color={useTheme().colors.primary}
            size={20}
            onPress={() => console.log("Pressed")}
          />
        </View>
      </View>
      <Text
        style={[
          useTheme().styles.textStyle,
          { paddingLeft: Dimensions.get("screen").width * 0.05 },
        ]}
      >
        Bem vindo!
      </Text>
    </>
  );
};

const style = StyleSheet.create({
  component: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Dimensions.get("screen").width * 0.05,
    paddingLeft: Dimensions.get("screen").width * 0.05,
    paddingRight: Dimensions.get("screen").width * 0.05,
  },
});
