import {ModalPopupWindow} from './modal-popup-window';
import {TariffChoice} from './tariff-choice';

export class TariffInfo extends ModalPopupWindow {
    constructor(data, title) {
        super();
        this.data = data;
        this.title = title;
        this.render();
        this.getEvents();
    };

    getEvents() {
        const modalName = document.querySelector('#tariff-info-modal');

        modalName.addEventListener('click', (e) => {
            const target = e.target;
            const tariffId = target.getAttribute('data-tariff-id');

            if (target.closest('.breadcrumbs_close')) {
                ModalPopupWindow.close(modalName);
            }

            if (target.closest('.next-step-button')) {
                for (const item of this.data) {
                    if (item.id === Number(tariffId)) {
                        new TariffChoice([item], 'Выбор тарифа');
                    }
                }
            }
        });
    }

    render() {
        const config = {
            modalName: 'tariff-info-modal',
            data: this.data,
            title: `Тариф "${this.title}"`,
            nextStep: true,
        };

        ModalPopupWindow.open(config);
    }
}