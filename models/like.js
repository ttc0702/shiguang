import { Http } from '../utils/http.js'

class LikeModel extends Http {
    like(behavior, artId, type, index) {
        let url = behavior === 'like' ? 'like' : 'like/cancel'
        this.request({
            url,
            method: 'POST',
            data: {
                art_id: artId,
                type
            }
        })
        if (index) {
            let key = this._getKey(index)
            wx.removeStorageSync(key)
        }
    }

    getClassicLikeStatus(artId, type, index, callback) {
        let key = this._getKey(index)
        let like = wx.getStorageSync(key)
        if (!like) {
            this.request({
                url: `classic/${type}/${artId}/favor`,
                success: (res) => {
                    callback(res)
                    wx.setStorageSync(key, { fav_nums: res.fav_nums, like_status: res.like_status })
                }
            })
        } else {
            callback(like)
        }
    }
    
    _getKey(index) {
        let key = 'classic-like-' + index
        return key
    }
}

export { LikeModel }