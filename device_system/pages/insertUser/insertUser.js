// pages/insertUser/insertUser.js
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
    var that = this;
    wx.request({
      url: 'http://'+util.localhost+'/wechat.sign/insertUser',
        data: {
          userNo:e.detail.value.userNo,
          userName:e.detail.value.userName,
          userTel:e.detail.value.userTel,
          userEmail:e.detail.value.userEmail,
          userPasswd:e.detail.value.userPasswd
        },
        header: {
        'Content-Type': 'application/json'
        },
        success:function(res){
          if(res.data=="此学号已经注册"){
            wx.showModal({
              title:"此学号已经注册"
            })
          }else{
            wx.showModal({
              title:"注册成功",
              success:function(e){
                wx.reLaunch({
                  url: '../information platform/information platform',
                })
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