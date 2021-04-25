import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";


export class RebalancingService {

    constructor() {
        this.authService = new AuthService();
        this.utilService = new UtilService();
    }

    async rebalance(financialSupport) {
        let accessToken = await this.authService.getAccessToken();
        let responseList = [];
        await axios({
            method: 'post',
            url: this.utilService.getFinancialSupportUrl(financialSupport),
            headers: {Authorization: 'Bearer ' + accessToken},
        }).then((response) => {
            responseList = response.data;
        }).catch((response) => {
            //console.log(response.response)
            console.log("Erro rebalance()");
        });

        return responseList;
    }

}

