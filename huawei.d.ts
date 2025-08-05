/**
 * 华为快游戏 QG 接口类型定义
 * 基于华为开发者文档：https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-runtime-0000001073207031
 */

declare namespace QG {
  /** 基础回调选项接口 */
  interface BaseOptions<R = any, E = string> {
    /** 成功回调函数 */
    success?: (data: R) => void;
    /** 失败回调函数 */
    fail?: (data: E, code?: number) => void;
    /** 完成回调函数（无论成功失败都会执行） */
    complete?: () => void;
  }

  //#region 渲染相关接口
  /** 画布上下文 */
  interface CanvasContext {
    /** 设置填充颜色 */
    fillStyle: string | CanvasGradient | CanvasPattern;
    /** 设置描边颜色 */
    strokeStyle: string | CanvasGradient | CanvasPattern;
    /** 设置线条宽度 */
    lineWidth: number;
    /** 填充矩形 */
    fillRect(x: number, y: number, width: number, height: number): void;
    /** 描边矩形 */
    strokeRect(x: number, y: number, width: number, height: number): void;
    /** 清除矩形区域 */
    clearRect(x: number, y: number, width: number, height: number): void;
    /** 开始路径 */
    beginPath(): void;
    /** 关闭路径 */
    closePath(): void;
    /** 移动到指定点 */
    moveTo(x: number, y: number): void;
    /** 画线到指定点 */
    lineTo(x: number, y: number): void;
    /** 填充路径 */
    fill(): void;
    /** 描边路径 */
    stroke(): void;
    /** 画圆弧 */
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    /** 保存当前状态 */
    save(): void;
    /** 恢复之前保存的状态 */
    restore(): void;
    /** 设置变换矩阵 */
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    /** 变换矩阵 */
    transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    /** 平移 */
    translate(x: number, y: number): void;
    /** 旋转 */
    rotate(angle: number): void;
    /** 缩放 */
    scale(x: number, y: number): void;
  }

  /** 获取画布上下文 */
  function getCanvasContext(canvasId: string): CanvasContext;
  //#endregion

  //#region 系统信息
  /** 系统信息 */
  interface SystemInfo {
    /** 手机品牌 */
    brand?: string;
    /** 手机型号 */
    model?: string;
    /** 设备像素比 */
    pixelRatio?: number;
    /** 屏幕宽度，单位px */
    screenWidth?: number;
    /** 屏幕高度，单位px */
    screenHeight?: number;
    /** 可使用窗口宽度，单位px */
    windowWidth?: number;
    /** 可使用窗口高度，单位px */
    windowHeight?: number;
    /** 系统语言 */
    language?: string;
    /** 系统地区 */
    region?: string;
    /** 系统语言书写方式 */
    script?: string;
    /** 渲染引擎版本号 */
    coreVersion?: string;
    /** 渲染引擎版本号（兼容字段） */
    COREVersion?: string;
    /** 操作系统版本 */
    system?: string;
    /** 客户端平台 */
    platform?: string;
    /** 快应用中心版本 */
    version?: string;
    /** 状态栏高度，单位px */
    statusBarHeight?: number;
    /** 运行平台版本名称 */
    platformVersionName?: string;
    /** 运行平台标准版本号 */
    platformVersionCode?: number;
    /** 安全区域信息 */
    safeArea?: SafeArea;
  }

  /** 安全区域信息 */
  interface SafeArea {
    /** 安全区域上边界坐标 */
    top?: number;
    /** 安全区域下边界坐标 */
    bottom?: number;
    /** 安全区域左边界坐标 */
    left?: number;
    /** 安全区域右边界坐标 */
    right?: number;
    /** 安全区域宽度 */
    width?: number;
    /** 安全区域高度 */
    height?: number;
  }

  /** 获取系统信息（同步） */
  function getSystemInfoSync(): SystemInfo;

  /** 获取系统信息（异步） */
  function getSystemInfo(options: BaseOptions<SystemInfo>): void;

  /** 启动参数 */
  interface LaunchOptions {
    /** 启动路径 */
    path?: string;
    /** 启动参数 */
    query?: Record<string, string>;
    /** 场景值 */
    scene?: number;
    /** 来源信息 */
    referrerInfo?: {
      /** 来源快游戏的包名 */
      packageName?: string;
      /** 来源快游戏传递的数据 */
      extraData?: any;
    };
  }

  /** 获取启动参数（同步） */
  function getLaunchOptionsSync(): LaunchOptions;
  //#endregion

  //#region 生命周期
  /** 退出当前快游戏 */
  function exitApplication(options?: BaseOptions<void>): void;

  /** 监听快游戏显示事件 */
  function onShow(callback: (options: LaunchOptions) => void): void;

  /** 取消监听快游戏显示事件 */
  function offShow(callback?: (options: LaunchOptions) => void): void;

  /** 监听快游戏隐藏事件 */
  function onHide(callback: () => void): void;

  /** 取消监听快游戏隐藏事件 */
  function offHide(callback?: () => void): void;

  /** 监听快游戏错误事件 */
  function onError(callback: (error: string) => void): void;

  /** 取消监听快游戏错误事件 */
  function offError(callback?: (error: string) => void): void;
  //#endregion

  //#region 设备相关
  /** 设备信息 */
  interface DeviceInfo {
    /** 设备品牌 */
    brand: string;
    /** 设备型号 */
    model: string;
    /** 设备像素比 */
    pixelRatio: number;
    /** 屏幕宽度 */
    screenWidth: number;
    /** 屏幕高度 */
    screenHeight: number;
  }

  /** 获取设备信息 */
  function getDeviceInfo(options: BaseOptions<DeviceInfo>): void;

  /** 震动参数 */
  interface VibrateOptions extends BaseOptions<void> {
    /** 震动时长，单位ms */
    duration?: number;
  }

  /** 短震动 */
  function vibrateShort(options?: BaseOptions<void>): void;

  /** 长震动 */
  function vibrateLong(options?: BaseOptions<void>): void;

  /** 自定义震动 */
  function vibrate(options: VibrateOptions): void;

  /** 剪贴板数据 */
  interface ClipboardData {
    /** 剪贴板内容 */
    data: string;
  }

  /** 设置剪贴板参数 */
  interface SetClipboardDataOptions extends BaseOptions<void> {
    /** 需要设置的内容 */
    data: string;
  }

  /** 获取系统剪贴板内容 */
  function getClipboardData(options: BaseOptions<ClipboardData>): void;

  /** 设置系统剪贴板内容 */
  function setClipboardData(options: SetClipboardDataOptions): void;

  /** 屏幕亮度参数 */
  interface ScreenBrightnessOptions extends BaseOptions<void> {
    /** 屏幕亮度值，范围 0-1 */
    value: number;
  }

  /** 设置屏幕亮度 */
  function setScreenBrightness(options: ScreenBrightnessOptions): void;

  /** 获取屏幕亮度 */
  function getScreenBrightness(options: BaseOptions<{ value: number }>): void;

  /** 设置是否保持常亮状态 */
  function setKeepScreenOn(options: BaseOptions<void> & { keepScreenOn: boolean }): void;
  //#endregion

  //#region 界面交互
  /** 模态对话框选项 */
  interface ShowModalOptions extends BaseOptions<ShowModalResult> {
    /** 提示的标题 */
    title?: string;
    /** 提示的内容 */
    content?: string;
    /** 是否显示取消按钮 */
    showCancel?: boolean;
    /** 取消按钮的文字，最多4个字符 */
    cancelText?: string;
    /** 取消按钮的文字颜色，16进制格式 */
    cancelColor?: string;
    /** 确认按钮的文字，最多4个字符 */
    confirmText?: string;
    /** 确认按钮的文字颜色，16进制格式 */
    confirmColor?: string;
  }

