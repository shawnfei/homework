// pages/personalcenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //跳转到地址


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
    let that=this
    wx.getStorage({
      key: 'user_name',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {
        that.setData({
          userName:res.data
        })
      },
    })
    wx.getStorage({
      key: 'tel',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {
        that.setData({
          tel: res.data
        })
      },
    })
  },
  outLogin:function(){
    wx.setStorage({
      key: 'cwxcx_token',
      data: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {
        wx.reLaunch({
          url: '../login/login',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
    })
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