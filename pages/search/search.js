import { KeywordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'
import { SearchModel } from '../../models/search'

const keywordModel = new KeywordModel(),
    bookModel = new BookModel(),
    searchModel = new SearchModel()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        history: [],
        hot: [],
        books: [],
        searching: false,
        keyword: '',
        getting: false,
        noMore: false,
        loadingCenter: false,
        noResult: false,
        total: null,
        request: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._updateHistory()

        keywordModel.getHot()
            .then(res => {
                this.setData({
                    hot: res.hot
                })
            })
    },

    _updateHistory() {
        const history = keywordModel.getHistory()
        this.setData({
            history
        })
    },

    handleSearch(e) {
        // 终止上一次的请求
        if (this.data.request) {
            this.data.request.abort()
        }

        // 每次请求都先清空列表数据，防止上次请求的页面在请求过程中仍出现在页面上
        this.setData({
            books: [],
            getting: false,
            noMore: false,
            loadingCenter: false,
            noResult: false,
            total: null
        })

        let keyword = e.detail.keyword

        this.setData({
            searching: true,
            keyword
        })

        this._showLoadingCenter()

        let search = searchModel.search(0, keyword, res => {
            this._hideLoadingCenter()

            let books = res.books
            this.setData({
                books,
                total: res.total
            })
            // 若关键词搜索不到结果，则不加入缓存中
            const length = books.length
            if (length > 0) {
                keywordModel.addToHistory(keyword)
            } else {
                this.setData({
                    noResult: true,
                })
            }
        })

        this.setData({
            request: search
        })

        // search[0].then(res => {
        //     this._hideLoadingCenter()

        //     let books = res.books
        //     this.setData({
        //         books,
        //         total: res.total
        //     })
        //     // 若关键词搜索不到结果，则不加入缓存中
        //     const length = books.length
        //     if (length > 0) {
        //         keywordModel.addToHistory(keyword)
        //     } else {
        //         this.setData({
        //             noResult: true,
        //         })
        //     }
        // })
    },

    clear() {
        // 终止上一次的请求
        if (this.data.request) {
            this.data.request.abort()
        }

        this.setData({
            books: [],
            searching: false,
            keyword: '',
            getting: false,
            noMore: false,
            loadingCenter: false,
            noResult: false,
            total: null,
            request: null
        })

        this._updateHistory()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this._loadMore()
    },

    _loadMore() {
        const length = this.data.books.length,
            keyword = this.data.keyword,
            books = this.data.books,
            total = this.data.total

        if (length === total) {
            this._noMore()
        }

        // 使用锁解决重复加载数据和数据加载完毕仍继续加载的问题
        if (this._isLocked() || this.isNoMore()) {
            return
        }

        // this.setData({
        //     getting: true
        // })
        // 不需要显示在页面上的数据可以直接赋值
        this._lock()

        bookModel.search(length, keyword)
            .then(res => {
                const newBooks = books.concat(res.books)
                this.setData({
                    books: newBooks,
                })
                this._unlock()

            }, () => {
                this._unlock()
            })
    },

    _isLocked() {
        return this.data.getting
    },

    _lock() {
        this.setData({
            getting: true
        })
    },

    _unlock() {
        this.setData({
            getting: false
        })
    },

    isNoMore() {
        return this.data.noMore
    },

    _noMore() {
        this.setData({
            noMore: true
        })
    },

    _showLoadingCenter() {
        this.setData({
            loadingCenter: true
        })
    },

    _hideLoadingCenter() {
        this.setData({
            loadingCenter: false
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})