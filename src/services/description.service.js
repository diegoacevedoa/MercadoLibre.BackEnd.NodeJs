import { API } from "../helpers/constants";
import { axiosSinToken } from "../helpers/axiosHelper";

export const findOne = async (id) => {
  try {
    const description = await axiosSinToken(
      API.DESCRIPTION.replace("{id}", id),
      {},
      "GET"
    );

    if (description.status == 200) {
      return description.data.plain_text;
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};
