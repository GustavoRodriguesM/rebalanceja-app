import React from "react";
import { Dimensions, SafeAreaView, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Paragraph, useTheme } from "react-native-paper";

export default (props) => {
  if (props.noData != undefined && props.noData) {
    return (
      <>
        <View
          style={{
            marginLeft: Dimensions.get("screen").height * 0.02,
          }}
        >
          <Paragraph style={useTheme().styles.textStyle}>
            Cadastre uma aquisição para ter acesso total!
          </Paragraph>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View
          style={{
            marginLeft: Dimensions.get("screen").height * 0.02,
          }}
        >
          <Paragraph style={useTheme().styles.textStyle}>
            Sua exposição em cada classe
          </Paragraph>
          <View
            style={{
              marginTop: Dimensions.get("screen").height * 0.01,
              alignItems: "center",
            }}
          >
            <PieChart
              data={props.data}
              width={Dimensions.get("window").width}
              height={Dimensions.get("screen").height * 0.25}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              accessor={"actualPercentual"}
              backgroundColor={"transparent"}
              paddingLeft={"5"}
              absolute
            />
          </View>
        </View>
      </>
    );
  }
};
