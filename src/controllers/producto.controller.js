import * as productoService from "../services/producto.service";

export const findAll = async (req, res) => {
  try {
    const response = await productoService.findAll(req);

    res.json(response);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const findOne = async (req, res) => {
  try {
    const response = await productoService.findOne(req);

    res.json(response);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
