//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  
},
//教师信息
  teacherInfo: {},
  //设备种类信息
  classInfo:{},
  //设备信息
  deviceInfo:{},
  stuInfo:{},
  workerInfo:{},
  userInfo:{},
  ifLogin:false,
  ifWorker:false,
  ifStudent:false,
  ifTeacher:false
  
})