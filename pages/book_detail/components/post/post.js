import { BookModel } from '../../../../models/book'

const bookModel = new BookModel()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bookId: Number,
        comments: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        inputValue: '',
        enabled: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        hidePost() {
            this.triggerEvent('toggle', {
                posting: false
            }, {})
        },

        handleInput(e) {
            const inputValue = e.detail.value
            this.setData({
                inputValue,
                enabled: inputValue.trim()
            })
        },

        handlePost(e) {
            let comment = e.detail.text || this.data.inputValue
            // 如果是点击键盘中的发送按钮，也可以通过 e.detail.value 获取 comment 的值

            comment = comment.trim()
            if (!comment) {
                return
            }

            if (comment.length > 12) {
                wx.showToast({
                    title: '短评最多12个字',
                    icon: 'none'
                })
                return
            }

            const id = this.properties.bookId
            bookModel.postComment(id, comment)
                .then(res => {
                    wx.showToast({
                        title: '短评+1',
                        icon: 'none'
                    })

                    // this.properties.comments.unshift({
                    //     comment,
                    //     nums: 1
                    // })

                    this.triggerEvent('add', {
                        comment: {
                            content: comment,
                            nums: 1
                        }
                    }, {})

                    this.triggerEvent('toggle', {
                        posting: false
                    })
                })
        },
    }
})
