import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper';

export default props => {

    if (props.type === 'undefined' || props.type == null) {
        return <></>;
    }
    
    if (props.type === 'emailField' && props.error)
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    color: useTheme().colors.error
                }}>Email inválido!</Text>
            </View>
        )
    if (props.type === 'withoutSpace' && props.error)
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    color: useTheme().colors.error
                }}>Campo não pode conter espaços</Text>
            </View>
        )
    if (props.type === 'duplicateStock' && props.error)
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    color: useTheme().colors.error
                }}>Esse ativo já existe na sua carteira!</Text>
            </View>
        )
    if (props.type === 'existsStock' && props.error)
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    color: useTheme().colors.error
                }}>Erro ao buscar este ativo</Text>
            </View>
        )

    if (props.type === 'required' && props.error)
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    color: useTheme().colors.error
                }}>Campo é obrigatório</Text>
            </View>
        )
    if (props.type === 'minLength' && props.error) {
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    color: useTheme().colors.error
                }}>Tamanho mínimo é {props.minLength} caracteres</Text>
            </View>
        )
    }
    if (props.type === 'maxLength' && props.error) {
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    color: useTheme().colors.error
                }}>Tamanho maximo é {props.maxLength} caracteres</Text>
            </View>
        )
    }
    if (props.type === 'min' && props.error) {
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    color: useTheme().colors.error
                }}>Campo não pode ser menor que {props.minValue}</Text>
            </View>
        )
    }
    if (props.type === 'max' && props.error) {
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    color: useTheme().colors.error
                }}>Campo não pode ser maior que {props.maxValue}</Text>
            </View>
        )
    }

    return (<></>);
}