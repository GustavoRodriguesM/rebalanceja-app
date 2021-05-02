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
            headers: {Authorization: 'Bearer ' + accessToken }
        }).then((response) => {
        }).catch((response) => {
            console.log("Falha ao chamar: changeAllocate(" + idAquisition + ", " + idWallet + ")");
            console.log(response.response)
        });
    }

    async updateQuantity(state, data) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'put',
            url: this.utilService.getUpdateQuantityUrl(),
            headers: {Authorization: 'Bearer ' + accessToken },
            data: data
        }).then((response) => {
        }).catch((response) => {
            console.log("Falha ao chamar: updateQuantity()");
            console.log(response.response)
        });
    }

    async createAquisition(obj) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'post',
            url: this.utilService.getCreateAquisitionUrl(),
            headers: {Authorization: 'Bearer ' + accessToken },
            data: obj
        }).then((response) => {
            console.log("aquisicao criada com sucesso");
        }).catch((response) => {
            console.log("Falha ao chamar: createAquisition()");
            console.log(response.response)
        });
    }

    async updateAquisition(obj) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'put',
            url: this.utilService.getUpdateAquisitionUrl(),
            headers: {Authorization: 'Bearer ' + accessToken },
            data: obj
        }).then((response) => {
            console.log("aquisicao alterada com sucesso");
        }).catch((response) => {
            console.log("Falha ao chamar: createAquisition()");
            console.log(response.response)
        });
    }

    async  deleteAquisition(idAquisition) {
        let accessToken = await this.authService.getAccessToken();
        await axios({
            method: 'DELETE',
            url: this.utilService.getDeleteAquisitionUrl(idAquisition),
            headers: {Authorization: 'Bearer ' + accessToken },
        }).then((response) => {
            console.log("aquisicao removida com sucesso");
        }).catch((response) => {
            console.log("Falha ao chamar: createAquisition()");
            console.log(response.response)
        });
    }

}