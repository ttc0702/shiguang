import {config} from '../config.js' // 这里只能使用相对路径

const tips = {
    1: '网络未连接',
    1005: '错误的 appkey',
    3000: '该期内容不存在'
}

class Http {
    request(params) {
        if(!params.method) {
            params.method = 'GET'
        }
        
        wx.request({
            url: config.api + params.url,
            method: params.method,
            data: params.data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    params.success && params.success(res.data)
                } else {
                    // 客户端请求错误 4xx 或服务器运行错误 5xx
                    // const error_code = res.data.error_code
                    const msg = res.data.msg
                    this._show_error(msg)
                }
            },
            fail: (err) => {
                // 未联网
                this._show_error('网络未连接')
            }
        })
    }

    _show_error(msg) {
        wx.showToast({
            title: msg,
            icon: 'none',
            duration: 3000
        })
    }
}

export {Http}