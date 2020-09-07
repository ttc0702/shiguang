// components/tag/tag.js
Component({
    options: {
        multipleSlots: true
    },

    /**
     * 组件的属性列表
     */

    properties: {
        text: String
    },

    externalClasses: [
        'ex-tag'
    ],

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
            this.triggerEvent('submit', {
                text: this.properties.text
            })
        }
    }
})
