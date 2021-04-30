import axios from 'axios'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { AuthService } from '../../services/AuthService'
import { UtilService } from '../../services/UtilService'
import { TextInput, RadioButton, HelperText, withTheme, Button } from 'react-native-paper'


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
            validate: false,
            valid: false,
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
        this.state.validate = true;
        this.state.valid = true;

        if (this.state.valid) {
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
        }
    };

    validateEmail = () => {
        if (this.state.validate) {
            return !this.state.email.includes('@');
        } else {
            return false;
        }
    }

    validatePasswordConfirmation = () => {
        if (this.state.validate) {
            return !this.state.password === this.state.confirmPassword;
        } else {
            return false;
        }
    }

    signUp = async () => {
        this.state.validate = true;
        let userRegister = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            passwordConfirmation: this.state.confirmPassword
        }
        
        await this.authService.register(this, userRegister);
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
                            autoCapitalize='none'
                            keyboardType='email-address'
                            style={{ backgroundColor: '#262626' }}
                            theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            onChangeText={email => this.setState({ email })}
                        />
                        <HelperText style={{ color: '#fff' }} type="error" visible={this.validateEmail()}>
                            Email address is invalid!
                        </HelperText>


                        <TextInput
                            style={{ marginTop: Dimensions.get('screen').height * 0.02, marginBottom: Dimensions.get('screen').height * 0.03, backgroundColor: '#262626' }}
                            mode="outlined"
                            label="Senha"
                            keyboardType='number-pad'
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
                            <Text style={{ color: '#fff' }}>Esqueci minha senha</Text>
                        </View>
                    }

                    {this.state.stageNew &&
                        <Button
                            onPress={this.signUp}
                            labelStyle={{ color: this.props.theme.colors.text }}
                            style={{ backgroundColor: this.props.theme.colors.primary, borderRadius: 15 }}
                        >Cadastrar
                        </Button>}
                    {!this.state.stageNew &&
                        <Button
                            labelStyle={{ color: this.props.theme.colors.text }}
                            style={{ backgroundColor: this.props.theme.colors.primary, borderRadius: 15 }}
                            onPress={this.signIn}
                        >Entrar</Button>}

                    <View style={styles.containerDontHaveAccount}>
                        {!this.state.stageNew &&
                            <Text style={{ color: '#fff' }} onPress={
                                () => this.props.navigation.navigate('SignUpScreen')
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

export default withTheme(Auth);