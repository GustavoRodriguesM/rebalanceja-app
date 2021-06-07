import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, Text, View, ScrollView } from "react-native";
import { Appbar, TextInput, useTheme } from "react-native-paper";
import { RebalancingService } from "../../../services/RebalancingService";
import { AuthService } from "../../../services/AuthService";
import { convertCurrency } from "../../../services/CommonService";
import { AdMobInterstitial } from "expo-ads-admob";
import AquisitionSupportComponent from "../../../components/investment-components/AquisitionSupportComponent";
import Toast from "react-native-toast-message";
import { getInterstitialId } from "../../../services/AdMobService";
import AppButton from "../../../components/utils-components/AppButton";

AdMobInterstitial.setAdUnitID(getInterstitialId());

export default (props) => {
  const [aquisitionsSupports, setAquisitionsSupports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [financialSupport, setFinancialSupport] = useState("");
  const [canUpdateFinancialSupport, setCanUpdateFinancialSupport] =
    useState(false);

  useEffect(() => {
    async function updateFinancialSupport() {
      if (financialSupport > 0 && canUpdateFinancialSupport) {
        await rebalanceStocks();
      }
    }
    updateFinancialSupport();
    setCanUpdateFinancialSupport(false);
  }, [canUpdateFinancialSupport]);

  const rebalanceStocks = async (showAd = false) => {
    setIsLoading(true);

    if (showAd) {
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    }
    Keyboard.dismiss();
    let responseList = await new RebalancingService().rebalance(
      financialSupport
    );
    setAquisitionsSupports(responseList);

    if (responseList === "undefined" || responseList.length === 0) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Ops!",
        text2: "Não é necessária nenhuma compra por enquanto!",
      });
    }
    setIsLoading(false);
  };

  const onRegister = async (buyValue, isBuyOperation) => {
    let financialSupportNumber = 0;
    if (financialSupport.includes(",")) {
      financialSupportNumber = financialSupport
        .replace(".", "")
        .replace(",", ".");
    } else {
      financialSupportNumber = financialSupport;
    }

    if (isBuyOperation) {
      if (Number(financialSupportNumber) - buyValue <= 0)
        setFinancialSupport("0");
      else
        setFinancialSupport(
          (Number(financialSupportNumber) - buyValue).toFixed(2)
        );
    } else {
      setFinancialSupport(
        (Number(financialSupportNumber) + Number(buyValue)).toFixed(2)
      );
    }

    setCanUpdateFinancialSupport(true);
  };

  const renderItemAquisition = () => {
    let components = [];
    aquisitionsSupports.forEach((element, index) => {
      components.push(
        <AquisitionSupportComponent
          key={index}
          gridName={element.aquisitionQuoteDTO.stock.symbol}
          categoryDescription={
            element.aquisitionQuoteDTO.stock.category.description
          }
          categoryColor={element.aquisitionQuoteDTO.stock.category.defaultColor}
          buyValue={element.buyValue}
          buyQuantity={element.buyQuantity}
          priceInBRL={element.aquisitionQuoteDTO.stock.priceInBRL}
          percentualDifference={element.percentualDifferenceOriginal}
          onPressAquisitionSupport={() => {
            props.navigation.navigate("FinancialSupportSubscreen", {
              aquisition: element,
              onRegister: onRegister,
            });
          }}
        />
      );
    });

    return components;
  };

  return (
    <>
      <View style={useTheme().styles.defaultBackgroundWithFlex}>
        <Appbar.Header>
          <Appbar.Content
            title={"Rebalanceamento"}
            style={[{ alignItems: "center" }, useTheme().styles.textStyle]}
          />
        </Appbar.Header>
        <ScrollView>
          <Text
            style={[
              {
                marginLeft: Dimensions.get("screen").width * 0.05,
                marginTop: Dimensions.get("screen").width * 0.05,
                fontSize: 16,
                color: useTheme().colors.text,
              },
              useTheme().styles.textStyle,
            ]}
          >
            Rebalanceamento de ativos
          </Text>
          <View style={{ margin: Dimensions.get("screen").width * 0.05 }}>
            <TextInput
              label="Aporte"
              mode="flat"
              keyboardType="decimal-pad"
              value={convertCurrency(financialSupport)}
              style={{
                backgroundColor: useTheme().colors.textInputBackground,
                marginBottom: 10,
              }}
              theme={{
                colors: {
                  text: useTheme().colors.text,
                  placeholder: useTheme().colors.text,
                  primary: useTheme().colors.text,
                },
              }}
              onChangeText={(financialSupport) =>
                setFinancialSupport(convertCurrency(financialSupport))
              }
            />
            <AppButton
              isLoading={isLoading}
              onPress={() => rebalanceStocks(true)}
              title="Calcular aportes"
            />
          </View>
          <View>{renderItemAquisition()}</View>
        </ScrollView>
      </View>
    </>
  );
};
