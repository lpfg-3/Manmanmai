$(function () {
  
  // 已进入页面便获取网站导航
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getsitenav',
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      var htmlStr = template('tpl', info);
      $('.mmm_shop_bav ul').html( htmlStr );
    }
  })

})