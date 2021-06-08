import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import GeneralInvestComponent from "../components/home-components/GeneralInvestComponent";
import StockGridComponent from "../components/home-components/StockGridComponent";
import StockListComponent from "../components/home-components/StockListComponent";
import WelcomeComponent from "../components/home-components/WelcomeComponent";
import { GeneralDataService } from "../services/GeneralDataService";
import { AuthService } from "../services/AuthService";
import { Paragraph, Title, useTheme } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import RebalanceJaTheme from "../utils/rebalanceJaTheme";
import ExpositionCategoriesChart from "../components/home-components/charts/ExpositionCategoriesChart";
import AdPublisher from "../components/ad-components/AdPublisher";

export default (props) => {
  const [dataDashboard, setDataDashboard] = useState([]);

  useEffect(() => {
    getInitialParams();
  }, []);

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      getInitialParams();
    });
  }, []);

  const getInitialParams = async () => {
    let generalData = await new GeneralDataService().getGeneralData();
    if (generalData.aquisitionsLength === 0) {
      props.navigation.navigate("StockScreen");
    }
    if (generalData === 204) {
      props.navigation.navigate("InitialParamsScreen");
    } else {
      setDataDashboard(generalData);
    }
  };

  const getGrid = () => {
    let components = [];
    if (typeof dataDashboard.generalCategories != undefined) {
      for (let i = 0; i < dataDashboard.generalCategories?.length; i++) {
        components.push(
          <StockGridComponent
            key={i}
            gridName={dataDashboard.generalCategories[i].category.description}
            totalInvestment={dataDashboard.generalCategories[i].sumStocks}
            actual={dataDashboard.generalCategories[i].actualPercentual}
            objective={dataDashboard.generalCategories[i].idealPercentual}
          />
        );
      }
    }

    return components;
  };

  getColorPieChart = (index) => {
    let colors = [
      "#7a6621",
      "#ffd342",
      "#ba9a2f",
      "#d4a302",
      "#fccb31",
      "#f6ab13",
    ];

    return colors[index];
  };

  getDataPieChart = () => {
    let components = [];
    if (typeof dataDashboard.generalCategories != undefined) {
      for (let i = 0; i < dataDashboard.generalCategories?.length; i++) {
        if (dataDashboard.generalCategories[i].actualPercentual > 0) {
          components.push({
            name: dataDashboard.generalCategories[i].category.description,
            actualPercentual:
              dataDashboard.generalCategories[i].actualPercentual,
            color: getColorPieChart(i),
            legendFontColor: "#fff",
            legendFontSize: 15,
          });
        }
      }
    }

    return components;
  };

  const hasAnyData = () => {
    return dataDashboard.sumAllStocks > 0;
  };

  return (
    <View
      style={{ backgroundColor: useTheme().colors.viewBackground, flex: 1 }}
    >
      <ScrollView>
        <WelcomeComponent name={await new AuthService().getName()} />
        <GeneralInvestComponent
          walletDescription={dataDashboard.wallet.description}
          totalInvestments={dataDashboard.sumAllStocks}
        />

        <StockListComponent>{getGrid()}</StockListComponent>
        <View
          style={{
            marginBottom: Dimensions.get("screen").height * 0.01,
            marginTop: Dimensions.get("screen").height * 0.01,
          }}
        >
          <AdPublisher bannerSize="fullBanner" />
        </View>
        <ExpositionCategoriesChart
          noData={!hasAnyData()}
          data={getDataPieChart()}
        />
      </ScrollView>
    </View>
  );
};
