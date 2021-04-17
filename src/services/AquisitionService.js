import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";

export class AquisitionService {

    constructor() {
        this.utilService = new UtilService();
        this.authService = new AuthService();
    }

    async updateQuantity(state, data) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'put',
            url: this.utilService.getUpdateQuantityUrl(),
            headers: {Authorization: 'Bearer ' + accessToken },
            data: data
        }).then((response) => {
            console.log("Funcionou!");
        }).catch((response) => {
            console.log("Falha ao chamar: updateQuantity()");
            console.log(response.response)
        });
    }

}