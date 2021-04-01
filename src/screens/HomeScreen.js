import React from 'react'
import { SafeAreaView, StyleSheet, Text, View }  from 'react-native'
import GeneralInvestComponent from '../components/home-components/GeneralInvestComponent'
import StockGridComponent from '../components/home-components/StockGridComponent'
import StockListComponent from '../components/home-components/StockListComponent'
import WelcomeComponent from '../components/home-components/WelcomeComponent'
import DefaultStyle from '../styles/defaultStyle'

export default props => {
    return (
        <View style={DefaultStyle.defaultBackground}>
            <WelcomeComponent name="Gustavo"/>
            <GeneralInvestComponent 
                bgColor='#52BB9C'
                totalInvestments={1000000}/>
            <StockListComponent >
                <StockGridComponent 
                    brStock 
                    bgColor='#4DAF5C'/>
                <StockGridComponent 
                    brFiis 
                    bgColor='#4D85AF'/>
                <StockGridComponent 
                    extStock 
                    bgColor='#009c8a'/>
                <StockGridComponent 
                    reits 
                    bgColor='#009c8a' />
                <StockGridComponent 
                    fixedIncome 
                    bgColor='#0cca8e' 
                />
            </StockListComponent>
        </View>
    )
}