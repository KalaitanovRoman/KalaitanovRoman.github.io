import {MDASH} from '../constants';
import {getCorrectMouthName, getValidDate} from '../utils';

export class ModalPopupWindow {
    static getBreadcrumbs(title) {
        const breadcrumbsBlock = document.createElement('div');

        breadcrumbsBlock.innerHTML = `
            <div class="breadcrumbs">
                <button class="breadcrumbs_close"></button>
                <div class="breadcrumbs_title">
                    <h2>${title}</h2>
                </div>
            </div>`;

        return breadcrumbsBlock.innerHTML;
    }

    static close(modalName) {
        const body = document.querySelector('body');
        const popupWrap = document.querySelectorAll('.popup-wrap');

        if (popupWrap.length <= 1) {
            body.style.overflow = 'auto';
        }

        body.removeChild(modalName);
    }

    static open(config) {
        const body = document.querySelector('body');
        const popupWrap = document.createElement('div');
        const popupList = document.createElement('div');
        const {
            modalName,
            data,
            title,
            nextStep,
            isChoice
        } = config;
        const arr = [];

        body.style.overflow = 'hidden';
        popupWrap.id = modalName;
        popupWrap.className = 'popup-wrap';
        popupWrap.style.top = `${window.pageYOffset}px`;
        popupWrap.innerHTML = ModalPopupWindow.getBreadcrumbs(title);
        popupList.className = 'popup-list';

        data.forEach(({price}) => {
            arr.push(price);
        });

        data.forEach((item) => {
            const {
                id,
                title,
                price,
                pay_period,
                new_payday
            } = item;
            const popupContentBlock = document.createElement('div');
            const discountValue = Math.min(...arr) * pay_period - price;
            const isHasDiscount = discountValue > 0;
            const isSelected = Number(localStorage.getItem('selectedTariffId')) === id;
            const choiceButton = () => {
                if (Number(localStorage.getItem('selectedTariffId')) === id) {
                    return '<button class="choice-button selected">Выбрано</button>';
                }

                return '<button class="choice-button">Выбрать</button>';
            };

            popupContentBlock.className = `popup-block block-id-${id}`;

            popupContentBlock.innerHTML = `
                <div class="popup-block_title">
                    <h3>${isChoice ? title : getCorrectMouthName(pay_period)}</h3>
                    ${isSelected ?
                        ('<i class="selected-tariff"></i>')
                        : ''
                    }
                    <div class="separator"></div>
                </div>
                <div class="popup-block_description">
                    <div class="popup-block_price">
                        ${isChoice ?
                            (`<p>Период оплаты ${MDASH} ${getCorrectMouthName(pay_period)}</p>`)
                            : ''
                        }
                        <p>${price / pay_period} &#8381;/мес</p>
                    </div>
                    <div class="popup-block_payment">
                        <p class="">разовый платёж ${MDASH} ${price} &#8381;</p>
                        ${isChoice ?
                            (`<p>со счёта спишется ${MDASH} ${price}&#8381;</p>`)
                            : isHasDiscount ?
                            (`<p>скидка ${MDASH} ${discountValue}&#8381;</p>`)
                            : ''
                        }
                    </div>
                    ${nextStep ?
                        (`<button class="next-step-button" data-tariff-id="${id}"></button>`)
                        : ''
                    }
                    ${isChoice ?
                        (`<div class="popup-block_date">
                            <p>вступит в силу ${MDASH} сегодня</p>
                            <p>активно до ${MDASH} ${getValidDate(new_payday)}</p>
                        </div>
                        <div class="separator"></div>`)
                        : ''
                    }
                </div>
                ${isChoice ?
                    (choiceButton())
                    : ''
                }`;

            popupList.appendChild(popupContentBlock);
        });

        popupWrap.appendChild(popupList);

        return body.appendChild(popupWrap);
    }
}
