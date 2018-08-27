$(function () {
  
  // 一进入页面便获取一次一级分类
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getcategorytitle',
    dataType:'json',
    success: function( info ){
      console.log( info );
      var htmlStr = template('firstTpl', info);
      $('.mmm_category .first').html( htmlStr );
    }
  })

  // 当一级菜单被点击时显示二级菜单
  $('.mmm_category .first').on('click', 'li', function () {
    // 切换二级分类隐藏与显示
    $(this).find('.second').toggle();
    if ($(this).find('.second').css('display') === 'none') {
      return;
    }

    // 获取一级分类的id
    var titleid = $(this).data( 'titleid' );   
    // 保存当前点击的元素
    var that = this;

    // 发送请求
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getcategory',
      data: {
        titleid: titleid
      },
      dataType: 'json',
      success: function ( info ) {
        console.log( info );
        var htmlStr = template('secondTpl', info);        
        $(that).find('.second').html( htmlStr )      
      }
    })
  })

})