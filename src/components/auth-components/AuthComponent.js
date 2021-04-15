import axios from 'axios'
import React, { Component, createContext, useContext } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Alert, Dimensions } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { AuthService } from '../../services/AuthService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getServerHost, UtilService } from '../../services/UtilService'
import { TextInput, RadioButton } from 'react-native-paper'
import { getPrimaryColor } from '../../styles/DefaultColors'

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
            stageNew: false,
            errorBadCredentials: false,
            remember: false
        };

        this.authService = new AuthService();
        this.utilSerice = new UtilService();

    }

    async componentDidMount() {
        let hasTokenValid = await new AuthService().hasTokenValid();
        if (hasTokenValid) {
            this.props.navigation.navigate('HomeScreen');
        }
    }

    signIn = () => {
        let self = this;

        try {
            var bodyFormData = new FormData();
            bodyFormData.append('grant_type', 'password');
            bodyFormData.append('username', self.state.email);
            bodyFormData.append('password', self.state.password);

            axios({
                method: "post",
                url: this.utilSerice.getLoginUrl(),
                data: bodyFormData,
                headers: self.authService.getBasicAuthorization()
            })
                .then(function (response) {
                    self.authService.saveToken(response);
                    self.props.navigation.navigate('HomeScreen');
                })
                .catch(function (response) {
                    console.log(response);
                    if (response.response.data.error_description === 'Bad credentials') {
                        self.setState({ errorBadCredentials: true });
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };

    signUp = () => {
        Alert.alert('Sucesso!', 'Criar a conta ')
    }

    render() {
        return (
            <View style={styles.loginStyle}>
                <View style={styles.formContainer}>
                    <View style={{ alignItems: 'center', marginBottom: Dimensions.get('screen').height * 0.06 }}>
                        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Bem vindo</Text>
                    </View>
                    <View>
                        {this.state.errorBadCredentials &&
                            <Text style={{ color: '#fff', alignItems: 'center', }}>Usuario/senha inválidos!</Text>
                        }
                        {this.state.stageNew &&
                            <TextInput
                                mode="outlined"
                                label="Nome"
                                style={{ marginTop: Dimensions.get('screen').height * 0.02, marginBottom: Dimensions.get('screen').height * 0.03, backgroundColor: '#262626' }}
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                                onChangeText={name => this.setState({ name })}
                            />
                        }
                        <TextInput
                            mode="outlined"
                            label="E-mail"
                            keyboardType='email-address'
                            style={{ backgroundColor: '#262626' }}
                            theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput
                            style={{ marginTop: Dimensions.get('screen').height * 0.02, marginBottom: Dimensions.get('screen').height * 0.03, backgroundColor: '#262626' }}
                            mode="outlined"
                            label="Senha"
                            theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff', }, }}
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry={true}
                        />
                        {this.state.stageNew &&
                            <TextInput
                                style={{ marginBottom: Dimensions.get('screen').height * 0.03, backgroundColor: '#262626' }}
                                mode="outlined"
                                label="Confirme a senha"
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff', }, }}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                secureTextEntry={true}
                            />
                        }
                    </View>

                    {!this.state.stageNew &&
                        <View style={styles.containerForgotPassword}>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <RadioButton
                                    theme={{ colors: { text: '#fff' } }}
                                    color="#fff"
                                    onPress={() => this.setState({ remember: !this.state.remember })}
                                    status={this.state.remember ? 'checked' : 'unchecked'}
                                />
                                <Text style={{ color: '#fff' }}>Lembrar-me</Text>
                            </View>
                            <Text style={{ color: '#fff' }}>Esqueci minha senha</Text>
                        </View>
                    }

                    {this.state.stageNew &&
                        <Button
                            onPress={this.signUp}
                            buttonStyle={{ backgroundColor: getPrimaryColor(), borderRadius: 15 }}
                            title="Registrar!"
                        />}
                    {!this.state.stageNew &&
                        <Button
                            title="Entrar"
                            buttonStyle={{ backgroundColor: getPrimaryColor(), borderRadius: 15 }}
                            onPress={this.signIn}
                        />}

                    <View style={styles.containerDontHaveAccount}>
                        {!this.state.stageNew &&
                            <Text style={{ color: '#fff' }} onPress={
                                () => this.setState({ stageNew: true, errorBadCredentials: false })
                            }>Ainda não tem uma conta? Crie uma!</Text>}
                        {this.state.stageNew &&
                            <Text style={{ color: '#fff' }} onPress={
                                () => this.setState({ stageNew: false, errorBadCredentials: false })
                            }>Já está registrado? </Text>}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginStyle: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212'
    },
    title: {
        fontSize: 70,
        marginBottom: 10,
        color: '#fff'
    },
    formContainer: {
        padding: 20,
        width: '90%'
    },
    containerForgotPassword: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: Dimensions.get('screen').height * 0.02
    },
    containerDontHaveAccount: {
        alignItems: 'center',
        marginTop: Dimensions.get('screen').height * 0.02
    }
})

export default Auth;