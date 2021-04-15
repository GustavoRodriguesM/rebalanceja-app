import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";

export class WalletService {

    constructor() {
        this.utilService = new UtilService();
        this.authService = new AuthService();
    }

    async getAllWallets(state) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'get',
            url: this.utilService.getAllWallets(),
            headers: {Authorization: 'Bearer ' + accessToken }
        }).then((response) => {
            state.setState({wallets: response.data})
        }).catch((response) => {
            //console.log(response.response)
            console.log("Falha ao chamar: getAllWallets()");
        });
    }

}