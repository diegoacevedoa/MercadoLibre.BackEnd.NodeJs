import { API } from "../helpers/constants";
import { axiosSinToken } from "../helpers/axiosHelper";

export const findAll = async (req) => {
  const q = req.query.q;

  const data = await axiosSinToken(API.SEARCH.replace("{query}", q), {}, "GET");

  if (data.status == 200) {
    const items = data.data.results.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.installments.amount,
          decimals: item.price,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      };
    });

    const categories = data.data.results
      .map((item) => item.category_id)
      .filter((value, index, self) => self.indexOf(value) === index);

    return {
      author: {
        name: "Diego",
        lastname: "Acevedo",
      },
      categories: categories,
      items: items,
    };
  } else {
    throw new Error("Error consultando los datos.");
  }
};

export const findOne = async (req) => {
  const { id } = req.params;

  const detail = await axiosSinToken(API.DETAIL.replace("{id}", id), {}, "GET");

  const description = await axiosSinToken(
    API.DESCRIPTION.replace("{id}", id),
    {},
    "GET"
  );

  if (detail.status == 200) {
    const item = {
      id: detail.data.id,
      title: detail.data.title,
      price: {
        currency: detail.data.currency_id,
        amount: detail.data.price,
        decimals: detail.data.price,
      },
      picture: detail.data.thumbnail,
      condition: detail.data.condition,
      free_shipping: detail.data.shipping.free_shipping,
      sold_quantity: detail.data.sold_quantity,
      description: detail.data.description,
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
