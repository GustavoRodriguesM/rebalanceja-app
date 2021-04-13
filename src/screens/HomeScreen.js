import axios from 'axios'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import GeneralInvestComponent from '../components/home-components/GeneralInvestComponent'
import StockGridComponent from '../components/home-components/StockGridComponent'
import StockListComponent from '../components/home-components/StockListComponent'
import WelcomeComponent from '../components/home-components/WelcomeComponent'
import { getGeneralData } from '../services/GeneralDataService'
import DefaultStyle from '../styles/defaultStyle'
import {NavigationEvents} from 'react-navigation';

export default class HomeScreen extends Component {
    
    state = {
        user: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.teste();
        });
    }

    teste = () => {
        getGeneralData(this);
    }

    getGrid = () => {
        let components = [];
        if(typeof this.state.user.generalCategories !== "undefined") {
            for(let i = 0; i < this.state.user.generalCategories.length; i++) {
                components.push(
                    <StockGridComponent key={i} 
                                        gridName={this.state.user.generalCategories[i].category.description}
                                        bgColor={this.state.user.generalCategories[i].category.defaultColor} 
                                        totalInvestment={this.state.user.generalCategories[i].sumStocks}
                                        actual={this.state.user.generalCategories[i].actualPercentual}
                                        objective={this.state.user.generalCategories[i].idealPercentual}
                    />
                )
            }
        }

        return components;
    }

    render() {
        return (
            <View style={DefaultStyle.defaultBackground}>
                <WelcomeComponent name="Gustavo" />
                <GeneralInvestComponent
                    bgColor='#52BB9C'
                    totalInvestments={this.state.user.sumAllStocks}
                />
                <StockListComponent >
                    {this.getGrid()}
                </StockListComponent>
            </View>
        )
    }
}