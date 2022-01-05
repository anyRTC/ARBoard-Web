// 封装引入方法
var importCssJs = {
  css: function (path) {
    if (!path || path.length === 0) {
      throw new Error('参数"path"错误');
    }
    var oHead = document.getElementsByTagName("head")[0];
    var oLink = document.createElement("link");
    oLink.href = path;
    oLink.rel = "stylesheet";
    oLink.type = "text/css";
    oHead.appendChild(oLink);
  },
  js: function (path) {
    if (!path || path.length === 0) {
      throw new Error('参数"path"错误');
    }
    var oHead = document.getElementsByTagName("head")[0];
    var oScript = document.createElement("script");
    oScript.src = path;
    oScript.type = "text/javascript";
    oHead.appendChild(oScript);
  },
};
// 停止冒泡行为
function stopBubble(e) {
  //如果提供了事件对象，则这是一个非IE浏览器
  if (e && e.stopPropagation)
    //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
  //否则，我们需要使用IE的方式来取消事件冒泡
  else window.event.cancelBubble = true;
}
//阻止浏览器的默认行为
function stopDefault(e) {
  //阻止默认浏览器动作(W3C)
  if (e && e.preventDefault) e.preventDefault();
  //IE中阻止函数器默认动作的方式
  else window.event.returnValue = false;
  return false;
}

// 引入插件
// // message组件
// importCssJs.js("../../whiteboard/component/message/message.js");
// importCssJs.css("../../whiteboard/component/message/message.css");
// // progress组件
// importCssJs.js("../../whiteboard/component/progress/progress.js");
// importCssJs.css("../../whiteboard/component/progress/progress.css");
// // toolbar组件
// importCssJs.js("../../whiteboard/component/toolbar/toolbar.js");
// importCssJs.css("../../whiteboard/component/toolbar/toolbar.css");

// message组件
importCssJs.js("./component/message/message.js");
importCssJs.css("./component/message/message.css");
// progress组件
importCssJs.js("./component/progress/progress.js");
importCssJs.css("./component/progress/progress.css");
// toolbar组件
importCssJs.js("./component/toolbar/toolbar.js");
importCssJs.css("./component/toolbar/toolbar.css");