import {
  Base
} from 'base.js';
class Home extends Base {
  constructor() {
    super();
  }
  login(params, callback) {
    var param = {
      url: '/api/api/login',
      data: params,
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  /**
   * 获取时间
   */
  getTime(params,callback){
    var param={
      url:'/api/api/gettime',
      data: params,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /**
   * 交付
   */
  delivery(params, callback) {
    var param = {
      url: '/api/api/chageDeliveryStatus',
      data: params,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  /**
   * 关于音乐钥匙
   */
  weInfo(params,callback){
    var param = {
      url: '/api/api/article',
      data: params,
      type: 'GET',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
    /**
   * 商品列表
   */
  getGoodList(params, callback) {
    var param = {
      url: '/api/api/goods',
      data: params,
      type: 'GET',
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  /**
   * 数据查找
   */
  findData(params,callback){
    var param={
      url:'/api/api/keywords',
      data:params,
      type:'GET',
      sCallback:function(data){
        callback&&callback(data);
      }
    }
    this.request(param);
  }
  /**
 * 数据查找
 */
  findData_(params, callback) {
    var param = {
      url: '/api/api/isPay',
      data: params,
      type: 'GET',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  }
  /**
   * 校区列表
   */
  campus(params,callback){
    var param = {
      url: '/api/api/campus',
      data: params,
      type: 'GET',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
      this.request(param)
  }

  submit(params, callback) {
    var param = {
      url: '/api/api/info',
      data: params,
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  getCampus(params,callback){
    var param={
      url:'/api/collect/getCampus',
      data:params,
      sCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request(param);
  }
}
export {
  Home
};