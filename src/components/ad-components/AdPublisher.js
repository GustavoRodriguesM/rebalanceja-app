import React, { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import Constants from "expo-constants";
import { PublisherBanner } from "expo-ads-admob";
import { AsyncStorageService } from "../../services/AsyncStorageService";
import { getPublisherId } from "../../services/AdMobService";

const adUnitID = Platform.select({
  ios: "ca-app-pub-3940256099942544/1712485313",
  android: getPublisherId(),
});

export default (props) => {
  useEffect(() => {
    async function isFreePlan() {
      let userPlan = await new AsyncStorageService().getUserPlan();
    }
    isFreePlan();
  }, []);

  return <PublisherBanner bannerSize={props.bannerSize} adUnitID={adUnitID} />;
};
