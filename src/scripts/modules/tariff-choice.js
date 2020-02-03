import {ModalPopupWindow} from "./modal-popup-window";

export class TariffChoice extends ModalPopupWindow{
    constructor(data, title) {
        super();
        this.data = data;
        this.title = title;
        this.render();
        this.getEvents();
    }

    getEvents() {
        const modalName = document.querySelector('#tariff-choice-modal');

        modalName.addEventListener('click', (e) => {
            const target = e.target;

            if (target.closest('.breadcrumbs_close')) {
                ModalPopupWindow.close(modalName);
            }

            if (target.closest('.choice-button')) {
                const buttonText = target.innerText === 'Выбрано' ? 'Выбрать' : 'Выбрано';
                const className = target.className === 'choice-button' ? 'choice-button selected' : 'choice-button';

                target.innerText = buttonText;
                target.className = className;
            }
        });
    }

    render() {
        const config = {
            modalName: 'tariff-choice-modal',
            data: this.data,
            title: this.title,
            nextStep: false,
            isChoice: true
        };

        ModalPopupWindow.open(config)
    }
}