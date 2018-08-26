$(function () {
  
  console.log(1);
  
  // 已进入页面便获取一次导航信息,
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getindexmenu',
    dataType: 'json',
    success: function ( info ) {
      console.log(info);
      var htmlStr = template('navTpl', info);

      $('.mmm_nav ul').html( htmlStr );
    }
  })

  // 获取推荐产品信息
  recommendRender();
  function recommendRender() {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getmoneyctrl',
      dataType: 'json',
      success: function ( info ) {
        console.log( info );
        var htmlStr = template('recommendTpl', info);
        $('.mmm_recommend .content ul').html( htmlStr );
      }
    })
  }

  // 点击 导航更多 隐藏内容显示
  $('.mmm_nav').on('click', '.nav_more', function () {
    $('.mmm_nav .nav_hide').toggle();
  })

  

})