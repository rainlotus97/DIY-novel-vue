import axios from 'axios'
import QS from 'qs'

//设置超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//请求携带cookie
//axios.defaults.withCredentials = true;

function zgaxios(method, url, params) {
    if (method.toLowerCase() == "get") {
        return get(url, params)
    }
    else {
        return post(url, params)
    }
}

function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then((result) => {
                resolve(result.data)
            })
            .catch((err) => {
                reject(err);
            })
    })
}

function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then((result) => {
                resolve(result.data)
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export default zgaxios;