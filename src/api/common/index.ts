import axios from 'axios';

// 获取ip地址
export const apiGetIPAddress = () => {
  return axios.request({
    url: 'http://pv.sohu.com/cityjson?ie=utf-8',
    method: 'get'
  })
}