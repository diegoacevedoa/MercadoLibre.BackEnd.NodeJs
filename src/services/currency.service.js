import { API } from "../configs/constants";
import Axios from "../configs/http";

export const findOne = async (item) => {
  let url = API.CURRENCY.replace("{cur}", item);

  const config = {
    method: "GET",
  };

  const response = await Axios.request({ url, config });

  if (response.status == 200) {
    return { currency_id: item, currency: response.data.symbol };
  } else {
    return null;
  }
};