  /** 模态对话框结果 */
  interface ShowModalResult {
    /** 是否点击了确认按钮 */
    confirm?: boolean;
    /** 是否点击了取消按钮 */
    cancel?: boolean;
  }

  /** 显示模态对话框 */
  function showModal(options: ShowModalOptions): void;

  /** 消息提示框选项 */
  interface ShowToastOptions extends BaseOptions<void> {
    /** 提示的内容 */
    title?: string;
    /** 图标类型：success/loading/none */
    icon?: 'success' | 'loading' | 'none';
    /** 自定义图标的本地路径 */
    image?: string;
    /** 提示的延迟时间，单位毫秒 */
    duration?: number;
    /** 是否显示透明蒙层，防止触摸穿透 */
    mask?: boolean;
    /** 提示内容（1078+版本支持） */
    message?: string;
  }

  /** 显示消息提示框 */
  function showToast(options: ShowToastOptions): void;

  /** 隐藏消息提示框 */
  function hideToast(options?: BaseOptions<void>): void;

  /** 加载提示框选项 */
  interface ShowLoadingOptions extends BaseOptions<{ cancel: boolean }> {
    /** 提示的内容 */
    title: string;
    /** 是否显示透明蒙层 */
    mask?: boolean;
  }

  /** 显示加载提示框 */
  function showLoading(options: ShowLoadingOptions): void;

  /** 隐藏加载提示框 */
  function hideLoading(options?: BaseOptions<void>): void;

  /** 操作菜单选项 */
  interface ShowActionSheetOptions extends BaseOptions<{ tapIndex: number }> {
    /** 按钮的文字数组，数组长度最大为6 */
    itemList: string[];
    /** 按钮的颜色 */
    itemColor?: string;
  }

  /** 显示操作菜单 */
  function showActionSheet(options: ShowActionSheetOptions): void;
  //#endregion

  //#region 文件系统
  /** 文件信息 */
  interface FileStats {
    /** 文件的类型和存取的权限 */
    mode: number;
    /** 文件大小，单位：B */
    size: number;
    /** 文件最近一次被存取或被执行的时间 */
    lastAccessedTime: number;
    /** 文件最后一次被修改的时间 */
    lastModifiedTime: number;
    /** 判断当前文件是否一个目录 */
    isDirectory(): boolean;
    /** 判断当前文件是否一个普通文件 */
    isFile(): boolean;
  }

  /** 文件管理器 */
  interface FileSystemManager {
    /** 读取本地文件内容 */
    readFile(options: {
      /** 要读取的文件的路径 */
      filePath: string;
      /** 指定读取文件的字符编码 */
      encoding?: string;
      /** 成功回调 */
      success?: (res: { data: string | ArrayBuffer }) => void;
      /** 失败回调 */
      fail?: (err: any) => void;
      /** 完成回调 */
      complete?: () => void;
    }): void;

    /** 写文件 */
    writeFile(options: {
      /** 要写入的文件路径 */
      filePath: string;
      /** 要写入的文本或二进制数据 */
      data: string | ArrayBuffer;
      /** 指定写入文件的字符编码 */
      encoding?: string;
      /** 成功回调 */
      success?: () => void;
      /** 失败回调 */
      fail?: (err: any) => void;
      /** 完成回调 */
      complete?: () => void;
    }): void;

    /** 删除文件 */
    unlink(options: {
      /** 要删除的文件路径 */
      filePath: string;
      /** 成功回调 */
      success?: () => void;
      /** 失败回调 */
      fail?: (err: any) => void;
      /** 完成回调 */
      complete?: () => void;
    }): void;

    /** 获取文件信息 */
    stat(options: {
      /** 文件/目录路径 */
      path: string;
      /** 成功回调 */
      success?: (res: { stats: FileStats }) => void;
      /** 失败回调 */
      fail?: (err: any) => void;
      /** 完成回调 */
      complete?: () => void;
    }): void;

    /** 创建目录 */
    mkdir(options: {
      /** 创建的目录路径 */
      dirPath: string;
      /** 是否在递归创建该目录的上级目录后再创建该目录 */
      recursive?: boolean;
      /** 成功回调 */
      success?: () => void;
      /** 失败回调 */
      fail?: (err: any) => void;
      /** 完成回调 */
      complete?: () => void;
    }): void;

    /** 删除目录 */
    rmdir(options: {
      /** 要删除的目录路径 */
      dirPath: string;
      /** 是否递归删除目录 */
      recursive?: boolean;
      /** 成功回调 */
      success?: () => void;
      /** 失败回调 */
      fail?: (err: any) => void;
      /** 完成回调 */
      complete?: () => void;
    }): void;

    /** 读取目录内文件列表 */
    readdir(options: {
      /** 要读取的目录路径 */
      dirPath: string;
      /** 成功回调 */
      success?: (res: { files: string[] }) => void;
      /** 失败回调 */
      fail?: (err: any) => void;
      /** 完成回调 */
      complete?: () => void;
    }): void;

    /** 判断文件/目录是否存在 */
    access(options: {
      /** 要判断是否存在的文件/目录路径 */
      path: string;
      /** 成功回调 */
      success?: () => void;
      /** 失败回调 */
      fail?: (err: any) => void;
      /** 完成回调 */
      complete?: () => void;
    }): void;

    /** 重命名文件 */
    rename(options: {
      /** 源文件路径 */
      oldPath: string;
      /** 新文件路径 */
      newPath: string;
      /** 成功回调 */
      success?: () => void;
      /** 失败回调 */
      fail?: (err: any) => void;
      /** 完成回调 */
      complete?: () => void;
    }): void;

    /** 复制文件 */
    copyFile(options: {
      /** 源文件路径 */
      srcPath: string;
      /** 目标文件路径 */
      destPath: string;
      /** 成功回调 */
      success?: () => void;
      /** 失败回调 */
      fail?: (err: any) => void;
      /** 完成回调 */
      complete?: () => void;
    }): void;
  }

  /** 获取文件管理器 */
  function getFileSystemManager(): FileSystemManager;
  //#endregion

  //#region 多线程Worker
  /** Worker实例 */
  interface Worker {
    /** 向worker发送消息 */
    postMessage(message: any): void;
    /** 监听worker发送的消息 */
    onMessage(callback: (message: any) => void): void;
    /** 监听worker错误事件 */
    onError(callback: (error: any) => void): void;
    /** 结束worker */
    terminate(): void;
  }

  /** 创建Worker */
  function createWorker(scriptPath: string): Worker;
  //#endregion

  //#region 开放能力 - 账号
  /** 账号登录选项 */
  interface GameLoginOptions extends BaseOptions<GameLoginResult> {
    /** 强制登录标识，固定传入"1" */
    forceLogin: 1;
    /** 应用ID */
    appid: string;
  }

  /** 账号登录结果 */
  interface GameLoginResult {
    /** 账号ID */
    playerId: string;
    /** 用户昵称 */
    displayName: string;
    /** 玩家等级 */
    playerLevel: number;
    /** 是否需要鉴权 */
    isAuth: number;
    /** 时间戳 */
    ts: string;
    /** 游戏鉴权签名 */
    gameAuthSign: string;
  }

  /** 游戏登录 */
  function gameLogin(options: GameLoginOptions): void;

  /** 防沉迷登录选项 */
  interface GameLoginWithRealOptions extends BaseOptions<GameLoginWithRealResult> {
    /** 强制登录标识，固定传入"1" */
    forceLogin: 1;
    /** 应用ID */
    appid: string;
  }

