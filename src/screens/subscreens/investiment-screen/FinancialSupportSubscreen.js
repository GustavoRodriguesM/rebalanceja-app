import React, { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import { RebalancingService } from "../../../services/RebalancingService";
import { AquisitionService } from "../../../services/AquisitionService";
import { AuthService } from "../../../services/AuthService";
import BRLCurrencyFormat from "../../../utils/BRLCurrencyFormat";
import {
  Appbar,
  Button,
  Dialog,
  HelperText,
  Paragraph,
  Portal,
  TextInput,
  withTheme,
} from "react-native-paper";
import AppButton from "../../../components/utils-components/AppButton";

class FinancialSupportSubscreen extends Component {
  state = {
    isBuyOperation: true,
    buyQuantity: this.props.route.params.aquisition.buyQuantity.toString(),
    buyValue: this.props.route.params.aquisition.buyValue.toString(),
    isOperationInvalid: false,
    showModal: false,
  };

  constructor(props) {
    super(props);
    this.rebalancingService = new RebalancingService();
    this.aquisitionService = new AquisitionService();
    this.authService = new AuthService();
  }

  getStyleButton(button) {
    if (button === "buy") {
      if (this.state.isBuyOperation) {
        return {
          backgroundColor: this.props.theme.colors.primary,
          borderRadius: 100,
        };
      } else {
        return {
          backgroundColor: this.props.theme.colors.inactivated,
          borderRadius: 100,
        };
      }
    } else {
      if (!this.state.isBuyOperation) {
        return {
          backgroundColor: this.props.theme.colors.primary,
          borderRadius: 100,
          marginLeft: Dimensions.get("screen").width * 0.05,
        };
      } else {
        return {
          backgroundColor: this.props.theme.colors.inactivated,
          borderRadius: 100,
          marginLeft: Dimensions.get("screen").width * 0.05,
        };
      }
    }
  }

  onChangeBuyQuantity(buyQuantity) {
    buyQuantity = buyQuantity.replace(",", "").replace("-", "");
    if (this.getType() == 1) {
      this.setState({ buyQuantity: Number(buyQuantity).toFixed(0) });
    } else {
      this.setState({ buyQuantity: buyQuantity });
    }
    this.setState({
      buyValue: (
        buyQuantity *
        this.props.route.params.aquisition.aquisitionQuoteDTO.stock.priceInBRL
      ).toFixed(2),
    });
  }

  onChangeBuyValue(buyValue) {
    this.setState({ buyValue: buyValue });
    this.setState({
      buyQuantity: (
        buyValue /
        this.props.route.params.aquisition.aquisitionQuoteDTO.stock.priceInBRL
      ).toFixed(6),
    });
  }

  teste = () => {
    let testea = this.state.buyQuantity;
    this.setState({ buyQuantity: Number(testea).toFixed(6) });

    this.onChangeBuyQuantity(this.state.buyQuantity);
  };

  getType() {
    if (
      this.props.route.params.aquisition.aquisitionQuoteDTO.stock.category
        .idCategory === 1 ||
      this.props.route.params.aquisition.aquisitionQuoteDTO.stock.category
        .idCategory === 2
    ) {
      return 1;
    } else {
      return 2;
    }
  }

  showConfirmDialog = () => {
    if (!this.state.isBuyOperation) {
      if (
        this.state.buyQuantity >
        this.props.route.params.aquisition.aquisitionQuoteDTO.quantity
      ) {
        this.setState({ isOperationInvalid: true });
      } else {
        this.setState({ isOperationInvalid: false });
        this.setState({ showModal: true });
      }
    } else {
      this.setState({ isOperationInvalid: false });
      this.setState({ showModal: true });
    }
  };

  saveOperation = async () => {
    let data = {
      stockSymbolOriginal:
        this.props.route.params.aquisition.aquisitionQuoteDTO.stock
          .symbolOriginal,
      quantity: parseFloat(this.state.buyQuantity),
      operationType: this.state.isBuyOperation ? 1 : 2,
    };
    await this.aquisitionService.updateQuantity(this, data);

    this.props.route.params.onRegister(
      this.state.buyValue,
      this.state.isBuyOperation
    );
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={this.props.theme.styles.defaultBackgroundWithFlex}>
        <Portal>
          <Dialog
            visible={this.state.showModal}
            onDismiss={() => this.setState({ showModal: false })}
            style={{ backgroundColor: this.props.theme.colors.modalBackground }}
          >
            <Dialog.Title>Confirma????o</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Tem certeza que deseja realizar a opera????o?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => this.setState({ showModal: false })}
                labelStyle={{
                  color: "#fff",
                }}
                style={{
                  backgroundColor: this.props.theme.colors.inactivated,
                  borderRadius: 100,
                }}
              >
                Voltar
              </Button>
              <Button
                onPress={this.saveOperation}
                labelStyle={{
                  color: "#fff",
                }}
                style={{
                  backgroundColor: this.props.theme.colors.primary,
                  borderRadius: 100,
                  marginLeft: Dimensions.get("screen").width * 0.01,
                }}
              >
                Confirmar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View>
          <Appbar.Header>
            <Appbar.Content
              title={"Comprar/Vender"}
              style={{ alignItems: "center" }}
            />
          </Appbar.Header>
          <View style={{ alignItems: "center" }}>
            <View style={{ marginTop: Dimensions.get("screen").height * 0.02 }}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: this.props.theme.colors.text,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Atual
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: this.props.theme.colors.text,
                    fontSize: 24,
                  }}
                >
                  {
                    this.props.route.params.aquisition.aquisitionQuoteDTO
                      .quantity
                  }{" "}
                </Text>
                <Text
                  style={{
                    color: this.props.theme.colors.primary,
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  {
                    this.props.route.params.aquisition.aquisitionQuoteDTO.stock
                      .symbol
                  }
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: this.props.theme.colors.primary,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                R${" "}
              </Text>
              <Text
                style={{
                  color: this.props.theme.colors.text,
                  fontSize: 20,
                }}
              >
                {BRLCurrencyFormat(
                  this.props.route.params.aquisition.aquisitionQuoteDTO.total
                )}{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: Dimensions.get("screen").height * 0.02,
                justifyContent: "space-between",
              }}
            >
              <Button
                icon="arrow-bottom-left-thick"
                mode="contained"
                labelStyle={{ color: "#000" }}
                style={this.getStyleButton("buy")}
                onPress={() => {
                  this.setState({ isBuyOperation: true });
                }}
              >
                Comprar
              </Button>
              <Button
                icon="arrow-top-right-thick"
                mode="contained"
                labelStyle={{ color: "#000" }}
                onPress={() => {
                  this.setState({ isBuyOperation: false });
                }}
                style={this.getStyleButton("sell")}
              >
                Vender
              </Button>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: this.props.theme.colors.viewBackgroundSecundary,
            marginTop: Dimensions.get("screen").height * 0.05,
            flex: 1,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
          }}
        >
          <View
            style={{
              margin: Dimensions.get("screen").height * 0.02,
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <HelperText
                type="info"
                style={{ color: this.props.theme.colors.text }}
                visible={this.state.isOperationInvalid}
              >
                Opera????o inv??lida! Valor m??ximo de venda:{" "}
                {this.props.route.params.aquisition.aquisitionQuoteDTO.quantity}
              </HelperText>
            </View>
            {this.getType() == 1 && (
              <View style={{ width: Dimensions.get("screen").width * 0.7 }}>
                <TextInput
                  label="Valor em reais"
                  mode="flat"
                  value={BRLCurrencyFormat(this.state.buyValue.toString())}
                  keyboardType="numeric"
                  style={{
                    backgroundColor:
                      this.props.theme.colors.textInputBackground,
                    marginBottom: 10,
                  }}
                  theme={{
                    colors: {
                      text: this.props.theme.colors.text,
                      placeholder: this.props.theme.colors.text,
                      primary: this.props.theme.colors.text,
                    },
                  }}
                />

                <TextInput
                  label="Quantidade"
                  mode="flat"
                  value={this.state.buyQuantity}
                  keyboardType="numeric"
                  style={{
                    backgroundColor:
                      this.props.theme.colors.textInputBackground,
                    marginBottom: 10,
                  }}
                  theme={{
                    colors: {
                      text: this.props.theme.colors.text,
                      placeholder: this.props.theme.colors.text,
                      primary: this.props.theme.colors.text,
                    },
                  }}
                  onChangeText={(buyQuantity) =>
                    this.onChangeBuyQuantity(buyQuantity)
                  }
                />
              </View>
            )}
            {this.getType() == 2 && (
              <View style={{ width: Dimensions.get("screen").width * 0.7 }}>
                <TextInput
                  label="Valor em reais"
                  mode="outlined"
                  value={this.state.buyValue.toString()}
                  keyboardType="numeric"
                  onChangeText={(buyValue) => this.onChangeBuyValue(buyValue)}
                  style={{
                    backgroundColor:
                      this.props.theme.colors.textInputBackground,
                    marginBottom: 10,
                  }}
                  theme={{
                    colors: {
                      text: this.props.theme.colors.text,
                      placeholder: this.props.theme.colors.text,
                      primary: this.props.theme.colors.text,
                    },
                  }}
                />

                <TextInput
                  label="Quantidade"
                  mode="outlined"
                  value={this.state.buyQuantity}
                  keyboardType="numeric"
                  style={{
                    backgroundColor:
                      this.props.theme.colors.textInputBackground,
                    marginBottom: 10,
                  }}
                  theme={{
                    colors: {
                      text: this.props.theme.colors.text,
                      placeholder: this.props.theme.colors.text,
                      primary: this.props.theme.colors.text,
                    },
                  }}
                  onChangeText={(buyQuantity) =>
                    this.onChangeBuyQuantity(buyQuantity)
                  }
                  onBlur={() => {
                    this.teste();
                  }}
                />
              </View>
            )}
          </View>

          <View style={{ alignItems: "center" }}>
            <View style={{ width: "50%" }}>
              <AppButton
                onPress={() => {
                  this.showConfirmDialog();
                }}
                title="Cadastrar"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(FinancialSupportSubscreen);
