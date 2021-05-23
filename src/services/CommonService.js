const convertCurrency = (amount) => {
    try {
        if (amount != undefined) {
            let value = amount.toString().replace(/\D/g, "");
            value = value.replace(/(\d)(\d{2})$/, "$1,$2");
            value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
            return value;
        }

        return "0";
    } catch (e) {
        return "0";
    }
}

const convertDateToString = (value: Date) => {
    try {
        if (value != undefined) {
            return (value.getDate().toString()).padStart(2, "0") + "/" + ((value.getMonth() + 1).toString()).padStart(2, "0") + "/" + value.getFullYear();
        }

        return new Date();
    } catch (e) {
        console.log(e)
        return new Date();
    }
}


export { convertCurrency, convertDateToString };