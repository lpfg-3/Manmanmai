;(function () {
  var lpf = {};
  // 获取地址栏传递的参数
  lpf.getSearch = function (params) {
    // 获取查询字符串
    var str = location.search;
    // console.log(str);
    
    // 去掉首位的？
    str = str.slice(1);
    // console.log(str);
    
    // 通过&符号将多个参数分开
    var arr = str.split('&');
    // console.log(arr);
    
    // 将多个参数存入对象中
    var obj = {};
    arr.forEach(function (v, i) {
      // 通过 = 继续分割数组每一项
      var item = v.split('=');
      obj[item[0]] = item[1];
    })
    // console.log(obj);
    
    //返回指定参数的值
    return obj[params];
  }
  // 获取页面滚出去的距离
  lpf.getScroll = function() {
    return {
      scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
      scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    }
  }

  // 封装tap事件
  lpf.tap = function (selector, callBack) {
    // 通过选择器获取 元素
    var box = document.querySelector(selector || body);

    var flag = false;
    // 注册 touchstart 事件
    box.addEventListener('touchstart', function () {
      var start = Date.new();
    })
    // 注册 touchmove 事件
    box.addEventListener('touchstart', function () {
      flag = true;
    })
    // 注册 touchstart 事件
    box.addEventListener('touchstart', function () {
      var end = Date.new();
    })

    if (flag) {
      return;
    }

    if (end - start <= 150) {
      callBack&&callBack();
    }

  }


  window.lpf = lpf; 
})()

;$(function () {

  // 根据浏览器窗口的改变动态设置rem
  // 已进入页面便设置一次
  setRem(750);
  $(window).on('resize', function () {
    setRem(750);
  })
  // design 设置稿宽
  function setRem(design) {
    var width = window.innerWidth;
    if (width > 640) {
      width = 640;
    }
    if (width < 320) {
      width = 320
    }
    document.querySelector('html').style.fontSize = width / design * 100 + 'px';
  }

  // 点击返回顶部 返回顶部、
  var timer;
  $('#to_top').click(function (e) {
    // 获取距离 顶部 的距离
    if (timer) {
      clearInterval(timer)
    }
    // console.log(e);
    // console.log(document.scrollTop);
    // console.log(window.pageYOffset);
    // console.log(document.documentElement.scrollTop);
    // console.log(document.body.scrollTop);
    // document.documentElement.scrollTop = 100;
    var distance = lpf.getScroll().scrollTop;
    var step = distance / 20;
    // console.log(distance);

    timer = setInterval(function () {
      distance -= step;
      if (distance <= 0) {
        distance = 0;
        clearInterval(timer);
      }
      document.documentElement.scrollTop = distance;
    }, 20)

  })



})
//

