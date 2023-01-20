import { ElNotification } from "element-plus";
import axios, {
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10 * 1000,
  timeoutErrorMessage: "请求超时，请稍后重试",
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err: AxiosError) => {
    ElNotification({
      title: "请求错误",
      message: err.message,
    });
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (res: AxiosResponse) => {
    console.log("request response: ", res);
    const { code, status } = res.data;
    if (code != 200 && code != 0 && status != 1) {
      const { status, msg } = errHandler(res);
      ElNotification({
        title: `请求错误码：${status}`,
        message: msg,
      });
    }
    return Promise.resolve(res.data);
  },
  (err: AxiosError) => {
    let code: number | string = err.status ?? 400;
    let message = err.message ?? "请求错误";
    if (err.response) {
      const { status, msg } = errHandler(err.response);
      code = status;
      message = msg;
    }
    ElNotification({
      message,
      title: `请求错误码：${code}`,
    });
    return Promise.reject(err);
  }
);

export interface Result<T> {
  code: string | number;
  data?: T;
  msg?: string;
  message?: string;
  curTime?: number;
  [key: string]: any;
}

function errHandler(res: AxiosResponse): {
  status: number | string;
  msg: string;
} {
  let { status, statusText } = res;
  if (res.data) {
    status = res.data.code;
    statusText = res.data.msg || res.data.message;
  }
  return {
    status: status,
    msg: statusText,
  };
}

type ResponseType = [
  AxiosError | undefined,
  AxiosResponse<any, any> | undefined
];

export const http = {
  get(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<ResponseType> {
    return new Promise(resolve => {
      service
        .get(url, {
          params: data,
          ...config,
        })
        .then(res => resolve([undefined, res]))
        .catch(err => resolve([err, undefined]));
    });
  },
  post(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<ResponseType> {
    return new Promise(resolve => {
      service
        .post(url, data, config)
        .then(res => resolve([undefined, res]))
        .catch(err => resolve([err, undefined]));
    });
  },
};
