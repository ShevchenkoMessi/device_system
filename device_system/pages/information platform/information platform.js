// pages/information platform/information platform.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[],
    devices:[],
    user:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var users = {};
    wx.request({
      url: 'http://'+util.localhost+'/wechat.sign/getUsers',
        data: {},
        header: {
        'Content-Type': 'application/json'
        },
        success:function(res){
          users.student = JSON.parse(res.data.students);
          users.teacher = JSON.parse(res.data.teachers);
          users.worker = JSON.parse(res.data.workers);
          that.setData({
            users:users,
            identity:app.ifLogin && app.ifWorker
          })
        },
        fail:function(e){
          console.log("请求失败")
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
  getDevice:function(e){
    var that = this;
    var user = e.currentTarget.dataset.userno;
    var userNo;
    this.setData({user:user});
    if(user.userId=="学生"){
      userNo = user.stuNo;
    }else if(user.userId=="老师"){
      userNo = user.teacherNo;
    }else if(user.userId=="管理员"){
      userNo = user.workerNo;
    }
    wx.request({
      url: 'http://'+util.localhost+'/wechat.sign/getDevicesByNo',
        data: {
          userNo:userNo
        },
        header: {
        'Content-Type': 'application/json'
        },
        success:function(res){
          that.setData({devices:res.data})
        },
        fail:function(e){
          console.log("请求失败")
        }
    })
  },
  insertUser:function(e){
    wx.navigateTo({
      url: '../insertUser/insertUser',
    })
  },
  changeIdentify:function(e){
    var that = this;
    var user = this.data.user;
    var userNo;
    var userName;
    var userTel;
    var userEmail;
    var userPasswd;
    var userId;
    if(user.userId=="学生"){
      userNo = user.stuNo;
      userName = user.stuName;
      userTel = user.stuPhone;
      userEmail = user.stuEmail;
      userPasswd = user.stuPasswd;
      userId = "学生";
    }else if(user.userId=="老师"){
      userNo = user.teacherNo;
      userName = user.teacherName;
      userTel = user.teacherPhone;
      userEmail = user.teacherEmail;
      userPasswd = user.teacherPasswd;
      userId = "老师";
    }
    wx.request({
      url: 'http://'+util.localhost+'/wechat.sign/changeIdentify',
        data: {
          userNo:userNo,
          userName:userName,
          userTel:userTel,
          userEmail:userEmail,
          userPasswd:userPasswd,
          userId:userId
        },
        header: {
        'Content-Type': 'application/json'
        },
        success:function(res){
          wx.showToast({
            title: '操作成功',
            success:function(){
              wx.reLaunch({
                url: '../information platform/information platform',
              })
            }
          })
        },
        fail:function(e){
          console.log("请求失败")
        }
    })
  },
  deleteUser:function(){
    var that = this;
    if(this.data.user.userId=="老师"){
      wx.showModal({
        title:"请先移除管理员身份"
      })
    }else if(this.data.user.userId=="学生"){
      wx.showModal({
        title:"确认移除?",
        success:function(e){
          if(e.confirm){
            wx.request({
              url: 'http://'+util.localhost+'/wechat.sign/deleteStu',
                data: {
                  userNo:that.data.user.stuNo
                },
                header: {
                'Content-Type': 'application/json'
                },
                success:function(res){
                  wx.showToast({
                    title: '移除成功',
                    success:function(){
                      wx.reLaunch({
                        url: '../information platform/information platform',
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