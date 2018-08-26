$(function () {
  
  var productid  = lpf.getSearch('productid');
  // console.log(id);

  // 一进入页面便渲染一次
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getmoneyctrlproduct',
    data: {
      productid: productid
    },
    dataType: 'json',
    success: function ( info ) {
      console.log(info);
      // 渲染评论
      // console.log(info.result[0].productComment);
      // console.log(info.result[0].productCity);
      var htmlStr = template('infoTpl', info);
      $('.moneyproduct').html( htmlStr );
      $('.mmm_extra .comment').html( info.result[0].productComment );
      $('.mmm_extra .city_list').html( info.result[0].productCity );
    }
  })
  
  
  

})