import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { ActivityIndicator, Button, Subheading, Text, Title, withTheme } from "react-native-paper";
import UserDataComponent from "../components/signup-components/UserDataComponent";
import ProgressSteps from "../components/stepper-components/ProgressSteps";
import ProgressStep from "../components/stepper-components/ProgressStep";
import SelectPlanComponent from "../components/signup-components/SelectPlanComponent";
import PaymentRegisterComponent from "../components/signup-components/PaymentRegisterComponent";
import { SignUpService } from "../services/SignUpService";


class SignUpScreen extends Component {

    constructor(props) {
        super(props);
        this.signUpService = new SignUpService();
        this.state = {
            register: {
                name: "",
                email: "",
                contato: "",
                birthday: ""
            },
            isLoading: false,
            isConfirmed: false,
            stepNumber: 1,
        }
    }


    onGoToSelectPlan = () => {
        let stepNumberNew = this.state.stepNumber + 1;
        this.setState({ stepNumber: stepNumberNew });
    }

    chooseSubscriptionPlan = () => {
        let stepNumberNew = this.state.stepNumber + 1;
        this.setState({ stepNumber: stepNumberNew });
    }

    onGoBack() {
        let stepNumberNew = this.state.stepNumber - 1;
        this.setState({ stepNumber: stepNumberNew });
    }

    onGoToSignIn = () => {
        this.props.navigation.navigate('AuthScreen');
    }

    createAccount = async (obj) => {
        this.setState({ isLoading: true });
        let paymentResponseAsync = await this.signUpService.register(obj);
        this.setState({ paymentResponse: paymentResponseAsync });
        this.setState({ isConfirmed: true });
    }

    render() {
        return (
            <View style={this.props.theme.styles.defaultBackgroundWithFlex}>
                {!this.state.isLoading &&
                    <ProgressSteps
                        renderItem={this.state.stepNumber - 1}>
                        <ProgressStep >
                            <UserDataComponent
                                onGoToSignIn={() => this.onGoToSignIn()}
                                onGoToSelectPlan={this.onGoToSelectPlan}
                            />
                        </ProgressStep>
                        <ProgressStep>
                            <SelectPlanComponent
                                chooseSubscriptionPlan={this.chooseSubscriptionPlan}
                                onGoBack={() => this.onGoBack()}
                            />
                        </ProgressStep>
                        <ProgressStep>
                            <PaymentRegisterComponent
                                createAccount={(obj) => this.createAccount(obj)}
                                onGoBack={() => this.onGoBack()}
                            />
                        </ProgressStep>
                    </ProgressSteps>
                }

                {(this.state.isLoading && this.state.isConfirmed && this.state.paymentResponse.responseSuccessDTO) &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                        <Title>Pagamento efetuado com sucesso</Title>
                        <Subheading>Seu pagamento foi confirmado</Subheading>
                        <Subheading>A identificação da sua compra é</Subheading>
                        <Subheading style={{ color: this.props.theme.colors.primary }}>#{this.state.paymentResponse.responseSuccessDTO.payment_id}</Subheading>
                        <Button
                            labelStyle={{ color: this.props.theme.colors.button.text }}
                            style={{ backgroundColor: this.props.theme.colors.button.background, width: Dimensions.get('screen').width * 0.7, marginTop: Dimensions.get('screen').height * 0.2 }}
                            onPress={() => this.props.navigation.navigate('AuthScreen')}>Entre na sua nova conta!</Button>
                    </View>
                }

                {(this.state.isLoading && this.state.isConfirmed && this.state.paymentResponse.responseErrorDTO) &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                        <Title>Erro ao realizar pagamento!</Title>
                        <Text style={{ marginLeft: Dimensions.get('screen').width * 0.15, marginRight: Dimensions.get('screen').width * 0.15 }}>Houve algum problema ao processar seu pagamento com a operadora!</Text>
                        <Subheading>Retorno dado pela operadora: </Subheading>
                        <Subheading style={{ color: this.props.theme.colors.primary }}>{this.state.paymentResponse.responseErrorDTO.details[0].description}</Subheading>
                        <Subheading style={{ color: this.props.theme.colors.primary }}>{this.state.paymentResponse.responseErrorDTO.details[0].description_detail}</Subheading>
                        <Button
                            labelStyle={{ color: this.props.theme.colors.button.text }}
                            style={{ backgroundColor: this.props.theme.colors.button.background, width: Dimensions.get('screen').width * 0.7, marginTop: Dimensions.get('screen').height * 0.2 }}
                            onPress={() => this.props.navigation.navigate('AuthScreen')}>Voltar para a tela de login</Button>
                    </View>
                }

                {(this.state.isLoading && !this.state.isConfirmed) &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                        <Title style={{ marginBottom: Dimensions.get('screen').height * 0.1 }}>Realizando pagamento</Title>
                        <ActivityIndicator animating={true} size={40} color={this.props.theme.colors.primary} />
                    </View>
                }

            </View>
        );
    }
};

export default withTheme(SignUpScreen);