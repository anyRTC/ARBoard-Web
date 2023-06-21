/**
 * 白板相关
 * userid 当前用户uid
 * channelid 房间频道
 * message 消息提示
 */
function boardCorrelation(userid, channelid, message) {
  // 白板
  const board = new ArWhiteBoard({
    id: "myPainter",
    appId: boardSDKConfig.appid,
    userId: userid,
    channel: channelid,
    // 私有云
    serverParams: boardSDKConfig.setParameters,
    baseParams: {
      // 白板显示比例
      ratio: "16:9",
      // 添加背景图片超时时间
      //   imageResourceTimeout: 1000,
    },
  });

  // 白板版本
  message.setOption({
    message: "白板当前版本:" + board.getVersion(),
    type: "info",
    duration: 2000,
  });

  console.log("白板当前版本", board.getVersion());

  // 生成侧边工具栏
  var oSideBar = new ToolBar({
    el: "ToolBarWhiteBoard",
    infolists: config_toolbar,
    board, // 白板 SDK
    message,
  });

  // 显示遮罩层
  maskOptions(true, message);

  // 相关数据判断
  var Store = {
    // 是否可撤销
    undodecide: false,
    // 是否可重做
    redodecide: false,
    // 是否可删除当前白板
    deletedecide: false,
    // 是否可跳转上一页
    prevdecide: false,
    // 是否可跳转下一页
    nextdecide: false,
  };

  /* 白板事件监听 */
  {
    // 历史数据同步(仅初始时执行一次)
    board.on("data-sync-completed", () => {
      maskOptions(false);
      Store = Object.assign(Store, boardInfo(board));
      console.log("历史数据同步", Store);
      disabledStyle("undo", false);
      disabledStyle("redo", false);
    });
    // 网络状态回调
    board.on("connection-state-change", (authState, reason) => {
      console.log("网络状态回调", authState, reason);
    });

    // 白板背景图片加载状态
    board.on("board-image-status-changed", (fileId, boardId, status, data) => {
      console.log("白板背景图片加载状态", status, data);
      switch (status) {
        case 1:
          message.setOption({
            message: "背景图片加载中,请稍等",
            type: "info",
            duration: 2000,
          });
          break;
        case 2:
          message.setOption({
            message: "背景图片加载完成",
            type: "success",
            duration: 2000,
          });
          break;
        case 3:
          message.setOption({
            message: "背景图片加载中断",
            type: "error",
            duration: 2000,
          });
          break;
        case 4:
          message.setOption({
            message: "背景图片加载错误,请再次设置",
            type: "error",
            duration: 2000,
          });
          break;
        case 5:
          message.setOption({
            message: "背景图片加载超时,请再次设置",
            type: "error",
            duration: 2000,
          });
          break;
        case 6:
          message.setOption({
            message: "背景图片取消加载",
            type: "error",
            duration: 2000,
          });
          break;
        default:
          break;
      }
    });
    // 白板数据存档
    board.on("SYNC_DATA", (data) => {
      console.log("BoardEvent.SYNC_DATA ", data);
    });
    // 白板重置回调
    board.on("reset-board", () => {
      console.log("白板重置回调");
      Store = Object.assign(Store, boardInfo(board));
    });
    // 监听添加白板页
    board.on("add-board", (boardIds, fileId) => {
      // console.log("BoardEvent.ADD_BOARD ", fileId, boardIds);
      Store = Object.assign(Store, boardInfo(board));
    });
    // 监听删除白板页
    board.on("delete-board", (boardIds, fileId) => {
      // console.log("BoardEvent.DELETE_BOARD ", fileId, boardIds);
      Store = Object.assign(Store, boardInfo(board));
    });
    // 翻页
    board.on("goto-board", (fileId, boardId) => {
      console.log("BoardEvent.GOTO_BOARD ", fileId, boardId);
      Store = Object.assign(Store, boardInfo(board));
    });

    // 白板清空回调
    board.on("clear-board", (fileId, boardId, clearBackground) => {
      console.log("白板清空回调", fileId, boardId, clearBackground);
    });
    
    // 当前白板宽高比例
    board.on("board-ratio-change",(painterId, ratio) => {
      console.log("当前白板宽高比例", ratio);
      boardDataShow({
        currentBoardRatio: ratio,
      });
    });

    // 当前白板缩放比例
    board.on("board-scale-change", (painterId, scale) => {
      console.log("当前白板缩放比例", scale);
      boardDataShow({
        currentBoardScale: scale,
      });
    });

    // 当前白板是否可以撤销
    board.on("board-can-undo-status", (enable) => {
      // console.log("当前白板是否可以撤销",enable);
      // 禁用样式
      disabledStyle("undo", enable);
      // console.log("BoardEvent.CAN_UNDO_STATUS_CHANGED ", enable);
      Store.undodecide = enable;
    });
    // 当前白板是否可以重做
    board.on("board-can-redo-status", (enable) => {
      // console.log("当前白板是否可以重做",enable);
      // 禁用样式
      disabledStyle("redo", enable);
      Store.redodecide = enable;
    });

    board.on("board-error", (err, errorMessage) => {
      console.log("BoardEvent.ERROR ", err, errorMessage);
      const errMessage = [
        "",
        "缺少参数",
        "服务鉴权失败",
        "历史数据同步失败",
        "鉴权超时",
      ];
      message.setOption({
        message: errMessage[err] || errorMessage,
        type: "error",
        duration: 2000,
      });
    });

    board.on("board-warning", (err, errorMessage) => {
      console.log("BoardEvent.WARNING ", err);
      message.setOption({
        message: errorMessage,
        type: "warning",
        duration: 2000,
      });
    });
  }

  /* 白板操作 */
  {
    // 撤销
    document.querySelector("#undo").onclick = function () {
      if (Store.undodecide) {
        board && board.undo();
      } else {
        message.setOption({
          message: "当前白板页已无操作记录，无法撤销",
          type: "error",
          duration: 2000,
        });
      }
    };
    // 重做
    document.querySelector("#redo").onclick = function () {
      if (Store.redodecide) {
        board && board.redo();
      } else {
        message.setOption({
          message: "当前白板页已无记录，无法重做",
          type: "error",
          duration: 2000,
        });
      }
    };
    // 宽高比例设置
    document.querySelector("#ratio").onclick = function () {
      // 获取白板比例
      const ratio = board.getBoardRatio();

      const ratioValue = document.querySelector("#ratio_value");
      console.log("---", ratio);
      if (ratio == "4:3") {
        board.setBoardRatio("16:9");
        ratioValue.textContent = "16:9";
      }
      if (ratio == "16:9") {
        board.setBoardRatio("4:3");
        ratioValue.textContent = "4:3";
      }
    };
    // 大小重置
    document.querySelector("#reset").onclick = function () {
      let scaleVal = board.getBoardScale();
      if (scaleVal !== 100) {
        board.setBoardScale(100);
        // 更新页面数据
        boardDataShow({
          currentBoardScale: 100,
        });
      } else {
        message.setOption({
          message: "当前白板页比例已重置为100%",
          type: "warning",
          duration: 2000,
        });
      }
    };
    // 缩放比例(最小100%)
    document.querySelector("#minus").onclick = function () {
      // board && board.redo();
      let scaleVal = board.getBoardScale();
      if(scaleVal - 10 >= 100) {
        scaleVal -= 10;
        board.setBoardScale(scaleVal);
        // 更新页面数据
        boardDataShow({
          currentBoardScale: scaleVal,
        });
      } else {
        board.setBoardScale(100);
        // 更新页面数据
        boardDataShow({
          currentBoardScale: 100,
        });
        message.setOption({
          message: "当前白板页最小比例为 100%",
          type: "error",
          duration: 2000,
        });
      }
    };
    // 放大比例(最大300%)
    document.querySelector("#plus").onclick = function () {
      let scaleVal = board.getBoardScale();
      if (scaleVal + 10 <= 300) {
        scaleVal += 10;
        board.setBoardScale(scaleVal);
        // 更新页面数据
        boardDataShow({
          currentBoardScale: scaleVal,
        });
      } else {
        board.setBoardScale(300);
        // 更新页面数据
        boardDataShow({
          currentBoardScale: 300,
        });
        message.setOption({
          message: "当前白板页最大比例为 300%",
          type: "error",
          duration: 2000,
        });
      }
    };

    // 添加白板
    document.querySelector("#add").onclick = function () {
      board.addBoard();
    };
    // 删除白板
    document.querySelector("#delete").onclick = function () {
      if (Store.deletedecide) {
        board.deleteBoard();
      } else {
        message.setOption({
          message: "无法删除第一页白板",
          type: "error",
          duration: 2000,
        });
      }
    };

    // 上一页
    document.querySelector("#prev").onclick = function () {
      if (Store.prevdecide) {
        board.prevBoard();
      } else {
        message.setOption({
          message: "已经是第一页了，没有上一页了",
          type: "warning",
          duration: 2000,
        });
      }
    };
    // 下一页
    document.querySelector("#next").onclick = function () {
      if (Store.nextdecide) {
        board.nextBoard();
      } else {
        message.setOption({
          message: "已经是最后页了，没有下一页了",
          type: "warning",
          duration: 2000,
        });
      }
    };
  }

  // 离开频道
  document.querySelector("#liveuser").onclick = function () {
    // 侧边栏销毁
    oSideBar.destroy();
    board.destroy();
    // 回至登录页面
    pagetoggle(false);
    // 禁止遮罩层
    maskOptions(false, message);
  };

  window.onresize = function () {
    board && board.resize();
  };
}