  /** 防沉迷登录结果 */
  interface GameLoginWithRealResult {
    /** 账号ID */
    playerId: string;
    /** 用户昵称 */
    displayName: string;
    /** 玩家等级 */
    playerLevel: number;
    /** 时间戳 */
    ts: string;
    /** 游戏鉴权签名 */
    gameAuthSign: string;
    /** 高清头像链接 */
    hiResImageUri: string;
    /** 头像链接 */
    imageUri: string;
  }

  /** 防沉迷游戏登录 */
  function gameLoginWithReal(options: GameLoginWithRealOptions): void;

  /** 保存玩家信息选项 */
  interface SavePlayerInfoOptions extends BaseOptions<number> {
    /** 应用ID */
    appid: string;
    /** 游戏等级 */
    rank?: string;
    /** 角色名称 */
    role?: string;
    /** 游戏区服 */
    area?: string;
    /** 游戏公会 */
    sociaty?: string;
  }

  /** 保存玩家信息 */
  function savePlayerInfo(options: SavePlayerInfoOptions): void;

  /** 防沉迷保存玩家信息选项 */
  interface SavePlayerInfoWithRealOptions extends BaseOptions<{ code: number }> {
    /** 游戏等级 */
    rank?: string;
    /** 角色名称 */
    role?: string;
    /** 游戏区服 */
    area?: string;
    /** 游戏公会 */
    sociaty?: string;
  }

  /** 防沉迷保存玩家信息 */
  function savePlayerInfoWithReal(options: SavePlayerInfoWithRealOptions): void;

  /** 获取缓存的玩家ID */
  function getCachePlayerId(options: BaseOptions<{ playerId: string }>): void;
  //#endregion

  //#region 开放能力 - 支付
  /** 支付参数 */
  interface PaymentOptions extends BaseOptions<PaymentResult> {
    /** 商品ID */
    productId: string;
    /** 商品类型：consumable消耗型，non_consumable非消耗型 */
    productType: 'consumable' | 'non_consumable';
    /** 商品价格，单位分 */
    price: number;
    /** 商品名称 */
    productName: string;
    /** 商品描述 */
    productDesc?: string;
    /** 开发者自定义订单号 */
    developerPayload?: string;
  }

  /** 支付结果 */
  interface PaymentResult {
    /** 支付结果码 */
    resultCode: number;
    /** 订单号 */
    orderId: string;
    /** 支付凭证 */
    purchaseToken: string;
    /** 商品ID */
    productId: string;
    /** 开发者自定义订单号 */
    developerPayload?: string;
  }

  /** 发起支付 */
  function pay(options: PaymentOptions): void;

  /** 查询商品信息选项 */
  interface QueryProductOptions extends BaseOptions<QueryProductResult> {
    /** 商品ID列表 */
    productIds: string[];
  }

  /** 商品信息 */
  interface ProductInfo {
    /** 商品ID */
    productId: string;
    /** 商品类型 */
    productType: 'consumable' | 'non_consumable';
    /** 商品价格，单位分 */
    price: number;
    /** 商品名称 */
    productName: string;
    /** 商品描述 */
    productDesc: string;
    /** 货币代码 */
    currency: string;
  }

  /** 查询商品信息结果 */
  interface QueryProductResult {
    /** 商品信息列表 */
    products: ProductInfo[];
  }

  /** 查询商品信息 */
  function queryProduct(options: QueryProductOptions): void;

  /** 查询购买记录选项 */
  interface QueryPurchaseOptions extends BaseOptions<QueryPurchaseResult> {
    /** 商品类型 */
    productType?: 'consumable' | 'non_consumable';
  }

  /** 购买记录 */
  interface PurchaseRecord {
    /** 订单号 */
    orderId: string;
    /** 商品ID */
    productId: string;
    /** 购买时间戳 */
    purchaseTime: number;
    /** 支付凭证 */
    purchaseToken: string;
    /** 开发者自定义订单号 */
    developerPayload?: string;
  }

  /** 查询购买记录结果 */
  interface QueryPurchaseResult {
    /** 购买记录列表 */
    purchases: PurchaseRecord[];
  }

  /** 查询购买记录 */
  function queryPurchase(options: QueryPurchaseOptions): void;

  /** 消费商品选项 */
  interface ConsumeProductOptions extends BaseOptions<void> {
    /** 支付凭证 */
    purchaseToken: string;
  }

  /** 消费商品 */
  function consumeProduct(options: ConsumeProductOptions): void;
  //#endregion

  //#region 开放能力 - 系统分享
  /** 系统分享选项 */
  interface SystemShareOptions extends BaseOptions<void> {
    /** 分享类型：text文本，image图片，file文件 */
    type: 'text' | 'image' | 'file';
    /** 分享标题 */
    title?: string;
    /** 分享内容 */
    content?: string;
    /** 分享图片路径（type为image时必填） */
    imagePath?: string;
    /** 分享文件路径（type为file时必填） */
    filePath?: string;
  }

  /** 系统分享 */
  function systemShare(options: SystemShareOptions): void;
  //#endregion

  //#region 开放能力 - 第三方分享
  /** 第三方分享选项 */
  interface ThirdPartyShareOptions extends BaseOptions<void> {
    /** 分享平台：wechat微信，qq QQ，weibo微博 */
    platform: 'wechat' | 'qq' | 'weibo';
    /** 分享类型：text文本，image图片，webpage网页 */
    type: 'text' | 'image' | 'webpage';
    /** 分享标题 */
    title?: string;
    /** 分享描述 */
    description?: string;
    /** 分享图片路径 */
    imagePath?: string;
    /** 分享网页链接（type为webpage时必填） */
    webpageUrl?: string;
  }

  /** 第三方分享 */
  function thirdPartyShare(options: ThirdPartyShareOptions): void;

  /** 检查第三方分享平台是否可用选项 */
  interface CheckSharePlatformOptions extends BaseOptions<{ available: boolean }> {
    /** 分享平台 */
    platform: 'wechat' | 'qq' | 'weibo';
  }

  /** 检查第三方分享平台是否可用 */
  function checkSharePlatform(options: CheckSharePlatformOptions): void;
  //#endregion

  //#region 开放能力 - 弹出APK游戏安装页
  /** 弹出APK游戏安装页选项 */
  interface ShowApkInstallOptions extends BaseOptions<void> {
    /** APK包名 */
    packageName: string;
    /** APK下载链接 */
    downloadUrl: string;
    /** 游戏名称 */
    gameName?: string;
    /** 游戏图标链接 */
    gameIcon?: string;
    /** 游戏描述 */
    gameDesc?: string;
  }

  /** 弹出APK游戏安装页 */
  function showApkInstall(options: ShowApkInstallOptions): void;
  //#endregion

  //#region 开放能力 - 打开APK游戏预约页
  /** 打开APK游戏预约页选项 */
  interface ShowApkReservationOptions extends BaseOptions<void> {
    /** APK包名 */
    packageName: string;
    /** 游戏名称 */
    gameName?: string;
    /** 游戏图标链接 */
    gameIcon?: string;
    /** 游戏描述 */
    gameDesc?: string;
    /** 预约链接 */
    reservationUrl?: string;
  }

  /** 打开APK游戏预约页 */
  function showApkReservation(options: ShowApkReservationOptions): void;
  //#endregion

  //#region 开放能力 - 设置
  /** 打开设置页选项 */
  interface OpenSettingsOptions extends BaseOptions<void> {
    /** 设置页类型：app应用设置，system系统设置 */
    type?: 'app' | 'system';
  }

  /** 打开设置页 */
  function openSettings(options?: OpenSettingsOptions): void;

  /** 获取设置信息选项 */
  interface GetSettingsOptions extends BaseOptions<SettingsInfo> {}

