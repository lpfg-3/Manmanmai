$(function () {
  // 获取商品id 
  var productid = lpf.getSearch( 'productid' ) || 1;
  
  

  // 获取商品详情
  // 通过发回来的分类categoryid渲染三级导航
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getproduct',
    data: {
      productid: productid
    },
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      
      // 获取分类id
      var categoryid = info.result[0].categoryId;
      // 获取产品名称 通过空格截取
      var productName = info.result[0].productName.split(' ')[0];
      
      // 动态渲染三级导航
      $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getcategorybyid',
        data: {
          categoryid: categoryid
        }, 
        dataType: 'json',
        success: function ( info ) {
          // 保存产品名称
          info.productName = productName;
          console.log( info );
          // 
          var threeStr = template('threeTpl', info);
          $('.mmm_three_common .three').html( threeStr );
        }

      })

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