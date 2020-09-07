// pages/my/components/info/info.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bookCount: Number
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        // openType: 'getUserInfo'
        authorized: false,
        userInfo: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getUserInfo(e) {
            const userInfo = e.detail.userInfo
            if (!userInfo) {
                return
            }
            this.setData({
                userInfo,
                authorized: true
            })
        },

        userAuthorized() {
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success: res => {
                                this.setData({
                                    authorized: true,
                                    userInfo: res.userInfo
                                })
                            }
                        })
                    }
                }
            })
        },

        jumpToAbout() {
            wx.navigateTo({
                url: '/pages/about/about'
            })
        }
    },

    attached() {
        this.userAuthorized()
    }
})
