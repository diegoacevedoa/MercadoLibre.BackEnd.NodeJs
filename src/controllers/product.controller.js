import * as productService from "../services/product.service";

export const findAll = async (req, res) => {
  try {
    const response = await productService.findAll(req);

    res.json(response);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const findOne = async (req, res) => {
  try {
    const response = await productService.findOne(req);

    res.json(response);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
