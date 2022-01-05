/**
 * 链接截取
 * @param {*string} variable
 */
function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

/**
 * 修改url
 * @param {*} url
 * @param {*} arg
 * @param {*} arg_val
 * @returns
 */
function changeURLArg(url, arg, arg_val) {
  var pattern = arg + "=([^&]*)";
  var replaceText = arg + "=" + arg_val;
  if (url.match(pattern)) {
    var tmp = "/(" + arg + "=)([^&]*)/gi";
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (url.match("[?]")) {
      return url + "&" + replaceText;
    } else {
      return url + "?" + replaceText;
    }
  }
}

/**
 * 随机生成数字
 * @param {*数字位数} num
 */
function random(num = 1) {
  const max = Math.pow(10, num) - 1;
  const min = Math.pow(10, num - 1);
  return Math.round(Math.random() * (max - min)) + min;
}

/**
 * 复制
 * @param {*} value
 * @param {*} callback
 */
function copy(value, callback) {
  const oCreateTeInput = document.createElement("input");
  document.body.appendChild(oCreateTeInput);
  // oCreateTeInput.style.opacity = 0;
  oCreateTeInput.value = value;
  oCreateTeInput.select();
  // 执行浏览器复制命令
  document.execCommand("Copy");
  callback();
  document.body.removeChild(oCreateTeInput);
}

/**
 * 表单
 * 用户名校验
 * 房间名校验
 * 表单提交按钮状态可用/禁用
 */

// 表单提交按钮状态可用/禁用
function submitbuttonstate() {
  const formsubmitHTML = document.querySelector("#joinChannel");
  const oInput = document.getElementsByClassName("form_input");
  formsubmitHTML.classList.remove("singin_submit_hiddon");
  for (let index = 0; index < oInput.length; index++) {
    if (oInput[index].value == "") {
      formsubmitHTML.classList.add("singin_submit_hiddon");
    }
  }
}
// 用户名校验
function userverify(formitemHTML) {
  const value = formitemHTML.getElementsByClassName("form_input")[0].value;
  const hint = formitemHTML.getElementsByClassName("form_hint")[0];
  submitbuttonstate();
  // 数字+字母
  const oregular = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,32}$/;
  if (value == "") {
    hint.classList.add("form_hint_show");
    hint.innerText = "请输入用户名";
  } else if (value.length > 32) {
    hint.classList.add("form_hint_show");
    hint.innerText = "请输入不超过32位的用户名";
  } else if (!oregular.test(value)) {
    hint.classList.add("form_hint_show");
    hint.innerText = "请输入字母+数字";
  } else {
    hint.classList.remove("form_hint_show");
    return value;
  }
}
// 房间名校验
function channelverify(formitemHTML) {
  const value = formitemHTML.getElementsByClassName("form_input")[0].value;
  const hint = formitemHTML.getElementsByClassName("form_hint")[0];
  submitbuttonstate();
  // 数字
  const oregular = /^\d+$/;
  if (value == "") {
    hint.classList.add("form_hint_show");
    hint.innerText = "请输入房间号";
  } else if (value.length > 9) {
    hint.classList.add("form_hint_show");
    hint.innerText = "请输入不超过9位的房间号";
  } else if (!oregular.test(value)) {
    hint.classList.add("form_hint_show");
    hint.innerText = "只能输入数字";
  } else {
    hint.classList.remove("form_hint_show");
    return value;
  }
}

/**
 * 登录与白板页面切换
 * */
function pagetoggle(toggle = true) {
  const oLoginPage = document.querySelector("#login");
  const oBoardPage = document.querySelector("#board");
  if (toggle) {
    // 切换至白板
    oLoginPage.classList.add("hide");
    oBoardPage.classList.remove("hide");
  } else {
    // 切换至登录
    oBoardPage.classList.add("hide");
    oLoginPage.classList.remove("hide");
  }
}

/**
 * 遮罩层显示/隐藏
 */
function maskOptions(toggle, message) {
  // 遮罩层
  const oMask = document.querySelector("#mask");
  if (toggle) {
    oMask.classList.add("mask_show");
    oMask.onclick = function (e) {
      // 停止冒泡行为
      stopBubble(e);
      message.setOption({
        message: "当前白板不可操作，网络连接中",
        type: "warning",
        duration: 2000,
      });
    };
  } else {
    oMask.classList.remove("mask_show");
  }
}

/**
 * 白板相关数据展示
 * currentPage 白板当前页数
 * totalPage 白板总页数
 * currentBoardScale 白板当前比例
 */
function boardDataShow(data) {
  // 白板当前页数
  if (data.currentPage) {
    document.querySelector("#curren").innerText = data.currentPage;
  }
  // 白板总页数
  if (data.totalPage) {
    document.querySelector("#total").innerText = data.totalPage;
  }
  // 白板当前比例
  if (data.currentBoardScale) {
    document.querySelector("#adjust_vlue").innerText =
      data.currentBoardScale + "%";
    // 禁用样式
    disabledStyle("reset", data.currentBoardScale !== 100 ? true : false);
    disabledStyle("minus", data.currentBoardScale <= 100 ? false : true);
    disabledStyle("plus", data.currentBoardScale == 300 ? false : true);
  }
}

/**
 * 白板功能禁用样式修改
 * @param {*string} id
 * @param {*booled} toggle
 * true 可用
 * false 禁用
 */
function disabledStyle(id, toggle = true) {
  const oIcon = document.querySelector("#" + id).getElementsByTagName("i")[0];
  if (toggle) {
    oIcon.classList.remove("disabled");
  } else {
    oIcon.classList.add("disabled");
  }
}

/**
 * 白板信息展示
 */
function boardInfo(board) {
  const fileInfo = board.getFileInfo(board.getCurrentFileId());
  console.log("🚀 ~ file: untils.js ~ line 214 ~ boardInfo ~ fileInfo", fileInfo)

  const Store = {};
  // 判断是否可删除当前白板
  Store.deletedecide =
    fileInfo.totalPageCount == 1 || fileInfo.currentPageIndex == 1
      ? false
      : true;

  // 判断是否可跳转上一页
  Store.prevdecide = fileInfo.currentPageIndex == 1 ? false : true;
  // 判断是否可跳转下一页
  Store.nextdecide =
    fileInfo.currentPageIndex == fileInfo.totalPageCount ? false : true;

  // 禁用样式
  disabledStyle("prev", Store.prevdecide);
  disabledStyle("next", Store.nextdecide);
  disabledStyle("delete", Store.deletedecide);

  // 更新页面数据
  boardDataShow({
    // 白板当前页数
    currentPage: fileInfo.currentPageIndex,
    // 白板总页数
    totalPage: fileInfo.totalPageCount,
    // 缩放比例
    currentBoardScale: board.getBoardScale(),
  });

  return Store;
}
