import { classicBeh } from '../classic_beh'

Component({
    // behaviors 是一种多继承
    behaviors: [
        classicBeh
    ],

    /**
     * 组件的属性列表
     */
    properties: {
        hidden: Boolean,
        img: String,
        content: String
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

    }
})
