import React, { Component } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { Appbar, Button, Headline, Subheading, TextInput, Title, withTheme } from "react-native-paper";
import { SubscriptionPlanService } from "../../services/SubscriptionPlanService";
import PrincingCardComponent, { PrincingDetailComponent } from "../basic-components/PrincingCardComponent";


class SelectPlanComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subscriptionPlans: []
        };
        this.subscriptionPlanService = new SubscriptionPlanService();
        this.getSubscriptionPlans();

    }

    getSubscriptionPlans = async () => {
        let subscriptionPlans = await this.subscriptionPlanService.getAvailableSubscriptionPlans();
        this.setState({ subscriptionPlans: subscriptionPlans })
    }

    getSubscriptionPlanComponents = () => {
        let components = []
        if (typeof this.state.subscriptionPlans !== "undefined") {
            for (let i = 0; i < this.state.subscriptionPlans.length; i++) {
                components.push(
                    <PrincingCardComponent
                        key={i}
                        subscriptionPlan={this.state.subscriptionPlans[i]}
                        chooseSubscriptionPlan={this.props.chooseSubscriptionPlan} />);
            }
        }
        return components;
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Appbar.Header>
                        <Appbar.BackAction onPress={() => this.props.onGoBack()} />
                        <Appbar.Content title="Escolha um plano" />
                    </Appbar.Header>
                    <View style={{ margin: Dimensions.get('screen').width * 0.05 }}>
                        <View style={{ marginBottom: Dimensions.get('screen').height * 0.05, marginTop: Dimensions.get('screen').height * 0.02 }}>
                            <Subheading>Nossos planos possuem vigência anual e saem menos de 1 real por dia!</Subheading>
                        </View>
                        {this.getSubscriptionPlanComponents()}
                    </View>
                </ScrollView>
            </View>
        );
    }

}

export default withTheme(SelectPlanComponent);