//Middleware para interceptar todas las solicitudes
export const requestInterceptor = (req, res, next) => {
  console.log("Interceptando solicitud: ", req.method, req.url);
  next();
};

//Middleware para interceptar todas las respuestas
export const responseInterceptor = (req, res, next) => {
  console.log("Interceptando respuesta: ", res.statusCode, res.statusMessage);
  next();
};

//Middleware para manejar los errores
export const errorHandler = (err, req, res, next) => {
  console.log("Interceptando error. ");
  next(err);
};
