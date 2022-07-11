// page/video/video.js
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    navId: '',
    videoList: [],
    videoId: '',
    videoUpdateTime: [],
    triggered: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getVideoGroupList()
  },
  // 获取视频标签列表
  async getVideoGroupList() {
    let result = await request('/video/group/List', {})
    this.setData({
      videoGroupList: result.data.slice(0, 14),
      navId: result.data[0].id
    })
    this.getVideoList(result.data[0].id)
  },
  // 获取视频标签/分类下的视频
  async getVideoList(id) {
    let result = await request('/video/group', {
      id
    })
    this.setData({
      videoList: []
    })
    result.datas.map(item => {
      // console.log(item.data.vid);
      request('/video/url', {
        id: item.data.vid
      }).then(res => {
        item.url = res.urls[0].url
        this.setData({
          videoList: this.data.videoList.concat(item)
        })

        wx.hideLoading()
        this.setData({
          triggered: false
        })
      })
    })
  },

  changeNav(event) {
    let navId = event.target.id >>> 0
    wx.showLoading({
      title: '正在加载',
    })
    this.getVideoList(navId)
    this.setData({
      navId
    })
  },

  handlePlay(event) {
    let vid = event.target.id
    this.vid !== vid && this.videoContext && this.videoContext.stop()

    this.vid = vid

    this.setData({
      videoId: vid
    })
    this.videoContext = wx.createVideoContext(vid)
    // 是否播放过
    let videoItem = this.data.videoUpdateTime.find(item => item.vid === vid)
    if (videoItem) {
      this.videoContext.seek(videoItem.time)
    }
  },

  handleTimeUpdate(event) {
    let video = {
      vid: event.target.id,
      time: event.detail.currentTime
    }
    let {
      videoUpdateTime
    } = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === event.target.id)

    if (videoItem) {
      videoItem.time = event.detail.currentTime
    } else {
      videoUpdateTime.push(video)
    }
    this.setData({
      videoUpdateTime
    })
  },

  handlEnded(event) {
    let {
      videoUpdateTime
    } = this.data
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.target.id), 1);
    this.setData({
      videoUpdateTime
    })
  },

  bindRefresh() {
    console.log('下拉刷新');
    this.setData({
      triggered: true
    })
    this.getVideoList(this.data.navId)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})