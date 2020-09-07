import { BookModel } from '../../models/book.js'

const bookModel = new BookModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: null,
        comments: [],
        like: null,
        posting: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading()

        // options 可以获取地址中携带的参数
        const id = options.id,
            detail = bookModel.getBookDetail(id),
            comments = bookModel.getBookComments(id),
            like = bookModel.getBookLikeStatus(id)

        // detail.then(res => {
        //     this.setData({
        //         detail: res
        //     })
        //     console.log(res)
        // })

        // comments.then(res => {
        //     this.setData({
        //         comments: res.comments
        //     })
        //     console.log(res)
        // })

        // like.then(res => {
        //     this.setData({
        //         like: res
        //     })
        //     console.log(res)
        // })

        Promise.all([detail, comments, like])
            .then(res => {
                this.setData({
                    detail: res[0],
                    comments: res[1].comments,
                    like: res[2]
                })
             wx.hideLoading()   
        })
    },

    handleToggle(e) {
        this.setData({
            posting: e.detail.posting
        })
    },

    addComment(e) {
        let comments = this.properties.comments,
            comment = e.detail.comment

        // unshift() 是修改器方法，以下代码 newComments 的值为新数组长度11
        // const newComments = comments.unshift(comment) 
        comments.unshift(comment)

        this.setData({
            comments
        })
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})