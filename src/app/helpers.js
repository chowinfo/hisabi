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

function downloadFile(data, filename) {
    const contentType = "application/octet-stream";
    if (!data) {
        console.error(" No data");
        return;
    }

    if (!filename) filename = "filetodonwload.txt";

    if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], { type: contentType }),
        e = document.createEvent("MouseEvents"),
        a = document.createElement("a");

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = [contentType, a.download, a.href].join(":");
    e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
    );
    a.dispatchEvent(e);
}

module.exports = {
    formatter,
    formatCurrency,
    getObjectSum,
    downloadFile,
};
