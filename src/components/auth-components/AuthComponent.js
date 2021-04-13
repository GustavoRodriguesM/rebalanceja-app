import axios from 'axios'
import React, { Component, createContext, useContext } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'
import { hasTokenValid } from '../../services/AuthService'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'gustavorodriguesm@hotmail.com',
            password: '12345678',
            name: '',
            confirmPassword: '',
            stageNew: false,
            errorBadCredentials: false
        };

        if(hasTokenValid()) {
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
                url: "http://192.168.1.67:9000/oauth/token",
                data: bodyFormData,
                headers: { "Authorization": "Basic d2ViOjEyMw==" },
            })
                .then(function (response) {

                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
                    AsyncStorage.setItem('access_token', response.data.access_token);
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
                    {this.state.errorBadCredentials &&
                        <Text>Usuario/senha invalidos!</Text>
                    }
                    {this.state.stageNew &&
                        <Input
                            label="Nome"
                            placeholder="João da Silva"
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            style={styles.input}
                            onChangeText={name => this.setState({ name })} />
                    }
                    <Input
                        label="E-mail"
                        placeholder='email@email.com'
                        leftIcon={{ type: 'font-awesome', name: 'envelope-square' }}
                        onChangeText={email => this.setState({ email })}
                    />
                    <Input
                        label='Senha'
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry={true}
                    />
                    {this.state.stageNew &&
                        <Input
                            label='Confirme a senha'
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            secureTextEntry={true}
                        />}

                    {this.state.stageNew &&
                        <Button
                            onPress={this.signUp}
                            title="Registrar!"
                        />}
                    {!this.state.stageNew &&
                        <Button
                            title="Entrar"
                            onPress={this.signIn}
                        />}
                    <View style={styles.labelAux}>
                        {!this.state.stageNew &&
                            <Text onPress={
                                () => this.setState({ stageNew: true, errorBadCredentials: false })
                            }>Ainda não tem uma conta? Se registre!</Text>}
                        {this.state.stageNew &&
                            <Text onPress={
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
        backgroundColor: '#fff',
        padding: 20,
        width: '90%'
    },
    labelAux: {
        alignItems: 'center',
        marginTop: 10
    }
})

export default Auth;