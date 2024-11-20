import { config } from "dotenv";

config();

export default {
  port: process.env.PORT || 4000,
  api: process.env.API || "",
  timeout: process.env.TIMEOUT || 240000,
};
