import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import { Button, Divider, Text, withTheme, Avatar, Subheading } from "react-native-paper";
import { SignUpService } from "../../services/SignUpService";
import BRLCurrencyFormat from "../../utils/BRLCurrencyFormat";

export class PrincingDetailComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'baseline', padding: 10 }}>
                <Avatar.Icon
                    size={24}
                    icon="check-bold"
                />
                <Text> {this.props.description}</Text>
            </View>
        )
    }
}

class PrincingCardComponent extends Component {

    constructor(props) {
        super(props);
        this.signUpService = new SignUpService();
    }

    chooseSubscriptionPlan = () => {
        this.signUpService.saveSubscriptionPlanRegister(JSON.stringify(this.props.subscriptionPlan));
        this.props.chooseSubscriptionPlan();
    }

    render() {
        return (
            <View style={{ alignItems: 'center', marginBottom: Dimensions.get('window').height * 0.05 }}>
                <View style={{ width: Dimensions.get('window').width * 0.90, backgroundColor: this.props.theme.colors.signUpScreen.recommendedButtonBackground, padding: 25, borderRadius: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Text>{this.props.subscriptionPlan.description}</Text>
                        {this.props.subscriptionPlan.description === "Padrão" &&
                            <Text style={{ color: this.props.theme.colors.viewBackground, backgroundColor: this.props.theme.colors.primary, borderRadius: 20, paddingLeft: 5, paddingRight: 5, paddingTop: 3, paddingBottom: 3 }}>Recomendado</Text>
                        }
                    </View>
                    <Subheading style={{ marginBottom: Dimensions.get('window').height * 0.02 }}>R$ {BRLCurrencyFormat(this.props.subscriptionPlan.amount)} /ano</Subheading>
                    <Divider style={{ backgroundColor: this.props.theme.colors.divider }} />

                    {this.props.subscriptionPlan.maxStocks == 500 &&
                        <PrincingDetailComponent description="Ativos ilimitados!" />
                    }
                    
                    <PrincingDetailComponent description={"Acesso a todas as categorias de ativos!"} />

                    {this.props.subscriptionPlan.maxStocks != 500 &&
                        <PrincingDetailComponent description={"Máximo de " + this.props.subscriptionPlan.maxStocks + " ativos!"} />
                    }

                    {this.props.subscriptionPlan.maxWallets > 1 &&
                        <PrincingDetailComponent description={"Utilize " + this.props.subscriptionPlan.maxWallets + " carteiras distintas!"} />
                    }

                    <PrincingDetailComponent description={"Parcele em até " + this.props.subscriptionPlan.maxInstallments + " vezes!"} />

                    <Button onPress={() => this.chooseSubscriptionPlan()}>Escolher plano</Button>
                </View>
            </View>
        );
    }

}

export default withTheme(PrincingCardComponent);