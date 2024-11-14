import { API } from "../configs/constants";
import { axiosSinToken } from "../configs/axiosHelper";
import * as categoryService from "../services/category.service";
import * as currencyService from "../services/currency.service";
import * as descriptionService from "../services/description.service";
import { calculatePrice } from "../configs/helpers";

export const findAll = async (req) => {
  const q = req.query.q;

  const data = await axiosSinToken(API.SEARCH.replace("{query}", q), {}, "GET");

  if (data.status == 200) {
    let takeitems = data.data.results.splice(0, 4);

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

  const detail = await axiosSinToken(API.DETAIL.replace("{id}", id), {}, "GET");

  if (detail.status == 200) {
    let description = await descriptionService.findOne(id);

    let category = await categoryService.findOne(detail.data.category_id);

    let currency = await currencyService.findOne(detail.data.currency_id);

    // const pictures = detail.data.pictures.map((item) => item.url);
    const pictures = detail.data.pictures[0].url;

    let valuesPrice = calculatePrice(
      detail.data.currency_id,
      detail.data.price
    );

    const item = {
      id: detail.data.id,
      title: detail.data.title,
      price: {
        currency: currency.currency,
        amount: detail.data.available_quantity,
        value: valuesPrice.value,
        decimals: valuesPrice.decimals,
      },
      picture: pictures.toString(),
      condition: detail.data.condition,
      free_shipping: detail.data.shipping.free_shipping,
      sold_quantity: detail.data.sold_quantity,
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
