import { StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
    containerWithFlex: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    defaultBackground: {
        backgroundColor: '#161616',
    },
    defaultBackgroundWithFlex: {
        backgroundColor: '#161616',
        flex: 1
    }
});