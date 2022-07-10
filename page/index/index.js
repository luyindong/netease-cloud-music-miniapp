import request from "../../utils/request";

// page/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recommendList: [],
    topList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let bannerListData = await request('/banner', {
      type: 2
    })
    this.setData({
      bannerList: bannerListData.banners
    })

    let recommendListData = await request('/personalized', {
      limit: 30
    })
    this.setData({
      recommendList: recommendListData.result
    })

    let topListData = await request('/topList')
    console.log(topListData);
    this.setData({
      topList: topListData.list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('onShow');
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
    console.log('onUnload');
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