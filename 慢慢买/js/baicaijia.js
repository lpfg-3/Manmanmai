$(function () {

  // 标记当前菜单
  var titleid = 0;

  // 获取菜单
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var htmlStr = template('navTpl', info);
      $('.mmm_nav ul').html(htmlStr);

      // 获取第一个的titleid
      titleid = info.result[0].titleId;

      //  // 菜单滑动
      // new IScroll('#nav', {
      //   scrollX:true,
      //   scrollY:false
      // });


      $('#nav').on('mousedown', function (e) {
          console.log(1);

         
          
          $(window).on('mousemove', function (e) {
            console.log(2);

          

          })
          $('#nav').on('mouseup', function () {
            console.log(4);
            $(window).off('mousemove');
          })

        })
        
        // 渲染第一个菜单的内容
        render();
      }
  })

  // 给菜单注册事件委托， 点击那个菜单，加载对应内容
  $('.mmm_nav').on('click', 'a', function () {
    if (titleid == $(this).data('id')) {
      return;
    }
    // 设置高亮
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');

    titleid = $(this).data('id');

    render();
  })

  render();
  // 渲染产品
  function render() {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
      data: {
        titleid: titleid
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('productTpl', info);
        $('.mmm-product ul').html(htmlStr);
      }
    })
  }



})