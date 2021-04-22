import React, { Component } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Picker } from '@react-native-community/picker'
import { Appbar, Button, Subheading, Text, TextInput, Title, withTheme } from "react-native-paper";
import { SignUpService } from "../../services/SignUpService";
import BRLCurrencyFormat from "../../utils/BRLCurrencyFormat";


class PaymentRegisterComponent extends Component {

    constructor(props) {
        super(props);

        this.signUpService = new SignUpService();
        this.state = {
            selectedSubscriptionPlan: [],
            userData: [],
            city: "Sao Paulo",
            numberInstallments: "1",
            number: '147',
            postalCode: '03931010',
            state: 'SP',
            street: 'Rua X',
            cardNumber: '5155901222280001',
            cpf:'25233076004',
            cvv:'012',
            expirationDate: '12/21',
            userCardName: 'Joao da silva'
        };
    }

    createAccount = async () => {
        let register = {
            billingAddressDTO: {
                city: this.state.city,
                number: this.state.number,
                postalCode: this.state.postalCode,
                state: this.state.state,
                street: this.state.street
            },
            idSubscriptionPlan: this.state.selectedSubscriptionPlan.idSubscriptionPlan,
            paymentDetailsDTO: {
                cardNumber: this.state.cardNumber,
                cpf: this.state.cpf,
                cvv: this.state.cvv,
                expirationDate: this.state.expirationDate,
                numberInstallments: this.state.numberInstallments,
                userCardName: this.state.userCardName
            },
            userDetailsDTO: {
                birthDate: this.state.userData.birthDate,
                email: this.state.userData.email,
                name: this.state.userData.name,
                phoneNumber: this.state.userData.phoneNumber
            }
        }
        this.props.createAccount(register);
    }

    async componentDidMount() {
        await this.teste();
    }

