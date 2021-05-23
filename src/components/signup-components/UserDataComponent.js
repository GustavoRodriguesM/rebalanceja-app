import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { Appbar, Button, TextInput, useTheme } from "react-native-paper";
import { SignUpService } from "../../services/SignUpService";
import ErrorMessage from '../../components/utils-components/ErrorMessage';
import { UserService } from "../../services/UserService";
import DateTimePicker from '@react-native-community/datetimepicker';
import { convertDateToString } from "../../services/CommonService";

export default props => {

    const [date, setDate] = useState(new Date());

    const { register, control, formState: { errors }, handleSubmit } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const saveUserData = async (form) => {
        let register = {
            name: form.nameForm,
            email: form.emailForm,
            phoneNumber: form.phoneForm,
            birthDate: form.birthdateForm
        }
        console.log(register)
        await new SignUpService().register(register);
        props.onCreateUser();
    }

    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Content title="Dados pessoais" style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <View style={{ padding: Dimensions.get('screen').width * 0.05, borderRadius: 20, marginTop: Dimensions.get('screen').width * 0.1 }}>

                <View style={{ marginBottom: Dimensions.get('screen').width * 0.1 }}>
                    <Text style={{ color: useTheme().colors.text }}>Por favor digite alguns dados básicos para que possamos iniciar!</Text>
                </View>

                <View style={{ marginTop: Dimensions.get('screen').height * 0.01, marginBottom: Dimensions.get('screen').height * 0.02 }}>
                    <Controller
                        name="nameForm"
                        control={control}
                        rules={{
                            required: true,
                            minLength: 3,
                            maxLength: 150,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                mode="flat"
                                label="Nome"
                                autoCapitalize='words'
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                                style={{ marginBottom: Dimensions.get('screen').height * 0.02, backgroundColor: '#262626' }}
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            />
                        )}
                    />
                    <ErrorMessage
                        type={errors.nameForm?.type}
                        error={errors.nameForm}
                        minLength={3}
                        maxLength={150}
                    />
                </View>



                <View style={{ marginTop: Dimensions.get('screen').height * 0.01, marginBottom: Dimensions.get('screen').height * 0.02 }}>
                    <Controller
                        name="emailForm"
                        control={control}
                        rules={{
                            required: true,
                            minLength: 3,
                            maxLength: 150,
                            validate: {
                                emailField: (value) => { return value.includes("@") },
                                duplicatedEmail: async (value) => { return !(await new UserService().existsEmail(value)) }
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                mode="flat"
                                label="Email"
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onBlur={onBlur}
                                value={value}
                                onChangeText={value => onChange(value)}
                                style={{ marginBottom: Dimensions.get('screen').height * 0.02, backgroundColor: '#262626' }}
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            />
                        )}
                    />
                    <ErrorMessage
                        type={errors.emailForm?.type}
                        error={errors.emailForm}
                        minLength={3}
                        maxLength={150}
                    />
                </View>

                <View style={{ marginTop: Dimensions.get('screen').height * 0.01, marginBottom: Dimensions.get('screen').height * 0.02 }}>
                    <Controller
                        name="birthdateForm"
                        control={control}
                        rules={{
                            required: true,
                            minLength: 10,
                            maxLength: 10
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                mode="flat"
                                label="Data de nascimento"
                                onBlur={onBlur}
                                value={value}
                                maxLength={10}
                                onChangeText={value => {
                                    var v = value;
                                    console.log(v)
                                    if (v.length <= 10) {
                                        if (v.match(/^\d{2}$/) !== null) {
                                            value = v + '/';
                                        } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
                                            value = v + '/';
                                        }
                                    }
                                    onChange(value)
                                }}
                                style={{ marginBottom: Dimensions.get('screen').height * 0.02, backgroundColor: '#262626' }}
                                theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                            />

                        )}
                    />
                    <ErrorMessage
                        type={errors.birthdateForm?.type}
                        error={errors.birthdateForm}
                        minLength={10}
                        maxLength={10}
                    />
                </View>
            </View>

            <View style={{ alignItems: 'center', marginBottom: Dimensions.get('screen').height * 0.05 }}>
                <Button
                    labelStyle={{ color: useTheme().colors.button.text }}
                    style={{ backgroundColor: useTheme().colors.button.background, width: 200 }}
                    onPress={handleSubmit(saveUserData)}>Cadastrar</Button>

                <Text style={{ color: '#fff', marginTop: Dimensions.get('screen').height * 0.05 }} onPress={
                    () => props.onGoToSignIn()}>
                    Já está cadastrado? Entre agora mesmo
                    </Text>
            </View>
        </ScrollView>
    );


}
