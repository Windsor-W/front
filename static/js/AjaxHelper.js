// 联调后台接口类

var AjaxHelper ={
  //正常使用
  ajaxJSON:function(url, type, data, callback,async,contentType) {

    $.ajax({
      url:url,
      type: type,
      data: data,
      success: callback,
      contentType :contentType,
      async : async,
      error: function(xhr, errorType, error) {
        //alert('Ajax request error, errorType: ' + errorType +  ', error: ' + error)
      }
    })
  },

  get:function(url, data, callback) {
    // var data = data!=null?JSON.stringify(data):'';
    this.ajaxJSON(url, 'GET',data, callback,true,'application/json')
  },
  put:function(url, data, callback) {
    var data = data!=null?JSON.stringify(data):'';
    this.ajaxJSON(url, 'PUT', data, callback,true,'application/json')
  },
  delete:function(url, data, callback) {
    var data = data!=null?JSON.stringify(data):'';
    this.ajaxJSON(url, 'DELETE',data, callback,true,'application/json')
  },

  post:function(url, data, callback) {
    this.ajaxJSON(url, 'POST', JSON.stringify(data), callback,true,'application/json')
  }
}

export {AjaxHelper}
