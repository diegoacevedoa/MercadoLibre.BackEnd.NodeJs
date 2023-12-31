import { API } from "../helpers/constants";
import { axiosSinToken } from "../helpers/axiosHelper";

export const findOne = async (item) => {
  try {
    let cur = await axiosSinToken(
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
};
