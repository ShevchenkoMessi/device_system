// pages/insertClass/insertClass.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  formSubmit:function(e){
    var className = e.detail.value.className;
    var that = this;
    wx.request({
      url: 'http://'+util.localhost+'/wechat.sign/insertClass',
        data: {
          className:className
        },
        header: {
        'Content-Type': 'application/json'
        },
        success:function(res){
          if(res.data==(className+"已存在")){
            wx.showModal({
              title:className+"已存在"
            })
          }else{
            wx.showModal({
              title:"添加成功",
              success:function(e){
                wx.reLaunch({
                  url: '../home/home',
                })
                console.log("app.ifLogin:"+app.ifLogin);
              }
            })
          }
        },
        fail:function(e){
          console.log("请求失败")
        }
    })
  }
})