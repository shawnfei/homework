// pages/thedatacenter/index.js
import {
  Home
} from '../../utils/home.js';
var home = new Home(); //实例化 首页 对象\
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '',
    message: [],
    page: 1,
    pageTrue: true,
    currentTab: 1
  },
  getTime: function() {
    let that = this
    var param = {

    }
    home.getTime(param, (res) => {
      var pickerTimeStart1 = res.data.qs_date
      var pickerTimeStart2 = res.data.js_date
      that.data.pickerTimeStart1 = pickerTimeStart1,
        that.data.pickerTimeStart2 = pickerTimeStart2,
        that.setData({
          pickerTimeStart1: pickerTimeStart1,
          pickerTimeStart2: pickerTimeStart2,
          currentTab: 1
        })
      that.filtrate()
    })

  },

  /**
   * 选择开始时间
   */
  changeTimeStart: function (e) {
    let that = this
    that.setData({
      pickerTimeStart1: e.detail.value
    })
    console.log(e.detail.value)
    // that.timeDispose()
  },
  /**
   * 选择结束时间
   */
  changeTimeEnd: function (e) {
    let that = this
    that.setData({
      pickerTimeStart2: e.detail.value
    })
    console.log(e)
    // that.timeDispose()
  },
  /**
   * 上月时间
   */
  lastTime: function() {
    let that = this
    var start = that.data.pickerTimeStart1.split("-");
    var end = that.data.pickerTimeStart2.split("-");

    start[1] = (((parseInt(start[1]) - 1) < 0 ? parseInt(start[1]) - 1 + 12 : parseInt(start[1]) - 1).toString()).length == 1 ? "0" + (parseInt(start[1]) - 1).toString() : (parseInt(start[1]) - 1).toString()
    end[1] = (((parseInt(end[1]) - 1) < 0 ? parseInt(end[1]) - 1 + 12 : parseInt(end[1]) - 1).toString()).length == 1 ? "0" + (parseInt(end[1]) - 1).toString() : (parseInt(end[1]) - 1).toString()
    that.data.pickerTimeStart1 = start.join("-"),
      that.data.pickerTimeStart2 = end.join("-"),
      that.setData({
        pickerTimeStart1: start.join("-"),
        pickerTimeStart2: end.join("-"),
        currentTab: 0
      })
    that.filtrate()
  },
  /**
   * 查询条件
   */
  searchInput: function(e) {
    let that = this
    if (!e.detail.value) {
      that.setData({
        page: 1
      })
    }
    that.setData({
      keywords: e.detail.value
    })
    console.log(e.detail.value)
  },

  /**
   * 数据查找
   */
  findData: function(e) {
    let that = this
    var param = {
      //如果开始时间结束时间为空 就默认上月所有数据 
      //页
      page: that.data.page,
      //条数
      pageSize: 20,
      //筛选
      keywords: that.data.keywords,
      //开始时间
      startTime: that.data.pickerTimeStart1,
      //结束时间
      endTime: that.data. pickerTimeStart2
    }
    if (that.data.pageTrue) {
      wx.showLoading({
        title: '正在加载',
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      home.findData(param, (res) => {
        var total = res.data[2].arr_length
        var moneyTotal = res.data[1].total_price
        if (total == 0) {
          that.setData({
            pageTrue: false
          })
        }
        if (that.data.pageSize > res.data.length) {
          that.setData({
            pageTrue: false
          })
        }

        res.data[0].forEach((val, index) => {
          var create_time = val.create_time.substring(0, 10);
          val.create_time = create_time.replace(/-/g, ".");
        });

        var message = that.data.message.concat(res.data[0])

        if (message.length > 14) {
          var findLen = 14
        } else {
          var findLen = message.length
        }
        that.setData({
          findLen: findLen,
          message: message,
          messageParam: JSON.stringify(message),
          moneyTotal: moneyTotal
        })
        wx.hideLoading()
      })
    } else if (e) {
      wx.showLoading({
        title: '正在加载',
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      home.findData(param, (res) => {
        var moneyTotal = res.data[1].total_prce
        var message = res.data[0]
        if (message.length > 14) {
          var findLen = 14
        } else {
          var findLen = message.length
        }
        that.setData({
          findLen: findLen,
          message: message,
          messageParam: JSON.stringify(message),
          moneyTotal: moneyTotal
        })
        wx.hideLoading()
      })

    }
  },
  findInput: function(e) {
    let that = this
    console.log(e.detail.value)
    that.setData({
      keywords: e.detail.value
    })
  },
  upper: function() {
    let that = this
    var page = that.data.page + 1
    that.setData({
      page: page
    })
    that.findData()
  },
  filtrate: function() {
    let that = this
    that.setData({
      message: [],
      page: 1,
      pageTrue: true
    })
    that.findData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.getTime()

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
    this.filtrate()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
})