    teste = async () => {
        let selectedPlan = await this.signUpService.getSelectedPlan();
        let userData = await this.signUpService.getUserData();
        this.setState({ selectedSubscriptionPlan: selectedPlan });
        this.setState({ userData: userData });
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Appbar.Header>
                        <Appbar.BackAction onPress={() => this.props.onGoBack()} />
                        <Appbar.Content title="Detalhes do pagamento" />
                    </Appbar.Header>
                    <View style={{ margin: Dimensions.get('screen').width * 0.05 }}>
                        <View style={{ marginBottom: Dimensions.get('screen').height * 0.05, marginTop: Dimensions.get('screen').height * 0.02 }}>
                            <Subheading>{this.state.userData.name}, você escolheu o plano: </Subheading>
                            <View style={{ width: Dimensions.get('window').width * 0.90, marginBottom: Dimensions.get('screen').height * 0.05, backgroundColor: this.props.theme.colors.signUpScreen.recommendedButtonBackground, padding: 25, borderRadius: 30 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <Text>{this.state.selectedSubscriptionPlan.description}</Text>
                                </View>
                                <Subheading>R$ {BRLCurrencyFormat(this.state.selectedSubscriptionPlan.amount)} /ano</Subheading>
                            </View>

                            <Title>Dados do dono do cartão</Title>
                            <TextInput
                                mode="flat"
                                label="Nome impresso no cartão"
                                value={this.state.userCardName}
                                onChangeText={(userCardName) => this.setState({ userCardName: userCardName })}
                                style={{ marginBottom: Dimensions.get('screen').height * 0.01, backgroundColor: '#262626' }}
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            />
                            <TextInput
                                mode="flat"
                                label="CPF"
                                value={this.state.cpf}
                                onChangeText={(cpf) => this.setState({ cpf: cpf })}
                                style={{ marginBottom: Dimensions.get('screen').height * 0.01, backgroundColor: '#262626' }}
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            />

                            <Title>Endereço de cobrança</Title>
                            <TextInput
                                mode="flat"
                                label="CEP"
                                value={this.state.postalCode}
                                onChangeText={(postalCode) => this.setState({ postalCode: postalCode })}
                                style={{ marginBottom: Dimensions.get('screen').height * 0.01, backgroundColor: '#262626' }}
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            />
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <TextInput
                                    mode="flat"
                                    label="Rua"
                                    value={this.state.street}
                                    onChangeText={(street) => this.setState({ street: street })}
                                    style={{ marginBottom: Dimensions.get('screen').height * 0.01, backgroundColor: '#262626', flex: 6 }}
                                    theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                />
                                <TextInput
                                    mode="flat"
                                    label="Número"
                                    value={this.state.number}
                                    onChangeText={(number) => this.setState({ number: number })}
                                    style={{ marginBottom: Dimensions.get('screen').height * 0.01, backgroundColor: '#262626', flex: 4, marginLeft: Dimensions.get('screen').height * 0.01, }}
                                    theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <TextInput
                                    mode="flat"
                                    label="Cidade"
                                    value={this.state.city}
                                    onChangeText={(city) => this.setState({ city: city })}
                                    style={{ marginBottom: Dimensions.get('screen').height * 0.01, backgroundColor: '#262626', flex: 8 }}
                                    theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                />
                                <TextInput
                                    mode="flat"
                                    label="UF"
                                    value={this.state.state}
                                    onChangeText={(state) => this.setState({ state: state })}
                                    style={{ marginBottom: Dimensions.get('screen').height * 0.01, backgroundColor: '#262626', flex: 2, marginLeft: Dimensions.get('screen').height * 0.01, }}
                                    theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                />
                            </View>

                            <Title>Detalhes do cartão de crédito</Title>

                            <TextInput
                                mode="flat"
                                label="Número do cartão"
                                value={this.state.cardNumber}
                                onChangeText={(cardNumber) => this.setState({ cardNumber: cardNumber })}
                                style={{ marginBottom: Dimensions.get('screen').height * 0.01, backgroundColor: '#262626' }}
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            />
                            <View style={{ flexDirection: 'row', flex: 1 }}>

                                <TextInput
                                    mode="flat"
                                    label="Vencimento"
                                    value={this.state.expirationDate}
                                    onChangeText={(expirationDate) => this.setState({ expirationDate: expirationDate })}
                                    style={{
                                        marginBottom: Dimensions.get('screen').height * 0.01,
                                        marginRight: Dimensions.get('screen').height * 0.01,
                                        backgroundColor: '#262626',
                                        flex: 5
                                    }}
                                    theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                />
                                <TextInput
                                    mode="flat"
                                    label="CVV"
                                    value={this.state.cvv}
                                    onChangeText={(cvv) => this.setState({ cvv: cvv })}
                                    style={{
                                        marginBottom: Dimensions.get('screen').height * 0.01,
                                        marginLeft: Dimensions.get('screen').height * 0.01,
                                        backgroundColor: '#262626',
                                        flex: 5
                                    }}
                                    theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                />
                            </View>
                            <View style={{ backgroundColor: '#262626', borderTopLeftRadius: 5, borderTopRightRadius: 5, alignItems: 'center' }}>
                                <Text style={{ marginTop: 10, marginLeft: 10 }}>Quantidade de parcelas</Text>
                                <Picker
                                    selectedValue={this.state.numberInstallments}
                                    style={{ width: Dimensions.get('screen').width * 0.8, color: this.props.theme.colors.text }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ numberInstallments: itemValue })
                                    }>
                                    <Picker.Item label="À vista" value="1" />
                                    <Picker.Item label="2x sem juros" value="2" />
                                    <Picker.Item label="3x sem juros" value="3" />
                                    <Picker.Item label="4x sem juros" value="4" />
                                    <Picker.Item label="5x sem juros" value="5" />
                                    <Picker.Item label="6x sem juros" value="6" />
                                    <Picker.Item label="7x sem juros" value="7" />
                                    <Picker.Item label="8x sem juros" value="8" />
                                    <Picker.Item label="9x sem juros" value="9" />
                                    <Picker.Item label="10x sem juros" value="10" />
                                    <Picker.Item label="11x sem juros" value="11" />
                                    <Picker.Item label="12x sem juros" value="12" />
                                </Picker>
                            </View>

                            <View style={{ alignItems: 'center', marginTop: Dimensions.get('screen').height * 0.02}}>
                                <Button
                                    labelStyle={{ color: this.props.theme.colors.button.text }}
                                    style={{ backgroundColor: this.props.theme.colors.button.background, width: 200 }}
                                    onPress={() => this.createAccount()}>Assinar</Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

export default withTheme(PaymentRegisterComponent);