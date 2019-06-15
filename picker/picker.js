// picker/picker.js
import { isString,isPlainObject } from './tool';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollType:{
      type: String,
      value: "normal"//"link": scroll间联动  "normal": scroll相互独立
    },
    
    listData: {
      type: Array,
      value: [],
      observer: function(newVal) {
        if (newVal.length === 0 || this._compareDate()) return;
        this._setTempData();
        let tempArr = [...new Array(newVal.length).keys()].map(() => 0)
        // console.log(tempArr,'测试~')
        this.data.lastValue = this.data.tempValue =tempArr;
        console.log(this.data.tempValue,'测试2')
        this._setDefault()

        // let {defaultPickData} = this.properties;
        // if(newVal.length === 0) return;
        //
        // this._setDefault(newVal, defaultPickData)
      }
    },
    defaultPickData:{
      type: Array,
      value: [],
      observer: function (newVal) {
        if (newVal.length === 0 || this._compareDate()) return;
        this._setTempData();
        this._setDefault()
      }
    },
    keyWordsOfShow:{
      type: String,
      value: "name"
    },
    isShowPicker:{
      type: Boolean,
      value: false,
      observer: function(newVal) {
        if (newVal) {
          this.setData({
            donghua:true
          })
          this._openPicker()
        }else{
 
          this._closePicker()

        }
      }
    },
    titleText: {//标题文案
      type: String,
      value: "标题"
    },
    cancelText:{//取消按钮文案
      type: String,
      value: "取消"
    },
    sureText:{//确定按钮文案
      type: String,
      value: "确定"
    },
    pickerHeaderStyle: String,//标题栏样式 view
    sureStyle: String, //标题栏确定样式  text
    cancelStyle: String,//标题栏取消样式 text
    titleStyle: String,//标题栏标题样式  view
    maskStyle: String,//设置蒙层的样式（详见picker-view） view
    indicatorStyle: String,//设置选择器中间选中框的样式（详见picker-view） view
    chooseItemTextStyle: String//设置picker列表文案样式 text
  },

  /**
   * 组件的初始数据
   */
  data: {
    columnsData:[],
    value:[],
    backData:[],
    height:0,
    isOpen: false,
    isUseKeywordOfShow: false,
    scrollEnd : true,//滚动是否结束
    lastValue : [],//上次各个colum的选择索引
    tempValue : [],
    isFirstOpen : true,
    onlyKey : '',
    defaultPickDataTemp: '',
    listDataTemp: '',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapModal () {
      this.properties.isShowPicker = false;
      this._closePicker()
    },
    cancle () {
      this.setData({
        donghua:false
      })
      this.triggerEvent('cancle')
      this._closePicker()
    },
    sure () {
      let that=this
      this.setData({
        donghua: false
      })
      setTimeout(function(){

      let { scrollEnd, tempValue} = that.data;
      console.log(scrollEnd,"滚动")
        
        // if (!that.data.scrollEnd) return;
   
    
      let backData = that._getBackDataFromValue(tempValue);
      that.setData({
        backData
      })
      that.triggerEvent('sure', {
        choosedData:backData,
        choosedIndexArr:tempValue
      })
      that._closePicker()

    },900)
    },
    _bindChange (e) {
      console.log(e)
      let {scrollType} = this.properties;
      let { lastValue } = this.data;
      let val = e.detail.value;
      let backData = [];
      switch (scrollType) {
        case "normal":
          this.data.tempValue = val.concat();
          this.data.tempValue = val.concat();
          break;
        case "link":
           //let column_02 = this._getColumnData(this.properties.listData[val[0]].children);
           //let column_03 = this._getColumnData(this.properties.listData[val[0]].children[val[1]].children);
          let tempArray = [];
          if(val.length>1){
            val.slice(0,val.length-1).reduce((t,c,i) => {
              let v = t[c].children;
              tempArray.push(this._getColumnData(v))
              return v
            },this.properties.listData)
          }
          //let columnsData = [this.data.columnsData[0],column_02,column_03];
          let columnsData = [this.data.columnsData[0], ...tempArray];

          //设置value关联
          let compareIndex = this._getScrollCompareIndex(lastValue, val);
          if(compareIndex > -1){
            let tempI = 1;
            while(val[compareIndex+tempI]!==undefined){
              val[compareIndex+tempI] = 0;
              tempI++;
            }
          }
          val = this._validate(val);
          this.data.lastValue = val.concat();
          this.data.tempValue = val.concat();
          this.setData({
            columnsData,
            // value: val
          })
      }

    },
    _validate (val) {
      let { columnsData } = this.data;
      columnsData.forEach((v, i) => {
        if(columnsData[i].length - 1 < val[i]){
          val[i] = columnsData[i].length - 1;
        }
      })
      this.setData({
        value: val
      })
      return val;
    },
    _bindpickend(){
      console.log("滚动结束")
      this.data.scrollEnd = true;
    },
    _bindpickstart(){
      this.data.scrollEnd = false;
      console.log("滚动开始")
    },
    _openPicker () {

      if(!this.data.isFirstOpen){
        if(this.properties.listData.length !== 0){
          this._setDefault(this._computedBackData(this.data.backData))
        }
      }
      this.data.isFirstOpen = false;
      this.setData({
        isOpen: true
      })

    },
    _closePicker () {
     this.setData({
       isOpen: false
     })
    },
    _getColumnData (arr) {
      return arr.map((v) => this._fomateObj(v))
    },
    _fomateObj (o) {
      let tempO = {};
      for(let k in o){
        k !== "children" && (tempO[k] = o[k]);
      }
      return tempO;
    },
    _getScrollCompareIndex (arr1, arr2)  {
      let tempIndex = -1;
      for(let i = 0, len = arr1.length; i<len; i++){
        if(arr1[i] !== arr2[i]){
          tempIndex = i;
          break;
        }
      }
      return tempIndex;
    },
    //根据id获取索引
    _getIndexByIdOfObject (listData,idArr,key,arr) {
      if(!Array.isArray(listData)) return;
      for(let i = 0,len = listData.length; i<len; i++){
       if(listData[i][key] == idArr[arr.length][key]){
         arr.push(i)
         return this._getIndexByIdOfObject(listData[i].children,idArr,key,arr)
       }
      }

    },
    _setDefault (inBackData) {
      let {listData,defaultPickData,scrollType} = this.properties;
      let { lastValue, tempValue, onlyKey } = this.data;
      if(inBackData){
        defaultPickData = inBackData;
      }
      let backData = [];
      switch (scrollType) {
        case "normal":
          if(isPlainObject(listData[0][0])){
            this.setData({
              isUseKeywordOfShow: true
            })
          }
          if(Array.isArray(defaultPickData) && defaultPickData.length>0){
            backData = listData.map((v, i) => v[defaultPickData[i]]);
            this.data.tempValue = defaultPickData;
            this.data.lastValue = defaultPickData;
          }else{
            backData = listData.map((v) => v[0]);
          }
          this.setData({
            columnsData: listData,
            backData: backData,
            value: defaultPickData
          })
          break;
        case "link":
          // let column_01 = this._getColumnData(newVal);
          // let column_02 = this._getColumnData(newVal[0].children);
          // let column_03 = this._getColumnData(newVal[0].children[0].children);
          // let columnsData = [column_01,column_02,column_03];
          let columnsData = [];
          //如果默认值
          if(Array.isArray(defaultPickData) && defaultPickData.length>0 && defaultPickData.every((v, i) => isPlainObject(v))){
            let key = onlyKey = Object.keys(defaultPickData[0])[0];
            let arr = [];
            this._getIndexByIdOfObject(listData, defaultPickData, key, arr);
            defaultPickData = arr;
            let tempI = 0;
            do{
              lastValue.push(defaultPickData[tempI]);
              columnsData.push(this._getColumnData(listData))
              listData = listData[defaultPickData[tempI]].children;
              tempI++;
            }while (listData)
            backData = columnsData.map((v, i) => v[defaultPickData[i]]);
            //如果没有默认值
          }else{
            this.data.onlyKey = this.properties.keyWordsOfShow||'name';
            do{
              lastValue.push(0);
              columnsData.push(this._getColumnData(listData))
              listData = listData[0].children;
            }while (listData)
            backData = columnsData.map((v) => v[0]);
          }
          this.data.tempValue = defaultPickData;
          this.data.lastValue = defaultPickData;
          this.setData({
            isUseKeywordOfShow: true,
            columnsData,
            backData,
          })
          setTimeout(()=>{
            this.setData({
              value: defaultPickData
            })
          },0)
          break;
      }
    },
    _computedBackData(backData) {
      let {scrollType, listData} = this.properties;
      let { onlyKey } = this.data;
      if(scrollType === 'normal'){
        return backData.map((v, i) => listData[i].findIndex((vv, ii) => this._compareObj(v, vv)))
      }else{
        return backData.map((v, i) => {
          let o = {};
          o[onlyKey] = v[onlyKey]
          return o;
        })
      }
    },
    _compareObj (o1, o2) {
      let {keyWordsOfShow} = this.properties;
      if(typeof o1 !== "object"){
        return o1 === o2
      }else{
        return o1[keyWordsOfShow] === o2[keyWordsOfShow]
      }
    },
    _getBackDataFromValue (val) {
      let tempArr = [];
      if(val.length > 0){
        tempArr = this.data.columnsData.reduce((t, v, i) => {
          return t.concat(v[val[i]])
        }, [])
      }else{
        tempArr = this.data.columnsData.map((v, i) => v[0])
      }
      return tempArr
    },
    _compareDate () { //完全相等返回true
      let {defaultPickDataTemp, listDataTemp} = this.data;
      let {defaultPickData, listData}  = this.properties

      return defaultPickDataTemp === defaultPickData && listDataTemp === listData
    },
    _setTempData () {
      let {defaultPickData, listData}  = this.properties;
      this.data.defaultPickDataTemp = defaultPickData;
      this.data.listDataTemp = listData;
    }
  }

  })
