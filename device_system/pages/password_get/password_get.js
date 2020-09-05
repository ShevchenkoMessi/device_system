// pages/information platform/information platform.js
const app = getApp();
var logout = require('../../utils/logout.js')
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
    var path;
    var userNo;
    var userPasswd;
    //先比较两次新密码是否一致
    if(e.detail.value.new_passwd!=e.detail.value.confirm_passwd){
      wx.showModal({
        title:"提示",
        content:"两次输入的密码不一致"
      })
    }else{//新密码一致
      if(app.ifStudent){//是否是学生
        if(e.detail.value.old_passwd!=app.stuInfo.stuPasswd){//旧密码是否输入正确
          wx.showModal({
            title:"请输入正确密码"
          })
        }else{
          path =  'http://'+util.localhost+'/wechat.sign/updateStuPasswd';
          userNo = app.stuInfo.stuNo;
          userPasswd = e.detail.value.new_passwd;
        }
      }else if(app.ifTeacher){//是否教师
        if(e.detail.value.old_passwd!=app.teacherInfo.teacherPasswd){//旧密码是否输入正确
          wx.showModal({
            title:"请输入正确密码"
          })
        }else{
          path = 'http://'+util.localhost+'/wechat.sign/updateTeacherPasswd';
          userNo = app.teacherInfo.teacherNo;
          userPasswd = e.detail.value.new_passwd; 
        }
      }else if(app.ifWorker){//是否管理员
        console.log("进来了吗")
        if(e.detail.value.old_passwd!=app.workerInfo.workerPasswd){//旧密码是否输入正确
          wx.showModal({
            title:"请输入正确密码"
          })
        }else{
          path = 'http://'+util.localhost+'/wechat.sign/updateWorkerPasswd';
          userNo = app.workerInfo.workerNo;
          userPasswd = e.detail.value.new_passwd;
        }
      }
      wx.request({
        url: path,
        data: {
          userNo:userNo,
          userPasswd:userPasswd
        },
        header: {
        'Content-Type': 'application/json'
        },
        success:function(res){
          console.log(res.data);
          wx.showModal({
            title:"修改成功",
            success:function(e){
              logout.logout()
              wx.reLaunch({
                url: '../login/login',
              })
            }
          })
        },
        fail:function(e){
          console.log("请求失败");
        }
      })
    }
  }
})