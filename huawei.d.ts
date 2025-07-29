declare namespace QG {
  interface BaseOptions<R, E = string> {
    success?: (data: R) => void;
    fail?: (data: E, code?: number) => void;
    complete?: () => void;
  }

  //#region 账号
  /** 游戏登录。参数 */
  interface GameLoginOptions extends BaseOptions<GameLoginResult> {
    /**
     * 此参数固定传入“1”，将在玩家未登录华为账号或鉴权失败时主动打开登录页面。
     */
    forceLogin: 1;
    /**
     * 在华为开发者联盟上创建快游戏后分配的唯一标识。获取方式请参见获取[APP ID](https://developer.huawei.com/consumer/cn/doc/quickApp-Guides/quickgame-enable-account-kit-0000001159772367#section1148753814717)。
     */
    appid: string;
  }
  interface GameLoginResult {
    /** 账号ID，如果游戏不需要华为账号的登录结果进行鉴权，那么当返回playerId的时候就可以使用该值进入游戏。 */
    playerId: string;
    /** 用户的昵称。 */
    displayName: string;
    /** 玩家等级。 */
    playerLevel: number;
    /** 当isAuth为1的时候，应用需要校验返回的参数鉴权签名。 */
    isAuth: number;
    /** 时间戳，用于鉴权签名校验。 */
    ts: string;
    /** 玩家的登录签名，用于应用服务端调用校验登录签名接口时，向华为发起登录签名验证。 */
    gameAuthSign: string;
  }
  /** 游戏登录。
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-account-0000001083874630#section20934131615911
   */
  function gameLogin(options: GameLoginOptions): void;

  interface GameLoginWithRealOptions extends BaseOptions<GameLoginWithRealResult, string> {
    /** 此参数固定传入“1”，将在玩家未登录华为账号或鉴权失败时主动打开登录页面。 */
    forceLogin: 1;
    /** 在华为开发者联盟上创建快游戏后分配的唯一标识。获取方式请参见[获取APP ID](https://developer.huawei.com/consumer/cn/doc/quickApp-Guides/quickgame-enable-account-kit-0000001159772367#section1148753814717)。 */
    appid: string;
  }
  interface GameLoginWithRealResult {
    /** 账号ID，如果游戏不需要华为账号的登录结果进行鉴权，那么当返回playerId的时候就可以使用该值进入游戏。 */
    playerId: string;
    /** 用户的昵称。 */
    displayName: string;
    /** 玩家等级。 */
    playerLevel: number;
    /** 时间戳，用于鉴权签名校验。 */
    ts: string;
    /** 鉴权签名。 */
    gameAuthSign: string;
    /** 高清头像链接，假如没有设置则为空字符串。 */
    hiResImageUri: string;
    /** 头像链接，假如没有设置则为空字符串。 */
    imageUri: string;
  }
  /** 根据国家要求对未成年人的游戏时间进行防沉迷监控。调用此接口实现游戏登录即可接入防沉迷的能力。
   * @version 1070+
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-account-0000001083874630#section73325514166
   */
  function gameLoginWithReal(options: GameLoginWithRealOptions): void;

  interface SavePlayerInfoOptions extends BaseOptions<number> {
    /**
     * 在华为开发者联盟上创建快游戏后分配的唯一标识。获取方式请参见获取APP ID。
     */
    appid: string;
    /**
     * 游戏等级: 当前玩家在游戏中的等级，需要和玩家在游戏中实际等级保持一致。
     * 可选。
     */
    rank?: string;
    /**
     * 角色名称：玩家在游戏中创建的角色名称，需要和玩家在游戏中的实际角色名称保持一致，如果没有角色名称可不设置此属性。
     * 可选。
     */
    role?: string;
    /**
     * 游戏区服：玩家登录游戏时选择的区服，需要和玩家实际进入游戏区服名称保持一致，如果没有区服信息可不设置此属性。
     * 可选。
     */
    area?: string;
    /**
     * 游戏公会：玩家在游戏中所属公会，如果没有加入公会可不设置此属性。
     * 可选。
     */
    sociaty?: string;
  }
  /**
   * 当用户完成选择区服信息进入游戏后，或者用户的等级发生变化时，
   * 游戏可以调用此接口存储用户的角色信息。
   * 如果游戏本身不具有游戏等级、角色名称、游戏区服或者游戏公会这些信息则可以不接入此接口。
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-account-0000001083874630#section56644702214
   */
  function savePlayerInfo(options: SavePlayerInfoOptions): void;

  interface SavePlayerInfoWithRealOptions extends BaseOptions<{ code: number }> {
    /**
     * 游戏等级: 当前玩家在游戏中的等级，需要和玩家在游戏中实际等级保持一致。
     * 可选。
     */
    rank?: string;
    /**
     * 角色名称：玩家在游戏中创建的角色名称，需要和玩家在游戏中的实际角色名称保持一致，如果没有角色名称可不设置此属性。
     * 可选。
     */
    role?: string;
    /**
     * 游戏区服：玩家登录游戏时选择的区服，需要和玩家实际进入游戏区服名称保持一致，如果没有区服信息可不设置此属性。
     * 可选。
     */
    area?: string;
    /**
     * 游戏公会：玩家在游戏中所属公会，如果没有加入公会可不设置此属性。
     * 可选。
     */
    sociaty?: string;
  }
  /**
   * 当用户完成选择区服信息进入游戏后，或者用户的等级发生变化时，游戏可以调用此接口存储用户的角色信息。
   * 如果游戏本身不具有游戏等级、角色名称、游戏区服或者游戏公会这些信息则可以不接入此接口。
   * 该接口后续将代替 qg.savePlayerInfo。
   * @version 1070+
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-account-0000001083874630#section1227035652414
   */
  function savePlayerInfoWithReal(options: SavePlayerInfoWithRealOptions): void;

  /**
   * 获取玩家账户ID。
   * @version 1070+
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-account-0000001083874630#section3462192816330
   */
  function getCachePlayerId(
    options: BaseOptions<{
      /** 玩家账户ID，不同华为账号登录游戏成功后返回的玩家账户ID。 */
      playerId: string;
    }>
  ): void;
  //#endregion

  //#region 界面交互
  interface ShowModalOptions extends BaseOptions<ShowModalResult, object> {
    /** 提示的标题。 */
    title?: string;
    /** 提示的内容。 */
    content?: string;
    /** 是否显示取消按钮。 @default true */
    showCancel?: boolean;
    /** 取消按钮的文字，最多 4 个字符。 @default '取消' */
    cancelText?: string;
    /** 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串。 @default '#576B95' */
    cancelColor?: string;
    /** 确认按钮的文字，最多 4 个字符。 @default '确定' */
    confirmText?: string;
    /** 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串。 @default '#576B95' */
    confirmColor?: string;
  }
  interface ShowModalResult {
    confirm?: boolean;
    cancel?: boolean;
  }
  /** 显示模态对话框。 */
  function showModal(options: ShowModalOptions): void;

  interface ShowToastOptions extends BaseOptions<void, object> {
    /** 提示框的标题。title和message需至少有一个参数赋值。若未传入此参数值，将显示message的参数值。 */
    title?: string;
    /**
     * 展示的图标。设置值如下：
     * - success：显示成功图标，此时title文本最多显示 14个字符长度。
     * - loading：显示加载图标，此时 title 文本最多显示14个字符长度。
     * - none：不显示图标，此时 title 文本最多可显示两行。
     * @default 'success'
     */
    icon?: string;
    /** 自定义图标路径，image的优先级高于icon。 */
    image?: string;
    /**
     * 提示的内容。title和message需至少有一个参数赋值，且优先展示title的参数值。
     * @version 1078+
     */
    message?: string;
    /**
     * 提示延迟时间。
     * - 当title为空，且message有值时，duration的可选值为0（短时）和1（长时），默认值为0。
     * - 当title有值时，默认值为1500ms。
     */
    duration?: number;
    /**
     * 是否显示透明图层：
     * - true：屏蔽触摸事件，弹框出现时不可以点击游戏内其它控件。
     * - false：默认值。不屏蔽触摸事件，可以点击游戏内其它控件。
     * @default false
     */
    mask?: boolean;
  }
  /** 显示消息提示框。 */
  function showToast(options: ShowToastOptions): void;

  interface ShowLoadingOptions
    extends BaseOptions<{
      /** 用户是否选择取消loading提示框。若为 true 时，用户按 back 键取消 loading 提示框。 */
      cancel: boolean;
    }> {
    /** 提示的内容。 */
    title: string;
    /** 是否显示透明图层，设置为true，可以屏蔽触摸事件。 */
    mask?: boolean;
  }
  /** 显示 loading 提示框，需主动调用 qg.hideLoading 才能关闭提示框。
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-interaction-0000001130711969#section158441355192017
   */
  function showLoading(options: ShowLoadingOptions): void;

  interface ShowActionSheetOptions
    extends BaseOptions<{
      /** 参数itemList中的索引。用户点击的按钮序号，从上到下的顺序，从0开始。 */
      tapIndex: number;
    }> {
    /** 按钮的文字数组，数组长度最大为6。 */
    itemList: string[];
    /**
     * 按钮的颜色。
     * @default '#000000'
     */
    itemColor: string;
  }
  /**
   * 显示操作菜单。
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-interaction-0000001130711969#section138841749182318
   */
  function showActionSheet(options: ShowActionSheetOptions): void;

  /** 隐藏消息提示框。
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-interaction-0000001130711969#section148411325256
   */
  function hideToast(options?: BaseOptions<void>): void;

  /** 隐藏loading提示框。
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-interaction-0000001130711969#section1626314710270
   */
  function hideLoading(options?: BaseOptions<void>): void;
  //#endregion

  //#region 生命周期
  /** 退出当前快游戏。 */
  function exitApplication(options?: BaseOptions<void, void>): void;
  //#endregion

  //#region 设备震动
  function vibrateShort(options?: BaseOptions<void, void>): void;
  function vibrateLong(options?: BaseOptions<void, void>): void;
  //#endregion

  interface SystemInfo {
    /** 手机品牌。 */
    brand?: string;
    /** 手机型号。 */
    model?: string;
    /**
     * 设备像素比。
     * > 说明: 为确保获取的pixelRatio和safeArea相匹配，需将minPlatformVersion配置1078及以上版本。
     */
    pixelRatio?: number;

    /** 屏幕宽度。 */
    screenWidth?: number;

    /** 屏幕高度。 */
    screenHeight?: number;
    /** 可使用窗口宽度。 */
    windowWidth?: number;
    /** 可使用窗口高度。 */
    windowHeight?: number;
    /** 系统语言。 */
    language?: string;
    /** 系统地区。 */
    region?: string;
    /** 系统语言书写方式。 */
    script?: string;
    /** 渲染引擎版本号。 */
    coreVersion?: string;
    /** 渲染引擎版本号。 */
    COREVersion?: string;
    /** 操作系统版本。 */
    system?: string;
    /** 客户端平台。 */
    platform?: string;
    /** 快应用中心版本。 */
    version?: string;

    /** 状态栏高度，以屏幕的实际分辨率为单位。 */
    statusBarHeight?: number;

    /**
     * 运行平台版本名称。
     * > 说明: 若快游戏minPlatformVersion在1078及以上版本，才会返回当前字段。
     */
    platformVersionName?: string;
    /** 运行平台标准版本号。
     * > 说明: 若快游戏minPlatformVersion在1078及以上版本，才会返回当前字段。
     */
    platformVersionCode?: number;

    /**
     * 在竖屏正方向下的安全区域，详情可参见safeArea参数。
     * > 说明: 若快游戏minPlatformVersion在1078及以上版本，才会返回当前字段。
     */
    safeArea?: SafeArea;
  }
  interface SafeArea {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    width?: number;
    height?: number;
  }
  /**
   * 获取系统信息（同步方法）。
   * @version 1078
   */
  function getSystemInfoSync(): void;

  //#region 广告API
  /**
   * 设置未达到法定承诺年龄用户的标记。
   * @param underAgeOfPromise 标记
   * - true表示对未达到法定承诺年龄用户的标记。
   * - false表示对已达到法定承诺年龄用户的标记。
   * @version 1077+
   */
  function setUnderAgeOfPromise(underAgeOfPromise: boolean): void;

  interface ConsentUpdateResult {
    /**
     * 用户意见状态。
     * - 0：用户已同意接收个性化广告与非个性化广告。
     * - 1：用户已同意仅接收非个性化广告。
     * - 2：用户既未同意接收也未拒绝接收个性化广告或非个性化广告。
     */
    consentStatus: 0 | 1 | 2;
    /**
     * 是否需要用户确认意见。
     * - 取值为false，表明可以向鲸鸿动能SDK请求个性化广告。
     * - 取值为true，表明用户在欧洲经济区内或其他敏感地区，需进一步确认用户意见。
     */
    isNeedConsent: boolean;
    /** 广告技术提供商信息列表。 */
    AdProviderList: {
      /** 广告技术提供商的ID。 */
      id: string;
      /** 广告技术提供商的名称。 */
      name: string;
      /** 广告技术提供商的服务地。 */
      serviceArea: string;
      /** 广告技术提供商的隐私政策链接URL。 */
      privacyPolicyUrl: string;
    }[];
  }
  /** 请求用户意见更新状态。
   * @version 1077+
   */
  function requestConsentUpdate(options?: BaseOptions<ConsentUpdateResult>): void;

  /**
   * 设置用户意见。
   * @param consentStatus 用户意见。
   * - 0：PERSONALIZED 用户已同意接收个性化广告与非个性化广告。
   * - 1：NON_PERSONALIZED 用户已同意仅接收非个性化广告。
   * - 2：UNKNOWN 用户既未同意接收也未拒绝接收个性化广告或非个性化广告。
   * @version 1077+
   */
  function setConsentStatus(consentStatus: 0 | 1 | 2): void;

  /**
   * 设置儿童保护标签。
   * @param childProtection 儿童保护标签。
   * - -1：您不希望表明您的广告内容是否需要符合COPPA的规定。
   * - 0：表明您的广告内容不需要符合COPPA的规定。
   * - 1：表明您的广告内容需要符合COPPA的规定（该广告请求无法获取到任何广告）。
   * @version 1077+
   */
  function setTagForChildProtection(childProtection: -1 | 0 | 1): void;

  /**
   * 设置面向未达到法定承诺年龄用户。
   * @param underAgeOfPromiseStr 未达到法定承诺年龄用户的设置。
   * - -1: 表明您尚未指定广告请求是否要符合未达到法定承诺年龄用户的广告标准。
   * - 0: 表明您不希望广告请求符合未达到法定承诺年龄用户的广告标准。
   * - 1: 表明您希望广告请求符合未达到法定承诺年龄用户的广告标准。
   * @version 1078+
   */
  function setTagForUnderAgeOfPromise(underAgeOfPromiseStr: -1 | 0 | 1): void;

  /**
   * 设置广告内容分级上限。
   * @param adContentClassification 广告内容类型。
   * - W：适合幼儿及以上年龄段观众的内容。
   * - PI：适合少儿及以上年龄段观众的内容。
   * - J：适合青少年及以上年龄段观众的内容。
   * - A：仅适合成人观众的内容。
   * @version 1078+
   */
  function setAdContentClassification(adContentClassification: 'W' | 'PI' | 'J' | 'A'): void;

  /**
   * 设置是否请求非个性化广告。
   * @param personalizedAd 非个性化广告标记。
   * - 0：请求个性化广告与非个性化广告。
   * - 1：请求非个性化广告。
   * @version 1078+
   */
  function setNonPersonalizedAd(personalizedAd: 0 | 1): void;

  /** 创建 native 广告组件参数 */
  interface CreateNativeAdOptions extends BaseOptions<number> {
    /** 原生广告位标识。 */
    adUnitId: string;
  }
  /** 广告详细信息 */
  interface AdListItem {
    /** 广告标识，用于上报曝光与点击。 */
    adId: string;
    /** 广告标题。 */
    title: string;
    /** 广告来源。1077+ */
    source?: string;
    /** 推广应用的Icon图标。 */
    icon: string;
    /** 广告图片。 */
    imgUrlList: string[];
    /** 广告视频。 */
    videoUrlList: string[];
    /** 广告视频宽高比。1078+ */
    videoRatio?: number[];
    /** 广告标签图片。华为目前仅返回空字符串"" */
    logoUrl: string;
    /** 点击按钮文本描述。 */
    clickBtnTxt: string;
    /**
     * 获取广告类型。
     * 取值说明如下：
     * 1：文字
     * 2：大图片
     * 3：大图文
     * 4：GIF
     * 6：视频文
     * 7：小图文
     * 8：三小图文
     * 9：视频
     * 10：图标（文）
     * 103：大图文带下载按钮
     * 106：视频文带下载按钮
     * 107：小图文带下载按钮
     * 108：三小图文带下载按钮
     * 102：大图片带下载按钮
     * 101：文字带下载按钮
     * 110：图标（文）带下载按钮
     * 华为类型取值和联盟有所不同。
     */
    creativeType: number;
    /**
     * 获取广告点击之后的交互类型。
     * 取值说明如下：
     * 0：无
     * 1：浏览类
     * 2：下载类
     * 3：浏览器（下载中间页广告）
     * 4：打开应用首页
     * 5：打开应用详情页
     * 华为当前始终返回为0。
     */
    interactionType: number;
    /** 应用包名。 */
    appName: string;
    /** 应用版本号。 */
    versionName: string;
    /** 应用的运营者信息。 */
    developerName: string;
    /** 应用介绍页面对应的H5地址，建议通过qg.openDeeplink打开网页。 */
    appDetailUrl: string;
    /** 应用的权限声明页面对应的H5地址，建议通过qg.openDeeplink打开网页。 */
    permissionUrl: string;
    /** 应用的隐私链接，建议通过qg.openDeeplink打开网页。 */
    privacyUrl: string;
  }
  /** 原生广告组件 */
  interface NativeAd {
    /** 拉取广告数据，成功回调 onLoad，失败回调 onError。 */
    load: (options?: {
      /** 扩展参数 */
      channelExtras?: {
        /** 广告的启动渠道，取值范围为0~100。 */
        customerChannel?: string;
      };
    }) => void;
    /** 上报广告曝光，一个广告只有一次上报有效，adId 为 load 方法获取的广告数据的 adId 字段。 */
    reportAdShow: (options: {
      /** 广告信息标识，由onload回调返回。 */
      adId: string;
    }) => void;
    /** 上报广告点击，一个广告只有一次上报有效，adId 为 load 方法获取的广告数据的 adId 字段。 */
    reportAdClick: (options: {
      /** 广告信息标识，由onload回调返回。 */
      adId: string;
    }) => void;
    /** 设置广告加载成功回调。 */
    onLoad: (callback: (data: { adList: AdListItem[] }) => void) => void;
    /** 移除原生广告加载成功监听。 */
    offLoad: () => void;
    /** 监听原生广告错误事件。 */
    onError: (
      callback: (data: {
        /** 错误码。 */
        errCode: number;
        /** 错误信息。 */
        errMsg: string;
      }) => void
    ) => void;
    /** 移除原生广告加载错误监听。 */
    offError: () => void;
    /**
     * 设置儿童保护标签。
     * @param childProtection 儿童保护标签。
     * - -1：您不希望表明您的广告内容是否需要符合COPPA的规定。
     * - 0：表明您的广告内容不需要符合COPPA的规定。
     * - 1：表明您的广告内容需要符合COPPA的规定（该广告请求无法获取到任何广告）。
     */
    setTagForChildProtection: (childProtection: -1 | 0 | 1) => void;
    /**
     * 设置面向未达到法定承诺年龄用户。
     * @param underAgeOfPromiseStr 未达到法定承诺年龄用户的设置。
     * - -1: 表明您尚未指定广告请求是否要符合未达到法定承诺年龄用户的广告标准。
     * - 0: 表明您不希望广告请求符合未达到法定承诺年龄用户的广告标准。
     * - 1: 表明您希望广告请求符合未达到法定承诺年龄用户的广告标准
     */
    setTagForUnderAgeOfPromise: (underAgeOfPromiseStr: -1 | 0 | 1) => void;
    /**
     * 设置广告内容分级上限。
     * @param adContentClassification 广告内容类型。
     * - W：适合幼儿及以上年龄段观众的内容。
     * - PI：适合少儿及以上年龄段观众的内容。
     * - J：适合青少年及以上年龄段观众的内容。
     * - A：仅适合成人观众的内容。
     */
    setAdContentClassification: (adContentClassification: 'W' | 'PI' | 'J' | 'A') => void;
    /**
     * 设置是否请求非个性化广告。
     * @param personalizedAd 非个性化广告标记。
     * - 0：请求个性化广告与非个性化广告。
     * - 1：请求非个性化广告。
     */
    setNonPersonalizedAd: (personalizedAd: 0 | 1) => void;
    /**
     * - 若待下载应用未安装，将跳转到对应的广告落地页，用户决策是否手动下载安装应用。
     * - 若待下载应用已安装，将跳转到对应的广告落地页，用户决策是否手动打开应用。
     * @returns 0: 调用方法成功标识。-1: 由于参数错误导致方法失败标识，如素材为非应用下载类广告。
     */
    startDownload: (options: {
      /** 广告信息标识，由onload回调返回。 */
      adId: string;
    }) => 0 | -1;
    /** 显示控件按钮。 */
    showDownloadButton: (options: ShowDownloadButtonOptions) => void;
    /** 隐藏控件按钮。 */
    hideDownloadButton: (options: HideDownloadButtonOptions) => void;
    /** 销毁原生广告。 */
    destroy: () => void;
  }
  /** 显示控件按钮参数 */
  interface ShowDownloadButtonOptions extends BaseOptions<number> {
    /** 原生广告位标识，由nativeAd.load()接口回调返回的adId。 */
    adId: string;
    style: {
      /** 控件展示左上角横坐标，单位：px。 */
      left: number;
      /** 控件展示左上角纵坐标，单位：px。 */
      top: number;
      /** 控件宽度，单位：px。 */
      width?: number;
      /**
       * 是否固定宽度：
       * - true：若文字长度超过width宽度时，先尝试缩小文字，缩小到9sp仍然显示不全时，对文字进行截断。
       * - false：控件宽度由文字长度决定，且同时满足minWidth和maxWidth。
       * @default false
       */
      fixedWidth?: boolean;
      /** 控件最小宽度，单位：px。 */
      minWidth?: number;
      /** 控件最大宽度，单位：px。 */
      maxWidth?: number;
      /**
       * 控件高度：
       * - normal：40dp。
       * - short：28dp。
       * @default 'normal'
       */
      heightType?: 'normal' | 'short';
      /** 文字大小，单位：px。 */
      textSize?: number;
      /** 字体。 */
      font?: string;
      /** 左右内边距，单位：px。 */
      horizontalPadding?: number;
      /** 按钮圆角半径，单位：px。 */
      cornerRadius?: number;
      /** 常规样式字体颜色，例如#005BBA。 */
      normalTextColor?: string;
      /** 常规样式按钮背景颜色，例如#0D000000。 */
      normalBackground?: string;
      /** 常规样式按钮按压颜色，例如#1A000000。 */
      pressedColor?: string;
      /** 常规样式按钮描边宽度，单位：px。 */
      normalStroke?: number;
      /** 常规样式按钮描边颜色，例如#0D000000。 */
      normalStrokeCorlor?: string;
      /** 处理中样式字体颜色，例如#000000。 */
      processingTextColor?: string;
      /** 处理中样式按钮背景颜色，例如#00000000。 */
      processingBackground?: string;
      /** 处理中样式按钮进度颜色，例如#33007dff。 */
      processingColor?: string;
      /** 处理中样式按钮描边宽度，单位：px。 */
      processingStroke?: number;
      /** 处理中样式按钮描边颜色，例如#33007dff。 */
      processingStrokeCorlor?: string;
      /** 安装中样式字体颜色，例如#005BBA。 */
      installingTextColor?: string;
      /** 安装中样式按钮背景颜色，例如#0D000000。 */
      installingBackground?: string;
      /** 安装中样式按钮描边宽度，单位：px。 */
      installingStroke?: number;
      /** 安装中样式按钮描边颜色，例如#0D000000。 */
      installingStrokeCorlor?: string;
    };
  }
  /** 隐藏控件按钮参数 */
  interface HideDownloadButtonOptions extends BaseOptions<number> {
    /** 原生广告位标识，由nativeAd.load()接口回调返回。 */
    adId: string;
  }
  /** 创建 native 广告组件，如果已经创建过 native 广告组件，则返回已创建的广告组件。 */
  function createNativeAd(options: CreateNativeAdOptions): NativeAd;

  interface InterstitialAd {
    /** 加载插屏视频广告。 */
    load: (options?: {
      /** 扩展参数 */
      channelExtras?: {
        /** 广告的启动渠道，取值范围为0~100。 */
        customerChannel?: string;
      };
    }) => void;
    /** 显示插屏视频广告。 */
    show: () => void;
    /** 监听插屏广告加载事件。 */
    onLoad: (callback: () => void) => void;
    /** 移除插屏广告加载事件。 */
    offLoad: () => void;
    /** 监听插屏广告错误事件。 */
    onError: (callback: (err: { errMsg: string; errCode: number }) => void) => void;
    /** 移除插屏广告错误监听。 */
    offError: () => void;
    /** 监听插屏广告关闭事件。 */
    onClose: (callback: () => void) => void;
    /** 移除插屏广告关闭事件。 */
    offClose: () => void;
    /** 监听插屏广告点击事件。 */
    onClick: (callback: () => void) => void;
    /** 移除插屏广告点击监听。 */
    offClick: () => void;
    /** 销毁插屏广告。 */
    destroy: () => void;
  }
  /** 创建 Interstitial 广告组件，如果已经创建过 Interstitial 广告组件，则返回已创建的广告组件。
   * @version 1078+
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-ad-0000001130711971#section1043518578314
   */
  function createInterstitialAd(options: {
    /** Interstitial 广告位标识。 */
    adUnitId: string;
  }): InterstitialAd;

  interface CreateRewardedVideoAdOptions extends BaseOptions<number> {
    /** 激励视频广告位标识。 */
    adUnitId: string;
    /** 是否启用多例模式，默认为false（1077+）。 */
    multiton?: boolean;
  }
  interface RewardedVideoAd {
    /** 手动拉取广告，用于刷新广告，成功回调onLoad，失败回调onError。
     * 请求广告频率太高可能回调onError。
     */
    load: (options?: {
      /** 扩展参数 */
      channelExtras?: {
        /** 广告的启动渠道，取值范围为0~100。 */
        customerChannel?: string;
      };
    }) => void;
    /** 激励视频广告组件默认是隐藏的，调用 show 方法展示广告，失败回调 onError。 */
    show: () => void;
    /** 设置广告加载成功回调。 */
    onLoad: (callback: () => void) => void;
    /** 移除激励视频广告加载成功监听。 */
    offLoad: () => void;
    /** 监听激励视频广告关闭事件。只有在用户主动关闭激励视频广告时，广告才会关闭。 */
    onClose: (
      callback: (data: {
        /**
         * 视频是否是在用户完整观看的情况下被关闭的。
         * - true 表示用户是在视频播放完以后关闭的
         * - false 表示用户在视频播放过程中关闭的
         */
        isEnded: boolean;
      }) => void
    ) => void;
    /** 移除激励视频广告关闭监听。 */
    offClose: () => void;
    /** 监听激励视频广告错误事件。 */
    onError: (callback: (err: { errCode: number; errMsg: string }) => void) => void;
    /** 移除激励视频广告加载错误监听。 */
    offError: () => void;
    /**
     * 设置儿童保护标签。
     * @param childProtection 儿童保护标签。
     * - -1：您不希望表明您的广告内容是否需要符合COPPA的规定。
     * - 0：表明您的广告内容不需要符合COPPA的规定。
     * - 1：表明您的广告内容需要符合COPPA的规定（该广告请求无法获取到任何广告）。
     */
    setTagForChildProtection: (childProtection: -1 | 0 | 1) => void;
    /**
     * 设置面向未达到法定承诺年龄用户。
     * @param underAgeOfPromiseStr 未达到法定承诺年龄用户的设置。
     * - -1: 表明您尚未指定广告请求是否要符合未达到法定承诺年龄用户的广告标准。
     * - 0: 表明您不希望广告请求符合未达到法定承诺年龄用户的广告标准。
     * - 1: 表明您希望广告请求符合未达到法定承诺年龄用户的广告标准。
     */
    setTagForUnderAgeOfPromise: (underAgeOfPromiseStr: -1 | 0 | 1) => void;
    /**
     * 设置广告内容分级上限。
     * @param adContentClassification 广告内容类型。
     * - W：适合幼儿及以上年龄段观众的内容。
     * - PI：适合少儿及以上年龄段观众的内容。
     * - J：适合青少年及以上年龄段观众的内容。
     * - A：仅适合成人观众的内容。
     */
    setAdContentClassification: (adContentClassification: 'W' | 'PI' | 'J' | 'A') => void;
    /**
     * 设置是否请求非个性化广告。
     * @param personalizedAd 非个性化广告标记。
     * - 0：请求个性化广告与非个性化广告。
     * - 1：请求非个性化广告。
     */
    setNonPersonalizedAd: (personalizedAd: 0 | 1) => void;
    /** 销毁激励视频广告。 */
    destroy: () => void;
  }
  /**
   * 创建激励视频广告，同一个 adUnitId，如果已经创建，会复用之前的对象，
   * 创建后会加载广告素材，该方法返回的是一个单例，
   * 该实例仅对当前场景有效，不允许跨场景使用。
   * @version 1075+
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-ad-0000001130711971#section9772146486
   */
  function createRewardedVideoAd(options: CreateRewardedVideoAdOptions): RewardedVideoAd;

  interface BannerAd {
    style: {
      /** banner 广告组件的左上角纵坐标。 */
      top: number;
      /** banner 广告组件的左上角横坐标。 */
      left: number;
      /** banner 广告组件的宽度，单位：dp。 */
      width: number;
      /** banner 广告组件的高度，单位：dp。 */
      height: number;
      /** banner 广告组件的真实宽度，单位px。 */
      realWidth: number;
      /** banner 广告组件的真实高度，单位px。 */
      realHeight: number;
    };
    /** 加载展示banner广告，出错的时候回调 onError，分为加载和展示两个阶段，加载成功回调onLoad。 */
    show: (options?: {
      /** 扩展参数 */
      channelExtras?: {
        /** 广告的启动渠道，取值范围为0~100。 */
        customerChannel?: string;
      };
    }) => void;
    /** 隐藏 banner 广告。 */
    hide: () => void;
    /** 监听 banner 广告错误事件。 */
    onError: (callback: (err: { errMsg: string; errCode: number }) => void) => void;
    /** 移除 banner 广告错误监听。 */
    offError: () => void;
    /** 监听 banner 广告加载事件。 */
    onLoad: (callback: () => void) => void;
    /** 移除 banner 广告加载事件。 */
    offLoad: () => void;
    /** 监听 banner 广告关闭事件。 */
    onClose: (callback: () => void) => void;
    /** 移除 banner 广告关闭事件。 */
    offClose: () => void;
    /** 销毁 banner 广告。 */
    destroy: () => void;
  }
  /**
   * 创建 Banner 广告组件，如果已经创建过 Banner 广告组件，则返回已创建的广告组件。
   * @version 1078+
   * @link https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-ad-0000001130711971#section912518224415
   */
  function createBannerAd(options: {
    /** Banner 广告位标识。 */
    adUnitId: string;
    /** Banner 广告组件的样式 */
    style: {
      /** banner 广告组件的左上角纵坐标。 */
      top: number;
      /** banner 广告组件的左上角横坐标。 */
      left: number;
      /** banner 广告组件的宽度，单位：dp。 */
      width: number;
      /** banner 广告组件的高度，单位：dp。 */
      height: number;
    };
    /**
     * 广告自动刷新的间隔时间，单位为秒，参数值30 ~ 120之间（如果不传入此参数 Banner 广告不会自动刷新），建议设置为60。
     *
     * 该参数只有首次调用该接口传入有效，如果首次未设置，后续再调用接口设置无效，
     * 除非调用bannerAd.destroy()销毁广告后，重新创建新的广告。
     */
    adIntervals?: number;
  }): BannerAd;
  //#endregion

  //#region Deeplink
  /** 跳转到应用的某个页面。 */
  function openDeeplink(options: {
    /**
     * 需要跳转场景的uri，可以是如下格式：
     * - 包含schema的完整uri；目前支持的schema有tel、sms、mailto、http(s)和hap，例如tel:10086，mailto:abc@gmail.com，hap://app/com.company.app/index?param1=value1。
     * - hap://settings/permission_manager，跳转到快应用的权限管理界面。
     * - hap://settings/location_source_manager，跳转到手机系统的位置管理界面。
     * - http(s)则会通过内置的webview启动加载目标网页，支持包含schema的完整uri。对于带有schema的uri，处理流程如下：
     *   - 如果默认策略也不能处理请求，会尝试使用系统中的应用来处理请求。
     *   - 如果没有系统应用可以处理请求，则抛弃请求。默认策略的处理逻辑：如果schema是http/https，使用内置的web页面打开网页。
     */
    uri: string;
  }): void;
  interface NavigateToQuickAppOptions extends BaseOptions<void> {
    /** 需要打开的快游戏包名。 */
    packageName: string;
    /** 待打开的页面路径，若为空则打开首页。快游戏场景下无效。 */
    path?: string;
    /** 需要传递给快游戏的数据，可在qg.getLaunchOptionsSync()中获取传递的数据。 */
    extraData?: object;
  }
  /** 打开另一个快游戏。 */
  function navigateToQuickApp(options: NavigateToQuickAppOptions): void;
  //#endregion
}
/** 华为快游戏API */
declare let qg: typeof QG;
