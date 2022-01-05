/**
 * 页面初始逻辑：
 * 初始化消息提醒
 * 生成用户名
 * 获取链接中的频道房间
 * 表单校验
 * 切换至白板
 */

window.onload = function () {
  var message = new Message();
  //  用户名:user+随机6个数字
  document.querySelector("#userid").value = "user" + random(6);

  // 链接截取
  const channelid = getQueryVariable("channelid");
  if (channelid) {
    document.querySelector("#channelid").value = channelid;
  }

  // 表单提交按钮状态可用/禁用s
  submitbuttonstate();

  // 点击加入频道
  document.querySelector("#joinChannel").onclick = function () {
    // 校验用户
    const oUser = userverify(document.querySelector("#form_item_user"));
    const oChannel = channelverify(
      document.querySelector("#form_item_channel")
    );
    // 频道与邀请链接不相符
    if (channelid && channelid !== oChannel) {
      console.log("频道与邀请链接不相符");
      message.setOption({
        message: "当前频道与邀请链接不相符，2s 后链接将重置",
        type: "error",
        duration: 2000,
      });
      console.log(window.location);
      setTimeout(function () {
        window.location.href =
          window.location.origin + window.location.pathname;
      }, 2000);
    } else {
      if (oUser && oChannel) {
        // 切换至白板
        pagetoggle();
        // 进入白板
        boardCorrelation(oUser, oChannel, message);
        // 生成房间
        document.querySelector("#invitechannel").value = oChannel;
        // 邀请房间复制
        document.querySelector("#copychannel").onclick = function (e) {
          stopBubble(e);
          copy(oChannel, function () {
            message.setOption({
              message: "复制成功",
              type: "success",
              duration: 2000,
            });
          });
        };
        // 生成邀请链接
        document.querySelector("#invitelink").value =
          window.location.origin +
          window.location.pathname +
          "?channelid=" +
          oChannel;
        // 复制邀请链接
        document.querySelector("#copylink").onclick = function (e) {
          stopBubble(e);
          copy(window.location.href + "?channelid=" + oChannel, function () {
            message.setOption({
              message: "复制成功",
              type: "success",
              duration: 2000,
            });
          });
        };
      }
    }
  };

  // 显示/隐藏邀请分享
  document.querySelector("#inviteuser").onclick = function (e) {
    stopBubble(e);
    const oInviteCopy = document.querySelector("#invite_copy");
    if (oInviteCopy.classList.contains("invite_copy_show")) {
      oInviteCopy.classList.remove("invite_copy_show");
    } else {
      oInviteCopy.classList.add("invite_copy_show");
    }
    oInviteCopy.onclick = function (e) {
      stopBubble(e);
    };
    const oBody = document.getElementsByTagName("body")[0];
    oBody.addEventListener("click", function () {
      oInviteCopy.classList.remove("invite_copy_show");
    });
  };
};
