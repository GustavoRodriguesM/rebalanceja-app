import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import { AuthService } from '../services/AuthService'
import { TextInput, Button, useTheme, HelperText } from 'react-native-paper'
import ErrorMessage from '../components/utils-components/ErrorMessage'
import { Controller, useForm } from 'react-hook-form'
import AppButton from '../components/utils-components/AppButton';

export default props => {

    const [badCredencials, setBadCredencials] = useState(false)

    const { register, control, formState: { errors }, handleSubmit } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    useEffect(() => {
        verifyTokenValid();
    }, [])

    const verifyTokenValid = async () => {
        let hasTokenValid = await new AuthService().hasTokenValid();
        if (hasTokenValid) {
            props.navigation.navigate('HomeScreen');
        }
    }

    const signIn = async (form) => {
        let loginData = {
            username: form.emailForm,
            password: form.passwordForm,
        }
        let success = await new AuthService().login(loginData);
        if (success === 1) {
            setBadCredencials(false)
            props.navigation.navigate('HomeScreen');
        } else {
            setBadCredencials(true)
        }
    };

    return (
        <View style={styles.loginStyle}>
            <View style={styles.formContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={{ alignItems: 'center', marginBottom: Dimensions.get('screen').height * 0.06 }}>
                        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Bem vindo</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <HelperText visible={badCredencials} type='error'>
                            Login e senha inválidos, tente novamente
                    </HelperText>
                    </View>
                    <View style={{ marginTop: Dimensions.get('screen').height * 0.02 }}>
                        <Controller
                            name="emailForm"
                            control={control}
                            rules={{
                                required: true,
                                validate: {
                                    emailField: (value) => { return value.includes("@") },
                                    withoutSpace: (value) => { return !value.includes(" ") },
                                }
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                keyboardType='email-address'
                                autoCapitalize='none'
                                mode="flat"
                                onBlur={onBlur}
                                value={value}
                                label="Email"
                                onChangeText={value => onChange(value)}
                                style={{
                                    backgroundColor: '#262626'
                                }}
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            />)}
                        />
                        <ErrorMessage
                            type={errors.emailForm?.type}
                            error={errors.emailForm}
                            minValue={0} />
                    </View>

                    <View style={{ marginTop: Dimensions.get('screen').height * 0.02 }}>
                        <Controller
                            name="passwordForm"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (<TextInput
                                keyboardType='number-pad'
                                mode="flat"
                                onBlur={onBlur}
                                value={value}
                                label="Senha"
                                onChangeText={value => onChange(value)}
                                style={{
                                    backgroundColor: '#262626'
                                }}
                                secureTextEntry={true}
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            />)}
                        />
                        <ErrorMessage
                            type={errors.passwordForm?.type}
                            error={errors.passwordForm}
                            minValue={0} />
                    </View>

                    <View style={styles.containerForgotPassword}>
                        <Text style={{ color: '#fff' }}>Esqueci minha senha</Text>
                    </View>

                    <AppButton
                        onPress={handleSubmit(signIn)}
                        title='Entrar'
                    />


                    <View style={styles.containerDontHaveAccount}>
                        <Text style={{ color: '#fff' }} onPress={
                            () => props.navigation.navigate('SignUpScreen')
                        }>Ainda não tem uma conta? Crie uma!</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )

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
        marginBottom: Dimensions.get('screen').height * 0.02,
        marginTop: Dimensions.get('screen').height * 0.02
    },
    containerDontHaveAccount: {
        alignItems: 'center',
        marginTop: Dimensions.get('screen').height * 0.02
    }
})