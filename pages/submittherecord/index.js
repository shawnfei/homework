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
    isDelivery: '未交付'
  },

  /**
   * 日期计算
   */
  countDate: function(date, date_) {
    var date = date.split("-");
    var nDate = new Date(date[1] + '-' + date[2] + '-' + date[0]); //转换为MM-DD-YYYY格式  
    var date_ = date_.split("-");
    var nDate_ = new Date(date_[1] + '-' + date_[2] + '-' + date_[0]); //转换为MM-DD-YYYY格式  

    if (Math.abs(nDate) >= Math.abs(nDate_) && (Math.abs(nDate) - Math.abs(nDate_)) > (31 * 24 * 60 * 60 * 1000)) {
      return false
    } else {
      return true
    }

  },


  nowTime: function() {
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
          currentTab: 0
        })
      that.filtrate()
    })

  },

 
  ysjilu: function() {
    let that = this
    that.data.isDelivery = '未交付'
    that.setData({
      currentTab: 0,
      isDelivery: '未交付'
    })
    that.filtrate()
  },
  xsjilu: function() {
    let that = this
    that.data.isDelivery = "已交付"

    that.setData({
      currentTab: 1,
      isDelivery: '已交付'
    })
    that.filtrate()
  },

  /**
   * 选择开始时间
   */
  changeTimeStart: function(e) {
    let that = this
    that.setData({
      pickerTimeStart1: e.detail.value
    })
    console.log(e.detail.value)
    // that.timeDispose()
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
   * 选择结束时间
   */
  changeTimeEnd: function(e) {
    let that = this
    that.setData({
      pickerTimeStart2: e.detail.value
    })
    console.log(e)
    // that.timeDispose()
  },
  /**
   * 数据查找
   */
  findData_: function(e) {
    let that = this
    var param = {
      //如果开始时间结束时间为空 就默认上月所有数据 
      //页
      page: that.data.page,
      //条数
      pageSize: 13,
      //筛选
      keywords: that.data.keywords,
      //开始时间
      startTime: that.data.pickerTimeStart1,
      //结束时间
      endTime: that.data.pickerTimeStart2,
      //交付未交付
      isDelivery: that.data.isDelivery,
      //用户ID
      admin_id: wx.getStorageSync('user_id')
    }
    if (that.data.pageTrue) {
      wx.showLoading({
        title: '正在加载',
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      home.findData_(param, (res) => {
        var total = res.data[2].arr_length
        var moneyTotal = res.data[1].is_pay_total_price
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

        if (message.length > 12) {
          var findLen = 12
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
      home.findData_(param, (res) => {
        var moneyTotal = res.data[1].total_prce
        var message = res.data[0]
        if (message.length > 12) {
          var findLen = 12
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
    that.findData_()
  },
  filtrate: function() {
    let that = this
    that.setData({
      message: [],
      page: 1,
      pageTrue: true
    })
    that.findData_()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.nowTime();
    
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
    this.filtrate();
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