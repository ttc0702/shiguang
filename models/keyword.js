import { Http_p } from '../utils/http_p'

class KeywordModel extends Http_p {
    key = 'history'
    maxLength = 10

    getHistory() {
        return wx.getStorageSync(this.key) || []
    }

    addToHistory(keyword) {
        let keywords = this.getHistory()
        const has = keywords.includes(keyword)
        if (!has) {
            if (keywords.length >= this.maxLength) {
                keywords.pop()
            }
            keywords.unshift(keyword)
            wx.setStorageSync(this.key, keywords)
        }
    }

    getHot() {
        return this.request({
            url: 'book/hot_keyword'
        })
    }
}

export { KeywordModel }