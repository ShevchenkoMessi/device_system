// pages/home/home.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes:[],
    devices:null,
    plain:true,
    deviceClass:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://'+util.localhost+'/wechat.sign/getClasses',
      header: {
      'Content-Type': 'application/json'
      },
      success:function(res){
        that.setData({
          classes:res.data,
          identity:app.ifLogin && !app.ifStudent
        })
      },
      fail:function(e){
        console.log("请求失败");
      }
    })
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
    wx.startPullDownRefresh()    
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
  go_mine:function(e){
    wx.navigateTo({
      url: '../mine/mine?device='+JSON.stringify(e.currentTarget.dataset.device),
    })
  },
  getDevice:function(e){
    var that = this;
    wx.request({
      url: 'http://'+util.localhost+'/wechat.sign/getDevices',
        data: {
          classId:e.currentTarget.dataset.value.classId
        },
        header: {
        'Content-Type': 'application/json'
        },
        success:function(res){
          that.setData({
            devices:res.data,
            deviceClass:e.currentTarget.dataset.value
          })
        },
        fail:function(e){
          console.log("请求失败")
        }
    })
  },
  insertClass:function(e){
   wx.navigateTo({
     url: '../insertClass/insertClass',
   })
  },
  insertDevice:function(e){
    var that = this;
    wx.navigateTo({
      url: '../insertDevice/insertDevice?deviceClass='+JSON.stringify(that.data.deviceClass),
    })
  },
  deleteDevice:function(e){
    var that = this;delete
    wx.showModal({
      title:"确认删除?",
      success:function(e){
        if(e.confirm){
          wx.request({
            url: 'http://'+util.localhost+'/wechat.sign/deleteClass',
              data: {
                classId:that.data.deviceClass.classId
              },
              header: {
              'Content-Type': 'application/json'
              },
              success:function(res){
                wx.showToast({
                  title:"删除成功",
                  success:function(e){
                    wx.reLaunch({
                      url: '../home/home',
                    })
                  }
                })
              },
              fail:function(e){
                console.log("请求失败")
              }
          })
        }
      }
    })
  }
})