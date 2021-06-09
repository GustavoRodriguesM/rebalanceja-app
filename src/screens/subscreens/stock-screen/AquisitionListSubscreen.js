import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Title, useTheme } from "react-native-paper";
import { WalletService } from "../../../services/WalletService";
import { AquisitionService } from "../../../services/AquisitionService";
import CardStockComponent from "../../../components/stocks-components/CardStockComponent";
import Toast from "react-native-toast-message";
import rebalanceJaTheme from "../../../utils/rebalanceJaTheme";

export default (props) => {
  const [activeWallet, setActiveWallet] = useState();
  const [aquisitions, setAquisitions] = useState();
  const [loading, setLoading] = useState(false);

  const fetchMyAPI = async () => {
    setLoading(true);
    let walletLocal = await new WalletService().getActiveWallet();
    const aquisitions = walletLocal.aquisitions.filter(
      (obj) => obj.stock.category.idCategory == props.route.params.idCategory
    );
    setActiveWallet(walletLocal);
    setAquisitions(aquisitions);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyAPI();
  }, []);

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      fetchMyAPI();
    });
  }, []);

  const renderItemAquisition = ({ item, index }) => {
    return (
      <CardStockComponent
        key={index}
        indexKey={index}
        walletDescription={activeWallet.description}
        obj={item}
        lengthList={aquisitions.length}
        onClickDeleteIncome={onClickDeleteIncome}
        onClickAlterIncome={onClickAlterIncome}
        onToggleSwitch={onToggleSwitch}
      />
    );
  };

  const onToggleSwitch = async (obj, index) => {
    let aquisitionsLocal = [...aquisitions];
    let objLocal = obj;
    objLocal.allocate = !objLocal.allocate;
    aquisitionsLocal[index] = objLocal;
    await new AquisitionService().changeAllocate(
      obj.idAquisition,
      activeWallet.idWallet
    );
    setAquisitions(aquisitionsLocal);
  };

  const onClickDeleteIncome = async (aquisition) => {
    if (
      await new AquisitionService().deleteAquisition(aquisition.idAquisition)
    ) {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Oba!",
        text2: "O ativo " + aquisition.stock.symbol + " foi removido!",
      });
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Algo deu errado!",
        text2:
          "Não foi possivel remover o ativo " +
          aquisition.stock.symbol +
          ". Tente novamente!",
      });
    }
    await fetchMyAPI();
  };

  const onClickAlterIncome = async (aquisition) => {
    let alterAquisition = {
      idWallet: activeWallet.idWallet,
      aquisition: aquisition,
    };
    if (aquisition.stock.category.idCategory !== 5) {
      props.navigation.navigate("AlterVariableIncomeSubscreen", {
        alterAquisition: alterAquisition,
      });
    } else {
      props.navigation.navigate("AquisitionFixedIncomeSubscreen", {
        alterAquisition: alterAquisition,
      });
    }
  };

  return (
    <>
      {loading && (
        <View
          style={{
            backgroundColor: rebalanceJaTheme.colors.viewBackground,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            animating={true}
            size="large"
            color={rebalanceJaTheme.colors.primary}
          />
        </View>
      )}
      {!loading && (
        <FlatList
          style={{
            backgroundColor: rebalanceJaTheme.colors.viewBackground,
          }}
          data={aquisitions}
          renderItem={renderItemAquisition}
          keyExtractor={(item) => item.idAquisition.toString()}
        />
      )}
    </>
  );
};
