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
    const { code, data } = res.data;
    if (code != 200 && code != 0) {
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

export const http = {
  get<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.get(url, {
      params: data,
      ...config,
    });
  },
  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config);
  },
};

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
