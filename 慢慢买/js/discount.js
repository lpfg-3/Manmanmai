$(function () {
  
  var productid  = lpf.getSearch('productid') || 0;
  console.log(productid);

  // 一进入页面便渲染一次
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getdiscountproduct',
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
    }
  })
  
  
  

})