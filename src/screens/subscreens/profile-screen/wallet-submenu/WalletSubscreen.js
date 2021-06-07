import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Appbar, List, useTheme } from "react-native-paper";
import { WalletService } from "../../../../services/WalletService";
import { AsyncStorageService } from "../../../../services/AsyncStorageService";

export default (props) => {
  const [wallets, setWallets] = useState([]);
  const [primaryColor, setPrimaryColor] = useState(useTheme().colors.primary);
  const [textStyle, setTextStyle] = useState(useTheme().styles.textStyle);

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      await getAllWallets();
    });

    getAllWallets();
  }, []);

  const getAllWallets = async () => {
    let wallets = await new WalletService().getAllWallets();
    setWallets(wallets);
  };

  const renderItemWallet = ({ index }) => {
    return (
      <List.Item
        key={index}
        titleStyle={textStyle}
        descriptionStyle={textStyle}
        title={wallets[index].description}
        description={wallets[index].totalStocks + " ativos"}
        left={(props) => (
          <List.Icon {...props} icon="finance" color={primaryColor} />
        )}
        right={(props) => (
          <List.Icon {...props} icon="chevron-right" color={primaryColor} />
        )}
        onPress={() => {
          new AsyncStorageService().setWalletToAlterConfig(wallets[index]);

          props.navigation.navigate("WalletConfigSubscreen", wallets[index]);
        }}
      />
    );
  };

  return (
    <View
      style={{
        backgroundColor: useTheme().colors.viewBackground,
        flex: 1,
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title={"Carteiras"} style={{ alignItems: "center" }} />
      </Appbar.Header>
      <View>
        <FlatList
          style={{ maxHeight: Dimensions.get("screen").height * 0.6 }}
          data={wallets}
          renderItem={renderItemWallet}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: 10 }}
        />
      </View>
    </View>
  );
};
