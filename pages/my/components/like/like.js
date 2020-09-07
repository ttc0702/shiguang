// pages/my/components/like/like.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        classicLike: Array
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleTap(e) {
            const type = e.mark.type,
                id = e.mark.id

            if (!type) {
                return
            }

            wx.navigateTo({
                url: `/pages/classic_detail/classic_detail?type=${type}&id=${id}`
            })

        }
    }
})
