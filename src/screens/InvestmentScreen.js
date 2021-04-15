import React, { Component } from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import defaultStyle from '../styles/defaultStyle';
import { RebalancingService } from '../services/RebalancingService';
import AquisitionSupportComponent from '../components/investment-components/AquisitionSupportComponent';
import { getPrimaryColor } from '../styles/DefaultColors';
import { AuthService } from '../services/AuthService';
import { ActivityIndicator, Button, Colors, TextInput } from 'react-native-paper';
import { DefaultThemeColors } from '../styles/DefaultThemeColors';

export default class InvestmentScreen extends Component {

    state = {
        aquisitionSupports: [],
        financialSupport: 0,
        isLoading: false
    }

    constructor(props) {
        super(props);
        this.rebalancingService = new RebalancingService();
        this.defaultThemeColors = new DefaultThemeColors();
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


    rebalanceStocks = async () => {
        this.setState({isLoading: true})
        await this.rebalancingService.rebalance(this, this.state.financialSupport);
        this.setState({isLoading: false})
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
                <Text style={{ 
                    marginLeft: Dimensions.get("screen").width * 0.05, 
                    marginTop: Dimensions.get("screen").width * 0.05, 
                    fontSize: 16, 
                    color: this.defaultThemeColors.getDefaultTextColor()
                }}>Rebalanceamento de ativos</Text>
                <View style={{ margin: Dimensions.get("screen").width * 0.05 }}>
                    <TextInput
                        label="Aporte"
                        mode="outlined"
                        keyboardType='decimal-pad'
                        style={{ backgroundColor: this.defaultThemeColors.getBackgroundTextInputColor(), marginBottom: 10 }}
                        theme={{ colors: { text: this.defaultThemeColors.getDefaultTextColor(), placeholder: this.defaultThemeColors.getDefaultTextColor(), primary: this.defaultThemeColors.getDefaultTextColor() } }}
                        onChangeText={financialSupport => this.setState({ financialSupport })} />
                    <Button mode="contained" 
                        loading={this.state.isLoading} 
                        style={{backgroundColor: getPrimaryColor()}}
                        onPress={this.rebalanceStocks}
                        >
                            Rebalancear
                    </Button>
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
