import AsyncStorage from "@react-native-async-storage/async-storage";


export class AsyncStorageService {

    constructor() {
        this.WALLET_ALTER_CONFIG = 'WALLET_ALTER_CONFIG';
    }

    getWalletToAlterConfig() {
        return AsyncStorage.getItem(this.WALLET_ALTER_CONFIG);
    }

    setWalletToAlterConfig = (data) => {
        AsyncStorage.setItem(this.WALLET_ALTER_CONFIG, JSON.stringify(data));
    }

    removeWalletToAlterConfig = () => {
        AsyncStorage.removeItem(this.WALLET_ALTER_CONFIG);
    }

}