  /** 设置信息 */
  interface SettingsInfo {
    /** 是否允许通知 */
    notificationEnabled: boolean;
    /** 是否允许位置权限 */
    locationEnabled: boolean;
    /** 是否允许相机权限 */
    cameraEnabled: boolean;
    /** 是否允许麦克风权限 */
    microphoneEnabled: boolean;
  }

  /** 获取设置信息 */
  function getSettings(options?: GetSettingsOptions): void;
  //#endregion

  //#region 开放能力 - 设备标识符
  /** 获取设备标识符选项 */
  interface GetDeviceIdOptions extends BaseOptions<DeviceIdInfo> {}

  /** 设备标识符信息 */
  interface DeviceIdInfo {
    /** 设备唯一标识符 */
    deviceId: string;
    /** 广告标识符 */
    advertisingId?: string;
    /** 是否限制广告跟踪 */
    limitAdTracking?: boolean;
  }

  /** 获取设备标识符 */
  function getDeviceId(options?: GetDeviceIdOptions): void;

  /** 同步获取设备标识符 */
  function getDeviceIdSync(): DeviceIdInfo;
  //#endregion

  //#region 开放能力 - 桌面图标
  /** 创建桌面图标选项 */
  interface CreateDesktopIconOptions extends BaseOptions<void> {
    /** 图标名称 */
    name: string;
    /** 图标路径 */
    iconPath: string;
    /** 跳转链接 */
    targetUrl?: string;
  }

  /** 创建桌面图标 */
  function createDesktopIcon(options: CreateDesktopIconOptions): void;

  /** 检查桌面图标是否存在选项 */
  interface HasDesktopIconOptions extends BaseOptions<{ hasIcon: boolean }> {}

  /** 检查桌面图标是否存在 */
  function hasDesktopIcon(options?: HasDesktopIconOptions): void;
  //#endregion

  //#region 开放能力 - 获取厂商标识
  /** 获取厂商标识选项 */
  interface GetVendorIdOptions extends BaseOptions<VendorIdInfo> {}

  /** 厂商标识信息 */
  interface VendorIdInfo {
    /** 厂商标识 */
    vendorId: string;
    /** 厂商名称 */
    vendorName: string;
  }

  /** 获取厂商标识 */
  function getVendorId(options?: GetVendorIdOptions): void;

  /** 同步获取厂商标识 */
  function getVendorIdSync(): VendorIdInfo;
  //#endregion

  //#region 开放能力 - 日历事件
  /** 添加日历事件选项 */
  interface AddCalendarEventOptions extends BaseOptions<void> {
    /** 事件标题 */
    title: string;
    /** 事件描述 */
    description?: string;
    /** 开始时间戳 */
    startTime: number;
    /** 结束时间戳 */
    endTime: number;
    /** 事件位置 */
    location?: string;
    /** 是否全天事件 */
    allDay?: boolean;
    /** 提醒时间（分钟） */
    reminder?: number;
  }

  /** 添加日历事件 */
  function addCalendarEvent(options: AddCalendarEventOptions): void;

  /** 查询日历事件选项 */
  interface QueryCalendarEventOptions extends BaseOptions<CalendarEventResult> {
    /** 开始时间戳 */
    startTime: number;
    /** 结束时间戳 */
    endTime: number;
  }

  /** 日历事件信息 */
  interface CalendarEvent {
    /** 事件ID */
    eventId: string;
    /** 事件标题 */
    title: string;
    /** 事件描述 */
    description?: string;
    /** 开始时间戳 */
    startTime: number;
    /** 结束时间戳 */
    endTime: number;
    /** 事件位置 */
    location?: string;
    /** 是否全天事件 */
    allDay: boolean;
  }

  /** 日历事件查询结果 */
  interface CalendarEventResult {
    /** 事件列表 */
    events: CalendarEvent[];
  }

  /** 查询日历事件 */
  function queryCalendarEvent(options: QueryCalendarEventOptions): void;
  //#endregion

  //#region 开放能力 - 近场联机
  /** 创建近场联机房间选项 */
  interface CreateNearbyRoomOptions extends BaseOptions<NearbyRoomResult> {
    /** 房间名称 */
    roomName: string;
    /** 最大玩家数 */
    maxPlayers: number;
    /** 房间密码 */
    password?: string;
    /** 自定义房间数据 */
    customData?: any;
  }

  /** 近场联机房间信息 */
  interface NearbyRoomInfo {
    /** 房间ID */
    roomId: string;
    /** 房间名称 */
    roomName: string;
    /** 当前玩家数 */
    currentPlayers: number;
    /** 最大玩家数 */
    maxPlayers: number;
    /** 是否有密码 */
    hasPassword: boolean;
    /** 自定义房间数据 */
    customData?: any;
  }

  /** 近场联机房间结果 */
  interface NearbyRoomResult {
    /** 房间信息 */
    room: NearbyRoomInfo;
  }

  /** 创建近场联机房间 */
  function createNearbyRoom(options: CreateNearbyRoomOptions): void;

  /** 搜索近场联机房间选项 */
  interface SearchNearbyRoomOptions extends BaseOptions<{ rooms: NearbyRoomInfo[] }> {}

  /** 搜索近场联机房间 */
  function searchNearbyRoom(options?: SearchNearbyRoomOptions): void;

  /** 加入近场联机房间选项 */
  interface JoinNearbyRoomOptions extends BaseOptions<NearbyRoomResult> {
    /** 房间ID */
    roomId: string;
    /** 房间密码 */
    password?: string;
  }

  /** 加入近场联机房间 */
  function joinNearbyRoom(options: JoinNearbyRoomOptions): void;

  /** 离开近场联机房间选项 */
  interface LeaveNearbyRoomOptions extends BaseOptions<void> {}

  /** 离开近场联机房间 */
  function leaveNearbyRoom(options?: LeaveNearbyRoomOptions): void;

  /** 发送近场联机消息选项 */
  interface SendNearbyMessageOptions extends BaseOptions<void> {
    /** 消息内容 */
    message: any;
    /** 目标玩家ID，不传则广播给所有玩家 */
    targetPlayerId?: string;
  }

  /** 发送近场联机消息 */
  function sendNearbyMessage(options: SendNearbyMessageOptions): void;

  /** 近场联机消息数据 */
  interface NearbyMessageData {
    /** 发送者玩家ID */
    fromPlayerId: string;
    /** 消息内容 */
    message: any;
    /** 时间戳 */
    timestamp: number;
  }

  /** 监听近场联机消息 */
  function onNearbyMessage(callback: (data: NearbyMessageData) => void): void;

  /** 取消监听近场联机消息 */
  function offNearbyMessage(callback?: (data: NearbyMessageData) => void): void;
  //#endregion

  //#region 开放能力 - 碰一碰分享
  /** 碰一碰分享选项 */
  interface TouchShareOptions extends BaseOptions<void> {
    /** 分享标题 */
    title: string;
    /** 分享描述 */
    description?: string;
    /** 分享图片路径 */
    imagePath?: string;
    /** 分享链接 */
    url?: string;
    /** 自定义数据 */
    customData?: any;
  }

  /** 碰一碰分享 */
  function touchShare(options: TouchShareOptions): void;

  /** 监听碰一碰分享接收 */
  function onTouchShareReceive(callback: (data: {
    /** 分享标题 */
    title: string;
    /** 分享描述 */
    description?: string;
    /** 分享图片路径 */
    imagePath?: string;
    /** 分享链接 */
    url?: string;
    /** 自定义数据 */
    customData?: any;
  }) => void): void;

  /** 取消监听碰一碰分享接收 */
  function offTouchShareReceive(callback?: (data: any) => void): void;

  /** 检查碰一碰功能是否可用选项 */
  interface CheckTouchShareOptions extends BaseOptions<{ available: boolean }> {}

