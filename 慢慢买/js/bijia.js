$(function () {
  // 获取商品id
  var productid = lpf.getSearch( productid ) || 1;
  // 获取商品详情
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getproduct',
    data: {
      productid: productid
    },
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      // 产品描述
      var descStr = template('descTpl', info);
      $('.mmm_bijia .desc').html( descStr );
      // 商城及价格
      var shopStr = template('shopTpl', info);
      $('.mmm_bijia .go_shop .top').html( shopStr );
    }
  })
  // 动态渲染评价
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getproductcom',
    data: {
      productid: productid
    },
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      var htmlStr = template('commentTpl', info);
      $('.net_comment .comment_area').html( htmlStr );
    }

  })

})