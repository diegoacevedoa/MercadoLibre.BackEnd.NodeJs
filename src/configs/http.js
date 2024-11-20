// ** Axios
import axios from "axios";

// ** Config
import config from "../config";
import { ApiMethods } from "./constants";

const DEFAULT_CONFIG = {
  timeout: config.timeout,
  baseURL: config.api,
};

class Axios {
  constructor(config) {
    this.axios = axios.create(config);

    this.interceptors();

    Axios.instance = this;
  }

  updateHeaderTypeFormData(request) {
    const newHeaders = {
      ...request.headers,
      "Content-Type": "multipart/form-data",
    };

    request.headers = newHeaders;

    return request;
  }

  updateHeaderTypeJson(request) {
    const newHeaders = {
      ...request.headers,
      "Content-Type": "application/json",
    };

    request.headers = newHeaders;

    return request;
  }

  updateHeaderToken(request) {
    const newHeaders = {
      ...request.headers,
    };

    request.headers = newHeaders;

    return request;
  }

  ///interceptor
  interceptors() {
    this.axios.interceptors.request.use(
      (request) => {
        if (
          request.method === ApiMethods.POST ||
          request.method === ApiMethods.PUT ||
          request.method === ApiMethods.PATCH
        ) {
          if (!request.headers["Content-type"]) {
            if (request.url?.includes("assets")) {
              return request;
            }

            if (request.data instanceof FormData) {
              return this.updateHeaderTypeFormData(request);
            }

            return this.updateHeaderTypeJson(request);
          } else {
            return this.updateHeaderToken(request);
          }
        } else {
          return this.updateHeaderToken(request);
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  //Request
  request = ({ url, method, data, config }) => {
    return this.axios({
      url: DEFAULT_CONFIG.baseURL + url,
      data,
      method,
      ...config,
    });
  };
}

const AxiosBuilder = new Axios(DEFAULT_CONFIG);

export default AxiosBuilder;
