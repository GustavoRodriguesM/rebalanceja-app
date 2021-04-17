import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { RebalancingService } from '../services/RebalancingService';
import { AuthService } from '../services/AuthService';
import { WalletService } from '../services/WalletService';
import { Button, withTheme } from 'react-native-paper';
import ProfileGroupComponent from '../components/profile-components/ProfileGroupComponent';
import ProfileItemComponent from '../components/profile-components/ProfileItemComponent';

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wallets: []
        }
        this.rebalancingService = new RebalancingService();

        this.authService = new AuthService();
        this.walletService = new WalletService();
    }
    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            let hasTokenValid = await this.authService.hasTokenValid();
            if (!hasTokenValid) {
                await this.authService.loginViaRefreshToken();
            }

        });

    }

    logout = () => {
        console.log("teste");
        this.authService.logout();
        this.props.navigation.navigate("AuthScreen");
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#161616' }}>
                <View style={{ alignSelf: 'center', marginTop: Dimensions.get('screen').height * 0.02 }}>
                    <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', }}>
                        Configurações
                    </Text>
                </View>
                <ProfileGroupComponent title="Sua conta">
                    <ProfileItemComponent title="Editar perfil" description="teste" onPress={() => console.log("Clicou em editar perfil")}/>
                    <ProfileItemComponent title="Alterar senha"  onPress={() => console.log("Clicou em alterar senha")}/>
                </ProfileGroupComponent>
                <ProfileGroupComponent title="Carteiras">
                    <ProfileItemComponent title="Visualizar carteiras" description="teste"/>
                    <ProfileItemComponent title="Alterar senha"/>
                </ProfileGroupComponent>
                <Button mode="contained"
                        labelStyle={{color: this.props.theme.colors.text}}
                    style={{ backgroundColor: this.props.theme.colors.primary }}
                    onPress={() => this.logout()}>
                    Sair
                </Button>
            </View>
        )
    }
}

export default withTheme(ProfileScreen);