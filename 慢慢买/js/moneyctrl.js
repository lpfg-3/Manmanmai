$(function () {
  
  // 标记当前页码
  var pageid = 0;
  // 标记总页码
  var pageTotal = 0;

  // 因进入页面便获取一次商品信息
  render();
  function render() {   
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getmoneyctrl',
      data: {
        pageid: pageid
      },
      dataType: 'json',
      success: function ( info ) {
        console.log( info );
        /* 渲染推荐产品 */
        var htmlStr1 = template('itemsTpl', info);
        $('.mmm_product_list_common .items').html( htmlStr1 );
        // 获取总页码
        pageTotal = Math.ceil( info.totalCount / info.pagesize );
        console.log(pageTotal, pageid);
     
        /* 渲染下拉框 */
        var htmlStr2 = template('selectTpl', {pageTotal: pageTotal,val:pageid});  
        $('.mmm_pagination_common .select_page').html( htmlStr2 );
      }
    })
  }

  // 点击进入下一页
  $('.mmm_pagination_common .next').click(function () {
    if (pageid >= pageTotal - 1) {
      return;
    }
    pageid++;
    render();
  })

  // 点击进入上一页
  $('.mmm_pagination_common .prev').click(function () {
    if (pageid <= 0) {
      return;
    }
    pageid--;
    render();
  })

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
    render();
  })

})