  /** 检查碰一碰功能是否可用 */
  function checkTouchShare(options?: CheckTouchShareOptions): void;
  //#endregion

  //#region 分包加载
  /** 加载分包选项 */
  interface LoadSubpackageOptions extends BaseOptions<void> {
    /** 分包的名字 */
    name: string;
  }

  /** 加载分包 */
  function loadSubpackage(options: LoadSubpackageOptions): LoadSubpackageTask;

  /** 加载分包任务 */
  interface LoadSubpackageTask {
    /** 监听分包加载进度变化事件 */
    onProgressUpdate(callback: (res: {
      /** 分包下载进度百分比 */
      progress: number;
      /** 预期需要下载的数据长度，单位 Bytes */
      totalBytesExpectedToWrite: number;
      /** 已经下载的数据长度，单位 Bytes */
      totalBytesWritten: number;
    }) => void): void;
  }
  //#endregion

  //#region 性能
  /** 性能监控 */
  interface Performance {
    /** 获取当前时间戳 */
    now(): number;
    /** 获取性能条目 */
    getEntries(): PerformanceEntry[];
    /** 根据名称获取性能条目 */
    getEntriesByName(name: string, type?: string): PerformanceEntry[];
    /** 根据类型获取性能条目 */
    getEntriesByType(type: string): PerformanceEntry[];
  }

  /** 性能条目 */
  interface PerformanceEntry {
    /** 条目名称 */
    name: string;
    /** 条目类型 */
    entryType: string;
    /** 开始时间 */
    startTime: number;
    /** 持续时间 */
    duration: number;
  }

  /** 获取性能管理器 */
  function getPerformance(): Performance;
  //#endregion

  //#region 定时器
  /** 设置定时器 */
  function setTimeout(callback: () => void, delay?: number): number;

  /** 清除定时器 */
  function clearTimeout(timeoutID: number): void;

  /** 设置间隔定时器 */
  function setInterval(callback: () => void, delay?: number): number;

  /** 清除间隔定时器 */
  function clearInterval(intervalID: number): void;
  //#endregion

  //#region 位置
  /** 位置信息 */
  interface LocationInfo {
    /** 纬度，范围为-90~90，负数表示南纬 */
    latitude: number;
    /** 经度，范围为-180~180，负数表示西经 */
    longitude: number;
    /** 速度，单位m/s */
    speed: number;
    /** 位置的精确度 */
    accuracy: number;
    /** 高度，单位m */
    altitude: number;
    /** 垂直精度，单位m */
    verticalAccuracy: number;
    /** 水平精度，单位m */
    horizontalAccuracy: number;
  }

  /** 获取位置选项 */
  interface GetLocationOptions extends BaseOptions<LocationInfo> {
    /** 位置类型：wgs84/gcj02 */
    type?: 'wgs84' | 'gcj02';
    /** 传入true会返回高度信息 */
    altitude?: boolean;
  }

  /** 获取当前位置 */
  function getLocation(options: GetLocationOptions): void;

  /** 选择位置选项 */
  interface ChooseLocationOptions extends BaseOptions<{
    /** 位置名称 */
    name: string;
    /** 详细地址 */
    address: string;
    /** 纬度 */
    latitude: number;
    /** 经度 */
    longitude: number;
  }> { }

  /** 选择位置 */
  function chooseLocation(options: ChooseLocationOptions): void;

  /** 打开位置选项 */
  interface OpenLocationOptions extends BaseOptions<void> {
    /** 纬度 */
    latitude: number;
    /** 经度 */
    longitude: number;
    /** 缩放比例 */
    scale?: number;
    /** 位置名 */
    name?: string;
    /** 地址 */
    address?: string;
  }

  /** 打开位置 */
  function openLocation(options: OpenLocationOptions): void;
  //#endregion

  //#region 数据存储
  /** 存储数据选项 */
  interface SetStorageOptions extends BaseOptions<void> {
    /** 本地缓存中指定的key */
    key: string;
    /** 需要存储的内容 */
    data: any;
  }

  /** 存储数据 */
  function setStorage(options: SetStorageOptions): void;

  /** 同步存储数据 */
  function setStorageSync(key: string, data: any): void;

  /** 获取数据选项 */
  interface GetStorageOptions extends BaseOptions<{ data: any }> {
    /** 本地缓存中指定的key */
    key: string;
  }

  /** 获取数据 */
  function getStorage(options: GetStorageOptions): void;

  /** 同步获取数据 */
  function getStorageSync(key: string): any;

  /** 删除数据选项 */
  interface RemoveStorageOptions extends BaseOptions<void> {
    /** 本地缓存中指定的key */
    key: string;
  }

  /** 删除数据 */
  function removeStorage(options: RemoveStorageOptions): void;

  /** 同步删除数据 */
  function removeStorageSync(key: string): void;

  /** 清理本地数据缓存 */
  function clearStorage(options?: BaseOptions<void>): void;

  /** 同步清理本地数据缓存 */
  function clearStorageSync(): void;

  /** 获取存储信息 */
  function getStorageInfo(options: BaseOptions<{
    /** 当前storage中所有的key */
    keys: string[];
    /** 当前占用的空间大小, 单位KB */
    currentSize: number;
    /** 限制的空间大小，单位KB */
    limitSize: number;
  }>): void;

  /** 同步获取存储信息 */
  function getStorageInfoSync(): {
    keys: string[];
    currentSize: number;
    limitSize: number;
  };
  //#endregion

  //#region 网络
  /** 网络请求选项 */
  interface RequestOptions extends BaseOptions<{
    /** 开发者服务器返回的数据 */
    data: string | object | ArrayBuffer;
    /** 开发者服务器返回的HTTP状态码 */
    statusCode: number;
    /** 开发者服务器返回的HTTP Response Header */
    header: object;
    /** 网络请求过程中一些调试信息 */
    profile?: object;
  }> {
    /** 开发者服务器接口地址 */
    url: string;
    /** 请求的参数 */
    data?: string | object | ArrayBuffer;
    /** 设置请求的header，header中不能设置Referer */
    header?: object;
    /** HTTP请求方法 */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE';
    /** 返回的数据格式 */
    dataType?: 'json' | 'text' | 'base64' | 'arraybuffer';
    /** 响应的数据类型 */
    responseType?: 'text' | 'arraybuffer';
    /** 超时时间，单位为毫秒 */
    timeout?: number;
  }

  /** 发起网络请求 */
  function request(options: RequestOptions): RequestTask;

  /** 请求任务 */
  interface RequestTask {
    /** 中断请求任务 */
    abort(): void;
    /** 监听HTTP Response Header事件 */
    onHeadersReceived(callback: (result: { header: object }) => void): void;
    /** 取消监听HTTP Response Header事件 */
    offHeadersReceived(callback?: (result: { header: object }) => void): void;
  }

  /** 获取网络类型 */
  function getNetworkType(options: BaseOptions<{
    /** 网络类型 */
    networkType: 'wifi' | '2g' | '3g' | '4g' | '5g' | 'unknown' | 'none';
    /** 是否计费网络 */
    isConnected: boolean;
  }>): void;

  /** 监听网络状态变化事件 */
  function onNetworkStatusChange(callback: (result: {
    /** 当前是否有网络连接 */
    isConnected: boolean;
    /** 网络类型 */
    networkType: 'wifi' | '2g' | '3g' | '4g' | '5g' | 'unknown' | 'none';
  }) => void): void;

  /** 取消监听网络状态变化事件 */
  function offNetworkStatusChange(callback?: (result: {
    isConnected: boolean;
    networkType: 'wifi' | '2g' | '3g' | '4g' | '5g' | 'unknown' | 'none';
  }) => void): void;
  //#endregion

