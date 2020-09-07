import {Http_abort} from '../utils/http_abort.js'

class SearchModel extends Http_abort {
    search(start, q, callback) {
        return this.request({
            url: 'book/search?summary=1',
            data: {
                start: start,
                q: q
            },
            success: callback
        })
    }
}

export { SearchModel }
