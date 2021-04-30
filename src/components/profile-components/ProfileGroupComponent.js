import React from "react";
import { Dimensions } from "react-native";
import { List, useTheme } from "react-native-paper";

export default props => {
    return (
        <>
            <List.Section>
                <List.Subheader style={{
                    color: useTheme().colors.primary,
                    borderRadius: 10,
                    fontSize: 18,
                    marginLeft: Dimensions.get('screen').width * 0.05,
                    marginRight: Dimensions.get('screen').width * 0.05,
                    marginTop: Dimensions.get('screen').width * 0.05,
                    marginBottom: Dimensions.get('screen').width * 0.02,
                }}>{props.title}</List.Subheader>
                {props.children}
            </List.Section>
        </>
    )
}