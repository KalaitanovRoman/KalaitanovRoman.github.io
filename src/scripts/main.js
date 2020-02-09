import {HttpDataRequest} from "./utils";
import {TariffList} from "./modules/tariff-list";

HttpDataRequest('https://next.json-generator.com/api/json/get/VkLDNSEWu')
    .then(({tariffs}) => {
        return new TariffList(tariffs);
    })
    .catch((error) => console.error(error));
