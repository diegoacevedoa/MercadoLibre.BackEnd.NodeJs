import { API } from "../configs/constants";
import Axios from "../configs/http";
import * as categoryService from "../services/category.service";
import * as currencyService from "../services/currency.service";
import * as descriptionService from "../services/description.service";
import { calculatePrice } from "../utils/util";

export const findAll = async (req) => {
  const q = req.query.q;
  let url = API.SEARCH.replace("{query}", q);

  const config = {
    method: "GET",
  };

  const response = await Axios.request({ url, config });

  if (response.status == 200) {
    let takeitems = response.data.results.splice(0, 4);

    const categories = takeitems
      .map((item) => item.category_id)
      .filter((value, index, self) => self.indexOf(value) === index);

    const resultCategories = await Promise.all(
      categories.map(async (item) => {
        return await categoryService.findOne(item);
      })
    );

    const currencies = takeitems
      .map((item) => item.currency_id)
      .filter((value, index, self) => self.indexOf(value) === index);

    const resultCurrencies = await Promise.all(
      currencies.map(async (item) => {
        return await currencyService.findOne(item);
      })
    );

    const items = takeitems.map((item) => {
      let valuesPrice = calculatePrice(item.currency_id, item.price);

      return {
        id: item.id,
        title: item.title,
        price: {
          currency: resultCurrencies.find(
            (itemCur) => itemCur.currency_id == item.currency_id
          ).currency,
          amount: item.available_quantity,
          value: valuesPrice.value,
          decimals: valuesPrice.decimals,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        state_name: item.address?.state_name ?? "",
      };
    });

    return {
      author: {
        name: "Diego",
        lastname: "Acevedo",
      },
      categories: resultCategories.toString(),
      items: items,
    };
  } else {
    throw new Error("Error consultando los datos.");
  }
};

export const findOne = async (req) => {
  const { id } = req.params;
  let url = API.DETAIL.replace("{id}", id);

  const config = {
    method: "GET",
  };

  const response = await Axios.request({ url, config });

  if (response.status == 200) {
    let description = await descriptionService.findOne(id);

    let category = await categoryService.findOne(response.data.category_id);

    let currency = await currencyService.findOne(response.data.currency_id);

    // const pictures = response.data.pictures.map((item) => item.url);
    const pictures = response.data.pictures[0].url;

    let valuesPrice = calculatePrice(
      response.data.currency_id,
      response.data.price
    );

    const item = {
      id: response.data.id,
      title: response.data.title,
      price: {
        currency: currency.currency,
        amount: response.data.available_quantity,
        value: valuesPrice.value,
        decimals: valuesPrice.decimals,
      },
      picture: pictures.toString(),
      condition: response.data.condition,
      free_shipping: response.data.shipping.free_shipping,
      sold_quantity: response.data.sold_quantity,
      description: description,
      category: category,
    };

    return {
      author: {
        name: "Diego",
        lastname: "Acevedo",
      },
      item: item,
    };
  } else {
    throw new Error("Error consultando los datos.");
  }
};
