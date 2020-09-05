var app = getApp();

function logout(){
  app.ifLogin = false;
  app.ifStudent = false;
  app.ifTeacher = false;
  app.ifWorker = false;
  app.stuInfo = {};
  app.teacherInfo = {};
  app.workerInfo = {};
  app.userInfo = {}
}

module.exports.logout = logout