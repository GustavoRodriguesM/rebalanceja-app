import React from "react";
import { Dimensions } from "react-native";
import { Divider, List, useTheme } from "react-native-paper";

export default (props) => {
  return (
    <>
      <List.Item
        titleStyle={{
          color: useTheme().colors.text,
          marginLeft: Dimensions.get("screen").width * 0.05,
        }}
        descriptionStyle={{
          color: useTheme().colors.text,
          marginLeft: Dimensions.get("screen").width * 0.05,
        }}
        style={{ padding: 0, margin: 0 }}
        title={props.title}
        description={props.description}
        right={() => (
          <List.Icon
            color={useTheme().colors.text}
            icon={props.iconName || "chevron-right"}
          />
        )}
        onPress={props.onPress}
      />
      <Divider
        style={{
          backgroundColor: useTheme().colors.divider,
          marginLeft: Dimensions.get("screen").width * 0.05,
          marginRight: Dimensions.get("screen").width * 0.05,
        }}
      />
    </>
  );
};
