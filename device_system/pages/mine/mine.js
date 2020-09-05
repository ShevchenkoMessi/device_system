// pages/home/home.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options!=null){
      var device = JSON.parse(options.device);
      var ifBorrow;
      if(device.userNo=="未借出"){
        ifBorrow = false;
      }else{
        ifBorrow = true;
      }
      this.setData({
        device:device,
        identity:app.ifLogin && !app.ifStudent,
        ifBorrow:ifBorrow
      })
    }
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
  borrow:function(e){
    var that = this;
    if(app.ifLogin){
      var deviceNo = that.data.device.deviceNo;
      var borrow_time = util.borrow_time(new Date());
      var repay_time = util.repay_time(new Date());
      var userNo;
      if(app.ifWorker){
        userNo = app.workerInfo.workerNo;
      }else if(app.ifTeacher){
        userNo = app.teacherInfo.teacherNo;
      }else if(app.ifStudent){
        userNo = app.stuInfo.stuNo;
      }
      wx.request({
        url: 'http://'+util.localhost+'/wechat.sign/borrow',
        data: {
          deviceNo:deviceNo,
          userNo:userNo,
          jDate:borrow_time,
          hDate:repay_time
        },
        header: {
        'Content-Type': 'application/json'
        },
        success:function(res){
          var res = res;
          wx.showModal({
            title:"租借成功",
            success:function(e){
              that.setData({device:res.data});
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
    }else{
      wx.showModal({
        title:"请先登录"
      })
    }

  },
  repay:function(e){
    var that = this;
    if(app.ifLogin){
      var deviceNo = that.data.device.deviceNo;
      var userNo;
      if(app.ifWorker){
        userNo = app.workerInfo.workerNo;
      }else if(app.ifTeacher){
        userNo = app.teacherInfo.teacherNo;
      }else if(app.ifStudent){
        userNo = app.stuInfo.stuNo;
      }
      wx.request({
        url: 'http://'+util.localhost+'/wechat.sign/repay',
        data: {
          deviceNo:deviceNo,
          userNo:userNo,
        },
        header: {
        'Content-Type': 'application/json'
        },
        success:function(res){
          var res = res;
          if(res.data=="您没有借过此设备哦"){
            wx.showModal({
              title:"您没有借过此设备哦"
            })
          }else{
            wx.showModal({
              title:"归还成功",
              success:function(e){
                that.setData({device:res.data});
                wx.reLaunch({
                  url: '../home/home',
                })
              }
            })
          }
        },
        fail:function(e){
          console.log("请求失败")
        }
      })
    }else{
      wx.showModal({
        title:"请先登录"
      })
    }
  },
  deleteDevice:function(e){
    var that = this;
    if(this.data.ifBorrow){
      wx.showModal({
        title:"操作失败",
        content:"设备已借出，请先归还再删除"
      })
    }else{
      wx.showModal({
        title:"你确定要删除吗？",
        success:function(e){
          if(e.confirm){
            wx.request({
              url: 'http://'+util.localhost+'/wechat.sign/deleteDevice',
              data: {
                deviceNo:that.data.device.deviceNo,
              },
              header: {
              'Content-Type': 'application/json'
              },
              success:function(res){
                wx.showToast({
                  title: '删除成功',
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
  }
 
})