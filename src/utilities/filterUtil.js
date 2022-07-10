import bankAbbrev from "../app/bank_abbrev.json";
import suggestionCorpus from "../app/suggestion_corpus.json";

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
        const bankName =
            (bankAbbrev[regexMatch[1]] || regexMatch[1]) + ", " + regexMatch[2];
        if (!bankData[bankName]) bankData[bankName] = [];
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

    if (data.BS) {
        // Calculating Liabilities
        Object.entries(data?.BS?.To).forEach((entry) => {
            liabilities.push({
                name: entry[0],
                amount:
                    typeof entry[1] === "number"
                        ? formatCurrency(entry[1])
                        : null,
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
                            (subEntry[1] < 0
                                ? "Less. "
                                : i > 0
                                ? "Add. "
                                : "") + subEntry[0],
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
                    typeof entry[1] === "number"
                        ? formatCurrency(entry[1])
                        : null,
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
                                amount:
                                    Object.entries(entry[1]).length - 1 === i,
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
    }

    filteredData.data = {
        tradename,
        name,
        address,
        title,
        liabilities,
        assets,
        total: [
            data.BS ? formatCurrency(getObjectSum(data.BS.To)) : 0,
            data.BS ? formatCurrency(getObjectSum(data.BS.By)) : 0,
        ],
    };
    filteredData.success = true;
    filteredData.message = "Data successfully filtered.";
    return filteredData;
};

const DepTPLFilter = (data) => {
    const filteredData = [];

    Object.entries(data).forEach((entry) => {
        filteredData.push({
            name: "on " + entry[0],
            amount: formatCurrency(entry[1]),
            valid: true,
            underline: {
                name: false,
                amount: false,
            },
            height: 1,
        });
    });
    filteredData[filteredData.length - 1].underline.amount = true;
    return filteredData;
};

const TPLFilter = (data) => {
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
        title =
            (data.T ? "Trading and " : "") +
            "Profit & Loss Account for the year ending 31st March, " +
            data.year;

    const t_to = [],
        t_by = [],
        pl_to = [],
        pl_by = [];

    // Calculating Trading To
    if (data.T) {
        Object.entries(data?.T?.To).forEach((entry) => {
            t_to.push({
                name: "To " + entry[0],
                amount:
                    typeof entry[1] === "number"
                        ? formatCurrency(entry[1])
                        : null,
                valid: suggestionCorpus.T.To.includes(entry[0]),
                underline: {
                    name: typeof entry[1] === "object",
                    amount: false,
                },
                height: 0,
            });
            if (typeof entry[1] === "object") {
                Object.entries(entry[1]).forEach((subEntry, i) => {
                    t_to.push({
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
                        valid: suggestionCorpus.T.To.includes(subEntry[0]),
                        underline: {
                            name: false,
                            amount: Object.entries(entry[1]).length - 1 === i,
                        },
                        height: 1,
                    });
                });
                t_to.push({
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

        // Calculating Trading By
        Object.entries(data?.T?.By).forEach((entry) => {
            t_by.push({
                name: "By " + entry[0],
                amount:
                    typeof entry[1] === "number"
                        ? formatCurrency(entry[1])
                        : null,
                valid: suggestionCorpus.T.By.includes(entry[0]),
                underline: {
                    name: typeof entry[1] === "object",
                    amount: false,
                },
                height: 0,
            });
            if (typeof entry[1] === "object") {
                Object.entries(entry[1]).forEach((subEntry, i) => {
                    t_by.push({
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
                        valid: suggestionCorpus.T.By.includes(subEntry[0]),
                        underline: {
                            name: false,
                            amount: Object.entries(entry[1]).length - 1 === i,
                        },
                        height: 1,
                    });
                });
                t_by.push({
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
    }

    if (data.PL) {
        // Calculating Profit & Loss To
        Object.entries(data?.PL?.To).forEach((entry) => {
            pl_to.push({
                name: "To " + entry[0],
                amount:
                    typeof entry[1] === "number"
                        ? formatCurrency(entry[1])
                        : null,
                valid: suggestionCorpus.PL.To.includes(entry[0]),
                underline: {
                    name: typeof entry[1] === "object",
                    amount: false,
                },
                height: 0,
            });
            if (typeof entry[1] === "object") {
                if (entry[0] === "Depreciation") {
                    pl_to.push(...DepTPLFilter(entry[1]));
                } else {
                    Object.entries(entry[1]).forEach((subEntry, i) => {
                        pl_to.push({
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
                            valid: suggestionCorpus.PL.To.includes(subEntry[0]),
                            underline: {
                                name: false,
                                amount:
                                    Object.entries(entry[1]).length - 1 === i,
                            },
                            height: 1,
                        });
                    });
                }
                pl_to.push({
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

        // Calculating Profit & Loss By
        Object.entries(data?.PL?.By).forEach((entry) => {
            pl_by.push({
                name: "By " + entry[0],
                amount:
                    typeof entry[1] === "number"
                        ? formatCurrency(entry[1])
                        : null,
                valid: suggestionCorpus.PL.By.includes(entry[0]),
                underline: {
                    name: typeof entry[1] === "object",
                    amount: false,
                },
                height: 0,
            });
            if (typeof entry[1] === "object") {
                Object.entries(entry[1]).forEach((subEntry, i) => {
                    pl_by.push({
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
                        valid: suggestionCorpus.PL.By.includes(subEntry[0]),
                        underline: {
                            name: false,
                            amount: Object.entries(entry[1]).length - 1 === i,
                        },
                        height: 1,
                    });
                });
                pl_by.push({
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
    }

    filteredData.data = {
        tradename,
        name,
        address,
        title,
        t_to,
        t_by,
        t_total: [
            data.T ? formatCurrency(getObjectSum(data.T.To)) : 0,
            data.T ? formatCurrency(getObjectSum(data.T.By)) : 0,
        ],
        pl_to,
        pl_by,
        pl_total: [
            data.PL ? formatCurrency(getObjectSum(data.PL.To)) : 0,
            data.PL ? formatCurrency(getObjectSum(data.PL.By)) : 0,
        ],
    };
    filteredData.success = true;
    filteredData.message = "Data successfully filtered.";
    return filteredData;
};

const CSFilter = (data) => {
    let filteredData = {
        success: false,
        message: "",
        data: {},
    };

    if (data.length === 0) {
        filteredData.message = "No data found";
        return filteredData;
    }

    const year = parseInt(data.year);
    const name = data.Info?.["Name"],
        address = [data.Info?.["Address 1"], data.Info?.["Address 2"]],
        pan = data.Info?.["PAN"],
        fyay = `FY - ${year - 1}-${year}, AY - ${year}-${year + 1}`,
        cs_rows = [];

    Object.entries(data?.CS).forEach((entry) => {
        if (entry[0] === "Tax Payable" && entry[1] === 0) {
            cs_rows[cs_rows.length - 1].underline.amount = true;
            cs_rows.push({
                name: entry[0],
                amount: typeof entry[1] === "number" ? "NIL" : null,
                valid: suggestionCorpus.CS.includes(entry[0]),
                underline: {
                    name: false,
                    amount: true,
                },
                height: 0,
            });
        } else {
            cs_rows.push({
                name: entry[0],
                amount:
                    typeof entry[1] === "number"
                        ? formatCurrency(entry[1])
                        : null,
                valid: suggestionCorpus.CS.includes(entry[0]),
                underline: {
                    name: false,
                    amount: false,
                },
                height: 0,
            });
        }

        if (typeof entry[1] === "object") {
            Object.entries(entry[1]).forEach((subEntry, i) => {
                cs_rows.push({
                    name:
                        (subEntry[1] < 0 ? "Less. " : i > 0 ? "Add. " : "") +
                        subEntry[0],
                    amount:
                        typeof subEntry[1] === "number"
                            ? formatCurrency(subEntry[1])
                            : null,
                    valid: suggestionCorpus.CS.includes(subEntry[0]),
                    underline: {
                        name: false,
                        amount: Object.entries(entry[1]).length - 1 === i,
                    },
                    height: 1,
                });
            });
            cs_rows.push({
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
        name,
        pan,
        address,
        fyay,
        cs_rows,
    };

    filteredData.success = true;
    filteredData.message = "Data successfully filtered.";
    return filteredData;
};

export {
    getObjectSum,
    formatCurrency,
    BSFilter,
    BSABankFilter,
    TPLFilter,
    DepTPLFilter,
    CSFilter,
};