  //#region 媒体
  /** 图片信息 */
  interface ImageInfo {
    /** 图片原始宽度，单位px */
    width: number;
    /** 图片原始高度，单位px */
    height: number;
    /** 图片的本地路径 */
    path: string;
    /** 图片的方向 */
    orientation?: 'up' | 'down' | 'left' | 'right';
    /** 图片的格式 */
    type?: string;
  }

  /** 选择图片选项 */
  interface ChooseImageOptions extends BaseOptions<{
    /** 图片的本地临时文件路径列表 */
    tempFilePaths: string[];
    /** 图片的本地临时文件列表 */
    tempFiles: Array<{
      /** 本地临时文件路径 */
      path: string;
      /** 本地临时文件大小，单位B */
      size: number;
    }>;
  }> {
    /** 最多可以选择的图片张数 */
    count?: number;
    /** 所选的图片的尺寸：original原图，compressed压缩图 */
    sizeType?: ('original' | 'compressed')[];
    /** 选择图片的来源：album从相册选图，camera使用相机 */
    sourceType?: ('album' | 'camera')[];
  }

  /** 选择图片 */
  function chooseImage(options: ChooseImageOptions): void;

  /** 预览图片选项 */
  interface PreviewImageOptions extends BaseOptions<void> {
    /** 需要预览的图片链接列表 */
    urls: string[];
    /** 当前显示图片的链接 */
    current?: string;
  }

  /** 预览图片 */
  function previewImage(options: PreviewImageOptions): void;

  /** 获取图片信息选项 */
  interface GetImageInfoOptions extends BaseOptions<ImageInfo> {
    /** 图片的路径，可以是相对路径、临时文件路径、存储文件路径、网络图片路径 */
    src: string;
  }

  /** 获取图片信息 */
  function getImageInfo(options: GetImageInfoOptions): void;
  //#endregion

  //#region Deeplink
  /** 打开深度链接选项 */
  interface OpenDeeplinkOptions extends BaseOptions<void> {
    /** 要打开的链接 */
    uri: string;
  }

  /** 跳转到应用的某个页面 */
  function openDeeplink(options: OpenDeeplinkOptions): void;

  /** 跳转到快游戏选项 */
  interface NavigateToQuickAppOptions extends BaseOptions<void> {
    /** 需要打开的快游戏包名 */
    packageName: string;
    /** 待打开的页面路径，若为空则打开首页 */
    path?: string;
    /** 需要传递给快游戏的数据 */
    extraData?: object;
  }

  /** 打开另一个快游戏 */
  function navigateToQuickApp(options: NavigateToQuickAppOptions): void;
  //#endregion

  //#region 打开第三方应用（1078+）
  /** 打开第三方应用选项 */
  interface LaunchAppOptions extends BaseOptions<void> {
    /** 要打开的应用的包名 */
    packageName: string;
    /** 传递给应用的参数 */
    extraData?: object;
  }

  /** 打开第三方应用 */
  function launchApp(options: LaunchAppOptions): void;

  /** 检查应用是否安装选项 */
  interface CheckAppInstalledOptions extends BaseOptions<{
    /** 应用是否已安装 */
    installed: boolean;
  }> {
    /** 要检查的应用包名 */
    packageName: string;
  }

  /** 检查应用是否已安装 */
  function checkAppInstalled(options: CheckAppInstalledOptions): void;
  //#endregion

  //#region 广告API
  /** 横幅广告 */
  interface BannerAd {
    /** 广告位ID */
    adUnitId: string;
    /** 广告样式 */
    style: {
      /** 左上角横坐标 */
      left?: number;
      /** 左上角纵坐标 */
      top?: number;
      /** 广告宽度 */
      width?: number;
      /** 广告高度 */
      height?: number;
    };
    /** 显示横幅广告 */
    show(): Promise<void>;
    /** 隐藏横幅广告 */
    hide(): void;
    /** 销毁横幅广告 */
    destroy(): void;
    /** 监听横幅广告加载事件 */
    onLoad(callback: () => void): void;
    /** 取消监听横幅广告加载事件 */
    offLoad(callback?: () => void): void;
    /** 监听横幅广告错误事件 */
    onError(callback: (err: { errMsg: string; errCode: number }) => void): void;
    /** 取消监听横幅广告错误事件 */
    offError(callback?: (err: { errMsg: string; errCode: number }) => void): void;
    /** 监听横幅广告尺寸变化事件 */
    onResize(callback: (res: { width: number; height: number }) => void): void;
    /** 取消监听横幅广告尺寸变化事件 */
    offResize(callback?: (res: { width: number; height: number }) => void): void;
  }

  /** 创建横幅广告选项 */
  interface CreateBannerAdOptions {
    /** 广告位ID */
    adUnitId: string;
    /** 广告样式 */
    style?: {
      /** 左上角横坐标 */
      left?: number;
      /** 左上角纵坐标 */
      top?: number;
      /** 广告宽度 */
      width?: number;
      /** 广告高度 */
      height?: number;
    };
  }

  /** 创建横幅广告 */
  function createBannerAd(options: CreateBannerAdOptions): BannerAd;

  /** 激励视频广告 */
  interface RewardedVideoAd {
    /** 广告位ID */
    adUnitId: string;
    /** 加载激励视频广告 */
    load(): Promise<void>;
    /** 显示激励视频广告 */
    show(): Promise<void>;
    /** 销毁激励视频广告 */
    destroy(): void;
    /** 监听激励视频广告加载事件 */
    onLoad(callback: () => void): void;
    /** 取消监听激励视频广告加载事件 */
    offLoad(callback?: () => void): void;
    /** 监听激励视频广告错误事件 */
    onError(callback: (err: { errMsg: string; errCode: number }) => void): void;
    /** 取消监听激励视频广告错误事件 */
    offError(callback?: (err: { errMsg: string; errCode: number }) => void): void;
    /** 监听用户点击关闭广告按钮的事件 */
    onClose(callback: (res: { isEnded: boolean }) => void): void;
    /** 取消监听用户点击关闭广告按钮的事件 */
    offClose(callback?: (res: { isEnded: boolean }) => void): void;
  }

  /** 创建激励视频广告选项 */
  interface CreateRewardedVideoAdOptions {
    /** 广告位ID */
    adUnitId: string;
  }

  /** 创建激励视频广告 */
  function createRewardedVideoAd(options: CreateRewardedVideoAdOptions): RewardedVideoAd;

  /** 插屏广告 */
  interface InterstitialAd {
    /** 广告位ID */
    adUnitId: string;
    /** 加载插屏广告 */
    load(): Promise<void>;
    /** 显示插屏广告 */
    show(): Promise<void>;
    /** 销毁插屏广告 */
    destroy(): void;
    /** 监听插屏广告加载事件 */
    onLoad(callback: () => void): void;
    /** 取消监听插屏广告加载事件 */
    offLoad(callback?: () => void): void;
    /** 监听插屏广告错误事件 */
    onError(callback: (err: { errMsg: string; errCode: number }) => void): void;
    /** 取消监听插屏广告错误事件 */
    offError(callback?: (err: { errMsg: string; errCode: number }) => void): void;
    /** 监听插屏广告关闭事件 */
    onClose(callback: () => void): void;
    /** 取消监听插屏广告关闭事件 */
    offClose(callback?: () => void): void;
  }

  /** 创建插屏广告选项 */
  interface CreateInterstitialAdOptions {
    /** 广告位ID */
    adUnitId: string;
  }

  /** 创建插屏广告 */
  function createInterstitialAd(options: CreateInterstitialAdOptions): InterstitialAd;

