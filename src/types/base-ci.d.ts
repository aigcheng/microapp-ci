export declare type ProjectType = 'miniProgram' | 'miniGame' | 'miniProgramPlugin' | 'miniGamePlugin'
/** 微信小程序配置 */
export interface WeappConfig {
  /** 小程序/小游戏项目的 appid */
  appid: string
  /** 私钥，在获取项目属性和上传时用于鉴权使用(必填) */
  privateKeyPath: string
  /** 微信开发者工具安装路径 */
  devToolsInstallPath?: string
  /** 上传的小程序的路径（默认 outputPath ） */
  projectPath?: string
  /** 类型，默认miniProgram 小程序 */
  type?: ProjectType
  /** 上传需要排除的目录 */
  ignores?: Array<string>
}
/** 字节小程序配置 */
export interface TTConfig {
  projectPath: any
  /** 绑定的邮箱账号 */
  email: string
  /** 密码 */
  password: string
}
/** 终端类型 */
export declare type ClientType =
  /** 支付宝 */
  | 'alipay'
  /** AMPE */
  | 'ampe'
  /** 高德 */
  | 'amap'
  /** 天猫精灵 */
  | 'genie'
  /** ALIOS */
  | 'alios'
  /** UC */
  | 'uc'
  /** 夸克 */
  | 'quark'
  /** 淘宝 */
  | 'taobao'
  /** 口碑 */
  | 'koubei'
  /** loT */
  | 'alipayiot'
  /** 菜鸟 */
  | 'cainiao'
  /** 阿里健康 */
  | 'alihealth'
/** 支付宝系列小程序配置 */
export interface AlipayConfig {
  /** 小程序appId */
  projectPath: string
  appId: string
  /** 工具id */
  toolId: string
  /** 私钥相对路径 */
  privateKeyPath: string
  /** 服务代理地址（可选） */
  proxy?: string
  /** 上传的终端, 默认alipay */
  clientType?: ClientType
}
/** 百度小程序配置 */
export interface SwanConfig {
  /** 有该小程序发布权限的登录密钥 */
  projectPath: any
  token: string
  /** 最低基础库版本, 不传默认为 3.350.6 */
  minSwanVersion?: string
}

export interface noticeCardConfig {
  /** 小程序构建包下载地址 */
  buildUrl: string
  /** 微信小程序二维码访问地址 */
  weappQrCodeUrl: string
  /** 支付宝小程序二维码访问地址 */
  alipayQrCodeUrl: string
  /** 百度小程序二维码访问地址 */
  swanQrCodeUrl: string
  /** 字节小程序二维码访问地址 */
  ttQrCodeUrl: string
  /** 京东小程序二维码访问地址 */
  jdQrCodeUrl: string
}
export interface DEPLOY_CONFIG_DATA {
  /** 发布版本号，默认取 package.json 文件的 taroConfig.version 字段 */
  version: string
  /** 版本发布描述， 默认取 package.json 文件的 taroConfig.desc 字段 */
  desc: string
  /** 打包平台，默认为[] */
  platforms: Array
  /** 飞书机器人webhookUrl 默认为'' */
  webhookUrl: string
  /** 推送消息卡片配置 */
  noticeCardConfig: noticeCardConfig
  /** 京东小程序体验码默认地址 */
  defaultJdQrUrl: string
  /** 是否安装依赖 默认为false */
  npmInstall: string
  /** 打包环境, 默认取env.config的 env字段 */
  env: string
  /** 微信小程序CI配置, 官方文档地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html */
  weapp?: WeappConfig
  /** 字节小程序配置, 官方文档地址：https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/developer-instrument/development-assistance/ide-order-instrument */
  tt?: TTConfig
  /** 支付宝系列小程序配置，官方文档地址： https://opendocs.alipay.com/mini/miniu/api */
  alipay?: AlipayConfig
  /** 百度小程序配置, 官方文档地址：https://smartprogram.baidu.com/docs/develop/devtools/commandtool/ */
  swan?: SwanConfig
}
export default abstract class BaseCI {
  /** 传入的插件选项 */
  protected deployConfig: DEPLOY_CONFIG_DATA
  /** 当前要发布的版本号 */
  public version: string
  /** base url */
  public deployBaseUrl: string
  /** 微信体验码默认地址 */
  public defaultWeappQrUrl: string
  /** 当前发布内容的描述 */
  public desc: string
  /** 当前发布的平台 */
  public platform: Array
  /** 当前发布的环境 */
  public env: string
  /** 飞书机器人webhookUrl */
  public webhookUrl: string
  /** 推送消息卡片配置 */
  noticeCardConfig: noticeCardConfig
  /** 是否安装依赖 */
  public npmInstall: boolean
  /** 字节小程序CI配置 */
  public tt: TTConfig
  /** 支付宝系列小程序配置 */
  public alipay: AlipayConfig
  /** 百度小程序配置 */
  public swan: SwanConfig
  /** 微信小程序CI配置 */
  public weapp: WeappConfig
  /** 构建项目的路径 */
  public projectPath: string
  constructor(deployConfig: DEPLOY_CONFIG_DATA)
  /** 初始化函数，会被构造函数调用 */
  protected abstract _init(): void
  /** 打开小程序项目 */
  abstract open(): any
  /** 上传小程序 */
  abstract upload(): any
  /** 预览小程序 */
  abstract preview(): any
}
