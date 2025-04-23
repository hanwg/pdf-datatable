export function saveCsv(csvLines) {
    const json = JSON.stringify(csvLines);
    localStorage.setItem("csvLines", json);
}

export function loadCsv() {
    const data = localStorage.getItem("csvLines");
    return JSON.parse(data);
}

export function xIntersect(headers, headerIndex, element) {

    const rect2 = element.getBoundingClientRect();
    const rect2Start = rect2.x;
    const rect2End = rect2.x + rect2.width;

    const rect1 = headers[headerIndex].getBoundingClientRect();
    const rect1Start = rect1.x;
    let rect1End = 0;
    if (headerIndex === headers.length - 1) {
        rect1End = rect1.x + rect1.width;
    } else {
        const rect3 = headers[headerIndex + 1].getBoundingClientRect();
        if (rect2End >= rect3.x) {
            return false;
        }

        rect1End = rect3.x - 1;
    }

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