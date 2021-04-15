import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Divider, List } from "react-native-paper";
import { DefaultThemeColors } from "../../styles/DefaultThemeColors";


export default class ProfileItemComponent extends Component {

    constructor(props) {
        super(props);
        this.defaultThemeColors = new DefaultThemeColors();
    }

    render() {
        return (
            <>
                <List.Item
                    titleStyle={{
                        color: this.defaultThemeColors.getDefaultTextColor(),
                        marginLeft: Dimensions.get('screen').width * 0.05
                    }}
                    descriptionStyle={{
                        color: this.defaultThemeColors.getDefaultTextColor(),
                        marginLeft: Dimensions.get('screen').width * 0.05
                    }}
                    style={{ padding: 0, margin: 0 }}
                    title={this.props.title}
                    description={this.props.description}
                    right={() => <List.Icon
                        color={this.defaultThemeColors.getDefaultTextColor()}
                        icon={this.props.iconName || "chevron-right"}
                    />}
                    onPress={this.props.onPress}
                />
                <Divider style={{
                    backgroundColor: '#5b5555',
                    marginLeft: Dimensions.get('screen').width * 0.05,
                    marginRight: Dimensions.get('screen').width * 0.05
                }} />
            </>
        )
    }

}