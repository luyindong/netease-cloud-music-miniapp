// pages/login/login.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },

  handleInput(event) {
    this.setData({
      [event.currentTarget.id]: event.detail.value
    })
  },

  async handleLogin() {
    let {
      phone,
      password
    } = this.data
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return;
    } else {
      let phoneReg = /^1[3456789]\d{9}$/
      if (!phoneReg.test(this.data.phone)) {
        wx.showToast({
          title: '手机号格式错误',
          icon: 'none'
        })
        return;
      }
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return;
    }
    let result = await request('/login/cellphone', {
      phone,
      password
    })
    if (result.code === 200) {
      wx.showToast({
        title: '登录成功',
      })

      wx.reLaunch({
        url: '/page/personal/personal',
      })

      wx.setStorageSync(
        "userInfo", JSON.stringify(result.profile)
      )
      wx.setStorageSync(
        "cookie", JSON.stringify(result.cookie)
      )
    } else if (result.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    } else if (result.code === 502) {
      wx.showToast({
        title: '帐号或密码错误',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})