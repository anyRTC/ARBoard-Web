/**
 * 白板基本设置：
 * 1.白板 SDK 设置
 * 2.白板工具栏设置
 */

// 白板 SDK 配置
var boardSDKConfig = {
  appid: "",
  // 私有云配置
  // setParameters: {
  // ConfPriCloudAddr: {
  //   // 私有云
  //   ServerAdd: "",
  //   Port: 443,
  //   Wss: true,
  // },
  // },
};

// 白板颜色设置
var brushColor = [
  "#1A1A1E",
  "#0089FF",
  "#00E3FF",
  "#31FF88",
  "#FFEA00",
  "#FF6800",
  "#FF001C",
  "#ffffff",
];

/**
 * 白板工具栏设置
 * icon: 工具栏图标
 * tip: 提示
 * brushtooltype: 白板对应的工具类型
 * brushFn: 白板设置工具类型的方法
 * defaultcolor: 默认颜色
 * detail: 内容模块分类
 *
 * type: toolbar封装组件内部所用类型
 * contenttext: 内容模块名称
 *
 * *** progress 类型（进度条）
 * * min: 最小值
 * * max: 最大值
 * * defaultsize: 默认大小
 *
 * *** color 类型（颜色）
 * * detailcolor: 颜色数组
 * * defaultcolor: 默认颜色
 *
 * *** text 类型（文字）
 * * brushtooltype: 白板类型，内部仅封装“清除涂鸦/白板”
 *
 * *** form 类型（形状列表）
 * * detail: 形状列表
 *
 * *** input 类型（输入框）
 * * defaulrvalue: 默认值
 * * placeholder: input占位符
 * * confirmtext: 确认文字更换
 *
 * */
var config_toolbar = [
  {
    icon: "icon-default",
    tip: "鼠标",
    brushtooltype: 0, // 画笔工具类型 NONE
    brushFn: "setBrushType", // 白板对应方法
  },
  {
    icon: "icon-select",
    tip: "图选",
    brushtooltype: 1, // 画笔工具类型 SELECT
    brushFn: "setBrushType", // 白板对应方法
  },
  {
    icon: "icon-pen",
    tip: "涂鸦",
    brushtooltype: 2, // 画笔工具类型 FREE_DRAW
    brushFn: "setBrushType", // 白板对应方法
    detail: [
      {
        type: "progress", // 进度条
        contenttext: "线宽",
        brushFn: "setBrushThin", // 白板对应方法
        defaultsize: 3,
        min: 1,
        max: 10,
      },
      {
        type: "color", // 颜色
        contenttext: "颜色",
        detailcolor: brushColor,
        defaultcolor: brushColor[0], // 画笔默认颜色
        brushFn: "setBrushColor", // 白板对应方法
      },
    ],
  },
  {
    icon: "icon-laser",
    tip: "激光笔",
    brushtooltype: 4, // 画笔工具类型 LASER_POINTER
    brushFn: "setBrushType", // 白板对应方法
  },
  {
    icon: "icon-eraser",
    tip: "橡皮擦",
    brushtooltype: 3, // 画笔工具类型 ERASER
    brushFn: "setBrushType", // 白板对应方法
  },
  {
    icon: "icon-text",
    tip: "文本",
    brushtooltype: 9, // 画笔工具类型 TEXT
    brushFn: "setBrushType", // 白板对应方法
    detail: [
      {
        type: "progress", // 进度条
        contenttext: "字号",
        brushFn: "setTextSize",
        defaultsize: 14,
        min: 10,
        max: 50,
      },
      {
        type: "color", // 颜色
        contenttext: "颜色",
        detailcolor: brushColor,
        defaultcolor: brushColor[0], // 文本默认颜色
        brushFn: "setTextColor", // 白板对应方法
      },
    ],
  },
  {
    icon: "icon-setting",
    tip: "形状",
    brushtooltype: 7, // 画笔工具类型 RECT
    brushFn: "setBrushType", // 白板对应方法
    detail: [
      {
        type: "form", // 形状
        detail: [
          {
            icon: "icon-rect",
            tip: "矩形",
            brushtooltype: 7, // 画笔工具类型 RECT
            brushFn: "setBrushType", // 白板对应方法
          },
          {
            icon: "icon-elipse",
            tip: "椭圆",
            brushtooltype: 8, // 画笔工具类型 ELLIPSE
            brushFn: "setBrushType", // 白板对应方法
          },
          {
            icon: "icon-arrow",
            tip: "箭头",
            brushtooltype: 6, // 画笔工具类型 ARROW
            brushFn: "setBrushType", // 白板对应方法
          },
          {
            icon: "icon-line",
            tip: "直线",
            brushtooltype: 5, // 画笔工具类型 LINE
            brushFn: "setBrushType", // 白板对应方法
          },
        ],
      },
      {
        type: "progress", // 进度条
        contenttext: "线宽",
        brushFn: "setBrushThin", // 白板对应方法
        defaultsize: 3,
        min: 1,
        max: 10,
      },
      {
        type: "color", // 颜色
        contenttext: "颜色",
        detailcolor: brushColor,
        defaultcolor: brushColor[0], // 画笔颜色
        brushFn: "setBrushColor", // 白板对应方法
      },
    ],
  },
  {
    icon: "icon-clear",
    tip: "清除",
    detail: [
      {
        contenttext: "清空涂鸦",
        type: "text",
        brushtooltype: "涂鸦", //
        brushFn: "clear", // 白板对应方法
      },
      {
        contenttext: "清空白板",
        type: "text",
        brushtooltype: "白板", //
        brushFn: "clear", // 白板对应方法
      },
    ],
  },
  {
    icon: "icon-copy",
    tip: "背景",
    detail: [
      {
        type: "color", // 背景颜色
        contenttext: "颜色",
        detailcolor: brushColor,
        // defaultcolor: brushColor[0], // 背景默认颜色
        brushFn: "setBackgroundColor", // 白板对应方法
      },
      {
        type: "input",
        contenttext: "背景图片+填充模式",
        defaulrvalue: "", // 默认背景图片地址
        fillMode: "contain",
        placeholder: "请输入图片地址(https开头)",
        confirmtext: "确认",
        brushFn: "setBackgroundImage",
      },
    ],
  },
];
