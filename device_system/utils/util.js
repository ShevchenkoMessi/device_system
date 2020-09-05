function borrow_time(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return year+'/'+month+"/"+day
}
function repay_time(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 4
  var day = date.getDate()
  if(month>12){
    year = year+1;
    month = month-12;
  }
  if((year%4==0)&&(year%100!=0)){
    if(month==2){
      if(day>29){
        day = day-29;
        month = month+1;
      }
    }else if(month==4 || month==6 || month==9 || month==11){
      if(day>30){
        day = day-30;
        month = month+1;
      }
    }
  }else{
    if(month==2){
      if(day>28){
        day = day-28;
        month = month+1;
      }
    }else if(month==4 || month==6 || month==9 || month==11){
      if(day>30){
        day = day-30;
        month = month+1;
      }
    }
  }
  return year+'/'+month+"/"+day
}

var localhost = "localhost:5210"
 
module.exports = {
  borrow_time: borrow_time,
  repay_time:repay_time,
  localhost:localhost
}


