/**
 * 进度条
 */
class progress {
  constructor(options, callback) {
    if (options) {
      this.initprogress(options, callback);
    }
  }
  //
  initprogress(options, callback) {
    options.max = Number(options.max);
    options.min = Number(options.min);
    // 创建最外围
    const oProgress = document.createElement("div");
    oProgress.className = "progress";
    const oProgressWidth = oProgress.offsetWidth;
    // 创建进度条拖拽点
    const oProgressDot = document.createElement("div");
    oProgressDot.className = "progress_dot";
    oProgressDot.style.marginLeft =
      (options.defaultwidth / (options.max - options.min)) * oProgressWidth +
      "px";

    // 创建提示
    const oCreateToolDetailTip = document.createElement("div");
    oCreateToolDetailTip.className = "tip tip_top";
    oCreateToolDetailTip.textContent = options.defaultwidth;
    oProgressDot.appendChild(oCreateToolDetailTip);

    // 创建进度条bg
    const oProgressBg = document.createElement("div");
    oProgressBg.className = "progress_bg";
    oProgressBg.style.width =
      (options.defaultwidth / (options.max - options.min)) * oProgressWidth +
      "px";

    //
    const oProgressBgPro = document.createElement("div");
    oProgressBgPro.className = "progress_bgpro";

    oProgress.appendChild(oProgressBgPro);
    oProgress.appendChild(oProgressDot);
    oProgress.appendChild(oProgressBg);

    options.document.appendChild(oProgress);

    var isfalse = false,
      m = Math,
      b = document.body,
      value = 0,
      ratio = options.max - options.min;

    oProgressDot.onmousedown = function (e) {
      // 停止冒泡行为
      stopBubble(e);
      isfalse = true;
      var X = e.clientX;
      var offleft = this.offsetLeft;
      var max = oProgress.offsetWidth - this.offsetWidth;
      oProgress.onmousemove = function (e) {
        if (isfalse == false) {
          return;
        }
        var changeX = e.clientX;

        var moveX = m.min(max, m.max(-2, offleft + (changeX - X)));

        value = m.round(m.max(0, moveX / max) * ratio) + options.min;
        oCreateToolDetailTip.textContent = value;
        oProgressDot.style.marginLeft = m.max(0, moveX) + "px";
        oProgressBg.style.width = moveX + 6 + "px";
      };
    };
    oProgress.onmouseup = function () {
      if (isfalse) {
        callback(Number(value));
      }
      isfalse = false;
    };
    oProgress.onmouseleave = function () {
      if (isfalse) {
        callback(Number(value));
      }
      isfalse = false;
    };
  }
}
