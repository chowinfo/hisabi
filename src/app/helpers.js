function getObjectSum(obj) {
    let sum = 0;
    for (let value of Object.values(obj)) {
        if (typeof value == "number") sum += value;
        if (typeof value == "object") sum += getObjectSum(value);
    }
    return sum;
}
const formatter = new Intl.NumberFormat("hi-IN", {
    style: "currency",
    currency: "INR",
    notation: "standard",
    currencySign: "accounting",
    signDisplay: "never",
});

function formatCurrency(value) {
    return formatter.format(value);
}

function getParamFromUrl(param) {
    const defaultParams = {
        template: "view",
        sheet: "TPL"
    }
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || defaultParams[param];
}

function updateURLParam(param, value, initial=false) {
    const urlParams = new URLSearchParams(window.location.search);
    if (!initial || !urlParams.has(param)) {
        urlParams.set(param, value);
    }
    window.history.pushState({}, "", "?" + urlParams.toString());
}

export { formatter, formatCurrency, getObjectSum, getParamFromUrl, updateURLParam };
