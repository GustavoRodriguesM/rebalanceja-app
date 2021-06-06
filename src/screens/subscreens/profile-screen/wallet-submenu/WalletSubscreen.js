import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { Appbar, List, withTheme } from 'react-native-paper';
import { AuthService } from '../../../../services/AuthService';
import { WalletService } from '../../../../services/WalletService';
import { AsyncStorageService } from '../../../../services/AsyncStorageService';

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
      this.getAllWallets();
    });

    this.getAllWallets();
  }

  getAllWallets = () => {
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
          new AsyncStorageService().setWalletToAlterConfig(this.state.wallets[index]);

          this.props.navigation.navigate('WalletConfigSubscreen', this.state.wallets[index]);
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
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title={"Carteiras"} style={{ alignItems: 'center' }} />
        </Appbar.Header>
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