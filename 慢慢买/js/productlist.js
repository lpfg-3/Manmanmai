$(function () {
  
  // 获取地址栏传递的参数
  var categoryid = lpf.getSearch( 'categoryid' ) || 0;

  // 标记当前页码
  var pageid = 1;
  // 标记总页码
  var pageTotal = 0;

  // 获取分类信息
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getcategorybyid',
    data: {
      categoryid: categoryid
    },
    dataType: 'json',
    success: function ( info ) {
      console.log( info );
      // 渲染三级导航
      var htmlStr = template('threeTpl', info);
      $('.mmm_three_common .three').html( htmlStr );
    }
  })

  // 一进入页面便获取 第一页 数据
  renderList();
  function renderList() {
    
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getproductlist',
      data: {
        categoryid: categoryid,
        pageid : pageid 
      },
      dataType: 'json',
      success: function ( info ) {
        console.log( info );
        var htmlStr = template('listTpl', info);
        $('.mmm_product_list_common ul').html( htmlStr );

        // 计算总页码
        pageTotal = Math.ceil( info.totalCount / info.pagesize );
        /* 渲染下拉框 */
        var htmlStr2 = template('selectTpl', {pageTotal: pageTotal,val:pageid});
        $('.mmm_pagination_common .select_page').html( htmlStr2 );
      }
    })

  }

   // 点击进入下一页
  $('.mmm_pagination_common .next').click(function () {
      if (pageid >= pageTotal) {
        return;
      }
      pageid++;
      renderList();
  })

  // 点击进入上一页
  $('.mmm_pagination_common .prev').click(function () {
    if (pageid <= 1) {
      return;
    }
    pageid--;
    renderList();
  })

  // 选择select
  // $('.mmm_pagination_common select').on('change', function () {
  //   pageid = $(this).val();
  //   renderList();
  // })
  // 使用 a标签 进行下拉选择
  $('.mmm_pagination_common .select_page').on('click', '.now_page', function () {
    $('.mmm_pagination_common .select_page .select').toggle();
  })
  $('.mmm_pagination_common .select_page').on('click', '.select a', function () {
    $('.mmm_pagination_common .select').hide();
    
    // 获取页码
    if (pageid === $(this).data( 'index' )) {
      return;
    }
    pageid = $(this).data( 'index' );
    renderList();
  })
})