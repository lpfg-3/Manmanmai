$(function () {
  
  // 获取优惠卷信息
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getcoupon',
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      var htmlStr = template('couponTpl', info);
      $('.mmm_coupon ul').html( htmlStr );
    }
  })

})