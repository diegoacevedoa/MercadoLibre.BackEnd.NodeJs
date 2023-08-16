import { API } from "../helpers/constants";
import { axiosSinToken } from "../helpers/axiosHelper";

export const findOne = async (item) => {
  try {
    let cat = await axiosSinToken(
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
};
