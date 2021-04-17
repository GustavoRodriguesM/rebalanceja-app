import React, { Component } from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import { Button, TextInput, withTheme } from 'react-native-paper';
import { RebalancingService } from '../../../services/RebalancingService';
import { AuthService } from '../../../services/AuthService';
import defaultStyle from '../../../styles/defaultStyle';
import AquisitionSupportComponent from '../../../components/investment-components/AquisitionSupportComponent';

class RebalancingSubscreen extends Component {

    state = {
        aquisitionSupports: [],
        financialSupport: 0,
        isLoading: false
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
            if(this.state.financialSupport > 0) {
                await this.rebalanceStocks();
            }
        });
    }


    rebalanceStocks = async () => {
        this.setState({ isLoading: true })
        await this.rebalancingService.rebalance(this, this.state.financialSupport);
        this.setState({ isLoading: false })
    }

    onRegister = async (buyValue, isBuyOperation) => {
        if(isBuyOperation) {
            if(Number(this.state.financialSupport) - buyValue <= 0)
                this.setState({financialSupport: "0"});
            else
                this.setState({financialSupport: (Number(this.state.financialSupport) - buyValue).toFixed(2)});
        }else {
            console.log("NewFinancialSupport: " + (Number(this.state.financialSupport) + Number(buyValue)));
            this.setState({financialSupport: (Number(this.state.financialSupport) + Number(buyValue)).toFixed(2)});
        }
        
    }

    renderItem = ({ index }) => {
        return (
            <AquisitionSupportComponent
                key={index}
                gridName={this.state.aquisitionSupports[index].aquisitionQuoteDTO.stock.symbol}
                categoryDescription={this.state.aquisitionSupports[index].aquisitionQuoteDTO.stock.category.description}
                categoryColor={this.state.aquisitionSupports[index].aquisitionQuoteDTO.stock.category.defaultColor}
                buyValue={this.state.aquisitionSupports[index].buyValue}
                buyQuantity={this.state.aquisitionSupports[index].buyQuantity}
                priceInBRL={this.state.aquisitionSupports[index].aquisitionQuoteDTO.stock.priceInBRL}
                percentualDifference={this.state.aquisitionSupports[index].percentualDifferenceOriginal}
                onPressAquisitionSupport={() => {
                    this.props.navigation.navigate('FinancialSupportSubscreen', {aquisition: this.state.aquisitionSupports[index], onRegister: this.onRegister});
                }}

            />)
    }


    render() {
        return (
            <View style={defaultStyle.defaultBackgroundWithFlex}>
                <Text style={{
                    marginLeft: Dimensions.get("screen").width * 0.05,
                    marginTop: Dimensions.get("screen").width * 0.05,
                    fontSize: 16,
                    color: this.props.theme.colors.text
                }}>Rebalanceamento de ativos</Text>
                <View style={{ margin: Dimensions.get("screen").width * 0.05 }}>
                    <TextInput
                        label="Aporte"
                        mode="outlined"
                        keyboardType='decimal-pad'
                        value={this.state.financialSupport.toString()}
                        style={{ backgroundColor: this.props.theme.colors.textInputBackground, marginBottom: 10 }}
                        theme={{ colors: { text: this.props.theme.colors.text, placeholder: this.props.theme.colors.text, primary: this.props.theme.colors.text } }}
                        onChangeText={financialSupport => this.setState({ financialSupport })} />
                    <Button mode="contained"
                        loading={this.state.isLoading}
                        style={{ backgroundColor: this.props.theme.colors.primary }}
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

export default withTheme(RebalancingSubscreen);