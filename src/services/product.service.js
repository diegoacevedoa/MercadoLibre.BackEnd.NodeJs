import { API } from "../helpers/constants";
import { axiosSinToken } from "../helpers/axiosHelper";

export const findAll = async (req) => {
  const q = req.query.q;

  const data = await axiosSinToken(API.SEARCH.replace("{query}", q), {}, "GET");

  if (data.status == 200) {
    let takeitems = data.data.results.splice(0, 4);

    const categories = takeitems
      .map((item) => item.category_id)
      .filter((value, index, self) => self.indexOf(value) === index);

    let cat = "";

    const resultCategories = await Promise.all(
      categories.map(async (item) => {
        try {
          cat = await axiosSinToken(
            API.CATEGORY.replace("{cat}", item),
            {},
            "GET"
          );

          if (cat.status == 200) {
            return cat.data.name;
          } else {
            return "";
          }
        } catch (error) {
          return "";
        }
      })
    );

    const currencies = takeitems
      .map((item) => item.currency_id)
      .filter((value, index, self) => self.indexOf(value) === index);

    let cur = "";

    const resultCurrencies = await Promise.all(
      currencies.map(async (item) => {
        try {
          cur = await axiosSinToken(
            API.CURRENCY.replace("{cur}", item),
            {},
            "GET"
          );

          if (cur.status == 200) {
            return { currency_id: item, currency: cur.data.symbol };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      })
    );

    let pesoAregentino = Intl.NumberFormat("es-AR");

    const items = takeitems.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: resultCurrencies.find(
            (itemCur) => itemCur.currency_id == item.currency_id
          ).currency,
          amount: item.available_quantity,
          decimals: pesoAregentino.format(item.price),
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        state_name: item.address.state_name,
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
  let descriptions = "";

  const detail = await axiosSinToken(API.DETAIL.replace("{id}", id), {}, "GET");

  if (detail.status == 200) {
    try {
      const description = await axiosSinToken(
        API.DESCRIPTION.replace("{id}", id),
        {},
        "GET"
      );

      if (description.status == 200) {
        descriptions = description.text;
      }
    } catch (error) {}

    const pictures = detail.data.pictures.map((item) => item.url);

    const item = {
      id: detail.data.id,
      title: detail.data.title,
      price: {
        currency: detail.data.currency_id,
        amount: detail.data.available_quantity,
        decimals: detail.data.price,
      },
      picture: pictures.toString(),
      condition: detail.data.condition,
      free_shipping: detail.data.shipping.free_shipping,
      sold_quantity: detail.data.sold_quantity,
      description: descriptions,
    };

    return {
      author: {
        name: "Diego",
        lastname: "Acevedo",
      },
      items: item,
    };
  } else {
    throw new Error("Error consultando los datos.");
  }
};
