import {BACKGROUND_COLOR} from "./constants";

export const HttpDataRequest = (method, url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                let error = new Error(xhr.statusText);
                error.code = status;
                reject(error);
            }
        };

        xhr.send();
    });
};

export const changeColorLabel = (title, speed) => {
    const keys = Object.keys(BACKGROUND_COLOR);
    let backgroundColor;

    for (let item in keys) {
        if (title === keys[item]) {
            backgroundColor = BACKGROUND_COLOR[keys[item]];
        }
    }
    return `<span style="background-color: ${backgroundColor}">${speed} Мбит/с</span>`
};

export const getValidDate = (date) => {
    const splitDate = date.split('+')[0];
    const dateCalculation = Math.floor(new Date(+splitDate) * 1000);
    const dateParse = new Date(dateCalculation);

    return dateParse.toISOString().replace(/T.*/,'').split('-').reverse().join('.');
};


export const getCorrectMouthName = (value) => {
    if (value > 1 && value < 5) {
        return `${value} месяца`;
    } else if (value >= 5) {
        return `${value} месяцев`;
    } else {
        return `${value} месяц`;
    }
};