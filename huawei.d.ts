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

  //#region 全局对象
  /** 全局环境变量 */
  interface Env {
    /** 用户文件目录，您对这个目录有完全自由的读写权限 */
    readonly USER_DATA_PATH: string;
  }

  /** 获取全局环境变量env */
  const env: Env;
  //#endregion

  //#region 渲染相关接口
  //#region 图片
  /** 图片对象 */
  interface Image {
    /** 图片的URL */
    src: string;
    /** 图片的真实宽度 */
    width: number;
    /** 图片的真实高度 */
    height: number;
    /** 图片加载完成后触发的回调函数 */
    onload: (() => void) | null;
    /** 图片加载发生错误后触发的回调函数 */
    onerror: (() => void) | null;
  }

  /** 创建一个图片对象 */
  function createImage(): Image;
  //#endregion

  //#region 字体
  /** 获取文本行高选项 */
  interface GetTextLineHeightOptions extends BaseOptions<number> {
    /** 字体样式：normal正常，italic斜体 */
    fontStyle?: 'normal' | 'italic';
    /** 字体粗细：normal正常，bold粗体 */
    fontWeight?: 'normal' | 'bold';
    /** 字号 */
    fontSize?: number;
    /** 字体名称 */
    fontFamily: string;
    /** 文本的内容 */
    text: string;
  }

  /** 获取一行文本的行高 */
  function getTextLineHeight(options: GetTextLineHeightOptions): number;

  /** 加载自定义字体文件（双参数） */
  function loadFont(familyName: string, path: string): string | null;
  /** 加载自定义字体文件（单参数） */
  function loadFont(path: string): string | null;
  //#endregion

  //#region 帧率
  /** 修改渲染帧率 */
  function setPreferredFramesPerSecond(fps: number): void;
  //#endregion
  //#endregion

  //#region 系统信息
  /** 系统信息 */
  interface SystemInfo {
    /** 手机品牌 */
    brand: string;
    /** 手机型号 */
    model: string;
    /** 设备像素比 */
    pixelRatio: number;
    /** 屏幕宽度 */
    screenWidth: number;
    /** 屏幕高度 */
    screenHeight: number;
    /** 可使用窗口宽度 */
    windowWidth: number;
    /** 可使用窗口高度 */
    windowHeight: number;
    /** 系统语言 */
    language: string;
    /** 系统地区 */
    region: string;
    /** 系统语言书写方式 */
    script: string;
    /** 渲染引擎版本号 */
    coreVersion: string;
    /** 渲染引擎版本号 */
    COREVersion: string;
    /** 操作系统版本 */
    system: string;
    /** 客户端平台 */
    platform: string;
    /** 快应用中心版本 */
    version: string;
    /** 状态栏高度，以屏幕的实际分辨率为单位 */
    statusBarHeight: number;
    /** 运行平台版本名称（若快游戏minPlatformVersion在1078及以上版本，才会返回当前字段） */
    platformVersionName?: string;
    /** 运行平台标准版本号（若快游戏minPlatformVersion在1078及以上版本，才会返回当前字段） */
    platformVersionCode?: number;
    /** 在竖屏正方向下的安全区域（若快游戏minPlatformVersion在1078及以上版本，才会返回当前字段） */
    safeArea?: SafeArea;
  }

  /** 安全区域信息 */
  interface SafeArea {
    /** 安全区域左上角纵坐标 */
    top: number;
    /** 安全区域右下角纵坐标 */
    bottom: number;
    /** 安全区域左上角横坐标 */
    left: number;
    /** 安全区域右下角横坐标 */
    right: number;
    /** 安全区域的宽度，大小为实际宽度（以px为单位）/设备屏幕密度 */
    width: number;
    /** 安全区域的高度，大小为实际高度（以px为单位）/设备屏幕密度 */
    height: number;
  }

  /** 获取系统信息（同步方法，1078+） */
  function getSystemInfoSync(): SystemInfo;

  /** 获取系统信息 */
  function getSystemInfo(options: BaseOptions<SystemInfo>): void;

  /** 判断能力支持选项 */
  interface CanIUseOptions extends BaseOptions<{ result: boolean }> {
    /** 能力名称 */
    capability: 'MiniGame.NearbyPlaying' | 'MiniGame.KnockSharing';
  }

  /** 判断当前客户端是否支持某个能力 */
  function canIUse(options: CanIUseOptions): void;

  //#region 系统事件
  /** 监听音频因为受到系统占用而被中断开始 */
  function onAudioInterruptionBegin(callback: () => void): void;

  /** 取消监听音频因为受到系统占用而被中断开始 */
  function offAudioInterruptionBegin(callback: () => void): void;

  /** 监听音频中断结束 */
  function onAudioInterruptionEnd(callback: () => void): void;

  /** 取消监听音频中断结束 */
  function offAudioInterruptionEnd(callback: () => void): void;

  /** 全局错误事件回调参数 */
  interface ErrorEventData {
    /** 包含错误位置、错误信息、错误调用堆栈等 */
    message: string;
  }

  /** 监听全局错误事件 */
  function onError(callback: (data: ErrorEventData) => void): void;

  /** 取消监听全局错误事件 */
  function offError(callback: () => void): void;
  //#endregion

  //#region 应用管理（1080+）
  /** 检测应用是否已安装选项 */
  interface HasPackageInstalledOptions extends BaseOptions<{ result: boolean }> {
    /** 应用包名 */
    package: string;
  }

  /** 检测应用是否已安装（1080+） */
  function hasPackageInstalled(options: HasPackageInstalledOptions): void;

  /** 获取应用版本信息选项 */
  interface GetInstalledPackageInfoOptions extends BaseOptions<{
    /** 查询包名的版本号 */
    versionCode: number | string;
    /** 查询包名的版本名称 */
    versionName: string;
  }> {
    /** 应用包名 */
    package: string;
  }

  /** 获取应用版本号、版本名称信息（1080+） */
  function getInstalledPackageInfo(options: GetInstalledPackageInfoOptions): void;

  /** 获取应用签名摘要选项 */
  interface GetSignatureDigestsOptions extends BaseOptions<{
    /** 使用SHA-256算法处理后的签名信息列表 */
    signatureDigests: string[] | string;
  }> {
    /** 应用包名 */
    package: string;
  }

  /** 获取应用签名摘要信息（1080+） */
  function getSignatureDigests(options: GetSignatureDigestsOptions): void;
  //#endregion
  //#endregion

  //#region 生命周期
  /** 启动参数 */
  interface LaunchOptions {
    /** 启动快游戏时携带的参数 */
    query?: any;
    /** 来源信息 */
    referrerInfo?: ReferrerInfo;
  }

  /** 来源信息 */
  interface ReferrerInfo {
    /** 参数的来源类型 */
    type: 'shortcut' | 'url' | 'app' | 'quickapp' | 'deeplink' | 'other';
    /** 额外数据 */
    extraData?: {
      /** 调用方的包名信息 */
      packageName?: string;
    };
  }

  /** 退出当前快游戏 */
  function exitApplication(options?: BaseOptions<void>): void;

  /** 获取快游戏启动时的参数（1103+） */
  function getLaunchOptionsSync(): LaunchOptions;

  /** 监听快游戏隐藏到后台事件 */
  function onHide(callback: () => void): void;

  /** 取消监听快游戏隐藏到后台事件 */
  function offHide(callback: () => void): void;

  /** 监听快游戏回到前台的事件 */
  function onShow(callback: (options: LaunchOptions) => void): void;

  /** 取消监听快游戏回到前台的事件 */
  function offShow(callback: (options: LaunchOptions) => void): void;
  //#endregion

  //#region 设备相关
  //#region 加速计
  /** 加速度数据 */
  interface AccelerometerData {
    /** X 轴 */
    x: number;
    /** Y 轴 */
    y: number;
    /** Z 轴 */
    z: number;
  }

  /** 监听加速度数据 */
  function onAccelerometerChange(callback: (data: AccelerometerData) => void): void;

  /** 开始监听加速度数据 */
  function startAccelerometer(options?: BaseOptions<void>): void;

  /** 停止监听加速度数据 */
  function stopAccelerometer(options?: BaseOptions<void>): void;
  //#endregion

  //#region 电量
  /** 电池信息 */
  interface BatteryInfo {
    /** 是否在充电 */
    isCharging: boolean;
    /** 设备电量，范围 1 ~ 100 */
    level: string;
  }

  /** 获取设备电量 */
  function getBatteryInfo(options: BaseOptions<BatteryInfo>): void;

  /** 获取设备电量的同步接口（1078+） */
  function getBatteryInfoSync(): BatteryInfo;
  //#endregion

  //#region 罗盘
  /** 罗盘数据 */
  interface CompassData {
    /** 面对的方向度数 */
    direction: number;
  }

  /** 监听罗盘数据，频率：5 次/秒，接口调用后会自动开始监听 */
  function onCompassChange(callback: (data: CompassData) => void): void;

  /** 开始监听罗盘数据 */
  function startCompass(options?: BaseOptions<void>): void;

  /** 停止监听罗盘数据 */
  function stopCompass(options?: BaseOptions<void>): void;
  //#endregion

  //#region 设备-网络
  /** 网络状态信息 */
  interface NetworkStatusInfo {
    /** 当前是否有网络链接 */
    isConnected: boolean;
    /** 网络类型 */
    networkType: 'wifi' | '2g' | '3g' | '4g' | '5g' | 'unknown' | 'none';
  }

  /** 获取网络类型 */
  function getNetworkType(options: BaseOptions<{ networkType: 'wifi' | '2g' | '3g' | '4g' | '5g' | 'unknown' | 'none' }>): void;

  /** 监听网络状态变化事件 */
  function onNetworkStatusChange(callback: (data: NetworkStatusInfo) => void): void;

  /** 取消监听网络状态变化事件 */
  function offNetworkStatusChange(callback: (data: NetworkStatusInfo) => void): void;
  //#endregion

  //#region 剪贴板
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
  //#endregion

  //#region 设备震动
  /** 短震动 */
  function vibrateShort(options?: BaseOptions<void>): void;

  /** 长震动 */
  function vibrateLong(options?: BaseOptions<void>): void;
  //#endregion

  //#region 设备屏幕
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
  //#endregion

  //#region 界面
  //#region 交互
  /** 消息提示框选项 */
  interface ShowToastOptions extends BaseOptions<void> {
    /** 提示框的标题。title和message需至少有一个参数赋值 */
    title?: string;
    /** 展示的图标：success显示成功图标，loading显示加载图标，none不显示图标 */
    icon?: 'success' | 'loading' | 'none';
    /** 自定义图标路径，image的优先级高于icon */
    image?: string;
    /** 提示的内容。title和message需至少有一个参数赋值，且优先展示title的参数值（1078+） */
    message?: string;
    /** 提示延迟时间 */
    duration?: number;
    /** 是否显示透明图层：true屏蔽触摸事件，false不屏蔽触摸事件 */
    mask?: boolean;
  }

  /** 显示消息提示框 */
  function showToast(options: ShowToastOptions): void;

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
    /** 取消按钮的文字颜色，必须是16进制格式的颜色字符串 */
    cancelColor?: string;
    /** 确认按钮的文字，最多4个字符 */
    confirmText?: string;
    /** 确认按钮的文字颜色，必须是16进制格式的颜色字符串 */
    confirmColor?: string;
  }

  /** 模态对话框结果 */
  interface ShowModalResult {
    /** true表示用户点击了确定（1078+） */
    confirm?: boolean;
    /** true表示用户点击了取消（1078+） */
    cancel?: boolean;
  }

  /** 显示模态对话框 */
  function showModal(options: ShowModalOptions): void;

  /** 加载提示框选项 */
  interface ShowLoadingOptions extends BaseOptions<{ cancel: boolean }> {
    /** 提示的内容 */
    title: string;
    /** 是否显示透明图层，设置为true，可以屏蔽触摸事件 */
    mask?: boolean;
  }

  /** 显示loading提示框，需主动调用qg.hideLoading才能关闭提示框 */
  function showLoading(options: ShowLoadingOptions): void;

  /** 操作菜单选项 */
  interface ShowActionSheetOptions extends BaseOptions<{ tapIndex: number }> {
    /** 按钮的文字数组，数组长度最大为6 */
    itemList: string[];
    /** 按钮的颜色 */
    itemColor?: string;
  }

  /** 显示操作菜单 */
  function showActionSheet(options: ShowActionSheetOptions): void;

  /** 隐藏消息提示框 */
  function hideToast(options?: BaseOptions<void>): void;

  /** 隐藏loading提示框 */
  function hideLoading(options?: BaseOptions<void>): void;
  //#endregion

  //#region 键盘
  /** 显示软键盘选项 */
  interface ShowKeyboardOptions extends BaseOptions<void> {
    /** 键盘输入框显示的默认值 */
    defaultValue: string;
    /** 键盘中文本的最大长度 */
    maxLength: number;
    /** 是否为多行输入 */
    multiple: boolean;
    /** 当点击完成时键盘是否保持 */
    confirmHold: boolean;
    /** 键盘右下角confirm按钮的类型，只影响按钮的文本内容 */
    confirmType: 'done' | 'next' | 'search' | 'go' | 'send';
  }

  /** 更新键盘选项 */
  interface UpdateKeyboardOptions extends BaseOptions<{ errMsg: string }> {
    /** 键盘输入的当前值 */
    value: string;
  }

  /** 键盘输入事件数据 */
  interface KeyboardInputData {
    /** 键盘输入的当前值 */
    value: string;
  }

  /** 隐藏软键盘 */
  function hideKeyboard(options?: BaseOptions<void>): void;

  /** 显示软键盘 */
  function showKeyboard(options: ShowKeyboardOptions): void;

  /** 更新键盘输入框显示的默认值 */
  function updateKeyboard(options: UpdateKeyboardOptions): void;

  /** 监听键盘输入事件 */
  function onKeyboardInput(callback: (data: KeyboardInputData) => void): void;

  /** 取消监听键盘输入事件 */
  function offKeyboardInput(callback: (data: KeyboardInputData) => void): void;

  /** 监听用户点击键盘confirm按钮时的事件 */
  function onKeyboardConfirm(callback: (data: KeyboardInputData) => void): void;

  /** 取消监听用户点击键盘confirm按钮时的事件 */
  function offKeyboardConfirm(callback: (data: KeyboardInputData) => void): void;

  /** 监听键盘收起的事件 */
  function onKeyboardComplete(callback: (data: KeyboardInputData) => void): void;

  /** 取消监听键盘收起的事件 */
  function offKeyboardComplete(callback: (data: KeyboardInputData) => void): void;
  //#endregion

  //#region 窗口
  /** 窗口尺寸变化事件数据 */
  interface WindowResizeData {
    /** 卡片的尺寸大小 */
    rect: {
      /** 卡片渲染范围的实际宽度，等于windowWidth*pixelRatio，单位：px */
      windowWidth: number;
      /** 卡片渲染范围的实际高度，等于windowHeight*pixelRatio，单位：px */
      windowHeight: number;
    };
  }

  /** 监听窗口尺寸变化事件 */
  function onWindowResize(callback: (data: WindowResizeData) => void): void;

  /** 移除窗口尺寸变化事件的监听函数 */
  function offWindowResize(callback: (data: WindowResizeData) => void): void;
  //#endregion
  //#endregion

  //#region 多线程Worker
  /** Worker实例 */
  interface Worker {
    /** 向worker发送消息 */
    postMessage(message: object): void;
    /** 监听worker发送的消息 */
    onMessage(callback: (message: object) => void): void;
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

  //#region 开放能力 - 支付（华为IAP）
  /** 判断是否支持华为IAP支付请求参数（1103+） */
  interface IsEnvReadyReq {
    /** 创建快游戏后分配的游戏唯一标识 */
    applicationID: string;
  }

  /** 判断是否支持华为IAP支付选项（1103+） */
  interface IsEnvReadyOptions extends BaseOptions<{ returnCode: number }> {
    /** 判断是否支持华为IAP支付的请求信息 */
    isEnvReadyReq: IsEnvReadyReq;
  }

  /** 判断当前华为账号所属国家或地区是否支持华为IAP支付（1103+） */
  function isEnvReady(options: IsEnvReadyOptions): void;

  /** 判断是否满足沙盒账号条件请求参数（1103+） */
  interface IsSandboxActivatedReq {
    /** 创建快游戏后分配的游戏唯一标识 */
    applicationID: string;
  }

  /** 判断是否满足沙盒账号条件选项（1103+） */
  interface IsSandboxActivatedOptions extends BaseOptions<{
    /** 返回码 */
    returnCode: number;
    /** 返回码描述信息 */
    errMsg: string;
    /** 是否是沙盒账号 */
    isSandboxUser: boolean;
    /** 快游戏相关客户端的APK版本是否满足沙盒条件，固定返回true */
    isSandboxApk: boolean;
    /** 快游戏相关客户端的版本信息 */
    versionInApk: string;
    /** 快游戏在华为应用市场最新的版本信息 */
    versionFrMarket: string;
  }> {
    /** 判断是否满足沙盒账号条件的请求信息 */
    isSandboxActivatedReq: IsSandboxActivatedReq;
  }

  /** 判断华为账号和快游戏RPK版本是否满足沙盒条件（1103+） */
  function isSandboxActivated(options: IsSandboxActivatedOptions): void;

  /** 查询用户已购买数据请求参数（1103+） */
  interface OwnedPurchasesReq {
    /** 创建快游戏后分配的游戏唯一标识 */
    applicationID: string;
    /** 商品类型：0消耗型商品，1非消耗型商品 */
    priceType: 0 | 1;
    /** 开通应用内支付服务时的公钥 */
    publicKey: string;
    /** 数据定位标志。首次请求时无需传入 */
    continuationToken?: string;
  }

  /** 应用内购买数据 */
  interface InAppPurchaseData {
    /** 应用ID */
    applicationId: number;
    /** 是否自动续订。固定返回false */
    autoRenewing: boolean;
    /** 华为支付的订单ID，在成功支付后生成 */
    orderId: string;
    /** 商品类型：0消耗型商品，1非消耗型商品 */
    kind: number;
    /** 客户端应用包名 */
    packageName: string;
    /** 商品ID */
    productId: string;
    /** 商品名称 */
    productName: string;
    /** 商品购买的时间戳 */
    purchaseTime: number;
    /** 订单交易状态：-1初始化，0已购买，1已取消，2已退款 */
    purchaseState: number;
    /** 商户侧保留信息 */
    developerPayload: string;
    /** 应用请求消耗商品时自定义的挑战字 */
    developerChallenge: string;
    /** 消费状态：0未消费，1已消费 */
    consumptionState: number;
    /** 标识商品和用户对应关系的购买令牌 */
    purchaseToken: string;
    /** 购买类型：0沙盒环境，1促销 */
    purchaseType?: number;
    /** 支付商品的币种 */
    currency: string;
    /** 商品展示价格 */
    price: number;
    /** 国家/地区码 */
    country: string;
    /** 支付方式 */
    payType: string;
  }

  /** 查询用户已购买数据选项（1103+） */
  interface ObtainOwnedPurchasesOptions extends BaseOptions<{
    /** 返回码 */
    returnCode: number;
    /** 返回码描述信息 */
    errMsg: string;
    /** 商品ID列表 */
    itemList: string[];
    /** 商品信息列表 */
    inAppPurchaseDataList: string[] | InAppPurchaseData[];
    /** 与商品信息一一对应的签名字符串 */
    inAppSignature: string[];
    /** 数据定位标志 */
    continuationToken?: string;
  }> {
    /** 查询用户已购未消耗的购买数据 */
    ownedPurchasesReq: OwnedPurchasesReq;
  }

  /** 查询用户的已购买数据，包括消耗型商品、非消耗型商品（1103+） */
  function obtainOwnedPurchases(options: ObtainOwnedPurchasesOptions): void;

  /** 获取商品信息请求参数（1103+） */
  interface ProductInfoReq {
    /** 创建快游戏后分配的唯一标识 */
    applicationID: string;
    /** 商品类型：0消耗型商品，1非消耗型商品 */
    priceType: 0 | 1;
    /** 商品ID列表 */
    productIds: string[];
  }

  /** 商品详细信息 */
  interface ProductInfo {
    /** 商品ID */
    productId: string;
    /** 商品类型：0消耗型商品，1非消耗型商品 */
    priceType: number;
    /** 商品展示价格（含税） */
    price: string;
    /** 商品微单位价格 */
    microsPrice: number;
    /** 支付商品的币种 */
    currency: string;
    /** 商品名称 */
    productName: string;
    /** 商品简介 */
    productDesc: string;
    /** 商品原价的微单位价格 */
    originalMicroPrice: string;
    /** 商品原价（含税） */
    originalLocalPrice: string;
  }

  /** 查询商品详情选项（1103+） */
  interface ObtainProductInfoOptions extends BaseOptions<{
    /** 返回码 */
    returnCode: number;
    /** 返回码描述信息 */
    errMsg: string;
    /** 商品详细信息 */
    productInfoList: ProductInfo[];
  }> {
    /** 获取商品信息的请求信息 */
    productInfoReq: ProductInfoReq;
  }

  /** 查询在AGC控制台配置的商品详情（1103+） */
  function obtainProductInfo(options: ObtainProductInfoOptions): void;

  /** 创建购买订单请求参数（1103+） */
  interface PurchaseIntentReq {
    /** 创建快游戏后分配的唯一标识 */
    applicationID: string;
    /** 开通应用内支付服务时的公钥 */
    publicKey: string;
    /** 待支付商品ID */
    productId: string;
    /** 商品类型：0消耗型商品，1非消耗型商品 */
    priceType: 0 | 1;
    /** 商户侧保留信息，长度限制为[0, 256] */
    developerPayload?: string;
  }

  /** 创建购买订单选项（1103+） */
  interface CreatePurchaseIntentOptions extends BaseOptions<{
    /** 返回码 */
    returnCode: number;
    /** 返回码描述信息 */
    errMsg: string;
    /** 使用私钥签名购买的签名字符串 */
    inAppDataSignature: string;
    /** 购买订单详情信息 */
    inAppPurchaseData: string;
  }> {
    /** 在AppGallery Connect上发起购买商品的请求信息 */
    purchaseIntentReq: PurchaseIntentReq;
  }

  /** 创建在AGC控制台配置的商品购买订单（1103+） */
  function createPurchaseIntent(options: CreatePurchaseIntentOptions): void;

  /** 消耗商品请求参数（1103+） */
  interface ConsumeOwnedPurchaseReq {
    /** 创建快游戏后分配的唯一标识 */
    applicationID: string;
    /** 应用请求消耗商品时自定义的挑战字 */
    developerChallenge?: string;
    /** 用户购买商品的标识 */
    purchaseToken: string;
    /** 开通应用内支付服务时的公钥 */
    publicKey: string;
  }

  /** 消耗购买数据 */
  interface ConsumePurchaseData {
    /** 创建快游戏后分配的唯一标识 */
    applicationId: number;
    /** 是否自动续订。固定返回false */
    autoRenewing: boolean;
    /** 华为支付的订单ID，在成功支付后生成 */
    orderId: string;
    /** 客户端应用包名 */
    packageName: string;
    /** 商品ID */
    productId: string;
    /** 商品购买的时间戳 */
    purchaseTime: number;
    /** 订单状态：-1初始化，0已购买，1已取消，2已退款 */
    purchaseState: number;
    /** 商户侧保留信息 */
    developerPayload: string;
    /** 用于唯一标识商品和用户对应关系的购买令牌 */
    purchaseToken: string;
    /** 应用请求消耗商品时自定义的挑战字 */
    developerChallenge: string;
    /** 消费状态：0未消费，1已消费 */
    consumptionState: number;
    /** 支付商品的币种 */
    currency: string;
    /** 商品展示价格（含税） */
    price: number;
    /** 国家/地区码 */
    country: string;
    /** 返回码，成功返回为0 */
    responseCode: string;
    /** 返回码描述信息 */
    responseMessage: string;
  }

  /** 消耗商品选项（1103+） */
  interface ConsumeOwnedPurchaseOptions extends BaseOptions<{
    /** 返回码 */
    returnCode: number;
    /** 返回码描述信息 */
    errMsg: string;
    /** 消耗结果信息 */
    consumePurchaseData: string;
    /** 使用IAP私钥生成的签名字符串 */
    dataSignature: string;
  }> {
    /** 消耗商品请求 */
    consumeOwnedPurchaseReq: ConsumeOwnedPurchaseReq;
  }

  /** 消耗已支付成功的消耗型商品（1103+） */
  function consumeOwnedPurchase(options: ConsumeOwnedPurchaseOptions): void;
  //#endregion

  //#region 开放能力 - 系统分享
  /** 系统分享选项 */
  interface SystemShareOptions extends BaseOptions<void> {
    /** 数据的MIME TYPE，要求字母全小写 */
    type: string;
    /** 分享的数据。如果type是text/开头的mimetype（如text/plain），则data是要分享的文本内容；如果type是其他值，则data是要分享的文件路径 */
    data: string;
    /** 取消回调 */
    cancel?: (data: any) => void;
  }

  /** 通过系统分享，分享数据到其他app */
  function systemShare(options: SystemShareOptions): void;
  //#endregion

  //#region 开放能力 - 第三方分享
  /** 第三方分享平台类型 */
  type ServiceSharePlatform = 'WEIXIN' | 'WEIXIN_CIRCLE' | 'SYSTEM';

  /** 第三方分享类型 */
  type ServiceShareType = 0 | 1 | 2 | 3 | 4;

  /** 第三方分享选项 */
  interface ServiceShareOptions extends BaseOptions<void> {
    /** 分享类型。默认图文0，纯文字1，纯图片2，音频3，视频4 */
    shareType: ServiceShareType;
    /** 分享的标题。分享类型为0，1，3，4时必填 */
    title?: string;
    /** 分享的摘要 */
    summary?: string;
    /** 点击后的跳转URL。分享类型为0，3，4时必填 */
    targetUrl?: string;
    /** 分享图片/缩略图的本地地址。分享类型为2，3，4时必填。当分享类型为0时，imagePath可以选填，如果填写则为分享图片的本地路径，不填的话，则分享后没有图片 */
    imagePath?: string;
    /** 分享的音乐/视频数据URL。分享类型为3，4时必填 */
    mediaUrl?: string;
    /** 分享到的平台，不填则默认分享所有平台。可用值包括：WEIXIN(微信好友)、WEIXIN_CIRCLE(微信朋友圈)、SYSTEM(系统分享) */
    platforms?: ServiceSharePlatform[];
    /** 取消回调 */
    cancel?: () => void;
  }

  /** 分享数据到第三方分享平台 */
  function serviceShare(options: ServiceShareOptions): void;
  //#endregion

  //#region 开放能力 - 弹出APK游戏安装页
  /** APK游戏下载失败错误信息 */
  interface DownloadAppFailData {
    /** 错误码：2华为应用市场未安装，15华为应用市场未同意协议，2001下载失败 */
    code: 2 | 15 | 2001;
    /** 错误码说明 */
    data: string;
  }

  /** APK游戏下载/安装进度回调数据 */
  interface DownloadAppCallbackData {
    /** 相关联的APK游戏包名 */
    packageName: string;
    /** APK游戏状态：1安装状态，2下载状态 */
    appType: '1' | '2';
    /** 
     * APK游戏的进展状态
     * 当appType=1时：0等待安装，1安装中，2安装成功，-1安装失败
     * 当appType=2时：-1wifi预约中，0排队等待中，1准备下载，2下载中，3取消下载，4下载完成，5下载失败，6下载暂停，7差分合成中，8下载中断，10重试下载开始
     */
    status: string;
    /** APK游戏下载进度，仅在appType=2时有效。取值[0,100]，代表下载进度为0~100% */
    progress?: string;
  }

  /** 下载并安装APK游戏选项 */
  interface DownloadAppOptions {
    /** 相关联的APK游戏包名 */
    packageName: string;
    /** 接口调用成功回调 */
    success?: () => void;
    /** 接口调用失败回调 */
    fail?: (data: DownloadAppFailData) => void;
    /** 获取APK游戏下载/安装的进度回调 */
    callback?: (data: DownloadAppCallbackData) => void;
  }

  /** 下载并安装相关联的APK游戏 */
  function downloadApp(options: DownloadAppOptions): void;
  //#endregion

  //#region 开放能力 - 打开APK游戏预约页
  /** 预约应用成功回调数据 */
  interface ReserveAppSuccessData {
    /** 用户预约游戏的状态：1已预约，0未预约 */
    appReserveStatus: '1' | '0';
    /** 待预约的APK游戏包名 */
    packageName: string;
  }

  /** 预约应用失败回调数据 */
  interface ReserveAppFailData {
    /** 错误码：-3未签署华为应用市场相关协议，7网络异常，202未传入APK游戏包名 */
    code: -3 | 7 | 202;
    /** 待预约的APK游戏包名 */
    packageName: string;
  }

  /** 预约应用选项（1106+） */
  interface ReserveAppOptions {
    /** 待预约的APK游戏包名，与创建快游戏时的应用包名保持一致 */
    packageName: string;
    /** 成功回调 */
    success?: (data: ReserveAppSuccessData) => void;
    /** 失败回调 */
    fail?: (data: ReserveAppFailData) => void;
  }

  /** 在快游戏内打开APK游戏的预约详情页（1106+） */
  function reserveApp(options: ReserveAppOptions): void;
  //#endregion

  //#region 开放能力 - 设置
  /** 打开设置页 */
  function openSetting(options?: BaseOptions<SettingInfo>): void;

  /** 设置信息 */
  interface SettingInfo {
    authSetting: {
      camera: boolean
    }
  }

  /** 获取设置信息 */
  function getSetting(options?: BaseOptions<SettingInfo>): void;
  //#endregion

  //#region 开放能力 - 设备标识符
  /** 获取匿名设备标识符结果（1103+） */
  interface GetOAIDResult {
    /** 匿名设备标识符。若当前设备不支持oaid，返回空值。当用户重置广告标识符后，该值发生改变。当手机系统设置项"限制广告跟踪"为开启状态时，返回由0组成的字符串。 */
    oaid: string;
  }

  /** 获取匿名设备标识符，建议只在广告的场景使用（1103+） */
  function getOAID(options: BaseOptions<GetOAIDResult>): void;
  //#endregion

  //#region 开放能力 - 桌面图标
  /** 获取桌面图标是否创建（1075+） */
  function hasShortcutInstalled(options: BaseOptions<boolean>): void;

  /** 创建桌面图标选项（1075+） */
  interface InstallShortcutOptions extends BaseOptions<void> {
    /** 提示语 */
    message?: string;
  }

  /** 创建桌面图标（1075+） */
  function installShortcut(options: InstallShortcutOptions): void;
  //#endregion

  //#region 开放能力 - 获取厂商标识
  /** 获取厂商标识（1078+） */
  function getProvider(): string;
  //#endregion

  //#region 开放能力 - 日历事件
  /** 插入日历事件的参数接口 */
  interface InsertCalendarOptions extends BaseOptions<number> {
    /** 事件的标题 */
    title: string;
    /** 事件的描述 */
    description?: string;
    /** 事件开始时间，以从公元纪年开始计算的协调世界时毫秒数表示 */
    startDate: number;
    /** 事件结束时间，以从公元纪年开始计算的协调世界时毫秒数表示 */
    endDate: number;
    /** 事件的时区 */
    timezone?: string;
    /** true 表示此事件占用一整天（按照本地时区的定义）。false 表示它是常规事件，可在一天内的任何时间开始和结束 */
    allDay?: boolean;
    /** 事件的重复发生规则格式。例如，"FREQ=WEEKLY;COUNT=10;WKST=SU" */
    rrule: string;
    /** 在事件开始前几分钟进行提醒。例如：[5,15,30] */
    remindMinutes?: number[];
    /** 事件组织者（所有者）的电子邮件 */
    organizer?: string;
  }

  /** 插入日历事件 */
  function insertCalendar(options: InsertCalendarOptions): void;
  //#endregion

  //#region 开放能力 - 近场联机
  /** 近场联机房间类型 */
  type NearbyRoomType = 1 | 2;

  /** 近场联机房间状态 */
  type NearbyRoomStatus = 1 | 2;

  /** 近场联机玩家状态 */
  type NearbyPlayerStatus = 1 | 2 | 3;

  /** 近场联机房间操作 */
  type NearbyRoomAction = 1 | 2;

  /** 近场联机玩家操作 */
  type NearbyPlayerAction = 1 | 2;

  /** 近场联机离开类型 */
  type NearbyLeaveType = 1 | 2;

  /** 近场联机连接状态 */
  type NearbyConnectionStatus = 0 | 1;

  /** 近场联机初始化选项 */
  interface GameNearbyPlayingInitOptions {
    /** 玩家身份标识 */
    openId: string;
  }

  /** 近场联机创建房间选项 */
  interface GameNearbyPlayingCreateRoomOptions {
    /** 房间名称，最大长度为12个字符，只允许数字、字母、下划线和中文字符 */
    roomName: string;
    /** 最小支持人数，取值[1,6] */
    minPlayerNum: number;
    /** 最大支持人数，取值[1,6] */
    maxPlayerNum: number;
    /** 房间类型，取值说明如下：1：公开，2：私有。默认值为"1" */
    roomType?: NearbyRoomType;
    /** 房间自定义属性，最大长度300个字符 */
    customProperties?: string;
  }

  /** 近场联机加入房间选项 */
  interface GameNearbyPlayingJoinRoomOptions {
    /** 房间ID，只允许数字、字母、下划线。最小长度为1，最大长度为5 */
    roomId: string;
  }

  /** 近场联机离开房间选项 */
  interface GameNearbyPlayingLeaveRoomOptions {
    /** 房间ID，只允许数字、字母、下划线。最小长度为1，最大长度为5 */
    roomId: string;
  }

  /** 近场联机获取房间选项 */
  interface GameNearbyPlayingGetRoomOptions {
    /** 房间ID，只允许数字、字母、下划线。最小长度为1，最大长度为5 */
    roomId: string;
  }

  /** 近场联机更新房间选项 */
  interface GameNearbyPlayingUpdateRoomOptions {
    /** 房间操作，取值说明如下：1：开始游戏，2：结束游戏 */
    action: NearbyRoomAction;
  }

  /** 近场联机更新玩家选项 */
  interface GameNearbyPlayingUpdatePlayerOptions {
    /** 玩家操作，取值说明如下：1：准备，2：取消准备 */
    action: NearbyPlayerAction;
  }

  /** 近场联机发送消息给房主选项 */
  interface GameNearbyPlayingSendToMasterOptions {
    /** 消息内容，最大长度为3000个字符 */
    message: string;
  }

  /** 近场联机发送消息给玩家选项 */
  interface GameNearbyPlayingSendToPlayerOptions {
    /** 消息内容，最大长度为3000个字符 */
    message: string;
    /** 接收消息的玩家ID集合，最大为6个，不填则广播给房间内所有玩家 */
    openIds?: string[];
  }

  /** 近场联机玩家信息 */
  interface NearbyPlayer {
    /** 玩家唯一标识 */
    openId: string;
    /** 房间ID */
    roomId: string;
    /** 玩家状态，取值说明如下：1：未准备，2：准备中，3：游戏中 */
    status: NearbyPlayerStatus;
    /** 自定义玩家属性（JSON） */
    customProperties: string;
  }

  /** 近场联机房间信息 */
  interface NearbyRoom {
    /** 房间ID */
    roomId: string;
    /** 房间名称 */
    roomName: string;
    /** 最小支持人数，取值[1,6] */
    minPlayerNum: number;
    /** 最大支持人数，取值[1,6] */
    maxPlayerNum: number;
    /** 房间类型，取值说明如下：1：公开，2：私有 */
    roomType: NearbyRoomType;
    /** 房主ID */
    ownerId: string;
    /** 房间状态，取值说明如下：1：空闲，2：游戏中 */
    status: NearbyRoomStatus;
    /** 自定义房间属性（JSON） */
    customProperties: string;
    /** 房间内玩家 */
    players: NearbyPlayer[];
  }

  /** 近场联机简化房间信息 */
  interface NearbyRoomSimple {
    /** 房间唯一标识 */
    roomId: string;
    /** 房间名称 */
    roomName: string;
    /** 最小支持人数，取值[1,6] */
    minPlayerNum: number;
    /** 最大支持人数，取值[1,6] */
    maxPlayerNum: number;
  }

  /** 近场联机初始化回调数据 */
  interface GameNearbyPlayingInitCallbackData {
    /** 结果码 */
    code: number;
    /** 结果原因 */
    reason: string;
  }

  /** 近场联机销毁回调数据 */
  interface GameNearbyPlayingDestroyCallbackData {
    /** 结果码 */
    code: number;
    /** 结果原因 */
    reason: string;
  }

  /** 近场联机创建房间回调数据 */
  interface GameNearbyPlayingCreateRoomCallbackData {
    /** 房间唯一标识 */
    roomId: string;
    /** 房间名称 */
    roomName: string;
    /** 最小支持人数 */
    minPlayerNum: number;
    /** 最大支持人数 */
    maxPlayerNum: number;
    /** 结果码 */
    code: number;
    /** 结果原因 */
    reason: string;
  }

  /** 近场联机获取房间回调数据 */
  interface GameNearbyPlayingGetRoomCallbackData {
    /** 房间信息 */
    room: NearbyRoom;
  }

  /** 近场联机加入房间回调数据 */
  interface GameNearbyPlayingJoinRoomCallbackData {
    /** 房间ID */
    roomId: string;
    /** 结果码 */
    code: number;
    /** 结果原因 */
    reason: string;
  }

  /** 近场联机离开房间回调数据 */
  interface GameNearbyPlayingLeaveRoomCallbackData {
    /** 房间ID */
    roomId: string;
    /** 结果码 */
    code: number;
    /** 结果原因 */
    reason: string;
  }

  /** 近场联机发送消息给房主回调数据 */
  interface GameNearbyPlayingSendToMasterCallbackData {
    /** 房间ID */
    roomId: string;
    /** 结果码 */
    code: number;
    /** 结果原因 */
    reason: string;
  }

  /** 近场联机发送消息给玩家回调数据 */
  interface GameNearbyPlayingSendToPlayerCallbackData {
    /** 房间ID */
    roomId: string;
    /** 结果码 */
    code: number;
    /** 结果原因 */
    reason: string;
  }

  /** 近场联机更新玩家回调数据 */
  interface GameNearbyPlayingUpdatePlayerCallbackData {
    /** 房间ID */
    roomId: string;
    /** 结果码 */
    code: number;
    /** 结果原因 */
    reason: string;
  }

  /** 近场联机更新房间回调数据 */
  interface GameNearbyPlayingUpdateRoomCallbackData {
    /** 房间ID */
    roomId: string;
    /** 结果码 */
    code: number;
    /** 结果原因 */
    reason: string;
  }

  /** 近场联机错误回调数据 */
  interface GameNearbyPlayingErrorCallbackData {
    /** 结果码 */
    code: number;
    /** 结果原因 */
    reason: string;
  }

  /** 近场联机可加入房间列表通知回调数据 */
  interface GameNearbyPlayingNearbyRoomNotifyCallbackData {
    /** 可加入的房间列表 */
    nearbyRooms: NearbyRoomSimple[];
  }

  /** 近场联机加入房间通知回调数据 */
  interface GameNearbyPlayingJoinRoomNotifyCallbackData {
    /** 房间ID */
    roomId: string;
    /** 玩家身份标识 */
    openId: string;
  }

  /** 近场联机离开房间通知回调数据 */
  interface GameNearbyPlayingLeaveRoomNotifyCallbackData {
    /** 离开类型，取值说明如下：1：主动离开，2：掉线离开 */
    leaveType: NearbyLeaveType;
    /** 房间ID */
    roomId: string;
    /** 玩家身份标识 */
    openId: string;
  }

  /** 近场联机房间解散通知回调数据 */
  interface GameNearbyPlayingDismissRoomNotifyCallbackData {
    /** 房间ID */
    roomId: string;
    /** 玩家身份标识 */
    openId: string;
  }

  /** 近场联机玩家状态更新通知回调数据 */
  interface GameNearbyPlayingUpdatePlayerNotifyCallbackData {
    /** 房间ID */
    roomId: string;
    /** 玩家身份标识 */
    openId: string;
    /** 玩家状态，取值说明如下：1：未准备，2：准备中，3：游戏中 */
    status: NearbyPlayerStatus;
  }

  /** 近场联机房间状态更新通知回调数据 */
  interface GameNearbyPlayingUpdateRoomNotifyCallbackData {
    /** 房间ID */
    roomId: string;
    /** 玩家身份标识 */
    openId: string;
    /** 房间状态，取值说明如下：1：空闲中，2：游戏中 */
    status: NearbyRoomStatus;
  }

  /** 近场联机接收其他玩家消息回调数据 */
  interface GameNearbyPlayingReceiveFromPlayerCallbackData {
    /** 房间ID */
    roomId: string;
    /** 玩家身份标识 */
    openId: string;
    /** 自定义消息内容 */
    message: string;
  }

  /** 近场联机接收房主消息回调数据 */
  interface GameNearbyPlayingReceiveFromMasterCallbackData {
    /** 房间ID */
    roomId: string;
    /** 玩家身份标识 */
    openId: string;
    /** 自定义消息内容 */
    message: string;
  }

  /** 近场联机连接状态变化回调数据 */
  interface GameNearbyPlayingConnectionChangedCallbackData {
    /** 连接状态，取值说明如下：0：未连接，1：已连接 */
    status: NearbyConnectionStatus;
    /** 连接状态变化原因 */
    reason: string;
  }

  /** 近场联机管理器 */
  interface GameNearbyPlayingManager {
    /** 初始化近场联机环境 */
    init(options: GameNearbyPlayingInitOptions): void;

    /** 销毁近场联机环境 */
    destroy(): void;

    /** 创建房间 */
    createRoom(options: GameNearbyPlayingCreateRoomOptions): void;

    /** 加入房间 */
    joinRoom(options: GameNearbyPlayingJoinRoomOptions): void;

    /** 离开房间 */
    leaveRoom(options: GameNearbyPlayingLeaveRoomOptions): void;

    /** 获取房间信息 */
    getRoom(options: GameNearbyPlayingGetRoomOptions): void;

    /** 更新房间信息 */
    updateRoom(options: GameNearbyPlayingUpdateRoomOptions): void;

    /** 更新玩家信息 */
    updatePlayer(options: GameNearbyPlayingUpdatePlayerOptions): void;

    /** 玩家发送消息给房主 */
    sendToMaster(options: GameNearbyPlayingSendToMasterOptions): void;

    /** 房主发送消息给房间内其他玩家 */
    sendToPlayer(options: GameNearbyPlayingSendToPlayerOptions): void;

    /** 监听初始化近场联机实例事件 */
    onInit(callback: (data: GameNearbyPlayingInitCallbackData) => void): void;

    /** 移除监听初始化近场联机实例事件 */
    offInit(): void;

    /** 监听销毁近场联机实例事件 */
    onDestroy(callback: (data: GameNearbyPlayingDestroyCallbackData) => void): void;

    /** 移除销毁近场联机实例事件 */
    offDestroy(): void;

    /** 监听创建房间事件 */
    onCreateRoom(callback: (data: GameNearbyPlayingCreateRoomCallbackData) => void): void;

    /** 移除监听创建房间事件 */
    offCreateRoom(): void;

    /** 监听查询房间详情结果事件 */
    onGetRoom(callback: (data: GameNearbyPlayingGetRoomCallbackData) => void): void;

    /** 移除监听查询房间详情事件 */
    offGetRoom(): void;

    /** 监听加入房间事件 */
    onJoinRoom(callback: (data: GameNearbyPlayingJoinRoomCallbackData) => void): void;

    /** 移除监听加入房间事件 */
    offJoinRoom(): void;

    /** 监听离开房间事件 */
    onLeaveRoom(callback: (data: GameNearbyPlayingLeaveRoomCallbackData) => void): void;

    /** 移除监听离开房间事件 */
    offLeaveRoom(): void;

    /** 监听玩家发送消息给房主事件（sendToMaster自身收到回调） */
    onSendToMaster(callback: (data: GameNearbyPlayingSendToMasterCallbackData) => void): void;

    /** 移除监听玩家发送消息给房主事件 */
    offSendToMaster(): void;

    /** 监听房主发送消息给其他玩家事件（sendToPlayer自身收到回调） */
    onSendToPlayer(callback: (data: GameNearbyPlayingSendToPlayerCallbackData) => void): void;

    /** 移除监听房主发送消息给其他玩家事件 */
    offSendToPlayer(): void;

    /** 监听玩家状态更新事件（自身状态更新时收到） */
    onUpdatePlayer(callback: (data: GameNearbyPlayingUpdatePlayerCallbackData) => void): void;

    /** 移除监听玩家状态更新事件 */
    offUpdatePlayer(): void;

    /** 监听更新房间状态结果回调 */
    onUpdateRoom(callback: (data: GameNearbyPlayingUpdateRoomCallbackData) => void): void;

    /** 移除更新房间状态结果回调 */
    offUpdateRoom(): void;

    /** 监听异常事件 */
    onError(callback: (data: GameNearbyPlayingErrorCallbackData) => void): void;

    /** 移除监听异常事件 */
    offError(): void;

    /** 监听可加入的房间列表通知事件 */
    onNearbyRoomNotify(callback: (data: GameNearbyPlayingNearbyRoomNotifyCallbackData) => void): void;

    /** 移除监听可加入的房间列表通知事件 */
    offNearbyRoomNotify(): void;

    /** 监听加入房间通知 */
    onJoinRoomNotify(callback: (data: GameNearbyPlayingJoinRoomNotifyCallbackData) => void): void;

    /** 移除监听加入房间通知 */
    offJoinRoomNotify(): void;

    /** 监听离开房间通知 */
    onLeaveRoomNotify(callback: (data: GameNearbyPlayingLeaveRoomNotifyCallbackData) => void): void;

    /** 移除监听离开房间通知 */
    offLeaveRoomNotify(): void;

    /** 监听房间解散通知 */
    onDismissRoomNotify(callback: (data: GameNearbyPlayingDismissRoomNotifyCallbackData) => void): void;

    /** 移除监听房间解散通知 */
    offDismissRoomNotify(): void;

    /** 监听房间内玩家状态更新通知 */
    onUpdatePlayerNotify(callback: (data: GameNearbyPlayingUpdatePlayerNotifyCallbackData) => void): void;

    /** 移除监听房间内玩家状态更新事件 */
    offUpdatePlayerNotify(): void;

    /** 监听更新房间状态通知 */
    onUpdateRoomNotify(callback: (data: GameNearbyPlayingUpdateRoomNotifyCallbackData) => void): void;

    /** 移除监听更新房间状态通知 */
    offUpdateRoomNotify(): void;

    /** 监听接收其他玩家消息事件（房主调用此接口，接收其他玩家消息） */
    onReceiveFromPlayer(callback: (data: GameNearbyPlayingReceiveFromPlayerCallbackData) => void): void;

    /** 移除房主接收消息事件监听 */
    offReceiveFromPlayer(): void;

    /** 监听玩家收到房主发送信息事件 */
    onReceiveFromMaster(callback: (data: GameNearbyPlayingReceiveFromMasterCallbackData) => void): void;

    /** 移除监听玩家收到房主发送信息事件 */
    offReceiveFromMaster(): void;

    /** 监听连接状态变化事件 */
    onConnectionChanged(callback: (data: GameNearbyPlayingConnectionChangedCallbackData) => void): void;

    /** 移除监听连接状态变化事件 */
    offConnectionChanged(): void;
  }

  /** 获取近场联机对象，最多同时创建一个对象 */
  function createGameNearbyPlayingManager(): GameNearbyPlayingManager;
  //#endregion

  //#region 开放能力 - 碰一碰分享
  /** 分享参数 */
  interface ShareParams {
    /** 分享自定义数据 */
    extraData: string;
  }

  /** 分享回调函数返回值 */
  interface ShareResult {
    /** 分享内容 */
    shareParams?: ShareParams;
  }

  /**
   * 监听游戏触发分享事件
   * @param callback 游戏触发分享事件的回调函数。触发分享事件时，可以在回调函数返回值内携带自定义数据分享给其他人
   */
  function onShare(callback: (shareType: string) => ShareResult): void;

  /**
   * 监听游戏通过分享链接启动时是否有自定义数据
   * @param callback 游戏通过分享链接启动时是否有自定义数据的回调函数。如果有自定义数据，则通过callback回调函数返回给游戏，游戏可执行相应的业务逻辑
   */
  function onReceiveShare(callback: (shareType: string, shareParams: ShareParams) => void): void;

  /**
   * 移除监听游戏通过分享链接启动时是否有自定义数据
   * @param callback 移除的回调函数对象
   */
  function offReceiveShare(callback?: (shareType: string, shareParams: ShareParams) => void): void;

  //#endregion

  //#region 开放能力 - 广告API
  //#region 同意接口 (1077+)
  /** 设置未达到法定承诺年龄用户的标记 (1077+) */
  function setUnderAgeOfPromise(underAgeOfPromise: boolean): void;

  /** 用户意见状态 */
  interface ConsentStatus {
    /** 用户意见状态 */
    consentStatus: number;
    /** 是否需要用户确认意见 */
    isNeedConsent: boolean;
    /** 广告技术提供商信息列表 */
    AdProviderList: AdProvider[];
  }

  /** 广告技术提供商信息 */
  interface AdProvider {
    /** 广告技术提供商的ID */
    id: string;
    /** 广告技术提供商的名称 */
    name: string;
    /** 广告技术提供商的服务地 */
    serviceArea: string;
    /** 广告技术提供商的隐私政策链接URL */
    privacyPolicyUrl: string;
  }

  /** 请求用户意见更新状态 (1077+) */
  function requestConsentUpdate(options: BaseOptions<ConsentStatus>): void;

  /** 设置用户意见 (1077+) */
  function setConsentStatus(consentStatus: number): void;

  /** 设置儿童保护标签 (1078+) */
  function setTagForChildProtection(childProtection: number): void;

  /** 设置面向未达到法定承诺年龄用户 (1078+) */
  function setTagForUnderAgeOfPromise(underAgeOfPromiseStr: number): void;

  /** 设置广告内容分级上限 (1078+) */
  function setAdContentClassification(adContentClassification: string): void;

  /** 设置是否请求非个性化广告 (1078+) */
  function setNonPersonalizedAd(personalizedAd: number): void;
  //#endregion

  //#region 原生广告接口 (1075+)
  /** 创建原生广告选项 */
  interface CreateNativeAdOptions extends BaseOptions<number> {
    /** 原生广告位标识 */
    adUnitId: string;
  }

  /** 原生广告加载参数 */
  interface NativeAdLoadOptions {
    /** 扩展参数 */
    channelExtras?: {
      /** 广告的启动渠道，取值范围为0~100 */
      customerChannel?: string;
    };
  }

  /** 原生广告数据项 */
  interface NativeAdItem {
    /** 广告标识，用于上报曝光与点击 */
    adId: string;
    /** 广告标题 */
    title: string;
    /** 广告来源 (1077+) */
    source?: string;
    /** 推广应用的Icon图标 */
    icon: string;
    /** 广告图片 */
    imgUrlList: string[];
    /** 广告视频 */
    videoUrlList: string[];
    /** 广告视频宽高比 (1078+) */
    videoRatio?: number[];
    /** 广告标签图片 */
    logoUrl: string;
    /** 点击按钮文本描述 */
    clickBtnTxt: string;
    /** 广告类型 */
    creativeType: number;
    /** 广告点击之后的交互类型 */
    interactionType: number;
    /** 应用包名 */
    appName: string;
    /** 应用版本号 */
    versionName: string;
    /** 应用的运营者信息 */
    developerName: string;
    /** 应用介绍页面对应的H5地址 */
    appDetailUrl: string;
    /** 应用的权限声明页面对应的H5地址 */
    permissionUrl: string;
    /** 应用的隐私链接 */
    privacyUrl: string;
  }

  /** 原生广告加载回调数据 */
  interface NativeAdLoadData {
    /** 广告详细信息 */
    adList: NativeAdItem[];
  }

  /** 原生广告错误回调数据 */
  interface AdErrorData {
    /** 错误码 */
    errCode: number;
    /** 错误信息 */
    errMsg: string;
  }

  /** 原生广告上报选项 */
  interface NativeAdReportOptions {
    /** 广告信息标识，由onload回调返回 */
    adId: string;
  }

  /** 原生广告下载选项 (1078+) */
  interface NativeAdDownloadOptions {
    /** 广告信息标识，由onload回调返回 */
    adId: string;
  }

  /** 原生广告下载按钮样式 (1115+) */
  interface NativeAdDownloadButtonStyle {
    /** 控件展示左上角横坐标，单位：px */
    left: number;
    /** 控件展示左上角纵坐标，单位：px */
    top: number;
    /** 控件宽度，单位：px */
    width?: number;
    /** 是否固定宽度 */
    fixedWidth?: boolean;
    /** 控件最小宽度，单位：px */
    minWidth?: number;
    /** 控件最大宽度，单位：px */
    maxWidth?: number;
    /** 控件高度类型 */
    heightType?: 'normal' | 'short';
    /** 文字大小，单位：px */
    textSize?: number;
    /** 字体 */
    font?: string;
    /** 左右内边距，单位：px */
    horizontalPadding?: number;
    /** 按钮圆角半径，单位：px */
    cornerRadius?: number;
    /** 常规样式字体颜色 */
    normalTextColor?: string;
    /** 常规样式按钮背景颜色 */
    normalBackground?: string;
    /** 常规样式按钮按压颜色 */
    pressedColor?: string;
    /** 常规样式按钮描边宽度，单位：px */
    normalStroke?: number;
    /** 常规样式按钮描边颜色 */
    normalStrokeCorlor?: string;
    /** 处理中样式字体颜色 */
    processingTextColor?: string;
    /** 处理中样式按钮背景颜色 */
    processingBackground?: string;
    /** 处理中样式按钮进度颜色 */
    processingColor?: string;
    /** 处理中样式按钮描边宽度，单位：px */
    processingStroke?: number;
    /** 处理中样式按钮描边颜色 */
    processingStrokeCorlor?: string;
    /** 安装中样式字体颜色 */
    installingTextColor?: string;
    /** 安装中样式按钮背景颜色 */
    installingBackground?: string;
    /** 安装中样式按钮描边宽度，单位：px */
    installingStroke?: number;
    /** 安装中样式按钮描边颜色 */
    installingStrokeCorlor?: string;
  }

  /** 原生广告显示下载按钮选项 (1115+) */
  interface NativeAdShowDownloadButtonOptions extends BaseOptions<number> {
    /** 原生广告位标识 */
    adId: string;
    /** 控件样式 */
    style: NativeAdDownloadButtonStyle;
  }

  /** 原生广告隐藏下载按钮选项 (1115+) */
  interface NativeAdHideDownloadButtonOptions extends BaseOptions<number> {
    /** 原生广告位标识 */
    adId: string;
  }

  /** 原生广告组件 */
  interface NativeAd {
    /** 拉取广告数据 */
    load(options?: NativeAdLoadOptions): void;
    /** 上报广告曝光 */
    reportAdShow(options: NativeAdReportOptions): void;
    /** 上报广告点击 */
    reportAdClick(options: NativeAdReportOptions): void;
    /** 设置广告加载成功回调 */
    onLoad(callback: (data: NativeAdLoadData) => void): void;
    /** 移除原生广告加载成功监听 */
    offLoad(): void;
    /** 监听原生广告错误事件 */
    onError(callback: (data: AdErrorData) => void): void;
    /** 移除原生广告加载错误监听 */
    offError(): void;
    /** 设置儿童保护标签 (1077+) */
    setTagForChildProtection(childProtection: number): void;
    /** 设置面向未达到法定承诺年龄用户标签 (1077+) */
    setTagForUnderAgeOfPromise(underAgeOfPromiseStr: number): void;
    /** 设置广告内容分级上限 (1077+) */
    setAdContentClassification(adContentClassification: string): void;
    /** 设置是否请求非个性化广告 (1077+) */
    setNonPersonalizedAd(personalizedAd: number): void;
    /** 去广告落地页下载原生广告对应的应用 (1078+) */
    startDownload(options: NativeAdDownloadOptions): number;
    /** 显示控件按钮 (1115+) */
    showDownloadButton(options: NativeAdShowDownloadButtonOptions): void;
    /** 隐藏控件按钮 (1115+) */
    hideDownloadButton(options: NativeAdHideDownloadButtonOptions): void;
    /** 销毁原生广告 */
    destroy(): void;
    /** 获取下载状态。 */
    getAppStatus(options: { adId: string }): string
  }

  /** 创建原生广告 (1075+) */
  function createNativeAd(options: CreateNativeAdOptions): NativeAd;
  //#endregion

  //#region 激励视频广告接口 (1075+)
  /** 创建激励视频广告选项 */
  interface CreateRewardedVideoAdOptions extends BaseOptions<number> {
    /** 激励视频广告位标识 */
    adUnitId: string;
    /** 是否启用多例模式，默认为false (1077+) */
    multiton?: boolean;
  }

  /** 激励视频广告加载参数 */
  interface RewardedVideoAdLoadOptions {
    /** 扩展参数 */
    channelExtras?: {
      /** 广告的启动渠道，取值范围为0~100 */
      customerChannel?: string;
    };
  }

  /** 激励视频广告关闭回调数据 */
  interface RewardedVideoAdCloseData {
    /** 视频是否是在用户完整观看的情况下被关闭的 */
    isEnded: boolean;
  }

  /** 激励视频广告组件 */
  interface RewardedVideoAd {
    /** 手动拉取广告，用于刷新广告 */
    load(options?: RewardedVideoAdLoadOptions): void;
    /** 展示广告 */
    show(): void;
    /** 设置广告加载成功回调 */
    onLoad(callback: () => void): void;
    /** 移除激励视频广告加载成功监听 */
    offLoad(): void;
    /** 监听激励视频广告关闭事件 */
    onClose(callback: (data: RewardedVideoAdCloseData) => void): void;
    /** 移除激励视频广告关闭监听 */
    offClose(): void;
    /** 监听激励视频广告错误事件 */
    onError(callback: (data: AdErrorData) => void): void;
    /** 移除激励视频广告加载错误监听 */
    offError(): void;
    /** 设置儿童保护标签 (1077+) */
    setTagForChildProtection(childProtection: number): void;
    /** 设置面向未达到法定承诺年龄用户标签 (1077+) */
    setTagForUnderAgeOfPromise(underAgeOfPromiseStr: number): void;
    /** 设置广告内容分级上限 (1077+) */
    setAdContentClassification(adContentClassification: string): void;
    /** 设置是否请求非个性化广告 (1077+) */
    setNonPersonalizedAd(personalizedAd: number): void;
    /** 销毁激励视频广告 */
    destroy(): void;
  }

  /** 创建激励视频广告 (1075+) */
  function createRewardedVideoAd(options: CreateRewardedVideoAdOptions): RewardedVideoAd;
  //#endregion

  //#region Banner广告接口 (1078+)
  /** Banner广告样式 */
  interface BannerAdStyle {
    /** banner 广告组件的左上角纵坐标 */
    top: number;
    /** banner 广告组件的左上角横坐标 */
    left: number;
    /** banner 广告组件的宽度，单位：dp */
    width: number;
    /** banner 广告组件的高度，单位：dp */
    height: number;
    /** banner 广告组件的真实宽度，单位px */
    realWidth?: number;
    /** banner 广告组件的真实高度，单位px */
    realHeight?: number;
  }

  /** 创建Banner广告选项 */
  interface CreateBannerAdOptions {
    /** Banner 广告位标识 */
    adUnitId: string;
    /** Banner 广告组件的样式 */
    style: BannerAdStyle;
    /** 广告自动刷新的间隔时间，单位为秒，参数值30 ~ 120之间 */
    adIntervals?: number;
  }

  /** Banner广告显示参数 */
  interface BannerAdShowOptions {
    /** 扩展参数 */
    channelExtras?: {
      /** 广告的启动渠道，取值范围为0~100 */
      customerChannel?: string;
    };
  }

  /** Banner广告组件 */
  interface BannerAd {
    /** 广告样式 */
    style: BannerAdStyle;
    /** 加载展示banner广告 */
    show(options?: BannerAdShowOptions): void;
    /** 隐藏 banner 广告 */
    hide(): void;
    /** 监听 banner 广告错误事件 */
    onError(callback: (data: AdErrorData) => void): void;
    /** 移除 banner 广告错误监听 */
    offError(): void;
    /** 监听 banner 广告加载事件 */
    onLoad(callback: () => void): void;
    /** 移除 banner 广告加载事件 */
    offLoad(): void;
    /** 监听 banner 广告关闭事件 */
    onClose(callback: () => void): void;
    /** 移除 banner 广告关闭事件 */
    offClose(): void;
    /** 销毁 banner 广告 */
    destroy(): void;
  }

  /** 创建Banner广告 (1078+) */
  function createBannerAd(options: CreateBannerAdOptions): BannerAd;
  //#endregion

  //#region 插屏广告接口 (1078+)
  /** 创建插屏广告选项 */
  interface CreateInterstitialAdOptions {
    /** Interstitial 广告位标识 */
    adUnitId: string;
  }

  /** 插屏广告加载参数 */
  interface InterstitialAdLoadOptions {
    /** 扩展参数 */
    channelExtras?: {
      /** 广告的启动渠道，取值范围为0~100 */
      customerChannel?: string;
    };
  }

  /** 插屏广告组件 */
  interface InterstitialAd {
    /** 加载插屏视频广告 */
    load(options?: InterstitialAdLoadOptions): void;
    /** 显示插屏视频广告 */
    show(): void;
    /** 监听插屏广告加载事件 */
    onLoad(callback: (data: any) => void): void;
    /** 移除插屏广告加载事件 */
    offLoad(): void;
    /** 监听插屏广告错误事件 */
    onError(callback: (data: AdErrorData) => void): void;
    /** 移除插屏广告错误监听 */
    offError(): void;
    /** 监听插屏广告关闭事件 */
    onClose(callback: () => void): void;
    /** 移除插屏广告关闭事件 */
    offClose(): void;
    /** 监听插屏广告点击事件 */
    onClick(callback: () => void): void;
    /** 移除插屏广告点击监听 */
    offClick(): void;
    /** 销毁插屏广告 */
    destroy(): void;
  }

  /** 创建插屏广告 (1078+) */
  function createInterstitialAd(options: CreateInterstitialAdOptions): InterstitialAd;
  //#endregion
  //#endregion

  //#region 分包加载
  /** 加载分包选项 */
  interface LoadSubpackageOptions extends BaseOptions<void> {
    /** 分包的名字 */
    subpackage: string;
  }

  /** 加载分包 */
  function loadSubpackage(options: LoadSubpackageOptions): LoadSubpackageTask;

  /** 加载分包任务 */
  interface LoadSubpackageTask {
    /** 监听分包加载进度变化事件 */
    onprogress(res: {
      /** 分包下载进度百分比 */
      progress: number;
      /** 数据总长度，单位 Bytes */
      totalSize: number;
      /** 已经下载的数据长度，单位 Bytes */
      loadSize: number;
    }): void;
  }
  //#endregion

  //#region 性能
  /** 性能监控 */
  interface Performance {
    /** 获取当前时间戳 */
    now(): number;
  }

  /** 获取性能管理器 */
  function getPerformance(): Performance;

  /** 加快触发JS GC，但不保证一定能立即触发JS GC。 */
  function triggerGC(): void
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
  //#endregion

  //#region 网络-下载
  /** 下载文件成功回调参数 */
  interface DownloadFileSuccessResult {
    /** 临时文件路径 (本地路径)。没传入filePath指定文件存储路径时会返回，下载后的文件会存储到一个临时文件 */
    tempFilePath?: string;
    /** 用户文件路径 (本地路径)。传入filePath时会返回，跟传入的filePath一致 */
    filePath?: string;
    /** 开发者服务器返回的HTTP状态码 */
    statusCode: number;
  }

  /** 下载文件选项 */
  interface DownloadFileOptions extends BaseOptions<DownloadFileSuccessResult> {
    /** 下载资源的url */
    url: string;
    /** HTTP请求的Header，Header中不能设置Referer */
    header?: object;
    /** 指定文件下载后存储的路径+文件名 */
    filePath?: string;
  }

  /** 下载进度更新回调参数 */
  interface DownloadProgressUpdateResult {
    /** 下载进度百分比 */
    progress: number;
    /** 已经下载的数据长度，单位Bytes */
    totalBytesWritten: number;
    /** 预期需要下载的数据总长度，单位Bytes */
    totalBytesExpectedToWrite: number;
  }

  /** 下载任务对象 */
  interface DownloadTask {
    /** 中断下载任务 */
    abort(): void;
    /** 监听下载进度变化事件 */
    onProgressUpdate(callback: (result: DownloadProgressUpdateResult) => void): void;
  }

  /** 下载文件资源到本地。客户端直接发起一个 HTTPS GET 请求，通过回调函数返回文件的本地临时路径。返回一个DownloadTask对象 */
  function downloadFile(options: DownloadFileOptions): DownloadTask;
  //#endregion

  //#region 网络-上传
  /** 上传文件成功回调参数 */
  interface UploadFileSuccessData {
    /** 开发者服务器返回的数据 */
    data: string;
    /** 开发者服务器返回的 HTTP 状态码 */
    statusCode: number;
  }

  /** 上传文件选项 */
  interface UploadFileOptions extends BaseOptions<UploadFileSuccessData> {
    /** 开发者服务器地址 */
    url: string;
    /** 要上传文件资源的路径 */
    filePath: string;
    /** 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容 */
    name: string;
    /** HTTP 请求 Header，Header 中不能设置 Referer */
    header?: Record<string, string>;
    /** HTTP 请求中其他额外的 form data */
    formData?: Record<string, any>;
  }

  /** 上传进度回调参数 */
  interface UploadProgressData {
    /** 上传进度百分比 */
    progress: number;
    /** 已经上传的数据长度，单位 Bytes */
    totalBytesSent: number;
    /** 预期需要上传的数据总长度，单位 Bytes */
    totalBytesExpectedToSend: number;
  }

  /** 上传任务 */
  interface UploadTask {
    /** 监听上传进度变化 */
    onProgressUpdate(callback: (data: UploadProgressData) => void): void;
    /** 取消监听上传进度变化事件 */
    offProgressUpdate(callback: (data: UploadProgressData) => void): void;
    /** 中断上传任务 */
    abort(): void;
  }

  /** 将本地资源上传到服务器 */
  function uploadFile(options: UploadFileOptions): UploadTask;
  //#endregion

  //#region 网络-UDP通信
  /**
   * UDP Socket 创建参数
   */
  interface UDPSocketOptions {
    /** 创建的UDPSocket类型，可用类型为udp4或者udp6 */
    type: 'udp4' | 'udp6';
    /** 是否允许在bind时重用端口 */
    reuseAddr: boolean;
  }

  /**
   * UDP Socket 发送消息参数
   */
  interface UDPSocketSendOptions {
    /** 要发消息的地址 */
    address: string;
    /** 要发送消息的端口号 */
    port: number;
    /** 要发送的数据 */
    message: string | ArrayBuffer;
    /** 发送数据的偏移量，仅当message为ArrayBuffer类型时有效。默认值为0 */
    offset?: number;
    /** 发送数据的长度，仅当message为ArrayBuffer类型时有效。默认值为message.byteLength */
    length?: number;
  }

  /**
   * UDP Socket 连接参数
   */
  interface UDPSocketConnectOptions {
    /** 要发消息的地址 */
    address: string;
    /** 要发送消息的端口号 */
    port: number;
  }

  /**
   * UDP Socket 错误信息
   */
  interface UDPSocketError {
    /** 错误码 */
    code: number;
    /** 错误信息 */
    errMsg: string;
  }

  /**
   * 远程地址信息
   */
  interface RemoteInfo {
    /** 发送消息的socket的地址 */
    address: string;
    /** 使用的协议族，为IPv4或者IPv6 */
    family: string;
    /** 端口号 */
    port: number;
    /** message的大小，单位为字节 */
    size: number;
  }

  /**
   * 本地地址信息
   */
  interface LocalInfo {
    /** 接收消息的socket的地址 */
    address: string;
    /** 使用的协议族，为IPv4或者IPv6 */
    family: string;
    /** 端口号 */
    port: number;
  }

  /**
   * UDP Socket 消息信息
   */
  interface UDPSocketMessage {
    /** 收到的消息。消息长度需要小于4096 */
    message: ArrayBuffer;
    /** 发送端地址信息 */
    remoteInfo: RemoteInfo;
    /** 接受端地址信息 */
    localInfo: LocalInfo;
  }

  /**
   * UDP Socket 实例
   */
  interface UDPSocket {
    /**
     * 绑定一个系统随机分配的可用端口，或绑定一个指定的端口号
     * @param port 指定要绑定的端口号，不传则返回系统随机分配的可用端口
     * @returns 绑定成功的端口号
     */
    bind(port?: number): number;

    /**
     * 设置IP_TTL套接字选项，用于设置一个IP数据包传输时允许的最大跳步数
     * @param ttl ttl参数可以是0到255之间
     */
    setTTL(ttl: number): void;

    /**
     * 向指定的IP和port发送消息
     * @param object 发送消息参数
     */
    send(object: UDPSocketSendOptions): void;

    /**
     * 预先连接到指定的IP和port，需要配合write方法一起使用
     * @param object 连接参数
     */
    connect(object: UDPSocketConnectOptions): void;

    /**
     * 向指定的IP和port发送消息。用法与send方法相同，如果没有预先调用connect则与send无差异
     * @param object 发送消息参数
     */
    write(object: UDPSocketSendOptions): void;

    /**
     * 关闭UDP Socket实例，相当于销毁
     */
    close(): void;

    /**
     * 监听关闭事件
     * @param listener 关闭事件的回调函数
     */
    onClose(listener: () => void): void;

    /**
     * 移除关闭事件的回调函数
     * @param listener onClose传入的回调函数
     */
    offClose(listener: () => void): void;

    /**
     * 监听错误事件
     * @param listener 错误事件的回调函数
     */
    onError(listener: (error: UDPSocketError) => void): void;

    /**
     * 移除错误事件的回调函数
     * @param listener onError传入的回调函数
     */
    offError(listener: (error: UDPSocketError) => void): void;

    /**
     * 监听开始监听数据包消息的事件
     * @param listener 开始监听数据包消息的事件的回调函数
     */
    onListening(listener: () => void): void;

    /**
     * 移除开始监听数据包消息的事件的回调函数
     * @param listener onListening传入的回调函数
     */
    offListening(listener: () => void): void;

    /**
     * 监听收到消息的事件
     * @param listener 收到消息的事件的回调函数
     */
    onMessage(listener: (message: UDPSocketMessage) => void): void;

    /**
     * 移除收到消息的事件的回调函数
     * @param listener onMessage传入的回调函数
     */
    offMessage(listener: (message: UDPSocketMessage) => void): void;
  }

  /**
   * 创建一个UDP Socket实例（1117+）
   * @param object 创建参数，当不传入参数时，默认创建udp4类型的对象，使用IPv4协议，并且不进行地址重用
   * @returns UDP Socket实例
   */
  function createUDPSocket(object?: string | UDPSocketOptions): UDPSocket;
  //#endregion

  //#region 媒体-图片
  /** 选择图片选项 */
  interface ChooseImageOptions extends BaseOptions<ChooseImageResult> {
    /** 最多可以选择的图片张数 */
    count?: number;
    /** 选择图片的来源。album表示从相册中选择图片，camera表示使用相机获取图片。默认值为["album","camera"] */
    sourceType?: ('album' | 'camera')[];
  }

  /** 选择图片结果 */
  interface ChooseImageResult {
    /** 图片的本地临时文件路径列表 */
    tempFilePaths: string[];
    /** 图片的本地临时文件列表 */
    tempFiles: TempFile[];
  }

  /** 临时文件信息 */
  interface TempFile {
    /** 本地临时文件路径 */
    path: string;
    /** 本地临时文件大小，单位：B */
    size: number;
  }

  /** 从系统相册选择图片或者拍照 */
  function chooseImage(options: ChooseImageOptions): void;

  /** 预览图片选项 */
  interface PreviewImageOptions extends BaseOptions<void> {
    /** 需要预览的图片链接列表 */
    urls: string[];
    /** 当前显示图片的链接。默认显示urls的第一张图片 */
    current?: string;
  }

  /** 在新场景中全屏预览图片 */
  function previewImage(options: PreviewImageOptions): void;

  /** 保存图片到系统相册选项 */
  interface SaveImageToPhotosAlbumOptions extends BaseOptions<void> {
    /** 图片文件路径，可以是临时文件路径或永久文件路径，不支持网络图片路径 */
    filePath: string;
  }

  /** 保存图片到系统相册，调用之前需要用户授权 */
  function saveImageToPhotosAlbum(options: SaveImageToPhotosAlbumOptions): void;

  /** 保存图片临时文件选项 */
  interface SaveImageTempOptions extends BaseOptions<SaveImageTempResult> {
    /** 像素数据，数据类型为RGBA8888格式的Uint8Array数组 */
    data: Uint8Array;
    /** 写入图片的宽度，最大宽度为4096 */
    width: number;
    /** 写入图片的高度，最大高度为4096 */
    height: number;
    /** 写入图片的格式，支持类型为jpg、png */
    fileType: 'jpg' | 'png';
    /** 是否需要将写入的数据按y轴反转，默认为false */
    reverse?: boolean;
  }

  /** 保存图片临时文件结果 */
  interface SaveImageTempResult {
    /** 保存完成后，本地临时文件路径 */
    tempFilePath: string;
    /** 错误信息 */
    errMsg: string;
  }

  /** 异步将二进制图像数据保存为本地临时图片文件 */
  function saveImageTemp(options: SaveImageTempOptions): void;

  /** 同步保存图片临时文件选项 */
  interface SaveImageTempSyncOptions {
    /** 像素数据，数据类型为RGBA8888格式的Uint8Array数组 */
    data: Uint8Array;
    /** 写入图片的宽度，最大宽度为4096 */
    width: number;
    /** 写入图片的高度，最大高度为4096 */
    height: number;
    /** 写入图片的格式，支持类型为jpg、png */
    fileType: 'jpg' | 'png';
    /** 是否需要将写入的数据按y轴反转，默认为false */
    reverse?: boolean;
  }

  /** 同步将二进制图像数据保存为本地临时图片文件，保存完成后，返回本地临时文件路径 */
  function saveImageTempSync(options: SaveImageTempSyncOptions): string;
  //#endregion

  //#region 媒体-音频
  /** 音频播放错误事件回调参数 */
  interface AudioErrorCallbackResult {
    /** 错误码 */
    errCode: number;
    /** 错误信息 */
    errMsg: string;
  }

  /** 内部音频上下文对象 */
  interface InnerAudioContext {
    /** 音频资源的地址，用于直接播放 */
    src: string;
    /** 开始播放的位置（单位：s），默认为 0 */
    startTime: number;
    /** 是否自动开始播放，默认为 false */
    autoplay: boolean;
    /** 是否循环播放，默认为 false */
    loop: boolean;
    /** 是否遵循系统静音开关，默认为true。当此参数为false时，即使用户打开了静音开关，也能继续发出声音 */
    obeyMuteSwitch: boolean;
    /** 音量。范围 0 ~ 1。默认为 1 */
    volume: number;
    /** 当前音频的长度（单位 s）。只有在当前有合法的src时返回（只读） */
    readonly duration: number;
    /** 当前音频的播放位置（单位 s）。只有在当前有合法的src时返回，时间保留小数点后6位（只读） */
    readonly currentTime: number;
    /** 当前是否为暂停或停止状态（只读） */
    readonly paused: boolean;
    /** 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲（只读） */
    readonly buffered: number;

    /** 播放 */
    play(): void;
    /** 暂停。暂停后的音频再播放会从暂停处开始播放 */
    pause(): void;
    /** 停止。停止后的音频再播放会从头开始播放 */
    stop(): void;
    /** 跳转到指定位置 */
    seek(position: number): void;
    /** 销毁当前实例 */
    destroy(): void;

    /** 监听音频播放进度更新事件 */
    onTimeUpdate(callback: () => void): void;
    /** 取消监听音频播放进度更新事件 */
    offTimeUpdate(callback: () => void): void;
    /** 监听音频自然播放至结束的事件 */
    onEnded(callback: () => void): void;
    /** 取消监听音频自然播放至结束的事件 */
    offEnded(callback: () => void): void;
    /** 监听音频播放事件 */
    onPlay(callback: () => void): void;
    /** 取消监听音频播放事件 */
    offPlay(callback: () => void): void;
    /** 监听音频暂停事件 */
    onPause(callback: () => void): void;
    /** 取消监听音频暂停事件 */
    offPause(callback: () => void): void;
    /** 监听音频停止事件 */
    onStop(callback: () => void): void;
    /** 取消监听音频停止事件 */
    offStop(callback: () => void): void;
    /** 监听音频播放错误事件 */
    onError(callback: (res: AudioErrorCallbackResult) => void): void;
    /** 取消监听音频播放错误事件 */
    offError(callback: (res: AudioErrorCallbackResult) => void): void;
    /** 监听音频进入可以播放状态的事件，但不保证后面可以流畅播放 */
    onCanplay(callback: () => void): void;
    /** 取消监听音频进入可以播放状态的事件 */
    offCanplay(callback: () => void): void;
    /** 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发 */
    onWaiting(callback: () => void): void;
    /** 取消监听音频加载中事件 */
    offWaiting(callback: () => void): void;
    /** 监听音频进行跳转操作的事件 */
    onSeeking(callback: () => void): void;
    /** 取消监听音频进行跳转操作的事件 */
    offSeeking(callback: () => void): void;
    /** 监听音频完成跳转操作的事件 */
    onSeeked(callback: () => void): void;
    /** 取消监听音频完成跳转操作的事件 */
    offSeeked(callback: () => void): void;
  }

  /** 获取一个音频对象用于播放音频，播放的时候会返回一个audioID，可以通过此audioID操作对应的音频对象。每次调用create会创建一个新的实例对象，目前最多同时支持5个播放音频的对象 */
  function createInnerAudioContext(): InnerAudioContext;
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
  interface LaunchNativeAppOptions extends BaseOptions<void> {
    /** 第三方应用包名 */
    packageName: string;
  }

  /** 打开第三方应用 */
  function launchNativeApp(options: LaunchNativeAppOptions): void;

  //#endregion

  //#region 文件系统
  /** 文件统计信息 */
  interface Stats {
    /** 文件最后访问时间 */
    lastAccessedTime: number;
    /** 文件最后修改时间 */
    lastModifiedTime: number;
    /** 文件大小，以字节为单位 */
    size: number;
    /** 文件的类型和存取的权限，对应POSIX stat.st_mode。 */
    mode: string
    /** 判断当前文件是否一个目录 */
    isDirectory(): boolean;
    /** 判断当前文件是否一个普通文件 */
    isFile(): boolean;
  }

  /** 文件信息 */
  interface FileStats {
    /** 文件路径 */
    path: string;
    /** 文件统计信息 */
    stats: Stats;
  }

  /** 文件系统管理器 */
  interface FileSystemManager {
    /** 读取文件内容 */
    readFile(options: {
      /** 要读取的文件的路径 */
      filePath: string;
      /** 指定读取文件的字符编码，合法值为binary和utf8，默认为 binary。 */
      encoding?: 'binary' | 'utf8';
    } & BaseOptions<{ data: string | ArrayBuffer }>): void;

    /** 同步读取文件内容 */
    readFileSync(filePath: string, encoding?: 'binary' | 'utf8'): string | ArrayBuffer;

    /** 写文件 */
    writeFile(options: {
      /** 要写入的文件路径 */
      filePath: string;
      /** 要写入的文本或二进制数据 */
      data: string | ArrayBuffer;
      /** 指定写入文件的字符编码。合法值为utf8和binary，默认值为utf8。 */
      encoding?: 'binary' | 'utf8';
    } & BaseOptions<void>): void;

    /** 同步写文件 */
    writeFileSync(filePath: string, data: string | ArrayBuffer, encoding?: 'binary' | 'utf8'): void;

    /** 在文件结尾追加内容 */
    appendFile(options: {
      /** 要追加内容的文件路径 */
      filePath: string;
      /** 要追加的文本或二进制数据 */
      data: string | ArrayBuffer;
      /** 指定写入文件的字符编码。合法值为utf8和binary，默认值为utf8。 */
      encoding?: 'binary' | 'utf8';
    } & BaseOptions<void>): void;

    /** 同步在文件结尾追加内容 */
    appendFileSync(options: {
      /** 要追加内容的文件路径 */
      filePath: string;
      /** 要追加的文本或二进制数据 */
      data: string | ArrayBuffer;
      /** 指定写入文件的字符编码。合法值为utf8和binary，默认值为utf8。 */
      encoding?: 'binary' | 'utf8';
    }): void;

    /** 创建目录 */
    mkdir(options: {
      /** 创建的目录路径 */
      dirPath: string;
      /** 是否在递归创建该目录的上级目录后再创建该目录。如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。 */
      recursive?: boolean;
    } & BaseOptions<void>): void;

    /** 同步创建目录 */
    mkdirSync(dirPath: string, recursive?: boolean): void;

    /** 删除目录 */
    rmdir(options: {
      /** 要删除的目录路径 */
      dirPath: string;
      /** 是否递归删除目录。如果为 true，则删除该目录和该目录下的所有子目录以及文件。 */
      recursive?: boolean;
    } & BaseOptions<void>): void;

    /** 同步删除目录 */
    rmdirSync(dirPath: string, recursive?: boolean): void;

    /** 读取目录内文件列表 */
    readdir(options: {
      /** 要读取的目录路径 */
      dirPath: string;
    } & BaseOptions<{ files: string[] }>): void;

    /** 同步读取目录内文件列表 */
    readdirSync(dirPath: string): string[];

    /** 复制文件 */
    copyFile(options: {
      /** 源文件路径，只可以是普通文件 */
      srcPath: string;
      /** 目标文件路径 */
      destPath: string;
    } & BaseOptions<void>): void;

    /** 同步复制文件 */
    copyFileSync(srcPath: string, destPath: string): void;

    /** 重命名文件，可以把文件从 oldPath 移动到 newPath */
    rename(options: {
      /** 源文件路径，可以是普通文件或目录 */
      oldPath: string;
      /** 新文件路径 */
      newPath: string;
    } & BaseOptions<void>): void;

    /** 同步重命名文件 */
    renameSync(oldPath: string, newPath: string): void;

    /** 删除文件 */
    unlink(options: {
      /** 要删除的文件路径 */
      filePath: string;
    } & BaseOptions<void>): void;

    /** 同步删除文件 */
    unlinkSync(filePath: string): void;

    /** 获取文件 Stats 对象 */
    stat(options: {
      /** 文件/目录路径 */
      path: string;
      /** 是否递归获取目录下的每个文件的 Stats 信息 */
      recursive?: boolean;
    } & BaseOptions<{ stats: Stats } | { stats: FileStats[] }>): void;

    /** 同步获取文件 Stats 对象 */
    statSync(path: string, recursive?: boolean): Stats | FileStats[];

    /** 判断文件/目录是否存在 */
    access(options: {
      /** 要判断是否存在的文件/目录路径 */
      path: string;
    } & BaseOptions<void>): void;

    /** 同步判断文件/目录是否存在 */
    accessSync(path: string): void;

    /** 获取文件信息 */
    getFileInfo(options: {
      /** 要读取的文件路径 */
      filePath: string;
    } & BaseOptions<{
      /** 文件大小，以字节为单位 */
      size: number;
    }>): void;

    /** 解压文件 */
    unzip(options: {
      /** zip源文件路径，只可以是 zip 压缩文件 */
      zipFilePath: string;
      /** 目标目录路径 */
      targetPath: string;
    } & BaseOptions<void>): void;

    /** 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。 */
    saveFile(options: {
      /** 临时存储文件路径 */
      tempFilePath: string;
      /** 要存储的文件路径 */
      filePath: string;
    } & BaseOptions<{
      /** 存储后的文件路径 */
      savedFilePath: string;
    }>): void;

    /** 同步保存临时文件到本地 */
    saveFileSync(tempFilePath: string, filePath: string): string;

    /** 删除该快游戏下的本地缓存文件 */
    removeSavedFile(options: {
      /** 需要删除的文件路径 */
      filePath: string;
    } & BaseOptions<void>): void;
  }

  /** 获取全局唯一的文件系统管理器 */
  function getFileSystemManager(): FileSystemManager;
  //#endregion

  //#region 创新互动卡片（1117+）
  /** 卡片尺寸信息 */
  interface FormRect {
    /** 卡片宽度，单位：px */
    width: number;
    /** 卡片高度，单位：px */
    height: number;
  }

  /** 窗口尺寸信息 */
  interface WindowRect {
    /** 卡片渲染范围的实际宽度，等于screenWidth*pixelRatio，单位：px */
    width: number;
    /** 卡片渲染范围的实际高度，等于screenHeight*pixelRatio，单位：px */
    height: number;
  }

  /** 获取卡片信息成功回调参数 */
  interface GetFormInfoSuccessResult {
    /** 卡片的尺寸大小 */
    rect: FormRect;
    /** 卡片的圆角半径，单位：px */
    radius: number;
  }

  /** 获取卡片信息选项 */
  interface GetFormInfoOptions {
    /** 接口调用成功的回调函数 */
    success: (data: GetFormInfoSuccessResult) => void;
    /** 接口调用完成后的回调函数 */
    complete?: () => void;
  }

  /** 卡片信息更新回调参数 */
  interface FormInfoUpdateCallbackResult {
    /** 卡片的尺寸大小 */
    rect: FormRect;
    /** 卡片的圆角半径，单位：px */
    radius: number;
  }

  /**
   * 获取创新互动卡片的尺寸大小、圆角半径（1117+）
   * @param options 获取卡片信息的选项
   * @example
   * ```javascript
   * qg.getFormInfo({
   *     success: function (data) {
   *         console.log('getFormInfo success' + JSON.stringify(data))
   *     },
   *     complete: function () {
   *         console.log('getFormInfo complete')
   *     }
   * });
   * ```
   */
  function getFormInfo(options: GetFormInfoOptions): void;

  /**
   * 监听创新互动卡片信息变化（1117+）
   * 在屏幕的分辨率/创新互动卡片的尺寸大小/创新互动卡片的圆角半径发生变化时，
   * 桌面小组件必须立刻修改自卡片的尺寸大小、圆角半径，以重新适配创新互动卡片。
   * @param callback 屏幕的分辨率/创新互动卡片的尺寸大小/创新互动卡片的圆角半径发生变化时的监听函数
   * @example
   * ```javascript
   * qg.onFormInfoUpdate((data) => {
   *     console.log('onFormInfoUpdate success' + JSON.stringify(data))
   * });
   * ```
   */
  function onFormInfoUpdate(callback: (data: FormInfoUpdateCallbackResult) => void): void;

  /**
   * 监听用户展开、折叠、旋转设备（1117+）
   * 监听用户是否展开、折叠、旋转设备。仅在用户使用折叠屏设备时有回调。
   * @param callback 用户展开、折叠、旋转设备时的监听函数
   * @example
   * ```javascript
   * qg.onWindowResize(async (rect) => {
   *     console.info(rect.width, rect.height);
   * });
   * ```
   */
  function onWindowResize(callback: (rect: WindowRect) => void): void;
  //#endregion
}

