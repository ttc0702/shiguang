import { Http } from '../utils/http.js'

class ClassicModel extends Http {
    getLatest(callback) {
        this.request({
            // 需要在小程序后台账号中添加可信域名才能访问。
            url: 'classic/latest',
            success: res => {
                callback(res)
                wx.setStorageSync('latestIndex', res.index)
                let key = this._getKey(res.index)
                wx.setStorageSync(key, res)

                let likeKey = this._getLikeKey(res.index)
                wx.setStorageSync(likeKey, { fav_nums: res.fav_nums, like_status: res.like_status })
            }
        })
    }

    getUpdate(index, nextOrPrevious, callback) {
        // 利用缓存机制减少向服务器发送请求的数量
        // 缓存中寻找 or api写入到缓存中
        let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)

        let classic = wx.getStorageSync(key)
        if (!classic) {
            this.request({
                url: `classic/${index}/${nextOrPrevious}`,
                success: res => {
                    callback(res)
                    // wx.setStorageSync(this._getKey(res.index), res)
                    wx.setStorageSync(key, res)
                }
            })
        } else {
            callback(classic)
        }
    }

    getLike(callback) {
        this.request({
            url: 'classic/favor',
            success: callback
        })
    }

    getClassic(type, id, callback) {
        this.request({
            url: `classic/${type}/${id}`,
            success: callback
        })
    }

    isFirst(index) {
        return index == 1 ? true : false
    }

    isLatest(index) {
        let latestIndex = wx.getStorageSync('latestIndex')
        return index == latestIndex ? true : false
    }

    _getKey(index) {
        let key = 'classic-' + index
        return key
    }

    _getLikeKey(index) {
        let key = 'classic-like-' + index
        return key
    }
}

export { ClassicModel }