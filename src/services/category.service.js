import { API } from "../configs/constants";
import Axios from "../configs/http";

export const findOne = async (item) => {
  let url = API.CATEGORY.replace("{cat}", item);

  const config = {
    method: "GET",
  };

  const response = await Axios.request({ url, config });

  if (response.status == 200) {
    return response.data.name;
  } else {
    return "";
  }
};