  /** 原生广告 */
  interface NativeAd {
    /** 广告位ID */
    adUnitId: string;
    /** 加载原生广告 */
    load(): Promise<void>;
    /** 销毁原生广告 */
    destroy(): void;
    /** 上报广告曝光 */
    reportAdShow(options: { adId: string }): void;
    /** 上报广告点击 */
    reportAdClick(options: { adId: string }): void;
    /** 监听原生广告加载事件 */
    onLoad(callback: (res: { adList: NativeAdData[] }) => void): void;
    /** 取消监听原生广告加载事件 */
    offLoad(callback?: (res: { adList: NativeAdData[] }) => void): void;
    /** 监听原生广告错误事件 */
    onError(callback: (err: { errMsg: string; errCode: number }) => void): void;
    /** 取消监听原生广告错误事件 */
    offError(callback?: (err: { errMsg: string; errCode: number }) => void): void;
  }

  /** 原生广告数据 */
  interface NativeAdData {
    /** 广告标识 */
    adId: string;
    /** 广告标题 */
    title: string;
    /** 广告描述 */
    desc: string;
    /** 品牌名称 */
    brandName: string;
    /** 点击按钮文本 */
    clickBtnTxt: string;
    /** 广告图标 */
    icon: string;
    /** 广告图片列表 */
    imgUrlList: string[];
    /** 广告标识 */
    logoUrl: string;
    /** 视频地址 */
    videoUrl?: string;
    /** 视频时长 */
    videoDuration?: number;
    /** 视频封面 */
    videoSnapshot?: string;
  }

  /** 创建原生广告选项 */
  interface CreateNativeAdOptions {
    /** 广告位ID */
    adUnitId: string;
    /** 原生广告数量，取值范围1-5 */
    adCount?: number;
  }

  /** 创建原生广告 */
  function createNativeAd(options: CreateNativeAdOptions): NativeAd;

  /** 原生模板广告 */
  interface NativeTemplateAd {
    /** 广告位ID */
    adUnitId: string;
    /** 广告样式 */
    style: {
      /** 左上角横坐标 */
      left?: number;
      /** 左上角纵坐标 */
      top?: number;
      /** 广告宽度 */
      width?: number;
      /** 广告高度 */
      height?: number;
    };
    /** 加载原生模板广告 */
    load(): Promise<void>;
    /** 显示原生模板广告 */
    show(): Promise<void>;
    /** 隐藏原生模板广告 */
    hide(): void;
    /** 销毁原生模板广告 */
    destroy(): void;
    /** 监听原生模板广告加载事件 */
    onLoad(callback: () => void): void;
    /** 取消监听原生模板广告加载事件 */
    offLoad(callback?: () => void): void;
    /** 监听原生模板广告错误事件 */
    onError(callback: (err: { errMsg: string; errCode: number }) => void): void;
    /** 取消监听原生模板广告错误事件 */
    offError(callback?: (err: { errMsg: string; errCode: number }) => void): void;
    /** 监听原生模板广告关闭事件 */
    onClose(callback: () => void): void;
    /** 取消监听原生模板广告关闭事件 */
    offClose(callback?: () => void): void;
  }

  /** 创建原生模板广告选项 */
  interface CreateNativeTemplateAdOptions {
    /** 广告位ID */
    adUnitId: string;
    /** 广告样式 */
    style?: {
      /** 左上角横坐标 */
      left?: number;
      /** 左上角纵坐标 */
      top?: number;
      /** 广告宽度 */
      width?: number;
      /** 广告高度 */
      height?: number;
    };
  }

  /** 创建原生模板广告 */
  function createNativeTemplateAd(options: CreateNativeTemplateAdOptions): NativeTemplateAd;

  /** 推广位广告 */
  interface PromotionAd {
    /** 广告位ID */
    adUnitId: string;
    /** 加载推广位广告 */
    load(): Promise<void>;
    /** 显示推广位广告 */
    show(): Promise<void>;
    /** 隐藏推广位广告 */
    hide(): void;
    /** 销毁推广位广告 */
    destroy(): void;
    /** 监听推广位广告加载事件 */
    onLoad(callback: () => void): void;
    /** 取消监听推广位广告加载事件 */
    offLoad(callback?: () => void): void;
    /** 监听推广位广告错误事件 */
    onError(callback: (err: { errMsg: string; errCode: number }) => void): void;
    /** 取消监听推广位广告错误事件 */
    offError(callback?: (err: { errMsg: string; errCode: number }) => void): void;
    /** 监听推广位广告关闭事件 */
    onClose(callback: () => void): void;
    /** 取消监听推广位广告关闭事件 */
    offClose(callback?: () => void): void;
  }

  /** 创建推广位广告选项 */
  interface CreatePromotionAdOptions {
    /** 广告位ID */
    adUnitId: string;
  }

  /** 创建推广位广告 */
  function createPromotionAd(options: CreatePromotionAdOptions): PromotionAd;

  /** 应用推广广告 */
  interface AppBoxAd {
    /** 广告位ID */
    adUnitId: string;
    /** 广告样式 */
    style: {
      /** 左上角横坐标 */
      left?: number;
      /** 左上角纵坐标 */
      top?: number;
      /** 广告宽度 */
      width?: number;
      /** 广告高度 */
      height?: number;
    };
    /** 加载应用推广广告 */
    load(): Promise<void>;
    /** 显示应用推广广告 */
    show(): Promise<void>;
    /** 隐藏应用推广广告 */
    hide(): void;
    /** 销毁应用推广广告 */
    destroy(): void;
    /** 监听应用推广广告加载事件 */
    onLoad(callback: () => void): void;
    /** 取消监听应用推广广告加载事件 */
    offLoad(callback?: () => void): void;
    /** 监听应用推广广告错误事件 */
    onError(callback: (err: { errMsg: string; errCode: number }) => void): void;
    /** 取消监听应用推广广告错误事件 */
    offError(callback?: (err: { errMsg: string; errCode: number }) => void): void;
    /** 监听应用推广广告关闭事件 */
    onClose(callback: () => void): void;
    /** 取消监听应用推广广告关闭事件 */
    offClose(callback?: () => void): void;
  }

  /** 创建应用推广广告选项 */
  interface CreateAppBoxAdOptions {
    /** 广告位ID */
    adUnitId: string;
    /** 广告样式 */
    style?: {
      /** 左上角横坐标 */
      left?: number;
      /** 左上角纵坐标 */
      top?: number;
      /** 广告宽度 */
      width?: number;
      /** 广告高度 */
      height?: number;
    };
  }

  /** 创建应用推广广告 */
  function createAppBoxAd(options: CreateAppBoxAdOptions): AppBoxAd;

  /** 设置未达到法定承诺年龄用户的标记 */
  function setUnderAgeOfPromise(underAgeOfPromise: boolean): void;

  /** 用户意见更新结果 */
  interface ConsentUpdateResult {
    /** 用户意见状态：0-已同意个性化和非个性化广告，1-仅同意非个性化广告，2-未同意也未拒绝 */
    consentStatus: 0 | 1 | 2;
    /** 是否需要用户确认意见 */
    isNeedConsent: boolean;
    /** 广告技术提供商信息列表 */
    AdProviderList: Array<{
      /** 广告技术提供商的ID */
      id: string;
      /** 广告技术提供商的名称 */
      name: string;
      /** 广告技术提供商的服务地 */
      serviceArea: string;
      /** 广告技术提供商的隐私政策链接URL */
      privacyPolicyUrl: string;
    }>;
  }

  /** 请求用户意见更新状态 */
  function requestConsentUpdate(options?: BaseOptions<ConsentUpdateResult>): void;

  /** 设置用户意见 */
  function setConsentStatus(consentStatus: 0 | 1 | 2): void;

