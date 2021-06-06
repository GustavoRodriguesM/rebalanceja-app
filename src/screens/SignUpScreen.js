import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { ActivityIndicator, Button, Subheading, Text, Title, withTheme } from "react-native-paper";
import UserDataComponent from "../components/signup-components/UserDataComponent";
import ProgressSteps from "../components/stepper-components/ProgressSteps";
import ProgressStep from "../components/stepper-components/ProgressStep";
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
            isConfirmed: false
        }
    }

    onGoToSignIn = () => {
        this.props.navigation.navigate('AuthScreen');
    }

    createAccount = async (obj) => {
        this.setState({ isLoading: true });
        let paymentResponseAsync = await this.signUpService.register(obj);
        this.setState({ isConfirmed: true });
    }

    onCreateUser = () => {
        this.props.navigation.navigate('AuthScreen');
    }

    render() {
        return (
            <View style={this.props.theme.styles.defaultBackgroundWithFlex}>
                <UserDataComponent
                    onGoToSignIn={() => this.onGoToSignIn()}
                    onCreateUser={() => this.onCreateUser()}
                />
            </View>
        );
    }
};

export default withTheme(SignUpScreen);