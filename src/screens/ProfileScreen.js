import React, { useEffect } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import { AuthService } from '../services/AuthService';
import { Appbar, Button, useTheme } from 'react-native-paper';
import ProfileGroupComponent from '../components/profile-components/ProfileGroupComponent';
import ProfileItemComponent from '../components/profile-components/ProfileItemComponent';

export default props => {

    useEffect(() => {
        props.navigation.addListener('focus', async () => {
            let hasTokenValid = await new AuthService().hasTokenValid();
            if (!hasTokenValid) {
                await new AuthService().loginViaRefreshToken();
            }

        });
    }, [])

    const logout = async () => {
        await new AuthService().logout();
        props.navigation.navigate("AuthScreen");
    }


    return (
        <View style={{ flex: 1, backgroundColor: useTheme().colors.viewBackground }}>
            <ScrollView>

                <Appbar.Header>
                    <Appbar.Content title={"Perfil"} style={{ alignItems: 'center' }} />
                </Appbar.Header>
                <ProfileGroupComponent title="PERFIL">
                    <ProfileItemComponent title="Editar perfil" description="teste" onPress={() => console.log("Clicou em editar perfil")} />
                    <ProfileItemComponent title="Alterar senha" onPress={() => console.log("Clicou em alterar senha")} />
                </ProfileGroupComponent>
                <ProfileGroupComponent title="CARTEIRAS">
                    <ProfileItemComponent
                        title="Visualizar carteiras"
                        onPress={() => console.log('Clicou')}
                    />
                </ProfileGroupComponent>
                <ProfileGroupComponent title="PLANOS">
                    <ProfileItemComponent title="Visualizar carteiras" description="teste" />
                    <ProfileItemComponent title="Alterar senha" />
                </ProfileGroupComponent>
                <View style={{ alignItems: 'center' }}>
                    <Button mode="contained"
                        style={{
                            backgroundColor: useTheme().colors.primary,
                            marginTop: Dimensions.get('screen').height * 0.05,
                            marginBottom: Dimensions.get('screen').height * 0.05,
                            width: '50%'
                        }}
                        onPress={() => logout()}>
                        Sair
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}
