import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Divider, List, withTheme } from "react-native-paper";

class ProfileItemComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <List.Item
                    titleStyle={{
                        color: this.props.theme.colors.text,
                        marginLeft: Dimensions.get('screen').width * 0.05
                    }}
                    descriptionStyle={{
                        color: this.props.theme.colors.text,
                        marginLeft: Dimensions.get('screen').width * 0.05
                    }}
                    style={{ padding: 0, margin: 0 }}
                    title={this.props.title}
                    description={this.props.description}
                    right={() => <List.Icon
                        color={this.props.theme.colors.text}
                        icon={this.props.iconName || "chevron-right"}
                    />}
                    onPress={this.props.onPress}
                />
                <Divider style={{
                    backgroundColor: this.props.theme.colors.divider,
                    marginLeft: Dimensions.get('screen').width * 0.05,
                    marginRight: Dimensions.get('screen').width * 0.05
                }} />
            </>
        )
    }

}

export default withTheme(ProfileItemComponent);