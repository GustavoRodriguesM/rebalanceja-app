import React, { Component } from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { RebalancingService } from '../services/RebalancingService';
import { AuthService } from '../services/AuthService';
import { WalletService } from '../services/WalletService';
import { Appbar, Button, withTheme } from 'react-native-paper';
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
            <View style={{ flex: 1, backgroundColor: this.props.theme.colors.viewBackground }}>
                <ScrollView>

                    <Appbar.Header>
                        <Appbar.Content title={"Perfil"} style={{ alignItems: 'center' }} />
                    </Appbar.Header>
                    <ProfileGroupComponent title="PERFIL">
                        <ProfileItemComponent title="Editar perfil" description="teste" onPress={() => console.log("Clicou em editar perfil")} />
                        <ProfileItemComponent title="Alterar senha" onPress={() => console.log("Clicou em alterar senha")} />
                    </ProfileGroupComponent>
                    <ProfileGroupComponent title="CARTEIRAS">
                        <ProfileItemComponent title="Visualizar carteiras" description="teste" />
                        <ProfileItemComponent title="Alterar senha" />
                    </ProfileGroupComponent>
                    <ProfileGroupComponent title="PLANOS">
                        <ProfileItemComponent title="Visualizar carteiras" description="teste" />
                        <ProfileItemComponent title="Alterar senha" />
                    </ProfileGroupComponent>
                    <View style={{ alignItems: 'center' }}>
                        <Button mode="contained"
                            style={{ 
                                    backgroundColor: this.props.theme.colors.primary, 
                                    marginTop: Dimensions.get('screen').height * 0.05, 
                                    marginBottom: Dimensions.get('screen').height * 0.05, 
                                    width: '50%' }}
                            onPress={() => this.logout()}>
                            Sair
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default withTheme(ProfileScreen);