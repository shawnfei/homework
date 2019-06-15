// pages/detailsonthereceipt/index.js
// pages/index/index.js
import {
  Home
} from '../../utils/home.js';
let home = new Home(); //实例化 首页 对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    data:[],
    toast:true,
  },
  inputNum:function(e){
    let that=this
    that.setData({
      num:e.detail.value
    })
  },
  /**
   * 交付
   */
  delivery: function() {
    let that = this
    if(!that.data.num){
      that.setData({
        toast:false
      })
      wx.showToast({
        title: '请输入数量',
        icon: 'none',
        duration: 1500,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return
    }

    var param = {
      id: that.data.data[that.data.index].id,
      num:that.data.num
    }
    home.delivery(param, (res) => {
      (res.code == 1) ? wx.showToast({ title: res.msg, icon: 'success' })  : wx.showToast({ title: res.msg, icon: 'none' });
      that.setData({ toast: true})
      setTimeout(function () { wx.navigateBack({})  }, 1000);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log(JSON.parse(options.data))
    var data = JSON.parse(options.data)
    var index = options.index
    var type = options.type
    that.setData({
      data: data,
      index: index,
      type: type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})