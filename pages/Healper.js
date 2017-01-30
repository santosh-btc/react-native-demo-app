import React,{Component} from 'react';


exports.dateFormat = function(date) {
    dt =new Date(date);
    return dt.toDateString();
};

exports.changeStatusColor = function(status){
  if(status=='approved')
    return '#4CAF50';
  else if(status=='pending')
    return '#fdd835';
  else if(status=='rejected')
    return '#D32F2F';
}

exports.validate = function(reason,users){
  if(reason.length >1 && users.length >0)
    return false
  else
    return true
}