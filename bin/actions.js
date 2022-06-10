const inquirer = require('inquirer')
const { MicroAppCi } = require('../lib/index.js')
const {
  writeDeployConfigFile,
  checkDeployConfigFile,
  getBuildEnv,
  getBuildAction,
  getBuildPlatform,
  handleGenerateVersionByDate,
} = require('../lib/utils/utils')
const currentDir = process.cwd()

function initAction() {
  writeDeployConfigFile(currentDir)
}

function doctorAction() {
  checkDeployConfigFile(currentDir)
}

function openAction() {
  const previewQuestions = [
    {
      type: 'checkbox',
      name: 'platforms',
      message: '请选择小程序平台',
      choices: [
        {
          name: '微信小程序',
          value: 'weapp',
        },
        {
          name: '支付宝小程序',
          value: 'alipay',
        },
        {
          name: '字节小程序',
          value: 'tt',
        },
        {
          name: '百度小程序',
          value: 'swan',
        },
        {
          name: '京东小程序',
          value: 'jd',
        },
      ],
    },
    {
      type: 'list',
      name: 'env',
      message: '请选择构建环境',
      choices: [
        {
          name: '测试环境',
          value: 'test',
        },
        {
          name: '生产环境',
          value: 'prod',
        },
      ],
    },
  ]
  inquirer.prompt(previewQuestions).then((result) => {
    const deployConfig = { ...checkDeployConfigFile(currentDir), ...result }
    new MicroAppCi(deployConfig).open()
  })
}

function previewAction() {
  const previewQuestions = [
    {
      type: 'checkbox',
      name: 'platforms',
      message: '请选择小程序平台',
      choices: [
        {
          name: '微信小程序',
          value: 'weapp',
        },
        {
          name: '支付宝小程序',
          value: 'alipay',
        },
        {
          name: '字节小程序',
          value: 'tt',
        },
        {
          name: '百度小程序',
          value: 'swan',
        },
        {
          name: '京东小程序',
          value: 'jd',
        },
      ],
    },
    {
      type: 'list',
      name: 'env',
      message: '请选择构建环境',
      choices: [
        {
          name: '测试环境',
          value: 'test',
        },
        {
          name: '生产环境',
          value: 'prod',
        },
      ],
    },
  ]
  inquirer.prompt(previewQuestions).then((result) => {
    const deployConfig = { ...checkDeployConfigFile(currentDir), ...result }
    new MicroAppCi(deployConfig).preview()
  })
}

function uploadAction() {
  const uploadQuestions = [
    {
      type: 'checkbox',
      name: 'platforms',
      message: '请选择小程序平台',
      choices: [
        {
          name: '微信小程序',
          value: 'weapp',
        },
        {
          name: '支付宝小程序',
          value: 'alipay',
        },
        {
          name: '字节小程序',
          value: 'tt',
        },
        {
          name: '百度小程序',
          value: 'swan',
        },
        {
          name: '京东小程序',
          value: 'jd',
        },
      ],
    },
    {
      type: 'input',
      name: 'version',
      message: '请输入自定义发布版本号, 默认取package.json中的version字段',
      default: '',
    },
    {
      type: 'input',
      name: 'desc',
      message: '请输入自定义发布备注, 默认取最近一次git commit message',
      default: '',
    },
  ]
  inquirer.prompt(uploadQuestions).then((result) => {
    const deployConfig = { ...checkDeployConfigFile(currentDir), ...result }
    new MicroAppCi(deployConfig).upload()
  })
}

function buildAction() {
  const BUILD_ENV = getBuildEnv()
  const BUILD_ACTION = getBuildAction()
  const BUILD_PLATFORM = getBuildPlatform()
  const currentVersion = handleGenerateVersionByDate()
  if (BUILD_ACTION === 'preview') {
    const previewConfig = { platforms: BUILD_PLATFORM, env: BUILD_ENV }
    const deployConfig = { ...checkDeployConfigFile(currentDir), ...previewConfig }
    const version = deployConfig.isGenerateVersion
      ? deployConfig.majorVersion + '.' + currentVersion
      : deployConfig.version
    deployConfig.version = version
    new MicroAppCi(deployConfig).preview()
  } else {
    const uploadConfig = {
      platforms: BUILD_PLATFORM,
      env: 'prod',
    }
    const deployConfig = { ...checkDeployConfigFile(currentDir), ...uploadConfig }
    const version = deployConfig.isGenerateVersion
      ? deployConfig.majorVersion + '.' + currentVersion
      : deployConfig.version
    deployConfig.version = version
    new MicroAppCi(deployConfig).upload()
  }
}

module.exports = {
  initAction,
  doctorAction,
  openAction,
  previewAction,
  uploadAction,
  buildAction,
}
