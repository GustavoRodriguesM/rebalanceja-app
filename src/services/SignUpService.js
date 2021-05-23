import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UtilService } from './UtilService'


export class SignUpService {

    constructor() {
        this.utilService = new UtilService();
        this.USER_DATA_REGISTER = 'userDataRegister';
        this.SUBSCRIPTION_PLAN_DATA_REGISTER = 'subscriptionPlanDataRegister';
    }

    async register(userData) {
        console.log(userData)
        try {
            let objResponse = null;
            await axios({
                method: "post",
                url: new UtilService().getRegisterUrl(),
                data: userData
            })
                .then(function (response) {
                    objResponse = response.data;
                })
                .catch(function (response) {
                    objResponse = response.response;
                });
            return objResponse;
        } catch (e) {
            console.log(e);
        }
    }

    saveUserDataRegister = (data) => {
        AsyncStorage.setItem(this.USER_DATA_REGISTER, data);
    }

    saveSubscriptionPlanRegister = (data) => {
        AsyncStorage.setItem(this.SUBSCRIPTION_PLAN_DATA_REGISTER, data);
    }

    getSelectedPlan = async () => {
        let obj = await AsyncStorage.getItem(this.SUBSCRIPTION_PLAN_DATA_REGISTER);
        return JSON.parse(obj);
    }

    getUserData = async () => {
        let obj = await AsyncStorage.getItem(this.USER_DATA_REGISTER);
        return JSON.parse(obj);
    }


}