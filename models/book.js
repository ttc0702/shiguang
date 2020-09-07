import {Http_p} from '../utils/http_p.js'

class BookModel extends Http_p {
    getHotlist() {
        return this.request({
            url: 'book/hot_list'
        })
    }

    getBookDetail(id) {
        return this.request({
            url: `book/${id}/detail`
        })
    }

    getBookComments(id) {
        return this.request({
            url: `book/${id}/short_comment`
        })
    }

    getBookLikeStatus(id) {
        return this.request({
            url: `book/${id}/favor`
        })
    }

    getBookCount() {
        return this.request({
            url: 'book/favor/count'
        })
    }

    postComment(id, comment) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: id,
                content: comment
            }
        })
    }

    search(start, q) {
        return this.request({
            url: 'book/search?summary=1',
            data: {
                start: start,
                q: q
            }
        })
    }
}

export { BookModel }
