import { ElNotification } from 'element-plus';
import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10 * 1000,
  timeoutErrorMessage: '请求超时，请稍后重试',
})

instance.interceptors.response.use((res: AxiosResponse) => {
  if (res.data.code != 200 && res.data.code != 0) {
    const { status, msg } = errHandler(res)
    ElNotification({
      title: `请求错误码：${status}`,
      message: msg
    });
  }
  return Promise.resolve(res.data);
}, (err: AxiosError) => {
  let code: number | string = err.status ?? 400
  let message = err.message ?? '请求错误'
  if (err.response) {
    const { status, msg } = errHandler(err.response);
    code = status
    message = msg
  }
  ElNotification({
    message,
    title: `请求错误码：${code}`
  });
  return Promise.reject(err);
})

interface ICustomResponse {
  code: string | number,
  data?: Record<string, any>,
  msg?: string,
  curTime?: number,
  [key: string]: any
}

export const get = (url: string, data?: {}) => {
  return new Promise((resolve) => {
    instance.request({
      method: 'get',
      url,
      params: data
    }).then((res) => resolve(res))
  })
}

export const post = (url: string, data?: {}) => {
  return new Promise((resolve) => {
    instance.request({
      method: 'post',
      url,
      data
    }).then((res) => resolve(res))
  })
}

function errHandler(res: AxiosResponse): { status: number | string, msg: string} {
  let status: number | string = res?.status || 400
  let statusText = res?.statusText
  if (res.data) {
    status = res.data.code
    statusText = res.data.msg || res.data.message
  }
  return {
    status: status,
    msg: statusText
  }
}