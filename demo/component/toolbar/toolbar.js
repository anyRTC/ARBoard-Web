// var message = new Message();
// 侧边工具栏
class ToolBar {
  constructor(options) {
    if (options) {
      // // 白板颜色
      // // 画笔颜色
      // this.brushColor = "";
      // // 字体颜色

      const oToolBar = document.getElementById(options.el);
      oToolBar.className = "toolbar";
      // oToolBar.style.height = options.infolists.length * 40 + "px";
      this.board = options.board;
      this.toolbaar = oToolBar;
      this.createSideBar(oToolBar, options.infolists);
    }
    const oBody = document.getElementsByTagName("body")[0];
    oBody.addEventListener("click", this.clearShow);
  }
  // 创建侧边栏
  createSideBar(toolbarDom, infolists) {
    infolists.map((info, index) => {
      // 创建工具
      const oCreateTool = document.createElement("div");
      oCreateTool.className = "toolbar_tool";
      // 工具按钮
      const oCreateToolButton = document.createElement("div");
      oCreateToolButton.className = "toolbar_tool_buton";
      // 工具按钮icon (默认选中第一个 )
      const oCreateToolButtonIcon = document.createElement("i");
      if (index == 0) {
        oCreateToolButtonIcon.className =
          "toolbar_tool_icon toolbar_tool_icon_activate iconfont " + info.icon;
      } else {
        oCreateToolButtonIcon.className =
          "toolbar_tool_icon iconfont " + info.icon;
      }
      // 工具经过提示tip
      const oCreateToolTip = document.createElement("div");
      oCreateToolTip.className = "tip tip_left";
      oCreateToolTip.textContent = info.tip;

      // 添加
      oCreateToolButton.appendChild(oCreateToolButtonIcon);
      oCreateToolButton.appendChild(oCreateToolTip);
      oCreateTool.appendChild(oCreateToolButton);
      toolbarDom.appendChild(oCreateTool);
      // 创建侧边栏内容
      if (info.detail && info.detail.length > 0) {
        this.createSideBarDetail(oCreateTool, info.detail);
      }
      // 侧边栏点击
      this.showSideBarDetail(oCreateTool, info);
    });
  }
  // 创建侧边栏内容
  createSideBarDetail(toolDom, detailedinfo) {
    // 创建详细分类
    const oCreateToolDetail = document.createElement("div");
    oCreateToolDetail.className = "toolbar_tool_detail";
    const _this = this;
    detailedinfo.map((detail) => {
      switch (detail.type) {
        case "progress":
          // 设置默认大小
          _this.board[detail.brushFn](detail.defaultsize);

          const oProgress = document.createElement("div");
          oProgress.className =
            detail.brushFn == "setBrushThin"
              ? "progressinfo thin_progress "
              : "progressinfo size_progress";

          if (detail.contenttext) {
            const oProgressText = document.createElement("div");
            oProgressText.className = "progressinfo_text";
            oProgressText.textContent = detail.contenttext;
            oProgress.appendChild(oProgressText);
          }

          // 进度条
          new progress(
            {
              document: oProgress,
              defaultwidth:
                detail.brushFn == "setBrushThin"
                  ? _this.board.getBrushThin()
                  : _this.board.getTextSize(),
              min: detail.min,
              max: detail.max,
            },
            function (num) {
              _this.board[detail.brushFn](num);
            }
          );

          oCreateToolDetail.appendChild(oProgress);
          break;
        case "color":
          const oColorInfoList = document.createElement("div");
          oColorInfoList.className = "colorinfo";
          oColorInfoList.onclick = function (e) {
            // 停止冒泡行为
            stopBubble(e);
          };
          if (detail.contenttext) {
            const oCreateToolDetailColorText = document.createElement("div");
            oCreateToolDetailColorText.textContent = detail.contenttext;
            oColorInfoList.appendChild(oCreateToolDetailColorText);
          }
          const oCreateToolDetailColorList = document.createElement("div");
          oCreateToolDetailColorList.className = "colorlist";

          if (detail.brushFn == "setBrushColor") {
            // 画笔默认颜色
            _this.board[detail.brushFn](detail.defaultcolor);
          } else if (
            detail.brushFn == "setBackgroundColor" &&
            detail.defaultcolor
          ) {
            // 背景默认颜色(需要白板创建后才可以设置)
            let oTimer = setInterval(function () {
              if (_this.board.getCurrentBoardId()) {
                clearInterval(oTimer);
                _this.board[detail.brushFn](detail.defaultcolor);
              }
            });
          } else if (detail.brushFn == "setTextColor" && detail.defaultcolor) {
            // 文字默认颜色
            _this.board[detail.brushFn](detail.defaultcolor);
          }

          detail.detailcolor.map((color) => {
            const oCreateToolDetailColor = document.createElement("div");

            oCreateToolDetailColor.setAttribute("data-color", color);
            if (detail.brushFn == "setBrushColor") {
              // 画笔相关颜色
              oCreateToolDetailColor.className =
                detail.defaultcolor == color
                  ? "color color_active bu_color"
                  : "color bu_color";
            } else if (detail.brushFn == "setBackgroundColor") {
              // 白板背景颜色
              oCreateToolDetailColor.className = "color bg_color";
            } else if (detail.brushFn == "setTextColor") {
              // 白板文本默认颜色
              oCreateToolDetailColor.className =
                detail.defaultcolor == color
                  ? "color color_active text_color"
                  : "color text_color";
            }

            oCreateToolDetailColor.style.backgroundColor = color;
            oCreateToolDetailColor.onclick = function (e) {
              // 停止冒泡行为
              stopBubble(e);
              _this.board[detail.brushFn](color);
              _this.clearColor(_this.board, detail);
              _this.clearShow();
            };
            oCreateToolDetailColorList.appendChild(oCreateToolDetailColor);
          });

          oColorInfoList.appendChild(oCreateToolDetailColorList);
          oCreateToolDetail.appendChild(oColorInfoList);
          break;
        case "form":
          const oCreateToolDetailFrom = document.createElement("div");
          oCreateToolDetailFrom.className = "form";
          detail.detail.map((form) => {
            const oCreateToolDetailButton = document.createElement("div");
            oCreateToolDetailButton.className = "form_button";

            oCreateToolDetailButton.setAttribute(
              "data-form",
              form.brushtooltype
            );

            // 分类工具按钮提示tip
            const oCreateToolDetailTip = document.createElement("div");
            oCreateToolDetailTip.className = "tip tip_top";
            oCreateToolDetailTip.textContent = form.tip;

            // 分类工具按钮icon
            const oCreateToolDetailButtonIcon = document.createElement("i");
            oCreateToolDetailButtonIcon.className =
              "form_button_icon iconfont " + form.icon;

            oCreateToolDetailButton.appendChild(oCreateToolDetailTip);
            oCreateToolDetailButton.appendChild(oCreateToolDetailButtonIcon);
            oCreateToolDetailButton.onclick = function (e) {
              // 停止冒泡行为
              stopBubble(e);
              _this.board[form.brushFn](form.brushtooltype);
              _this.formBrush(_this.board);
              _this.clearShow();
            };
            oCreateToolDetailFrom.appendChild(oCreateToolDetailButton);
            oCreateToolDetail.appendChild(oCreateToolDetailFrom);
          });
          break;
        case "text":
          const oText = document.createElement("div");
          if (detail.contenttext) {
            oText.textContent = detail.contenttext;
          }
          oText.className = "detail_text";
          oText.onclick = function (e) {
            // 停止冒泡行为
            stopBubble(e);
            if (detail.brushtooltype == "涂鸦") {
              _this.board[detail.brushFn]();
            } else if (detail.brushtooltype == "白板") {
              _this.board[detail.brushFn](true);
            }
            // 清楚后变鼠标
            _this.board.setBrushType(0);
            _this.clearShow();
          };
          oCreateToolDetail.style.alignItems = "center";
          oCreateToolDetail.appendChild(oText);
          break;
        default:
          break;
      }
    });
    toolDom.appendChild(oCreateToolDetail);
  }
  // 侧边栏内容显示/隐藏
  showSideBarDetail(toolDom, detailedinfo) {
    const _this = this;
    toolDom.onclick = function (e) {
      // 停止冒泡行为
      stopBubble(e);
      if (detailedinfo.brushFn) {
        _this.board[detailedinfo.brushFn](detailedinfo.brushtooltype);
      }
      if (detailedinfo.detail) {
        detailedinfo.detail.map((item) => {
          switch (item.type) {
            case "progress":
              // 进度条默认显示
              _this.progressDefault(_this.board, item);
              break;
            case "color":
              // 当前背景颜色
              _this.clearColor(_this.board, item);
              break;
            case "form":
              // 形状(当前画笔形状)
              _this.formBrush(_this.board);
              break;
            default:
              break;
          }
        });
      }

      const oCreateToolDetail = toolDom.getElementsByClassName(
        "toolbar_tool_detail"
      )[0];
      if (oCreateToolDetail) {
        if (
          oCreateToolDetail.classList.contains("toolbar_tool_detail_visibility")
        ) {
          oCreateToolDetail.classList.remove("toolbar_tool_detail_visibility");
        } else {
          _this.clearShow();
          oCreateToolDetail.classList.add("toolbar_tool_detail_visibility");
        }
      } else {
        _this.clearShow();
      }

      // 点击效果
      const oSelectIcon =
        toolDom.getElementsByClassName("toolbar_tool_icon")[0];
      const oAllButton = document.getElementsByClassName("toolbar_tool_icon");
      for (let detail = 0; detail < oAllButton.length; detail++) {
        oAllButton[detail].classList.remove("toolbar_tool_icon_activate");
      }
      oSelectIcon.classList.add("toolbar_tool_icon_activate");
    };
  }
  // 颜色清空
  clearColor(board, info) {
    let oBoardColor = null;
    let oColorList = null;
    if (info.brushFn == "setBrushColor") {
      // 画笔颜色
      oBoardColor = board.getBrushColor();
      oColorList = document.getElementsByClassName("bu_color");
    } else if (info.brushFn == "setBackgroundColor") {
      // 背景颜色
      oBoardColor = board.getBackgroundColor();
      oColorList = document.getElementsByClassName("bg_color");
    } else if (info.brushFn == "setTextColor") {
      // 文本颜色
      oBoardColor = board.getTextColor();
      oColorList = document.getElementsByClassName("text_color");
    }

    for (let index = 0; index < oColorList.length; index++) {
      if (oBoardColor == oColorList[index].getAttribute("data-color")) {
        oColorList[index].classList.add("color_active");
      } else {
        oColorList[index].classList.remove("color_active");
      }
    }
  }
  // 进度条默认显示
  progressDefault(board, info) {
    let boardwidth = null;
    let oBrushAllProgress = null;
    if (info.brushFn == "setBrushThin") {
      boardwidth = board.getBrushThin();
      oBrushAllProgress = document.getElementsByClassName("thin_progress");
    } else if (info.brushFn == "setTextSize") {
      boardwidth = board.getTextSize();
      oBrushAllProgress = document.getElementsByClassName("size_progress");
    }
    if (oBrushAllProgress) {
      for (let x = 0; x < oBrushAllProgress.length; x++) {
        const oAllProgress =
          oBrushAllProgress[x].getElementsByClassName("progress");
        for (let index = 0; index < oAllProgress.length; index++) {
          const oProgressWidth = oAllProgress[index].offsetWidth;
          const oDot =
            oAllProgress[index].getElementsByClassName("progress_dot")[0];
          const oBg =
            oAllProgress[index].getElementsByClassName("progress_bg")[0];
          const oTip = oAllProgress[index].getElementsByClassName("tip")[0];
          oDot.style.marginLeft =
            ((boardwidth - info.min) / (info.max - info.min)) *
              (oProgressWidth - oDot.offsetWidth) +
            "px";
          oBg.style.width =
            ((boardwidth - info.min) / (info.max - info.min)) *
              (oProgressWidth - oDot.offsetWidth) +
            "px";
          oTip.textContent = boardwidth;
        }
      }
    }
  }

  // 形状(当前画笔形状)
  formBrush(board) {
    // 当前画笔形状
    const oBrush = board.getBrushType();

    const oBrushLists = document.getElementsByClassName("form_button");
    for (let index = 0; index < oBrushLists.length; index++) {
      const oIcon =
        oBrushLists[index].getElementsByClassName("form_button_icon")[0];
      if (oBrushLists[index].getAttribute("data-form") == oBrush) {
        oIcon.classList.add("form_button_icon_active");
      } else {
        oIcon.classList.remove("form_button_icon_active");
      }
    }
  }
  // 所有显示效果清除
  clearShow() {
    const oAllDetail = document.getElementsByClassName("toolbar_tool_detail");
    if (oAllDetail && oAllDetail.length > 0) {
      for (let detail = 0; detail < oAllDetail.length; detail++) {
        oAllDetail[detail].classList.remove("toolbar_tool_detail_visibility");
      }
    }
  }
  // 销毁
  destroy() {
    this.toolbaar.innerHTML = "";
  }
}
