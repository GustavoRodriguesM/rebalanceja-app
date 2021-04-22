import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";

export class SubscriptionPlanService {

    constructor() {
        this.utilService = new UtilService();
        this.authService = new AuthService();
    }

    async getAvailableSubscriptionPlans() {
        let objs = []
        await axios({
            method: 'get',
            url: this.utilService.getAvailableSubscriptionPlans(),
        }).then((response) => {
            objs = response.data;
        }).catch((response) => {
            //console.log(response.response)
            console.log("Falha ao chamar: getAvailableSubscriptionPlans()");
        });

        return objs;
    }

}