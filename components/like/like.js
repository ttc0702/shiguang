// components/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean, // Boolean 类型的初始值是 false
            value: false,
        },
        count: Number, // Number 类型的初始值是 0
        index: Number,
        readOnly: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        // srcLike: 'images/like.png',
        // srcUnlike: 'images/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toggleLike() {
            if (this.properties.readOnly) {
                return
            }
            let like = this.properties.like,
                count = this.properties.count
            
            this.setData({
                count: like ? count - 1 : count + 1,
                like: !like
            })

            let behavior = this.properties.like ? 'like' : 'cancel'
            this.triggerEvent('like', {
                behavior,
                index: this.properties.index
            }, {})
        }
    }
})