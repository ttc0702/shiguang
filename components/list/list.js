// pages/book/components/book/book.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        books: Object
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
            const id = e.mark.id
            if (id) {     
                wx.navigateTo({
                    url: '/pages/book_detail/book_detail?id=' + id
                })
            }
        }
    }
})