  /** 设置儿童保护标签 */
  function setTagForChildProtection(childProtection: -1 | 0 | 1): void;

  /** 设置面向未达到法定承诺年龄用户 */
  function setTagForUnderAgeOfPromise(underAgeOfPromiseStr: -1 | 0 | 1): void;

  /** 设置广告内容分级上限 */
  function setAdContentClassification(adContentClassification: 'W' | 'PI' | 'J' | 'A'): void;

  /** 设置是否请求非个性化广告 */
  function setNonPersonalizedAd(personalizedAd: 0 | 1): void;

  /** 获取广告支持的API */
  function getSystemInfoSync(): SystemInfo & {
    /** 支持的广告API */
    supportedAdTypes?: string[];
  };
  //#endregion

  //#region 卡片尺寸API
  /** 卡片尺寸信息 */
  interface CardSizeInfo {
    /** 卡片宽度，单位px */
    width: number;
    /** 卡片高度，单位px */
    height: number;
    /** 卡片类型 */
    cardType: string;
    /** 卡片尺寸类型 */
    sizeType: string;
  }

  /** 获取卡片尺寸选项 */
  interface GetCardSizeOptions extends BaseOptions<CardSizeInfo> {
    /** 卡片类型，可选值：'1x2'、'2x2'、'2x4'、'4x4' */
    cardType?: '1x2' | '2x2' | '2x4' | '4x4';
  }

  /** 获取卡片尺寸信息 */
  function getCardSize(options?: GetCardSizeOptions): void;

  /** 同步获取卡片尺寸信息 */
  function getCardSizeSync(cardType?: '1x2' | '2x2' | '2x4' | '4x4'): CardSizeInfo;

  /** 卡片配置信息 */
  interface CardConfig {
    /** 卡片ID */
    cardId: string;
    /** 卡片名称 */
    cardName: string;
    /** 卡片类型 */
    cardType: '1x2' | '2x2' | '2x4' | '4x4';
    /** 卡片描述 */
    description?: string;
    /** 卡片图标路径 */
    iconPath?: string;
    /** 卡片预览图路径 */
    previewImage?: string;
    /** 是否支持透明背景 */
    supportTransparent?: boolean;
    /** 卡片最小宽度，单位px */
    minWidth?: number;
    /** 卡片最小高度，单位px */
    minHeight?: number;
    /** 卡片最大宽度，单位px */
    maxWidth?: number;
    /** 卡片最大高度，单位px */
    maxHeight?: number;
  }

  /** 获取卡片配置选项 */
  interface GetCardConfigOptions extends BaseOptions<CardConfig[]> {
    /** 卡片类型过滤 */
    cardType?: '1x2' | '2x2' | '2x4' | '4x4';
  }

  /** 获取卡片配置信息 */
  function getCardConfig(options?: GetCardConfigOptions): void;

  /** 同步获取卡片配置信息 */
  function getCardConfigSync(cardType?: '1x2' | '2x2' | '2x4' | '4x4'): CardConfig[];

  /** 卡片尺寸变化事件数据 */
  interface CardSizeChangeData {
    /** 新的卡片宽度，单位px */
    width: number;
    /** 新的卡片高度，单位px */
    height: number;
    /** 卡片类型 */
    cardType: '1x2' | '2x2' | '2x4' | '4x4';
    /** 变化原因 */
    reason?: 'resize' | 'orientation' | 'system';
  }

  /** 监听卡片尺寸变化事件 */
  function onCardSizeChange(callback: (data: CardSizeChangeData) => void): void;

  /** 取消监听卡片尺寸变化事件 */
  function offCardSizeChange(callback?: (data: CardSizeChangeData) => void): void;

  /** 卡片显示状态 */
  interface CardVisibilityState {
    /** 卡片是否可见 */
    visible: boolean;
    /** 可见区域宽度，单位px */
    visibleWidth?: number;
    /** 可见区域高度，单位px */
    visibleHeight?: number;
    /** 可见区域左上角X坐标，单位px */
    visibleLeft?: number;
    /** 可见区域左上角Y坐标，单位px */
    visibleTop?: number;
  }

  /** 获取卡片显示状态选项 */
  interface GetCardVisibilityOptions extends BaseOptions<CardVisibilityState> {}

  /** 获取卡片显示状态 */
  function getCardVisibility(options?: GetCardVisibilityOptions): void;

  /** 同步获取卡片显示状态 */
  function getCardVisibilitySync(): CardVisibilityState;

  /** 卡片可见性变化事件数据 */
  interface CardVisibilityChangeData {
    /** 卡片是否可见 */
    visible: boolean;
    /** 可见区域信息 */
    visibleRect?: {
      /** 可见区域宽度，单位px */
      width: number;
      /** 可见区域高度，单位px */
      height: number;
      /** 可见区域左上角X坐标，单位px */
      left: number;
      /** 可见区域左上角Y坐标，单位px */
      top: number;
    };
  }

  /** 监听卡片可见性变化事件 */
  function onCardVisibilityChange(callback: (data: CardVisibilityChangeData) => void): void;

  /** 取消监听卡片可见性变化事件 */
  function offCardVisibilityChange(callback?: (data: CardVisibilityChangeData) => void): void;

  /** 卡片布局信息 */
  interface CardLayoutInfo {
    /** 卡片容器宽度，单位px */
    containerWidth: number;
    /** 卡片容器高度，单位px */
    containerHeight: number;
    /** 卡片内容区域宽度，单位px */
    contentWidth: number;
    /** 卡片内容区域高度，单位px */
    contentHeight: number;
    /** 卡片内边距 */
    padding: {
      /** 上内边距，单位px */
      top: number;
      /** 右内边距，单位px */
      right: number;
      /** 下内边距，单位px */
      bottom: number;
      /** 左内边距，单位px */
      left: number;
    };
    /** 卡片外边距 */
    margin: {
      /** 上外边距，单位px */
      top: number;
      /** 右外边距，单位px */
      right: number;
      /** 下外边距，单位px */
      bottom: number;
      /** 左外边距，单位px */
      left: number;
    };
    /** 卡片圆角半径，单位px */
    borderRadius: number;
    /** 设备像素比 */
    pixelRatio: number;
  }

  /** 获取卡片布局信息选项 */
  interface GetCardLayoutOptions extends BaseOptions<CardLayoutInfo> {}

  /** 获取卡片布局信息 */
  function getCardLayout(options?: GetCardLayoutOptions): void;

  /** 同步获取卡片布局信息 */
  function getCardLayoutSync(): CardLayoutInfo;

  /** 设置卡片尺寸选项 */
  interface SetCardSizeOptions extends BaseOptions<void> {
    /** 卡片宽度，单位px */
    width: number;
    /** 卡片高度，单位px */
    height: number;
    /** 是否动画过渡 */
    animated?: boolean;
    /** 动画持续时间，单位ms */
    duration?: number;
  }

  /** 设置卡片尺寸 */
  function setCardSize(options: SetCardSizeOptions): void;

  /** 卡片适配模式 */
  type CardFitMode = 'fill' | 'contain' | 'cover' | 'scaleDown' | 'none';

  /** 设置卡片适配模式选项 */
  interface SetCardFitModeOptions extends BaseOptions<void> {
    /** 适配模式 */
    mode: CardFitMode;
  }

  /** 设置卡片适配模式 */
  function setCardFitMode(options: SetCardFitModeOptions): void;

  /** 获取卡片适配模式 */
  function getCardFitMode(options?: BaseOptions<{ mode: CardFitMode }>): void;

  /** 同步获取卡片适配模式 */
  function getCardFitModeSync(): CardFitMode;
  //#endregion
}

/** 华为快游戏API命名空间 */
declare const qg: typeof QG;
