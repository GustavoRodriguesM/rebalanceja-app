import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import defaultStyle from '../styles/defaultStyle';
import { RebalancingService } from '../services/RebalancingService';
import { AuthService } from '../services/AuthService';
import { WalletService } from '../services/WalletService';
import { FlatList } from 'react-native-gesture-handler';

export default class StockScreen extends Component {

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

        this.teste();
    });

    this.teste();
}

  teste = () => {
    this.walletService.getAllWallets(this);
  }

  renderItem = ({ index }) => {
    return (<Text key={index}>{this.state.wallets[index].description}</Text>)
  }

  render() {
    return (
      <View>
        <FlatList
          style={{ maxHeight: Dimensions.get("screen").height * 0.60 }}
          data={this.state.wallets}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: 10 }}
        />
      </View>
    )
  }
}
