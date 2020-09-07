import { KeywordModel } from '../../../../models/keyword'

const keywordModel = new KeywordModel()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // keyword: String,
        keyword: {
            type: String,
            observer: function (newVal, oldVal) {
                if (newVal.trim() === '' && oldVal.trim() !== '') {
                    this.clear()
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        enabled: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleInput(e) {
            const keyword = e.detail.value
            this.setData({
                keyword,
                enabled: keyword.trim(),
            })
        },

        handleConfirm(e) {
            let keyword = this.properties.keyword.trim()

            if (!keyword) {
                return
            }

            this.triggerEvent('search', {
                keyword
            }, {})
        },

        clear() {
            this.triggerEvent('clear', {}, {})
        }
    }
})
