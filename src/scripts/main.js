import {HttpDataRequest} from "./utils";
import {TariffList} from "./modules/tariff-list";

HttpDataRequest('GET', 'https://next.json-generator.com/api/json/get/VkLDNSEWu')
    .then(({tarifs}) => {
        return new TariffList(tarifs);
    })
    .catch((error) => console.error(error));

