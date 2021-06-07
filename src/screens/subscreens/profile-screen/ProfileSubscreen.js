import React from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Appbar, Button, useTheme } from "react-native-paper";
import ProfileGroupComponent from "../../../components/profile-components/ProfileGroupComponent";
import ProfileItemComponent from "../../../components/profile-components/ProfileItemComponent";
import { AuthService } from "../../../services/AuthService";
import AppButton from "../../../components/utils-components/AppButton";

export default (props) => {
  const logout = async () => {
    await new AuthService().logout();
    props.navigation.navigate("AuthScreen");
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: useTheme().colors.viewBackground }}
    >
      <Appbar.Header>
        <Appbar.Content title={"Perfil"} style={{ alignItems: "center" }} />
      </Appbar.Header>
      <ScrollView>
        <ProfileGroupComponent title="PERFIL">
          <ProfileItemComponent
            title="Editar perfil"
            description="teste"
            onPress={() => console.log("Clicou em editar perfil")}
          />
          <ProfileItemComponent
            title="Alterar senha"
            onPress={() => console.log("Clicou em alterar senha")}
          />
        </ProfileGroupComponent>
        <ProfileGroupComponent title="CARTEIRAS">
          <ProfileItemComponent
            title="Visualizar carteiras"
            onPress={() => props.navigation.navigate("WalletSubscreen")}
          />
        </ProfileGroupComponent>

        <View style={{ alignItems: "center" }}>
          <View style={{ width: "50%" }}>
            <AppButton title="Sair" onPress={() => logout()} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
