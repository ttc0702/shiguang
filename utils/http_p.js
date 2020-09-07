import { config } from '../config.js' // 这里只能使用相对路径

class Http_p {
    request({url, method = 'GET', data = {}}) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, method, data)
        })
    }

    _request(url, resolve, reject, method = 'GET', data = {}) {
        wx.request({
            url: config.api + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    // 客户端请求错误 4xx 或服务器运行错误 5xx
                    // const error_code = res.data.error_code
                    reject()
                    const msg = res.data.msg
                    this._show_error(msg)
                }
            },
            fail: (err) => {
                // 未联网
                reject()
                this._show_error('网络未连接')
            }
        })
    }

    _show_error(msg) {
        wx.showToast({
            title: msg,
            icon: 'none',
            duration: 5000
        })
    }
}

export { Http_p }