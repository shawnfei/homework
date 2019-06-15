// pages/login/login.js
import {
  Home
} from '../../utils/home.js';
var home = new Home(); //实例化 首页 对象
// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */

  data: {

  },
  // nameInput: function (e) {
  //   let that = this
  //   that.setData({
  //     userName: e.detail.value
  //   })
  // },
  telInput: function (e) {
    let that = this
    that.setData({
      tel: e.detail.value
    })
  },
  passWordInput: function (e) {
    let that = this
    that.setData({
      passWord: e.detail.value
    })
  },

  intoButton: function () {
    let that = this;
    if (!that.data.tel) {
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none'
      })
      return;
    }

    if (!(/^1[34578]\d{9}$/.test(that.data.tel))) {
      wx.showToast({
        title: '手机号格式有误，请重填',
        icon: 'none'
      })
      return;
    }
    if (!that.data.passWord) {
      wx.showToast({
        title: '登录密码不能为空',
        icon: 'none'
      })
      return;
    }
    // if (!that.data.userName) {
    //   wx.showToast({
    //     title: '姓名不能为空',
    //     icon: 'none'
    //   })
    //   return;
    // }
    var params = {
      tel: that.data.tel,
      admin_password: that.data.passWord,
    }
    home.login(params, (res) => {
      if (res.code == 1) {
        wx.setStorageSync('cwxcx_token', res.data.token)
        wx.setStorageSync('user_id', res.data.user_id)
        wx.setStorageSync('user_name', res.data.user_name)
        wx.setStorageSync('tel', that.data.tel)
        wx.switchTab({
          url: '/pages/index/index',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1500,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('cwxcx_token')
    if (token) {
      wx.switchTab({
        url: '../index/index',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
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