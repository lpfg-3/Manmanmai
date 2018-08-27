$(function () {
  // 记录显示个数
  var index = 4;
  // 标记是否在显示中
  var flag = false;

  // 获取折扣商品列表
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getinlanddiscount',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var htmlStr = template('productTpl', info);
      $('.mmm_inland ul').html(htmlStr);
      // 记录总个数
      var total = $('.mmm_inland>ul>li').length;
      // 先显示前四个
      $(".mmm_inland>ul>li:nth-child( -n + 4  )").show();
      
      // 设置监听滚动事件 依次显示 剩余的
      $(window).on('scroll', function () {
        if (false) {
          return;
        }
        // console.log(window.pageYOffset);
        // console.log(window.outerHeight);
        // console.log(window.innerHeight);
        // console.log($(".mmm_inland .more"));
        // 获取more 的高度
        var height = $(".mmm_inland .more").height();
        // 获取more距离顶部的距离
        var top = $(".mmm_inland .more").offset().top
        // 获取可视区的高度
        var page = $(window).height();
        // 获取滚出去的距离
        var pageOut = $(window).scrollTop()
        console.log(height , page , pageOut);
        
        console.log( top, page + pageOut - height);
        
        if (top < page + pageOut - height) {
          if (flag) {
            return
          }
          flag = true;
          setTimeout(function () {
            index += 4;
            console.log(index);
            
            if (index > total) {
              console.log( '---' );
              
            index = total;
             $(".mmm_inland>ul>li:nth-child( -n + " + index + "  )").show();
              $(window).off('scroll');
              $(".mmm_inland .more").text('没有更多了');
            }
            $(".mmm_inland>ul>li:nth-child( -n + " + index + "  )").show();

            flag = false;
          }, 500)
          
        }

      })

    }

  })



})