import { LikeModel } from '../../../../models/like'

const likeModel = new LikeModel()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bookId: Number,
        likeStatus: Boolean,
        likeCount: Number,
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
        handleLike(e) {
            const behavior = e.detail.behavior,
                id = this.properties.bookId
            likeModel.like(behavior, id, 400)
        },

        showPost() {
            this.triggerEvent('toggle', {
                posting: true
            }, {})
        }
    }
})
