import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { RebalancingService } from '../../../services/RebalancingService';
import { AquisitionService } from '../../../services/AquisitionService';
import { AuthService } from '../../../services/AuthService';
import BRLCurrencyFormat from '../../../utils/BRLCurrencyFormat';
import { Button, Dialog, HelperText, Paragraph, Portal, TextInput, withTheme } from 'react-native-paper';


class FinancialSupportSubscreen extends Component {

    state = {
        isBuyOperation: true,
        buyQuantity: this.props.route.params.aquisition.buyQuantity.toString(),
        buyValue: this.props.route.params.aquisition.buyValue.toString(),
        isOperationInvalid: false,
        showModal: false
    }

    constructor(props) {
        super(props);
        this.rebalancingService = new RebalancingService();
        this.aquisitionService = new AquisitionService();
        this.authService = new AuthService();
    }


    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            let hasTokenValid = await this.authService.hasTokenValid();
            if (!hasTokenValid) {
                await this.authService.loginViaRefreshToken();
            }
        });
    }

    getLabelStyleButton(button) {
        if (button === "buy") {
            if (this.state.isBuyOperation) {
                return {
                    color: '#fff'
                }
            } else {
                return {
                    color: '#000'
                }
            }
        } else {
            if (!this.state.isBuyOperation) {
                return {
                    color: '#fff'
                }
            } else {
                return {
                    color: '#000'
                }
            }
        }
    }

    getStyleButton(button) {
        if (button === "buy") {
            if (this.state.isBuyOperation) {
                return {
                    backgroundColor: this.props.theme.colors.primary, borderRadius: 100
                }
            } else {
                return { backgroundColor: this.props.theme.colors.inactivated, borderRadius: 100 }
            }
        } else {
            if (!this.state.isBuyOperation) {
                return {
                    backgroundColor: this.props.theme.colors.primary, borderRadius: 100, marginLeft: Dimensions.get('screen').width * 0.05,
                }
            } else {
                return { backgroundColor: this.props.theme.colors.inactivated, borderRadius: 100, marginLeft: Dimensions.get('screen').width * 0.05, }
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
        this.setState({ buyValue: (buyQuantity * this.props.route.params.aquisition.aquisitionQuoteDTO.stock.priceInBRL).toFixed(2) });
    }

    onChangeBuyValue(buyValue) {
        this.setState({ buyValue: buyValue })
        this.setState({ buyQuantity: (buyValue / this.props.route.params.aquisition.aquisitionQuoteDTO.stock.priceInBRL).toFixed(6) });
    }

    teste = () => {
        let testea = this.state.buyQuantity;
        this.setState({ buyQuantity: Number(testea).toFixed(6) });

        this.onChangeBuyQuantity(this.state.buyQuantity);
    }

    getType() {
        if (this.props.route.params.aquisition.aquisitionQuoteDTO.stock.category.idCategory === 1
            || this.props.route.params.aquisition.aquisitionQuoteDTO.stock.category.idCategory === 2) {
            return 1;
        }
        else {
            return 2;
        }
    }

    showConfirmDialog = () => {
        if (!this.state.isBuyOperation) {
            if (this.state.buyQuantity > this.props.route.params.aquisition.aquisitionQuoteDTO.quantity) {
                this.setState({ isOperationInvalid: true });
            } else {
                this.setState({ isOperationInvalid: false });
                this.setState({ showModal: true });
            }
        } else {
            this.setState({ isOperationInvalid: false });
            this.setState({ showModal: true });
        }
    }

    saveOperation = async () => {
        let data = {
            stockSymbolOriginal: this.props.route.params.aquisition.aquisitionQuoteDTO.stock.symbolOriginal,
            quantity: parseFloat(this.state.buyQuantity),
            operationType: this.state.isBuyOperation ? 1 : 2
        };
        await this.aquisitionService.updateQuantity(this, data);

        //console.log(this.props.route);
        this.props.route.params.onRegister(this.state.buyValue, this.state.isBuyOperation);   
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={this.props.theme.styles.defaultBackgroundWithFlex}>
                <Portal>
                    <Dialog 
                        visible={this.state.showModal} 
                        onDismiss={() => this.setState({ showModal: false })} 
                        style={{backgroundColor: this.props.theme.colors.modalBackground}}
                    >
                        <Dialog.Title>Confirmação</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Tem certeza que deseja realizar a operação?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={() => this.setState({ showModal: false })}
                                labelStyle={{
                                    color: '#fff'
                                }}
                                style={{
                                    backgroundColor: this.props.theme.colors.inactivated, borderRadius: 100
                                }}
                            >Voltar</Button>
                            <Button
                                onPress={this.saveOperation}
                                labelStyle={{
                                    color: '#fff'
                                }}
                                style={{
                                    backgroundColor: this.props.theme.colors.primary, borderRadius: 100, marginLeft: Dimensions.get('screen').width * 0.01
                                }}
                            >Confirmar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{
                        color: this.props.theme.colors.text,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: Dimensions.get('screen').height * 0.05
                    }}>Comprar/Vender</Text>
                    <View style={{ marginTop: Dimensions.get('screen').height * 0.05 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{
                                color: this.props.theme.colors.text,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>Atual</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>

                            <Text style={{
                                color: this.props.theme.colors.text,
                                fontSize: 24,
                            }}>{this.props.route.params.aquisition.aquisitionQuoteDTO.quantity} </Text>
                            <Text style={{
                                color: this.props.theme.colors.primary,
                                fontSize: 24,
                                fontWeight: 'bold'
                            }}>{this.props.route.params.aquisition.aquisitionQuoteDTO.stock.symbol}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{
                            color: this.props.theme.colors.primary,
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>R$ </Text>
                        <Text style={{
                            color: this.props.theme.colors.text,
                            fontSize: 20,
                        }}>{BRLCurrencyFormat(this.props.route.params.aquisition.aquisitionQuoteDTO.total)} </Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: Dimensions.get('screen').height * 0.05, justifyContent: "space-between", }}>

                        <Button
                            icon="arrow-bottom-left-thick"
                            mode="contained"
                            labelStyle={this.getLabelStyleButton("buy")}
                            style={this.getStyleButton("buy")}
                            onPress={() => { this.setState({ isBuyOperation: true }) }}>
                            Comprar
                        </Button>
                        <Button
                            icon="arrow-top-right-thick"
                            mode="contained"
                            labelStyle={this.getLabelStyleButton("sell")}
                            onPress={() => { this.setState({ isBuyOperation: false }) }}
                            style={this.getStyleButton("sell")}>
                            Vender
                        </Button>
                    </View>
                </View>
                <View style={{
                    backgroundColor: this.props.theme.colors.viewBackgroundSecundary,
                    marginTop: Dimensions.get('screen').height * 0.05,
                    flex: 1,
                    borderTopRightRadius: 50,
                    borderTopLeftRadius: 50
                }}>
                    <View style={{ margin: Dimensions.get('screen').height * 0.05, }}>
                        <View style={{ alignItems: "center", }}>
                            <HelperText
                                type="info"
                                style={{ color: this.props.theme.colors.text }}
                                visible={this.state.isOperationInvalid}>
                                Operação inválida! Valor máximo de venda: {this.props.route.params.aquisition.aquisitionQuoteDTO.quantity}
                            </HelperText>
                        </View>
                        {this.getType() == 1 &&
                            <View>
                                <TextInput
                                    label="Valor em reais"
                                    mode="outlined"
                                    value={BRLCurrencyFormat(this.state.buyValue.toString())}
                                    keyboardType='numeric'
                                    style={{ backgroundColor: this.props.theme.colors.textInputBackground, marginBottom: 10 }}
                                    theme={{ colors: { text: this.props.theme.colors.text, placeholder: this.props.theme.colors.text, primary: this.props.theme.colors.text } }}
                                />

                                <TextInput
                                    label="Quantidade"
                                    mode="outlined"
                                    value={this.state.buyQuantity}
                                    keyboardType='numeric'
                                    style={{ backgroundColor: this.props.theme.colors.textInputBackground, marginBottom: 10 }}
                                    theme={{ colors: { text: this.props.theme.colors.text, placeholder: this.props.theme.colors.text, primary: this.props.theme.colors.text } }}
                                    onChangeText={buyQuantity => this.onChangeBuyQuantity(buyQuantity)}
                                />
                            </View>}
                        {this.getType() == 2 &&
                            <View>
                                <TextInput
                                    label="Valor em reais"
                                    mode="outlined"
                                    value={this.state.buyValue.toString()}
                                    keyboardType='numeric'
                                    onChangeText={buyValue => this.onChangeBuyValue(buyValue)}
                                    style={{ backgroundColor: this.props.theme.colors.textInputBackground, marginBottom: 10 }}
                                    theme={{ colors: { text: this.props.theme.colors.text, placeholder: this.props.theme.colors.text, primary: this.props.theme.colors.text } }}
                                />

                                <TextInput
                                    label="Quantidade"
                                    mode="outlined"
                                    value={this.state.buyQuantity}
                                    keyboardType='numeric'
                                    style={{ backgroundColor: this.props.theme.colors.textInputBackground, marginBottom: 10 }}
                                    theme={{ colors: { text: this.props.theme.colors.text, placeholder: this.props.theme.colors.text, primary: this.props.theme.colors.text } }}
                                    onChangeText={buyQuantity => this.onChangeBuyQuantity(buyQuantity)}
                                    onBlur={() => { this.teste() }}
                                />
                            </View>}
                    </View>
                    <Button
                        icon="content-save"
                        mode="contained"
                        labelStyle={{ color: '#fff' }}
                        onPress={() => { this.showConfirmDialog() }}
                        style={{
                            backgroundColor: this.props.theme.colors.primary, borderRadius: 100, margin: Dimensions.get('screen').width * 0.05,
                        }}>
                        Cadastrar
                        </Button>
                </View>
            </View>
        )
    }
}


export default withTheme(FinancialSupportSubscreen);