// pages/classic/components/nav/nav.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,
        first: Boolean,
        latest: Boolean
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
        onLeft(e) {
            if (!this.properties.latest) {
                this.triggerEvent('left', {}, {})
            }
        },

        onRight(e) {
            if (!this.properties.first) {
                this.triggerEvent('right', {}, {})
            }
        }
    }
})
