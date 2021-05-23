let tool = {};
// 是否手机号码或者固话
tool.validatePhoneTwo = function (value) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
   return reg.test(value);
}
//验证邮箱
tool.validateEMail = function (value) {

  const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  return reg.test(value);
}
//密码
tool.validatePsdReg = function (value) {
  const reg =/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/;
  return reg.test(value);
}

//设置cookie
tool.setCookie = function (key, value) {
  var oDate=new Date();
    oDate.setDate(oDate.getDate()+1);
    document.cookie=key+"="+value+"; expires="+oDate.toDateString();
}

//读取cookie
tool.getCookie = function (param) {
  var c_param = '';
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('='); //再次切割
      //判断查找相对应的值
      if (arr2[0] == param) {
        c_param = arr2[1];
        //保存到保存数据的地方
      }
    }
    return c_param;
  }
}
tool.getUrlParam = function(urlStr) {
       if (typeof urlStr == "undefined") {
           var url = decodeURI(location.search); //获取url中"?"符后的字符串
      } else {
          var url = "?" + urlStr.split("?")[1];
      }
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
          var str = url.substr(1);
         var strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
              theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
          }
      }
      return theRequest;
 }
export default tool;