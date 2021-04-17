import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { List, withTheme } from 'react-native-paper';
import { AuthService } from '../../../services/AuthService';
import { WalletService } from '../../../services/WalletService';

class WalletSubscreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wallets: []
    }
    this.authService = new AuthService();
    this.walletService = new WalletService();
  }
  async componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      let hasTokenValid = await this.authService.hasTokenValid();
      if (!hasTokenValid) {
        await this.authService.loginViaRefreshToken();
      }

      this.teste();
    });

    this.teste();
  }

  teste = () => {
    this.walletService.getAllWallets(this);
  }

  renderItem = ({ index }) => {
    return (
      <List.Item
        key={index}
        titleStyle={this.props.theme.styles.textStyle}
        descriptionStyle={this.props.theme.styles.textStyle}
        title={this.state.wallets[index].description}
        description={this.state.wallets[index].totalStocks + " ativos"}
        left={props => <List.Icon {...props} icon="finance" color={this.props.theme.colors.primary} />}
        right={props => <List.Icon {...props} icon="chevron-right" color={this.props.theme.colors.primary} />}
        onPress={() => {
          console.log("Teste");
        }}
      />
    )
  }

  render() {
    return (
      <View style={{
        backgroundColor: this.props.theme.colors.viewBackground,
        flex: 1
      }}>
        <View style={{ alignItems: 'center', marginTop: Dimensions.get('screen').height * 0.05 }}>
          <Text style={this.props.theme.styles.stocksScreen.headerTextBold}>Carteiras</Text>
        </View>
        <View>
          <FlatList
            style={{ maxHeight: Dimensions.get("screen").height * 0.60 }}
            data={this.state.wallets}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ padding: 10 }}
          />
        </View>
      </View>
    )
  }
}

export default withTheme(WalletSubscreen);