import { API } from "../configs/constants";
import { axiosSinToken } from "../configs/axiosHelper";

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
