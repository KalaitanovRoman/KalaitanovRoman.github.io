import {changeColorLabel} from "../utils";
import {TariffInfo} from "./tariff-info";

export class TariffList {
    constructor(data) {
        this.data = data;
        this.render();
        this.getEvents();
    };

    getFreeOptions (options) {
        const optionsBlock = document.createElement('div');

        options.forEach((item) => {
            const p = document.createElement('p');

            p.innerText = item;
            optionsBlock.appendChild(p)
        });

        return optionsBlock.innerHTML;
    }

    getPrice(value) {
        let arr = [];
        let max, min;

        value.forEach(({price}) => {
            return arr.push(price)
        });

        min = Math.max(...arr);
        max = Math.min(...arr);

        return `<span>${min / 12} - ${max} &#8381;/мес</span>`
    }

    getTariffBlocks(data) {
        const tariffBlock = document.createElement('div');
        const {
            title,
            speed,
            tarifs,
            free_options,
            link
        } = data;

        tariffBlock.className = 'tariff-block';

        tariffBlock.innerHTML = `
            <div class="tariff-block_title">
                <h2>Тариф "${title}"</h2>
                <div class="separator"></div>
            </div>
            <div class="tariff-block_description">
                <div class="tariff-block_speed">
                    ${changeColorLabel(title, speed)}
                </div>
                <div class="tariff-block_price">
                    ${this.getPrice(tarifs)}
                </div>
                ${free_options ?
                    (`<div class="tariff-block_options">
                        ${this.getFreeOptions(free_options)}
                    </div>`)
                    : ''
                }
                <button class="next-step-button" data-title="${title}"></button>
                <div class="separator"></div>
            </div>
            <div class="tariff-block_link">
                <a href="${link}" target="_blank">узнать подробнее на сайте</a>
            </div>
        `;

        return tariffBlock;
    }

    getEvents() {
        const tariffList = document.querySelector('.tariff-list');

        tariffList.addEventListener('click', (e) => {
            const target = e.target;
            const title = target.getAttribute('data-title');

            if (target.closest('.next-step-button')) {
                for (let item of this.data) {
                    if (item.title === title) {
                        new TariffInfo(item.tarifs, item.title);
                    }
                }
            }
        })
    }

    render() {
        const tariffList = document.querySelector('.tariff-list');

        this.data.forEach((item) => {
            tariffList.appendChild(this.getTariffBlocks(item));
        });
    };
}