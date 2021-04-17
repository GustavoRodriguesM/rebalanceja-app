import { DefaultThemeColors } from "./DefaultThemeColors";


const FONTFAMILY = "Roboto"

export class DefaultStyles {


    constructor () {
        this.defaultThemeColors = new DefaultThemeColors();
    }

    getHeaderTextStyle = () => {
        return {
            color: this.defaultThemeColors.getDefaultTextColor(), 
            fontSize: 24,  
            fontFamily: FONTFAMILY.concat('-Regular')
        }
    }

    getHeaderTextBoldStyle = () => {
        return {
            color: this.defaultThemeColors.getDefaultTextColor(), 
            fontSize: 24,  
            fontFamily: FONTFAMILY.concat('-Bold')
        }
    }

    getTextStyle = () => {
        return {
            color: this.defaultThemeColors.getDefaultTextColor(),
            fontFamily: FONTFAMILY.concat('-Regular')
        }
    }
    
}