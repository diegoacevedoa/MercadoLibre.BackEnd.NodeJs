import express from "express";
import config from "./config";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import productRoutes from "./routes/product.routes";
import {
  errorHandler,
  requestInterceptor,
  responseInterceptor,
} from "./middleware/middleware";

const app = express();

//settings
app.set("port", config.port);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Middleware para interceptar todas las solicitudes
app.use(requestInterceptor);

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//routes
app.use("/api", productRoutes);

//Middleware para interceptar todas las respuestas
app.use(responseInterceptor);

//Middleware para interceptar todos los errores
app.use(errorHandler);

export default app;
