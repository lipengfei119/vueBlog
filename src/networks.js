import axios from 'axios'
export function request(config){
    const instance = axios.create({
        baseURL:'http://localhost:3000/',
        timeout: 1000,
        withCredentials: true
    })
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response.data;
        })
         return instance(config)
}