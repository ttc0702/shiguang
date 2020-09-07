import { LikeModel } from '../../../../models/like.js'

let likeModel = new LikeModel()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: {
            type: Number,
            observer(newVal, oldVal, changePath) {
                let val = newVal < 10 ? '0' + newVal : newVal
                this.setData({
                    // index: val // 不要在属性的 observer() 中改变其自身的值，否则可能引起无限递归。
                    _index: val
                })
            }
        },
        like: Object,
        classic: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        months: [
            '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
        ],
        year: 0,
        month: '',
        _index: ''
    },
    
    lifetimes: {
        attached() {
            let date = new Date()

            let year = date.getFullYear(),
                month = date.getMonth()
            this.setData({
                year,
                month: this.data.months[month]
            })
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike(e) {
            const behavior = e.detail.behavior,
                index = e.detail.index,
                id = this.data.classic.id,
                type = this.data.classic.type

            likeModel.like(behavior, id, type, index)
        },
    
    }
})
