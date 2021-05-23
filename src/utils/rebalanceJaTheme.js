import { Platform, StatusBar } from "react-native";
import { configureFonts, DefaultTheme } from "react-native-paper";

const FONTFAMILY = "Inter"
const PRIMARY = '#ffd342'

const customColors = {
  primary: PRIMARY,//'#CF3341',//#ed651b
  viewBackground: '#121212',//'#161616',
  inactivated: '#1f1f1f',//'#5b5555',
  divider: '#1f1f1f',//'#5b5555',
  viewBackgroundSecundary: '#1f1f1f',//'#5b5555',
  viewCardBackground: '#262626',
  text: '#fff',
  error: '#CF3341',
  textInputBackground: '#262626',
  modalBackground: '#262626',
  surface: '#121212',//'#161616',
  subtitleCustom: '#d3c7a0',
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
  textStylePrimary: {
    color: customColors.primary,
    fontFamily: FONTFAMILY.concat('-Regular')
  },
  subtextStyle: {
    color: customColors.subtitleCustom,
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
  styles: customStyles,
};