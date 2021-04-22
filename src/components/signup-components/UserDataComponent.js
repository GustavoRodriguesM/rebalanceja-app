import React, { Component } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { Appbar, Button, HelperText, TextInput, Title, withTheme } from "react-native-paper";
import { SignUpService } from "../../services/SignUpService";


class UserDataComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            phoneNumber: "",
            birthDate: "",
            canValidate: true
        }

        this.signUpService = new SignUpService();
    }

    saveUserData = () => {
        this.setState({canValidate: true});
        console.log("canValidate on saveUserData(): " + this.state.canValidate);
        if (this.validForm()) {
            let register = {
                name: this.state.name,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                birthDate: this.state.birthDate
            }
            this.signUpService.saveUserDataRegister(JSON.stringify(register));
            this.props.onGoToSelectPlan();
        }
    }

    validForm = () => {
        if (this.isEmpty(this.state.name))
            return false;
        if (this.isEmpty(this.state.email))
            return false;
        if (this.isEmpty(this.state.phoneNumber))
            return false;
        if (this.isEmpty(this.state.birthDate))
            return false;
        
            
        return true;
    }

    hasErrors() {
        return true;
    }

    isEmpty = (value) => {
        console.log("this.state.canValidate: " +  this.state.canValidate )
        if (this.state.canValidate) {
            return value === 'undefined' || value === '';
        }

        return false;
    }

    render() {
        return (
            <ScrollView>
                <Appbar.Header>
                    <Appbar.Content title="Dados pessoais" style={{ alignItems: 'center' }} />
                </Appbar.Header>
                <View style={{ padding: Dimensions.get('screen').width * 0.05, borderRadius: 20, marginTop: Dimensions.get('screen').width * 0.1 }}>
                    <Title style={{ color: this.props.theme.colors.primary }}></Title>
                    <Text style={{ color: this.props.theme.colors.text }}>Por favor digite alguns dados basicos para que possamos iniciar!</Text>

                    <HelperText type="error" visible={this.isEmpty(this.state.name)} style={{ color: '#fff' }}>
                        Nome é obrigatório!
                    </HelperText>
                    <TextInput
                        mode="outlined"
                        label="Nome"
                        onChangeText={(name) => this.setState({ name: name })}
                        style={{ marginBottom: Dimensions.get('screen').height * 0.01, backgroundColor: '#262626' }}
                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                    />

                    <HelperText type="error" visible={this.isEmpty(this.state.email)} style={{ color: '#fff' }}>
                        Email é obrigatório!
                    </HelperText>
                    <TextInput
                        mode="outlined"
                        label="Email"
                        onChangeText={(email) => this.setState({ email: email })}
                        keyboardType="email-address"
                        style={{ marginBottom: Dimensions.get('screen').height * 0.01, backgroundColor: '#262626' }}
                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                    />

                    <HelperText type="error" visible={this.isEmpty(this.state.phoneNumber)} style={{ color: '#fff' }}>
                        Contato é obrigatório!
                    </HelperText>
                    <TextInput
                        mode="outlined"
                        placeholder="Contato"
                        onChangeText={(phoneNumber) => this.setState({ phoneNumber: phoneNumber })}
                        keyboardType='name-phone-pad'
                        style={{ marginBottom: Dimensions.get('screen').height * 0.02, backgroundColor: '#262626' }}
                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                    />

                    <HelperText type="error" visible={this.isEmpty(this.state.birthDate)} style={{ color: '#fff' }}>
                        Data de nascimento é obrigatória!
                    </HelperText>
                    <TextInput
                        mode="outlined"
                        onChangeText={(birthDate) => this.setState({ birthDate: birthDate })}
                        placeholder="Data de nascimento"
                        style={{ marginBottom: Dimensions.get('screen').height * 0.02, backgroundColor: '#262626' }}
                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Button
                        labelStyle={{ color: this.props.theme.colors.button.text }}
                        style={{ backgroundColor: this.props.theme.colors.button.background, width: 200 }}
                        onPress={() => this.saveUserData()}>Avançar</Button>

                    <Text style={{ color: '#fff', marginTop: Dimensions.get('screen').height * 0.05 }} onPress={
                        () => this.props.onGoToSignIn()}>
                        Já está cadastrado? Entre agora mesmo
                    </Text>
                </View>
            </ScrollView>
        );
    }

}

export default withTheme(UserDataComponent);