# Web 互动白板 SDK

anyRTC 互动白板提供一整套完整的互动白板解决方案，客户端 SDK 覆盖 iOS、Android、Web 等主流平台，同时提供完整的服务端配套功能，可用于在线教育、在线会议、协作办公、在线互动娱乐等场景。

| 平台    | 版本要求                                  | SDK      | 示例项目                               |
| ------- | ----------------------------------------- | -------- | -------------------------------------- |
| Web     | Chrome 58+Safari 11+ （macOS 10+）        | [前往下载](https://docs.anyrtc.io/download) | [在线体验](https://demos.anyrtc.io/whiteboard-next-demo)                               |
| Android | Android 4.4（SDK API Level 19）及以上版本 | [前往下载](https://docs.anyrtc.io/download) | [Whiteboard-Android](https://github.com/anyrtc/ArWhiteBoard-Android) （Github 开源项目） |
| iOS     | iOS 9.0 及以上版本                        | [前往下载](https://docs.anyrtc.io/download) | [Whiteboard-iOS](https://github.com/anyrtc/ArWhiteBoard-iOS) （Github 开源项目）     |

## 功能概述

anyRTC 互动白板提供以下核心功能：

|功能|描述|
|--|--|
| 互动白板 | 超低延时、实时互动、全球互联的白板房间，支持上传和展示多种格式的文件，提供丰富的白板操作工具，支持多人实时互动。 |
| 白板录制和回放 | 支持云端高保真信令录制，实时记录白板上的所有操作、动态 PPT和自定义事件。支持多端回放，回放时支持前进、倒退、倍速播放，随时随地回看白板实时房间的全部内容。 |
| 文档转图片 | 静态文档转换，支持将 `PPT、PPTX、WORD、PDF` 等格式的文件转换成图片，丰富白板演示素材。 |
| 文档转网页 | 动态文档转换，支持将 `PPTX` 转换成网页，保留原文件中的动画效果、音视频，帮助完整生动呈现信息。 |

## 安装

### CDN 引入

#### unpkg

```
// 最新版本
<script src="https://unpkg.com/ar-whiteboard"></script>
// 指定版本
<script src="https://unpkg.com/ar-whiteboard@VERSION"></script>
```

#### jsdelivr

```
// 最新版本
<script src="https://cdn.jsdelivr.net/npm/ar-whiteboard"></script>
// 指定版本
<script src="https://cdn.jsdelivr.net/npm/ar-whiteboard@VERSION"></script>
```

### `npm` 引入

#### 安装

```bash
npm install ar-whiteboard -D
```
#### 项目导入

```js
import ArWhiteBoard from "ar-whiteboard";
const board = new ArWhiteBoard(initParams);
```

## 类型模块（适用于 Typescript）

对于 Typescript 开发者，我们提供了 `.d.ts` 文件导出详细的类型定义。

```typescript
import ArWhiteBoard, {
  BoardToolType,
  IArBoardInitBaseParams,
  IArBoardInitParams,
  IArBoardInitStyleParams,
  IConfigParameters,
} from "ar-whiteboard";

const board = new ArWhiteBoard(initParams);
```

## 使用

SDK 会在全局导出一个 **ArWhiteBoard** 对象，可以通过 `new` 方法创建一个白板实例。一个白板实例代表一个白板客户端。

```js
// 初始化配置
const initConfig = {
  id: '<DOM_ID>',
  appId: '<APP_ID>',
  userId: '<U_ID>',
  channel: '<CHANNEL_ID>',
  token: '<TOKEN>',
};
const Board = new ArWhiteBoard(initConfig);
```

## 概览

**Board** 实例包含了以下方法：

| **全局事件回调** |  |
| :------------ | :------------ | 
| [add-board](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#add-board) | 添加白板页 |
| [delete-board](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#delete-board) | 删除白板页 |
| [goto-board](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#goto-board) | 白板页切换 |
| [clear-board](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#clear-board) | 清空画板 |
| [reset-board](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#reset-board) | 重置画板 |
| [board-can-redo-status](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#board-can-redo-status) | 当前白板页是否可重做 |
| [board-can-undo-status](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#board-can-undo-status) | 当前白板页是否可撤销 |
| [board-error](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#board-error) | 白板错误回调 |
| [board-scale-change](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#board-scale-change) | 当前白板页缩放比例变化 |
| [board-warning](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#board-warning) | 白板警告回调 |
| [connection-state-change](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#connection-state-change) | 网络状态回调 |
| [board-background-color-change](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#board-background-color-change) | 背景颜色更改 |
| **核心方法** |      |
| [new ArWhiteBoard](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board) | 白板构造函数，创建白板实例 |
| [destroy](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#destroy) | 销毁白板实例 |
| **涂鸦相关方法** |        |
| [clear](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#clear) |  清空当前白板页数据。默认只清除当前白板页的涂鸦，如果 `clearBackground` 参数为 true，则同时清除涂鸦和背景。  |
| [getBrushColor](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getbrushcolor) |  获取画笔颜色。 |
| [getBrushThin](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getbrushthin) |  获取画笔粗细。  |
| [getBrushType](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getbrushtype) |  获取画笔类型。  |
| [getEnable](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getenable) |  获取白板是否可涂鸦。  |
| [getTextColor](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#gettextcolor) |  获取设置的文字颜色。  |
| [getTextSize](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#gettextsize) |  获取设置的文字大小。  |
| [resize](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#resize) |  重新计算白板大小，并渲染。  |
| [setBrushColor](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#setbrushcolor) |  设置画笔颜色。  |
| [setBrushThin](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#setbrushthin) |  设置画笔粗细。  |
| [setBrushType](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#setbrushtype) |  设置画笔工具类型。  |
| [setEnable](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#setenable) |  设置白板是否可涂鸦。  |
| [setTextColor](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#settextcolor) |  设置的文字颜色。  |
| [setTextSize](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#settextsize) |  设置文字的大小。  |
| **白板页相关方法** |         |
| [addBoard](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#addboard) |  添加一页白板并切换到这一页。  |
| [deleteBoard](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#deleteboard) |  删除当前白板页并切换到上一页。  |
| [getBoardList](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getboardlist) |  获取所有文件的白板列表。  |
| [getBoardScale](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getboardscale) |  获取当前白板页缩放比例。  |
| [getBoardSnapshot](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getboardsnapshot) |  获取当前白板页的快照。  |
| [getCurrentBoardId](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getcurrentboardid) |  获取当前白板页 ID。  |
| [getCurrentFileId](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getcurrentfileid) |  获取当前文件 ID。  |
| [getFileBoardList](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getfileboardlist) |  获取指定文件的白板 ID 列表。  |
| [getFileInfo](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getfileinfo) |  获取白板的基本信息。  |
| [gotoBoard](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#gotoboard) |  切换到指定的白板页。  |
| [nextBoard](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#nextboard) |  切换到下一页白板。  |
| [prevBoard](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#prevboard) |  切换到上一页白板。  |
| [reset](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#reset) |  重置白板。  |
| [setBoardScale](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#setboardscale) |  设置当前白板页的缩放大小。  |
| **背景相关方法** |      |
| [getBackgroundColor](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getbackgroundcolor) | 获取当前白板页的背景颜色。 |
| [getGlobalBackgroundColor](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getglobalbackgroundcolor) | 获取全局设置的白板页背景颜色。 |
| [setBackgroundColor](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#setbackgroundcolor) | 设置当前白板页的背景颜色。 |
| [setGlobalBackgroundColor](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#setglobalbackgroundcolor) | 全局设置白板页的背景颜色。 |
| **撤销和恢复相关方法** |      |
| [redo](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#redo) | 画笔重做。 |
| [undo](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#undo) | 撤销画笔。 |
| **其他方法** |      |
| [getVersion](https://docs.anyrtc.io/cn/WhiteBoard/api-ref/whiteboard_web/board#getversion) | 获取 SDK 版本。 |

## 注意事项

### 选择画笔工具，避免使用 `<select>` 标签

因为使用 `<select>` 标签，`document.activeElement` 会变成 `select` 对象，画板会无法捕捉到 `mouseout` 事件，因此会导致激光笔工具再特定情况下移出画板无法删除激光笔。

### 收不到（或者收到多次）回调

- 检查是否在方法调用后监听的回调，确保回调在调用方法之前注册（监听）。
- 如果收到多次回调，检查是否自己封装的方法中多次监听回调方法（正常回调只需要注册一遍）。

### 主持人（老师）和观众（学生）

SDK 没有人员身份的标识和逻辑，客户端可以根据自己的业务需求，结合自己的业务系统配合 SDK uid 进行人员权限分配。

### 橡皮擦

- 可以擦除任何人的画笔痕迹
- 擦除后，该画笔变更为改画笔的临时拥有者，可以对该画笔进行撤销和重做

### 撤销和重做

- 只能撤销和重做自己的画笔
- 如果自己的画笔被其他人移动了，则该笔仅能被该移动者撤销和重做
- 清空白板（或背景）不允许被撤销和重做

### 重置画板

- 重置画板会删除所有画板页，仅保留第一页，但是不保留第一页的涂鸦

### 重连

- 重连时丢失的画笔，SDK 不保存。
- 断网期间进行的绘画，重连后不会同步。