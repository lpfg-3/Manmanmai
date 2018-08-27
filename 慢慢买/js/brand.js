$(function () {
  var brandtitleid = lpf.getSearch('brandtitleid') || 0;
  
  // 获取对应brandtitleid的十大品牌排行信息
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getbrand',
    data: {
      brandtitleid: brandtitleid
    },
    dataType: 'json',
    success: function ( info ) {
      console.log( info );

      var htmlStr = template('brandTpl', info);
      $('.mmm_brandhot .brand').html( htmlStr );
    }
  })

  // 对应 销量排行
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getbrandproductlist',
    data: {
      brandtitleid: brandtitleid
    },
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      var htmlStr = template('saleTpl', info);
      $('.mmm_brandhot .sale').html( htmlStr ); 
    }
  })

  // 评论
  var productId = 0;
  commentRender(productId)
  function commentRender(productId) {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getproductcom',
      data: {
        productid: productId
      },
      dataType: 'json',
      success: function ( info ) {
        console.log( info );
        var htmlStr = template('commentTpl', info);
        $('.mmm_brandhot .comment').html( htmlStr );
      }
    })
  }
  
})