import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";

export class GeneralDataService {

    constructor() {
        this.utilService = new UtilService();
        this.authService = new AuthService();
    }

    async getAllCategories(state) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'get',
            url: this.utilService.getGeneralDataUrl(),
            headers: {Authorization: 'Bearer ' + accessToken }
        }).then((response) => {
            state.setState({user: response.data})
        }).catch((response) => {
            //console.log(response.response)
            console.log("Falha ao chamar: getGeneralData()");
        });
    }

}