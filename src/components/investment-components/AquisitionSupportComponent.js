import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import BRLCurrencyFormat from "../../utils/BRLCurrencyFormat";
import { Button, Card, Divider, Paragraph, useTheme } from "react-native-paper";

export default (props) => {
  const style = StyleSheet.create({
    component: {
      marginBottom: Dimensions.get("screen").width * 0.05,
      marginTop: Dimensions.get("screen").width * 0.05,
      marginLeft: Dimensions.get("screen").width * 0.1,
      marginRight: Dimensions.get("screen").width * 0.1,
      borderRadius: 10,
    },
    TextStyle: {
      color: "#fff",
    },
  });

  return (
    <View style={style.component}>
      <Card key={props.indexKey}>
        <Card.Title
          title={props.gridName}
          titleStyle={[
            useTheme().styles.textStylePrimary,
            { fontWeight: "bold" },
          ]}
          subtitle={props.categoryDescription}
          subtitleStyle={useTheme().styles.subtextStyle}
        />
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Paragraph style={useTheme().styles.textStyle}>
              Valor do aporte
            </Paragraph>
            <Paragraph style={useTheme().styles.textStyle}>
              R$ {BRLCurrencyFormat(props.buyValue)}
            </Paragraph>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Paragraph style={useTheme().styles.textStyle}>
              Quantidade de compra
            </Paragraph>
            <Paragraph style={useTheme().styles.textStyle}>
              {props.buyQuantity}
            </Paragraph>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Paragraph style={useTheme().styles.textStyle}>Diferença</Paragraph>
            <Paragraph style={useTheme().styles.textStyle}>
              {props.percentualDifference}%
            </Paragraph>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Paragraph style={useTheme().styles.textStyle}>
              Valor do ativo
            </Paragraph>
            <Paragraph style={useTheme().styles.textStyle}>
              R$ {BRLCurrencyFormat(props.priceInBRL)}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
      <View
        style={{
          alignItems: "center",
          marginTop: Dimensions.get("screen").height * 0.01,
          marginBottom: Dimensions.get("screen").height * 0.01,
        }}
      >
        <Button
          labelStyle={{ color: "#000" }}
          style={{ backgroundColor: useTheme().colors.primary, width: "60%" }}
          onPress={props.onPressAquisitionSupport}
        >
          Aportar
        </Button>
      </View>
      <Divider
        style={{
          backgroundColor: useTheme().colors.primary,
          marginTop: Dimensions.get("screen").height * 0.02,
          opacity: 0.3,
        }}
      />
    </View>
  );
};
