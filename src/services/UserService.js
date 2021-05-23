import axios from "axios";
import { UtilService } from "./UtilService";

export class UserService {

    constructor() {
        this.utilService = new UtilService();
    }

    async existsEmail(searchEmail) {
        let exists = false;
        await axios({
            method: 'get',
            url: this.utilService.getSearchUserUrl(searchEmail),
        }).then((response) => {
            exists = true;
        }).catch((response) => {
            exists = false;
        });

        return exists;
    }

}