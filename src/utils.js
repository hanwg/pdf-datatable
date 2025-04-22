export function saveCsv(csvLines) {
    const json = JSON.stringify(csvLines);
    localStorage.setItem("csvLines", json);
}

export function loadCsv() {
    const data = localStorage.getItem("csvLines");
    return JSON.parse(data);
}

export function xIntersect(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect1Start = rect1.x;
    const rect1End = rect1.x + rect1.width;

    const rect2 = element2.getBoundingClientRect();
    const rect2Start = rect2.x;
    const rect2End = rect2.x + rect2.width;

    //          [rect1]
    // [rect2]
    if (rect2End < rect1Start) {
        return false;
    }

    // [rect1]
    //          [rect2]
    if (rect1End < rect2Start) {
        return false
    }

    return true;
}