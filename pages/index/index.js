// pages/index/index.js
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
    goodsType:[["课程","教程","商品"]],
    goodsTypeIndex:0,
    temp: [],
    isShow_goodsType:false,
    isShow_goods: false,
    isShow_campusName:false,
    picker_01_data: [],

    nickName: "",
    avatarUrl: "",
    qkong: false,
    campusNameListIndex: 0,
    selectType: true,
    goodsListIndex: 0,
    goodsList: [
      []
    ],
    //课程隐藏数量
    num_: 0,
    //销售金额
    sellPrice: 0,
    //商品数量
    num: 0,
    //预收
    prePrice: 0,
    //微信
    weichatPay: 0,
    //口碑
    aliPay: 0,
    //现金
    cashPay: 0,
    //微店
    weidianPay: 0,
    //押金抵扣
    pledgeDeduction: 0,
    //校区合作
    campusPay: '',
    //备注
    comment: '',
    userName: '',
    mobile: '',
    pnumber: 1,
    Gender: 'female',
    casIndex: 0,
    casIndexx: 0,
    hiddenName: false,
    isDelivery: '已交付',
    deliverys: false,
    inputValue: null,
    weichatPay: 0,
    aliPay: 0,
    cashPay: 0,
    weidianPay: 0,
    pledgeDeduction: 0,
    campusPay: 0,
    jiaofeiren: '',
    items: [{
        value: '新',
      },
      {
        value: '老',

      },
      {
        value: 'U转吉',

      },
      {
        value: '吉转吉',
      },
      {
        value: '无',
      }
    ]
  },
  showPicker_campusName: function () {
    this.setData({
      isShow_campusName: true
    })
  },
  //选择校区
  // bindCasPickerChange: function (e) {
  //   this.setData({
  //     campusNameListIndex: e.detail.value
  //   })
  // },
  sureCallBack_campusName(e) {
    let that = this
    that.setData({
      isShow_campusName: false,
      campusNameListIndex: e.detail.choosedIndexArr[0]
    })
  },
  cancleCallBack_campusName() {
    let that=this
    that.data.isShow_campusName=false,
    that.setData({
      isShow_campusName: false,
    })
  },

  showPicker_goodsList: function() {
    let that=this
    that.data.isShow_goods= true
    that.setData({
      isShow_goods: true
    })
  },
  sureCallBack_goods(e) {
    let that = this
    if (that.data.objectGoodsList[e.detail.choosedIndexArr[0]].goods_tags == '商品') {
      that.setData({
        selectType: true,
        num_: 0
      })
    } else {
      that.setData({
        selectType: false,
        isDelivery: '已交付',
        num_: 1,
        num: 0
      })
    }
    that.setData({
      isShow_goods: false,
      goodsListIndex: e.detail.choosedIndexArr[0]
    })
    that.sellPrice()
  },
  cancleCallBack_goods() {
    this.setData({
      isShow_goods: false,
    })
  },
  showPicker_goodsTypeList: function () {
    this.setData({
      isShow_goodsType: true
    })
  },
  sureCallBack_goodsType(e) {
    let that = this
    // if (that.data.goodsType[0][e.detail.choosedIndexArr[0]] == '商品') {
    //   that.setData({
    //     selectType: true,
    //     num_: 0,
    //     goodsListIndex:0
    //   })
    // } else {
    //   that.setData({
    //     selectType: false,
    //     isDelivery: '已交付',
    //     num_: 1,
    //     num: 0,
    //     goodsListIndex: 0
    //   })
    // }
    that.setData({
      goodsListIndex: 0
    })
    that.data.goodsTypeIndex=e.detail.choosedIndexArr[0]
    that.setData({
      isShow_goodsType: false,
      goodsTypeIndex: e.detail.choosedIndexArr[0]
    })
    that.getGoodList()
  },
  cancleCallBack_goodsType() {
    this.setData({
      isShow_goodsType: false,
    })
  },

  //填写缴费人
  inputStudentName: function(e) {
    let that = this
    that.setData({
      studentName: e.detail.value
    })
  },

  //选择学生状态
  radioChange: function(e) {
    let that = this
    this.setData({
      studentStatus: e.detail.value,
    })
  },


  //选择商品
  bindPickerChangeGoodsList: function(e) {
    let that = this
    if (that.data.objectGoodsList[e.detail.value].goods_tags == '商品') {
      that.setData({
        selectType: true,
        num_: 0
      })
    } else {
      that.setData({
        selectType: false,
        isDelivery: '已交付',
        num_: 1,
        num: 0
      })
    }
    this.setData({
      goodsListIndex: e.detail.value
    })
    that.sellPrice()
  },
  //销售金额计算
  sellPrice: function() {
    let that = this
    var sellPrice = that.data.objectGoodsList[that.data.goodsListIndex]['goods_price'] * that.data.num + that.data.objectGoodsList[that.data.goodsListIndex]['goods_price'] * that.data.num_
    that.setData({
      sellPrice: sellPrice,
    })
  },
  /**
   * 交付 
   */
  delivery: function(e) {
    var that = this;
    var b = this.data.isDelivery == "已交付" ? "未交付" : "已交付";
    if (b) {
      that.setData({
        isDelivery: b,
        'inputValue': '',
        weichatPay: 0,
        aliPay: 0,
        cashPay: 0,
        weidianPay: 0,
        pledgeDeduction: 0,
        campusPay: 0,
        prePrice: 0
      })
    } else {
      that.setData({
        isDelivery: b,
        'inputValue': '',
      })
    }
  },
  deliveryChange: function() {

  },
  /**
   * 数量 input 数量 监听
   */
  numberInput: function(event) {
    let that = this;
    var inputSearch = event.detail.value;
    if (inputSearch.length > 0) {
      that.setData({
        deliverys: true,
        num: event.detail.value,
        prePrice: 0
      })
    } else {
      that.setData({
        deliverys: false,
        num: event.detail.value
      })
    }
    that.sellPrice()
  },
  /**
   * 预收金额
   */
  prePriceInput: function() {
    let that = this
    if (that.data.num < 1) {
      let prePrice = 0
      prePrice = parseFloat(that.data.weichatPay) + parseFloat(that.data.aliPay) + parseFloat(that.data.cashPay) + parseFloat(that.data.weidianPay) + parseFloat(that.data.pledgeDeduction) + parseFloat(that.data.campusPay)
      that.setData({
        prePrice: prePrice
      })

    }
  },
  /**
   * 微信支付
   */
  weichatPayInput: function(e) {
    let that = this
    that.setData({
      weichatPay: that.checkInputText(e.detail.value)
    })
    that.prePriceInput()
  },
  /**
   * 支付宝支付 口碑支付
   */
  aliPayInput: function(e) {
    let that = this
    that.setData({
      aliPay: that.checkInputText(e.detail.value)
    })
    that.prePriceInput()
  },
  /**
   * 现金支付
   */
  cashPayInput: function(e) {
    let that = this
    that.setData({
      cashPay: that.checkInputText(e.detail.value)
    })
    that.prePriceInput()
  },
  /**
   * 微店支付
   */
  weidianPayInput: function(e) {
    let that = this
    that.setData({
      weidianPay: that.checkInputText(e.detail.value)
    })
    that.prePriceInput()
  },
  /**
   * 押金抵扣
   */
  pledgeDeductionInput: function(e) {
    let that = this
    that.setData({
      pledgeDeduction: that.checkInputText(e.detail.value)
    })
    that.prePriceInput()
  },
  /**
   * 合作校前台支付
   */
  campusPayInput: function(e) {
    let that = this
    that.setData({
      campusPay: that.checkInputText(e.detail.value)
    })
    that.prePriceInput()
  },
  /**
   * 备注
   */
  commentInput: function(e) {
    let that = this
    that.setData({
      comment: e.detail.value
    })
  },
  time: function() {
    let that = this
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();

    that.setData({
      Y: Y,
      M: M,
      D: D,
    })
  },

  //获取商品列表
  getGoodList: function() {
    let that = this
    var param = {goods_type:that.data.goodsType[0][that.data.goodsTypeIndex]}
    home.getGoodList(param, (res) => {
      that.setData({
        objectGoodsList: res.data
      })
      var glist = [[]]; 
      res.data.forEach((res) => {
        let that = this
        //var a = that.data.goodsList
        glist[0].push(res.goods_name)
 
        if (that.data.objectGoodsList[that.data.goodsListIndex].goods_tags == '商品') {
          that.setData({
            selectType: true
          })
        } else {
          that.setData({
            selectType: false
          })
        }
      })
      that.setData({ goodsList:glist})
      that.sellPrice()
    })
  },
  //提交
  submit: function() {
    let that = this
    if (that.data.studentName) {
      if (that.data.studentStatus) {
        if (that.data.num || that.data.isDelivery || that.data.objectGoodsList[that.data.goodsListIndex].goods_tags == '课程') {
          if (that.data.prePrice || (that.data.weichatPay || that.data.aliPay || that.data.cashPay || that.data.weidianPay || that.data.pledgeDeduction || that.data.campusPay)) {
            
            var total = parseFloat(that.data.weichatPay) + parseFloat(that.data.aliPay) + parseFloat(that.data.cashPay) + parseFloat(that.data.weidianPay) + parseFloat(that.data.pledgeDeduction) + parseFloat(that.data.campusPay);
            if (that.data.sellPrice == total || that.data.isDelivery == "未交付") {

              var isDelivery = that.data.isDelivery;
              var prePrice = that.data.prePrice;
              if (that.data.objectGoodsList[that.data.goodsListIndex].goods_type == '课程') {
                isDelivery = '已交付'
                prePrice = 0
              }
              var param = {
                //最终缔结人ID
                user_id: that.data.user_id,
                //最终缔结人姓名
                user_name: that.data.user_name,
                //校区
                campusName: that.data.campusNameList[0][that.data.campusNameListIndex],
                //缴费人
                studentName: that.data.studentName,
                //学生状态
                studentStatus: that.data.studentStatus,
                //商品
                goods: that.data.goodsList[0][that.data.goodsListIndex],
                //销售金额
                sellPrice: that.data.sellPrice,
                //数量
                num: that.data.num,
                //交付 未交付
                isDelivery: isDelivery,
                //预收
                prePrice: prePrice,
                //微信
                weichatPay: that.data.weichatPay,
                //口碑
                aliPay: that.data.aliPay,
                //现金
                cashPay: that.data.cashPay,
                //微店
                weidianPay: that.data.weidianPay,
                //押金抵扣
                pledgeDeduction: that.data.pledgeDeduction,
                //校区合作
                campusPay: that.data.campusPay,
                //备注
                comment: that.data.comment,
              }
              home.submit(param, (res) => {
                let that = this
                if (res.code == 1) {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 1000,
                    mask: true,
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {
                      that.setData({
                        //最终缔结人ID
                        user_id: '',
                        //最终缔结人姓名
                        user_name: '',
                        //校区
                        campusName: that.data.campusNameList[that.data.campusNameListIndex],
                        campusNameListIndex: 0,
                        //缴费人
                        studentName: '',
                        //学生状态
                        studentStatus: '',
                        //商品
                        goods: that.data.goodsList[0][that.data.goodsListIndex],
                        goodsListIndex: 0,
                        //销售金额
                        sellPrice: 0,
                        //数量
                        num: 0,
                        //交付 未交付
                        isDelivery: '已交付',
                        //预收
                        prePrice: 0,
                        //微信
                        weichatPay: 0,
                        //口碑
                        aliPay: 0,
                        //现金
                        cashPay: 0,
                        //微店
                        weidianPay: 0,
                        //押金抵扣
                        pledgeDeduction: 0,
                        //校区合作
                        campusPay: 0,
                        //备注
                        comment:'',
                        qkong: true,
                        jiaofeiren: '',
                        deliverys: false
                      })
                      that.onShow()
                    },
                  })

                } else if (res.code == 0) {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 1000,
                    mask: true,
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {},
                  })
                }
              })
            } else if (that.data.sellPrice < total) {
              wx.showToast({
                title: '支付金额大于销售金额',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: true,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            } else if (that.data.sellPrice > total) {
              wx.showToast({
                title: '支付金额小于销售金额',
                icon: 'none',
                image: '',
                duration: 1000,
                mask: true,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            }
          } else {
            wx.showToast({
              title: '请填写支付金额',
              icon: 'none',
              image: '',
              duration: 1000,
              mask: true,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
        } else {
          wx.showToast({
            title: '请填写商品数量',
            icon: 'none',
            image: '',
            duration: 1000,
            mask: true
          })
        }
      } else {
        wx.showToast({
          title: '请选择学生状态',
          icon: 'none',
          image: '',
          duration: 1000,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    } else {
      wx.showToast({
        title: '请填写缴费人姓名',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  //获取校区列表
  campus: function() {
    var that = this
    var params = {}
    home.campus(params, (res) => {
     var list=[[]]
     list[0]=res.data
      that.setData({
        campusNameList: list
      })
    })
  },
  onLoad: function() {

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
    let that = this
    that.time()
    that.prePriceInput()
    that.campus()
    var user_name = wx.getStorage({
      key: 'user_name',
      success: function(res) {
        that.setData({
          user_name: res.data
        })
      },
    })
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      },
    })
    that.setData({
      objectGoodsList: [],
      goodsList: [
        []
      ]
    })
    home.getTime({}, (res) => {
      that.setData({
        goodsType: res.data.cates,
      })
      that.getGoodList();
    })
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


  //检查输入文本，限制只能为数字并且数字最多带2位小数
  checkInputText: function (text) {
    var reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g; 
    if (reg.test(text)) { //正则匹配通过，提取有效文本
      text = text.replace(reg, '$2$3$4');
    } else { //正则匹配不通过，直接清空
      text = '';
    } 
    if (text.substr(0,2) == '00') {
      text = text.substr(1, text.length);
    }
    if (text.substr(0, 1) == '0' && text.substr(1, 1) != '0' && text.substr(1, 1) != '.' && text.length>=2){
      text = text.substr(1, text.length);
    } 
    return text; //返回符合要求的文本（为数字且最多有带2位小数）
  }

})