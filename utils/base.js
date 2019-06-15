/**
 * Created by jimmy-jiang on 2016/11/21.
 */
import {
  Config
} from 'config.js';

class Base {
  constructor() {
    "use strict";
    this.baseRestUrl = Config.restUrl;
  }
  request(params, noRefetch) {
    var that = this,
      url = this.baseRestUrl + params.url,
      pheader = {};
    if (!params.type) {
      params.type = 'POST';
    }
    /*不需要再次组装地址*/
    if (params.setUpUrl == false) {
      url = params.url;
    }

    var token = {
      'token': wx.getStorageSync('cwxcx_token'),
    };
    if (!params.header) {
      pheader = {
        'content-type': 'application/x-www-form-urlencoded',
      }
    } else {
      pheader = params.header;
    }
    // var header = Object.assign(token, pheader);
    var param=Object.assign(token,params.data)
    
    // console.log(header)
    wx.request({
      url: url,
      data: param,
      method: params.type,
      header: pheader,
      success: function (res) {
        if(res.data.code == -1){
          wx.setStorageSync('cwxcx_token', '')
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }else{
        if (res.statusCode == 20010) {
          wx.switchTab({
            url: '/pages/index/index',
            success: function (res) {
              wx.setStorageSync('login', false)
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else if (res.statusCode !== 200 || typeof res.data !== 'object') {
          wx.showModal({
            title: '',
            content: '网络请求出错',
            showCancel: false
          })
          return false;
        }
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        } else {
          if (code == '401') {
            if (!noRefetch) {
              that._refetch(params);
            }
          }
          that._processError(res);
          params.eCallback && params.eCallback(res.data);
        }

      }},
      fail: function (err) {
        that._processError(err);
      }
    });
  }

  _processError(err) {
    console.log(err,'12312313');
  }

  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(param, true);
    });
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

};

export {
  Base
};