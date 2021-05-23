import axios from "axios";
import { AuthService } from "./AuthService";
import { UtilService } from "./UtilService";

export class AquisitionService {

    constructor() {
        this.utilService = new UtilService();
        this.authService = new AuthService();
    }

    async changeAllocate(idAquisition, idWallet) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'put',
            url: this.utilService.getChangeAllocateAquisitonUrl(idAquisition, idWallet),
            headers: { Authorization: 'Bearer ' + accessToken }
        }).then((response) => {
        }).catch((response) => {
            console.log("Falha ao chamar: changeAllocate(" + idAquisition + ", " + idWallet + ")");
            console.log(response.response)
        });
    }

    async permitAdd() {
        let accessToken = await this.authService.getAccessToken();
        let permitAdd = false;
        await axios({
            method: 'get',
            url: this.utilService.getPermitAddAquisitionUrl(),
            headers: { Authorization: 'Bearer ' + accessToken }
        }).then((response) => {
            permitAdd = true;
        }).catch((response) => {
            permitAdd = false;
        });

        return permitAdd;
    }

    async updateQuantity(state, data) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'put',
            url: this.utilService.getUpdateQuantityUrl(),
            headers: { Authorization: 'Bearer ' + accessToken },
            data: data
        }).then((response) => {
        }).catch((response) => {
            console.log("Falha ao chamar: updateQuantity()");
            console.log(response.response)
        });
    }

    async createAquisition(obj) {
        let accessToken = await this.authService.getAccessToken();
        let success = false;
        await axios({
            method: 'post',
            url: this.utilService.getCreateAquisitionUrl(),
            headers: { Authorization: 'Bearer ' + accessToken },
            data: obj
        }).then((response) => {
            success = true;
        }).catch((response) => {
            success = false;
        });

        return success;
    }

    async updateAquisition(obj) {
        let accessToken = await this.authService.getAccessToken();
        let success = false;
        await axios({
            method: 'put',
            url: this.utilService.getUpdateAquisitionUrl(),
            headers: { Authorization: 'Bearer ' + accessToken },
            data: obj
        }).then((response) => {
            success = true;
        }).catch((response) => {
            success = false;
        });

        return success;
    }

    async deleteAquisition(idAquisition) {
        let accessToken = await this.authService.getAccessToken();
        let success = false;
        await axios({
            method: 'DELETE',
            url: this.utilService.getDeleteAquisitionUrl(idAquisition),
            headers: { Authorization: 'Bearer ' + accessToken },
        }).then((response) => {
            success = true;
        }).catch((response) => {
            success = false;
        });

        return success;
    }

}