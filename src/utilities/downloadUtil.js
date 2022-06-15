import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const downloadAsPDF = (rootElement, filename) => {
    // const rootElement = document.querySelector(rootElementSelector);
    html2canvas(rootElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0);
        pdf.save(filename);
    });
};

const downloadFile = (data, filename)=> {
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

export { downloadFile, downloadAsPDF };