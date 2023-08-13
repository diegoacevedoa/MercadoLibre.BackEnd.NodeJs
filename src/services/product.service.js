import { API } from "../helpers/constants";
import { axiosSinToken } from "../helpers/axiosHelper";

export const findAll = async (req) => {
  const q = req.query.q;

  const data = await axiosSinToken(API.SEARCH.replace("{query}", q), {}, "GET");

  if (data.status == 200) {
    let takeitems = data.data.results.splice(0, 4);

    const items = takeitems.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.available_quantity,
          decimals: item.price,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      };
    });

    const categories = takeitems
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
