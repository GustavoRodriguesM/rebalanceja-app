import React, { Component } from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements';
import defaultStyle from '../styles/defaultStyle';
import { RebalancingService } from '../services/RebalancingService';
import AquisitionSupportComponent from '../components/investment-components/AquisitionSupportComponent';
import { getPrimaryColor } from '../styles/DefaultColors';
import { AuthService } from '../services/AuthService';
import { TextInput } from 'react-native-paper';

export default class InvestmentScreen extends Component {

    state = {
        aquisitionSupports: [],
        financialSupport: 0
    }

    constructor(props) {
        super(props);
        this.rebalancingService = new RebalancingService();

        this.authService = new AuthService();
    }


    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            let hasTokenValid = await this.authService.hasTokenValid();
            if (!hasTokenValid) {
                await this.authService.loginViaRefreshToken();
            }
        });
    }


    teste = () => {
        this.rebalancingService.rebalance(this, this.state.financialSupport);
    }



    renderItem = ({ index }) => {
        return (<AquisitionSupportComponent
            key={index}
            gridName={this.state.aquisitionSupports[index].aquisitionQuoteDTO.stock.symbol}
            categoryDescription={this.state.aquisitionSupports[index].aquisitionQuoteDTO.stock.category.description}
            buyValue={this.state.aquisitionSupports[index].buyValue}
            buyQuantity={this.state.aquisitionSupports[index].buyQuantity}
            priceInBRL={this.state.aquisitionSupports[index].aquisitionQuoteDTO.stock.priceInBRL}
            percentualDifference={this.state.aquisitionSupports[index].percentualDifferenceOriginal}
        />)
    }


    render() {
        return (
            <View style={defaultStyle.defaultBackgroundWithFlex}>
                <Text style={{ marginLeft: Dimensions.get("screen").width * 0.05, marginTop: Dimensions.get("screen").width * 0.05, fontSize: 16, color: "#fff" }}>Rebalanceamento de ativos</Text>
                <View style={{ margin: Dimensions.get("screen").width * 0.05 }}>
                    <TextInput
                        label="Aporte"
                        mode="outlined"
                        keyboardType='decimal-pad'
                        style={{ backgroundColor: '#262626', marginBottom: 10 }}
                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                        onChangeText={financialSupport => this.setState({ financialSupport })} />
                    <Button
                        title="Rebalancear"
                        buttonStyle={{ backgroundColor: getPrimaryColor() }}
                        onPress={this.teste}
                    />
                </View>
                <View>
                    <FlatList
                        style={{ maxHeight: Dimensions.get("screen").height * 0.60 }}
                        data={this.state.aquisitionSupports}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{ padding: 10 }}
                    />
                </View>
            </View>
        )
    }
}