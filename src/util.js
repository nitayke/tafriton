import { createContext } from "react";

export const paramsDefault = {
    nitay: true,
    erev: {
        besari: false,
        savta: false,
        counts: [2, 2, 2, 1],
    },
    boker: {
        besari: true,
        savta: false,
        counts: [2, 2, 2],
    },
};

export const UserContext = createContext(null);

export function updateObjectByPath(obj, setObj, path, value) {
    const splitted = path.split("/");
    if (splitted.length == 2)
        setObj({
            ...obj,
            [splitted[0]]: { ...obj[splitted[0]], [splitted[1]]: value },
        });
    else setObj({ ...obj, [splitted[0]]: value });
}

export function getValueByPath(obj, path) {
    const splitted = path.split("/");
    if (splitted.length == 2) return obj[splitted[0]][splitted[1]];
    else return obj[splitted[0]];
}

function shuffle(arr) {
    let i = arr.length, j;

    while (i > 0) {
        j = Math.floor(Math.random() * i);
        i--;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

export function shareResult(result) {
    let msg = "*ערב*%0A";
    for (let i = 0; i < result[0].length; i++)
        msg += result[0][i] + "%0A";
    msg += "*בוקר*%0A";
    for (let i = 0; i < result[1].length; i++)
        msg += result[1][i] + "%0A";
    open("https://wa.me/?text=" + msg);
}

export function calculate(data, params) {
    let result = [];
    const types = ["עיקרית", "פחמימה", "ירק", "מרק"];
    shuffle(data);
    for (let i = 0; i < 2; i++) {
        let time = i ? "boker" : "erev";
        result.push([]);
        for (let j = 0; j < params[time].counts.length; j++) {
            var l = 0;
            for (let k = 0; k < params[time].counts[j]; k++) {
                for (; l < data.length; l++) {
                    if (data[l]["עיקרית/פחמימה/מרק/ירק"] != types[j]) continue;
                    let t0 = params.nitay ? data[l]["גלוטן"] != "עם" : true;
                    let t1 =
                        data[l]["אוריינטציה חלבית/בשרית/לא משנה"] !=
                        (params[time].besari ? "חלבי" : "בשרי");
                    let t2 = params[time].savta ? data[l]["סוכר"] == "בלי" : true;
                    if (t0 && t1 && t2) {
                        result[i].push(data[l]["שם המנה"]);
                        data.splice(l, 1);
                        break;
                    }
                }
            }
        }
    }
    return result;
}