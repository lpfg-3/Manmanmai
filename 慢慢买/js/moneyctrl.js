$(function () {
  
  // 标记当前页码
  var pageId = 0;
  // 标记总页码
  var pageTotal = 0;

  // 因进入页面便获取一次商品信息
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getmoneyctrl',
      data: {
        pageid: pageId
      },
      dataType: 'json',
      success: function ( info ) {
        console.log( info );
        /* 渲染推荐产品 */
        var htmlStr1 = template('itemsTpl', info);
        $('.mmm_product_list_common .items').html( htmlStr1 );
        // 获取总页码
        pageTotal = Math.ceil( info.totalCount / info.pagesize );
        /* 渲染下拉框 */
        var htmlStr2 = template('selectTpl', {pageTotal: pageTotal,val:pageId+1});
        $('.mmm_pagination_common .select').html( htmlStr2 );
      }
    })
  }

  // 点击进入下一页
  $('.mmm_pagination_common .next').click(function () {
    if (pageId >= pageTotal - 1) {
      return;
    }
    pageId++;
    render();
  })

  // 点击进入上一页
  $('.mmm_pagination_common .prev').click(function () {
    if (pageId <= 0) {
      return;
    }
    pageId--;
    render();
  })

  // 选择select
  $('.mmm_pagination_common .select').on('change', function () {
    pageId = $(this).val() - 1;
    render();
  })

})