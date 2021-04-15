import React, { Component } from "react";
import { Dimensions, Text } from "react-native";
import { List } from "react-native-paper";


export default class ProfileGroupComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <List.Section>
                    <List.Subheader style={{
                        color: '#fff',
                        backgroundColor: '#5b5555',
                        borderRadius: 10,
                        fontSize: 18,
                        marginLeft: Dimensions.get('screen').width * 0.05,
                        marginRight: Dimensions.get('screen').width * 0.05,
                        marginTop: Dimensions.get('screen').width * 0.05,
                        marginBottom: Dimensions.get('screen').width * 0.02,
                    }}>{this.props.title}</List.Subheader>
                    {this.props.children}
                </List.Section>
            </>
        )
    }

}