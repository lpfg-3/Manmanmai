$(function () {
  
  // 发送请求 获取 默认店铺
  var shopid = 0;
  var areaid = 0;
  // 保存默认
  var shopDef = {id: 0};
  var areaDef = {id: 0};

  // 获取分类元素
  // 头部导航
  var $shopSpan = $('.mmm_list .head_box .shop span');
  var $areaSpan = $('.mmm_list .head_box .area span');
  var $priceSpan = $('.mmm_list .head_box .price span');

  // 下拉显示框
  var $sel_ul = $('.mmm_list .select ul');
  var $shop_box = $('.mmm_list .shop_box');
  var $area_box = $('.mmm_list .area_box');
  var $price_box = $('.mmm_list .price_box');

  // 获取产品渲染区域
  var $items = $('.mmm_list .content ul');

  // 获取店铺
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getgsshop',
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      var htmlStr = template('shopTpl', info);
      
      $shop_box.html( htmlStr );

      // 保存默认店铺名称
      shopDef = {name: info.result[0].shopName };
      // 设置默认显示店铺
      $shopSpan.text( shopDef.name );

      // 获取第一条的id
      shopid = shopDef.id = info.result[0].shopId;
      
    }
  })

  // 获取凑单品区域
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getgsshoparea',
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      var htmlStr = template('areaTpl', info);
      $area_box.html( htmlStr );
      
      // 保存默认店铺名称
      areaDef = {name: info.result[0].areaName.split('（')[0] };
        
      // 设置默认显示店铺
      $areaSpan.text( areaDef.name );

      // 获取第一条区域id
      areaid = areaDef.id = info.result[0].areaId;
      
    }
  })

  // 当店铺和区域 的 ajax请求都完成时渲染商品
  $( window ).on('ajaxStop',function() {
    console.log(1);
    $( window ).off('ajaxStop');
    renderItems(shopid,areaid);
  });
  
  // 给导航栏注册点击事件，点到那个对应的菜单栏显示
  $('.mmm_list .head_box').on('click', 'li', function () {
    // 获取点击的元素的索引
    var index = $(this).index();
    // console.log(index);  
    $sel_ul.eq(index).show().siblings().hide(); 
  })

  // 下拉框里的元素注册点击事件
  $shop_box.on('click', 'a', function () {
    // 隐藏下拉框
    $shop_box.hide();
    // 获取点击的商城id
    if (shopid == $(this).data( 'id' )) return;
    shopid = $(this).data( 'id' );
    console.log('shopid：' + shopid);
    // 设置商城名称
    $shopSpan.text( $(this).text().split('（')[0] );
    // 渲染商品
    renderItems(shopid, areaid);
  })
  $area_box.on('click', 'a', function () {
    // 下拉框隐藏
    $area_box.hide();
    // 获取点击区域id
    if (areaid == $(this).data( 'id' )) return;
    areaid = $(this).data( 'id' );
    console.log('areaid：' + areaid);
    // 渲染区域名称
    $areaSpan.text( $(this).text().split('（')[0] );
    // 渲染产品
    renderItems(shopid, areaid);
  })
  $price_box.on('click', 'a', function () {
    // 隐藏下拉框
    $price_box.hide();

    // 渲染默认标题内容
    $shopSpan.text( shopDef.name );
    $areaSpan.text( areaDef.name );

    // 渲染默认产品   
    renderItems(shopDef.id, areaDef.id);
  })

  // 获取 凑单品 商品列表
  function renderItems(shopid, areaid) {
    console.log(shopid, areaid);
    
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getgsproduct',
      data:{
        shopid: shopid ,
        areaid: areaid
      },
      dataType: 'json',
      success: function ( info ) {
        console.log( info );
        var htmlStr = template('itemsTpl', info);
        $items.html( htmlStr );
      }
    })
  }
  
})