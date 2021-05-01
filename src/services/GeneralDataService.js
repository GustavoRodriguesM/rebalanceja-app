import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";

export class GeneralDataService {

    constructor() {
        this.utilService = new UtilService();
        this.authService = new AuthService();
    }

    async getGeneralData() {
        let accessToken = await this.authService.getAccessToken();
        let generalData = [];
        await axios({
            method: 'get',
            url: this.utilService.getGeneralDataUrl(),
            headers: {Authorization: 'Bearer ' + accessToken }
        }).then((response) => {
            switch(response.status) {
                case 200:
                    generalData = response.data;
                    break;
                case 204:
                    gerenalData = 204;
                    break;
                default: 
                    console.log("Status inesperado");
                    break;
            }

        }).catch((response) => {
            //console.log(response.response)
            console.log(response);
            console.log("Falha ao chamar: getGeneralData()");
        });
        
        return generalData;
    }

} 