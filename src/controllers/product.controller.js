import * as productService from "../services/product.service";

export const findAll = async (req, res, next) => {
  await productService
    .findAll(req)
    .then((response) => res.json(response))
    .catch(next);
};

export const findOne = async (req, res, next) => {
  await productService
    .findOne(req)
    .then((response) => res.json(response))
    .catch(next);
};
