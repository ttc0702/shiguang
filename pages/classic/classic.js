import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'


let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        classic: null,
        latest: true,
        first: false,
        like: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        classicModel.getLatest((res) => {
            // 小程序中必须通过 setData() 进行数据更新，直接赋值无效
            this.setData({
                classic: res,
                like: {
                    count: res.fav_nums,
                    status: res.like_status
                }
            })
        })
    },

    onNext() {
        this._update('next')
    },

    onPrevious() {
        this._update('previous')
    },

    _update(nextOrPrevious) {
        let index = this.data.classic.index

        classicModel.getUpdate(index, nextOrPrevious, (res) => {
            this.setData({
                classic: res,
                latest: classicModel.isLatest(res.index),
                first: classicModel.isFirst(res.index)
            })
            this._getLikeStatus(res.id, res.type, res.index)
        })

        // 这里不能通过 this.data.classic.index 进行判断，因为这里看似是在调用了 setData() 之后重新给 index 赋值，实际由于 ajax 是异步的，这一步赋值将在 setData() 之前执行。

        // let latestIndex = wx.getStorageSync('latestIndex')
        // index = this.data.classic.index

        // let latest = index == latestIndex ? true : false,
        //     first = index == 1 ? true : false

        // this.setData({
        //     latest,
        //     first
        // })
    },

    _getLikeStatus(artId, type, index) {
        likeModel.getClassicLikeStatus(artId, type, index, (res) => {
            this.setData({
                like: {
                    count: res.fav_nums,
                    status: res.like_status
                }
            })
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