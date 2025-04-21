export function saveCsv(csvLines) {
    const json = JSON.stringify(csvLines);
    localStorage.setItem("csvLines", json);
}

export function loadCsv() {
    const data = localStorage.getItem("csvLines");
    return JSON.parse(data);
}