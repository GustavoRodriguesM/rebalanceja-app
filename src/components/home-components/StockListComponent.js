import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View }  from 'react-native'

export default props => {
    return (
        <View>
            <ScrollView horizontal={true}>
                {props.children}
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    TextStyle: {
        color: '#fff'
    }
})