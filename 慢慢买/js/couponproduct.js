$(function () {

  // 获取从地址栏传递的参数 couponid
  var couponid = lpf.getSearch('couponid') || 0;

  // 获取模态框中的ul
  var $ul = $('.modal .box ul');
  // 上一张
  var $prev = $('.modal .box .prev');
  // 下一张
  var $next = $('.modal .box .next');

  // 标记当前模态框显示的图片索引
  var index = 0;
  // 设置单张图片的宽度
  var width = 4;
  // 单位
  var unit = 'rem';

  // 获取优惠产品信息
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getcouponproduct',
    data: {
      couponid: couponid
    },
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      
      var htmlStr = template('listTpl', info);
      $('.mmm_coupon_pro .list ul').html( htmlStr );

      // 模态框图片
      var imgStr = template('imgTpl', info);
      $ul.html( imgStr );

      // 获取li的长度
      var length =  $ul.find('li').length;
      console.log(length);
      
      // 设置ul的长度
      $ul.css('width', (length * width + unit) );
    }
  })

  // 注册事件委托， 点击优惠产品 显示图片
  $('.mmm_coupon_pro .list').on('click', 'a', function () { 
    // 获取 当前点击元素 索引
    index = $(this).data( 'index' );

    // 判断index
    if ( index == $('.modal li').length - 1 ) {
      $next.hide();
      // index = $('.modal li').length - 1;
    }
    if ( index == 0 ) {
      $prev.hide();
      // index = 0;
    }


    $(".modal").show();
    $ul.removeClass('transiton').css('transform', 'translate(' + (-index * width + unit) + ')')
  })

  // 模态框
  $(".modal").click(function (e) {
    // console.log( e.target );
    if (e.target.classList.contains('modal')) {
      $(".modal").hide();
    }
  })

  // 点击显示上一张图片
  $prev.click(function () {
    index--;
    console.log(index);
    // console.log(index * width + unit);
    if ( index < $('.modal li').length - 1 ) {
      $next.show();
    }
    if ( index == 0 ) {
      $prev.hide();
    }
    
    $ul.addClass('transiton').css('transform', 'translate(' + (-index * width + unit) + ')')


  })

  // 点击显示下一张图片
  $next.click(function () {
    index++;
    console.log(index);
    if (index > 0) {
      $prev.show();
    }
    if ( index == $('.modal li').length - 1 ) {
      $next.hide();
    }

    $ul.addClass('transiton').css('transform', 'translate(' + (-index * width + unit) + ')')



  })


})