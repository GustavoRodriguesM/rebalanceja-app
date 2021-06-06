import axios from "axios";
import { UtilService } from "./UtilService";

export class UserService {

    constructor() {
        this.utilService = new UtilService();
    }

    async existsEmail(searchEmail) {
        let exists = false;
        const data = {
            email: searchEmail
        }
        await axios({
            method: 'post',
            url: this.utilService.getSearchUserUrl(searchEmail),
            data: data
        }).then((response) => {
            exists = true;
        }).catch((response) => {
            exists = false;
        });

        return exists;
    }

}