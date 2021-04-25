import { Platform, StatusBar } from "react-native";
import { DefaultTheme } from "react-native-paper";

const FONTFAMILY = "Roboto"
const PRIMARY = "#fed139"

const customColors = {
  primary: PRIMARY,//'#CF3341',//#ed651b
  viewBackground: '#161616',
  inactivated: '#5b5555',
  divider: '#5b5555',
  viewBackgroundSecundary: '#5b5555',
  viewCardBackground: '#262626',
  text: '#fff',
  textInputBackground: '#262626',
  modalBackground: '#262626',
  button: {
    background: PRIMARY,
    text: "#000"
  },
  homeScreenChart: {
    backgroundGradientFrom: '#4A4A4A',
    backgroundGradientTo: '#5b5555'
  },
  tabsMenu: {
    active: '#161616',
    inactive: '#161616',
    inactiveTintColor: '#5b5555'
  },
  signUpScreen: {
    recommendedButtonBackground: '#312f2b'
  }
};

const customStyles = {
  defaultView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  defaultBackgroundWithFlex: {
    backgroundColor: customColors.viewBackground,
    flex: 1,
  },
  defaultBackground: {
    backgroundColor: customColors.viewBackground,
  },
  textStyle: {
    color: customColors.text,
    fontFamily: FONTFAMILY.concat('-Regular')
  },
  stocksScreen: {
    headerTextBold: {
      color: customColors.text,
      fontSize: 24,
      fontFamily: FONTFAMILY.concat('-Bold')
    },
  }
};

export default theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: customColors,
  styles: customStyles
};