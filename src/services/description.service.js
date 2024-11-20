import { API } from "../configs/constants";
import Axios from "../configs/http";

export const findOne = async (id) => {
  let url = API.DESCRIPTION.replace("{id}", id);

  const config = {
    method: "GET",
  };

  const response = await Axios.request({ url, config });

  if (response.status == 200) {
    return response.data.plain_text;
  } else {
    return "";
  }
};
