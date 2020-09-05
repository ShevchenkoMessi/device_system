const app = getApp();
var logout = require('../../utils/logout.js')
var util = require('../../utils/util.js')
Page({
  data: {
    ifLogin:false,
    ifCheck:false,
    personName:"",
  },
  converse:function(e){
    console.log(this.data.ifCheck);
    this.setData({ifCheck:!this.data.ifCheck});
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log("app.ifLogin:"+app.ifLogin+"<=============>"+(!app.ifLogin));
    if(!app.ifLogin){
      this.setData({
        ifLogin:app.ifLogin,
        personName:""
      })
    }else{
      var personName;
      if(app.ifStudent){
        personName = app.stuInfo.stuName;
      }else if(app.ifTeacher){
        personName = app.teacherInfo.teacherName;
      }else if(app.ifWorker){
        personName = app.workerInfo.workerName;
      }
      this.setData({
        ifLogin:app.ifLogin,
        personName:personName,
        userInfo:app.userInfo
      })
    }
  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
  },
  login_out:function(e){
    var that = this;
    wx.showModal({
      title:"退出登录",
      success:function(e){
        if(e.confirm){
          logout.logout();
          that.setData({
            ifLogin:app.ifLogin,
            personName:""
          })
          wx.reLaunch({
            url: '../login/login',
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var path;
    var formData = e.detail.value;
    if(formData.role=="register"){
      path = 'http://'+util.localhost+'/wechat.sign/getWorkerInfo';
	   wx.request({
		  url: path,
		  data: {
			userNo:formData.userNo,
			password:formData.password
		  },
		  header: {
			'Content-Type': 'application/json'
		  },
		  success: function (res) {
        if (res.data == "账号或密码错误") {
          wx.showModal({
            title: '提示',
            content: '账号或密码错误',
          })
        }else{
          wx.getUserInfo({
            success:function(e){
              that.setData({userInfo:e.userInfo});
              app.userInfo = e.userInfo;
            }
          })
          // console.log(res);
          if(res.data.ifWork){
            app.workerInfo=res.data;
            app.ifWorker = res.data.ifWork; 

            that.setData({personName:app.workerInfo.workerName});
          }else{
            app.teacherInfo=res.data;
            app.ifTeacher = !res.data.ifWork;  
            that.setData({
              personName:app.teacherInfo.teacherName
            });          
          }
          app.ifLogin = true;
          that.setData({ifLogin:app.ifLogin});
          wx.reLaunch({
            url: '../login/login',
          })
        }
		  },
		})
   }else{
      path = 'http://'+util.localhost+'/wechat.sign/getStuInfo';
		 wx.request({
		  url: path,
		  data: {
			stuNo: formData.userNo,
			password:formData.password
		  },
		  header: {
			'content-type': 'application/json' // 默认值
		  },
		  success: function (res) {
        if(res.data=="账号或密码错误"){
          wx.showModal({
            title: '提示',
            content: '账号或密码错误',
          })
        }else{
          wx.getUserInfo({
            success:function(e){
              that.setData({userInfo:e.userInfo});
              app.userInfo = e.userInfo;
            }
          })
          app.stuInfo=res.data;
          app.ifStudent = true;
          app.ifLogin = true;
          that.setData({personName:app.stuInfo.stuName});
          that.setData({ifLogin:app.ifLogin});
          wx.reLaunch({
            url: '../login/login',
          })
        }  
		  },
		  fail:function(e){
			console.log(e)
		  },
		})
    }
  },
  getUserInfo:function(e){
    this.setData({
      userInfo:e.detail.userInfo,
    })
  },
  update_passwd:function(e){
    var path;
    wx.navigateTo({
      url: '../password_get/password_get',
    })
  },
})  