/** 华为快游戏API命名空间 */
declare const qg: typeof QG;

interface Window {
  /** 请求动画帧 */
  requestAnimationFrame(callback: (timestamp: number) => void): number;

  /** 取消一个通过requestAnimationFrame方法注册的回调请求 */
  cancelAnimationFrame(id: number): void;

  //#region 定时器
  /** 设置定时器 */
  setTimeout(callback: () => void, delay?: number, rest?: any): number;

  /** 清除定时器 */
  clearTimeout(timeoutID: number): void;

  /** 设置间隔定时器 */
  setInterval(callback: () => void, delay?: number, rest?: any): number;

  /** 清除间隔定时器 */
  clearInterval(intervalID: number): void;
  //#endregion

  //#region 数据存储
  localStorage: {
    /** 于获取存储在 localStorage 对象中的数据项数量 */
    readonly length: number;

    /**
     * 清空localStorage中的数据
     * @example
     * localStorage.clear()
     */
    clear(): void;

    /**
     * 根据key删除单条存在localStorage中的数据
     * @param key 要删除的数据的Key值
     * @example
     * console.log(localStorage.removeItem("myKey"))
     */
    removeItem(key: string): void;

    /**
     * 保存数据到localStorage
     * @param key 要存到localStorage中的数据的key。key允许存储的最大数据长度为1MB，所有数据存储的上限为10MB
     * @param value 要存到localStorage中的数据的值
     * @example
     * console.log(localStorage.setItem("myKey", JSON.stringify({'a': 'a'})))
     */
    setItem(key: string, value: string): void;

    /**
     * 根据key查询单条存在localStorage中的数据
     * @param key 存在localStorage中数据的key值
     * @returns 存储的数据值，如果不存在则返回null
     * @example
     * console.log(localStorage.getItem("myKey"))
     */
    getItem(key: string): string | null;

    /**
     * 根据index下标查询对应的key数据
     * @param index 要获取数据的下标
     * @returns 存入localStorage的数据对应的key值
     * @example
     * console.log(localStorage.key(0))
     */
    key(index: number): string | null;
  }
  //#endregion
}
