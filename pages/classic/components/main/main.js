import { classicBeh } from '../classic_beh'

const mMgr = wx.getBackgroundAudioManager()

Component({
    behaviors: [
        classicBeh
    ],

    /**
     * 组件的属性列表
     */
    properties: {
        src: {
            type: String,
            observer(newVal, oldVal) {
                if (newVal) {
                    this._recoverStatus()
                    this._monitorSwitch()
                } else {
                    this.setData({
                        playing: false
                    })
                }
            }
        },
        img: String,
        content: String,
        title: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        essaySrc: 'images/essay@tag.png',
        movieSrc: 'images/movie@tag.png',
        musicSrc: 'images/music@tag.png',
        pauseSrc: 'images/player@pause.png',
        playSrc: 'images/player@play.png',
        playing: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPlay() {
            if (!this.data.playing) {     
                this.setData({
                    playing: true
                })
                mMgr.src = this.properties.src
                mMgr.title = this.properties.title
                console.log(this.properties.src)
            } else {
                this.setData({
                    playing: false
                })
                mMgr.pause()
            }
        },

        _recoverStatus() {
            if (mMgr.paused) {
                this.setData({
                    playing: false
                })
                return
            }
            if (mMgr.src === this.properties.src) {
                this.setData({
                    playing: true
                })
            }
        },

        _monitorSwitch() {
            mMgr.onPlay(() => {
                this._recoverStatus()
            })
            mMgr.onPause(() => {
                this._recoverStatus()
            })
            mMgr.onStop(() => {
                this._recoverStatus()
            })
            mMgr.onEnded(() => {
                this._recoverStatus()
            })
        }
    }
})
