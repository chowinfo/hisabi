import { bankAbbrev, suggestionCorpus } from "../app/constants";

function getObjectSum(obj) {
    let sum = 0;
    for (let value of Object.values(obj)) {
        if (typeof value == "number") sum += value;
        if (typeof value == "object") sum += getObjectSum(value);
    }
    return sum;
}

function formatCurrency(value) {
    const formatter = new Intl.NumberFormat("hi-IN", {
        style: "currency",
        currency: "INR",
        notation: "standard",
        currencySign: "accounting",
        signDisplay: "never",
    });

    return formatter.format(value);
}

const BSABankFilter = (data) => {
    let filteredData = [],
        bankData = {};
    Object.entries(data).forEach((entry) => {
        const regexBank = /(\w+)\s*,\s*([\w\s]+)\s*,\s*([\w\s/-\d]+)/;
        const regexMatch = entry[0].match(regexBank);
        const bankName = (bankAbbrev[regexMatch[1]] || regexMatch[1]) + ", " + regexMatch[2];
        if (!bankData[bankName]) 
            bankData[bankName] = [];
        bankData[bankName].push({
            name: regexMatch[3],
            amount: formatCurrency(entry[1]),
            valid: true,
            underline: {
                name: false,
                amount: false,
            },
            height: 1,
        });
    });
    Object.entries(bankData).forEach((entry) => {
        filteredData.push({
            name: entry[0],
            amount: null,
            valid: true,
            underline: {
                name: true,
                amount: false,
            },
            height: 1,
        });
        filteredData.push(...entry[1]);
    });
    filteredData[filteredData.length - 1].underline.amount = true;
    return filteredData;
};

const BSFilter = (data) => {
    const filteredData = {
        success: false,
        message: "",
        data: {},
    };

    if (data.length === 0) {
        filteredData.message = "No data found";
        return filteredData;
    }

    const tradename = data.Info?.["Trade Name"],
        name = data.Info?.["Name"],
        address = [data.Info?.["Address 1"], data.Info?.["Address 2"]],
        title = "Balance Sheet as at 31st March, " + data.year;

    const assets = [],
        liabilities = [];

    // Calculating Liabilities
    Object.entries(data?.BS?.To).forEach((entry) => {
        liabilities.push({
            name: entry[0],
            amount:
                typeof entry[1] === "number" ? formatCurrency(entry[1]) : null,
            valid: suggestionCorpus.BS.To.includes(entry[0]),
            underline: {
                name: typeof entry[1] === "object",
                amount: false,
            },
            height: 0,
        });
        if (typeof entry[1] === "object") {
            Object.entries(entry[1]).forEach((subEntry, i) => {
                liabilities.push({
                    name:
                        (subEntry[1] < 0 ? "Less. " : i > 0 ? "Add. " : "") +
                        subEntry[0],
                    amount:
                        typeof subEntry[1] === "number"
                            ? formatCurrency(subEntry[1])
                            : null,
                    valid: suggestionCorpus.BS.To.includes(subEntry[0]),
                    underline: {
                        name: false,
                        amount: Object.entries(entry[1]).length - 1 === i,
                    },
                    height: 1,
                });
            });
            liabilities.push({
                name: "",
                amount: formatCurrency(getObjectSum(entry[1])),
                valid: true,
                underline: {
                    name: false,
                    amount: false,
                },
                height: 0,
            });
        }
    });

    // Calculating Assets
    Object.entries(data?.BS?.By).forEach((entry) => {
        assets.push({
            name: entry[0],
            amount:
                typeof entry[1] === "number" ? formatCurrency(entry[1]) : null,
            valid: suggestionCorpus.BS.By.includes(entry[0]),
            underline: {
                name: typeof entry[1] === "object",
                amount: false,
            },
            height: 0,
        });

        if (typeof entry[1] === "object") {
            if (entry[0] === "Cash at Bank") {
                assets.push(...BSABankFilter(entry[1]));
            } else {
                Object.entries(entry[1]).forEach((subEntry, i) => {
                    assets.push({
                        name:
                            (subEntry[1] < 0
                                ? "Less. "
                                : i > 0
                                ? "Add. "
                                : "") + subEntry[0],
                        amount:
                            typeof subEntry[1] === "number"
                                ? formatCurrency(subEntry[1])
                                : null,
                        valid: suggestionCorpus.BS.By.includes(subEntry[0]),
                        underline: {
                            name: false,
                            amount: Object.entries(entry[1]).length - 1 === i,
                        },
                        height: 1,
                    });
                });
            }
            assets.push({
                name: "",
                amount: formatCurrency(getObjectSum(entry[1])),
                valid: true,
                underline: {
                    name: false,
                    amount: false,
                },
                height: 0,
            });
        }
    });

    filteredData.data = {
        tradename,
        name,
        address,
        title,
        liabilities,
        assets,
        total : [
            formatCurrency(getObjectSum(data.BS.To)),
            formatCurrency(getObjectSum(data.BS.By))
        ]
    };
    filteredData.success = true;
    return filteredData;
};

export { getObjectSum, formatCurrency, BSFilter, BSABankFilter };
