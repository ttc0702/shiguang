// components/img-button/img-button.js
Component({
    options: {
        multipleSlots: true
    },

    /**
     * 组件的属性列表
     */
    properties: {
        openType: String
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
        getUserInfo(e) {
            this.triggerEvent('getUserInfo', e.detail, {})
        }
    }
})
