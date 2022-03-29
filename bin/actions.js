const inquirer = require('inquirer')
const { MiniAppCi } = require('../lib/index.js')
const { writeDeployConfigFile, checkDeployConfigFile } = require('../lib/utils/fs.js')
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
      type: 'list',
      name: 'platform',
      message: '请选择小程序平台',
      choices: [
        {
          name: '微信小程序',
          value: 'weapp'
        },
        {
          name: '支付宝小程序',
          value: 'alipay'
        },
        {
          name: '字节小程序',
          value: 'tt'
        },
        {
          name: '百度小程序',
          value: 'swan'
        },
        {
          name: '全平台',
          value: 'all'
        }
      ]
    },
    {
      type: 'list',
      name: 'env',
      message: '请选择构建环境',
      choices: [
        {
          name: '测试环境',
          value: 'test'
        },
        {
          name: '生产环境',
          value: 'prod'
        }
      ]
    }
  ]
  inquirer.prompt(previewQuestions).then(result => {
    const deployConfig = { ...checkDeployConfigFile(currentDir), ...result }
    // new MiniAppCi(deployConfig, currentDir).preview()
    new MiniAppCi(deployConfig).open()
  })
}

function previewAction() {
  const previewQuestions = [
    {
      type: 'list',
      name: 'platform',
      message: '请选择小程序平台',
      choices: [
        {
          name: '微信小程序',
          value: 'weapp'
        },
        {
          name: '支付宝小程序',
          value: 'alipay'
        },
        {
          name: '字节小程序',
          value: 'tt'
        },
        {
          name: '百度小程序',
          value: 'swan'
        },
        {
          name: '全平台',
          value: 'all'
        }
      ]
    },
    {
      type: 'list',
      name: 'env',
      message: '请选择构建环境',
      choices: [
        {
          name: '测试环境',
          value: 'test'
        },
        {
          name: '生产环境',
          value: 'prod'
        }
      ]
    }
  ]
  inquirer.prompt(previewQuestions).then(result => {
    const deployConfig = { ...checkDeployConfigFile(currentDir), ...result }
    // new MiniAppCi(deployConfig, currentDir).preview()
    new MiniAppCi(deployConfig).preview()
  })
}

function uploadAction() {
  const uploadQuestions = [
    {
      type: 'list',
      name: 'platform',
      message: '请选择小程序平台',
      choices: [
        {
          name: '微信小程序',
          value: 'weapp'
        },
        {
          name: '支付宝小程序',
          value: 'alipay'
        },
        {
          name: '字节小程序',
          value: 'tt'
        },
        {
          name: '百度小程序',
          value: 'swan'
        },
        {
          name: '全平台',
          value: 'all'
        }
      ]
    },
    {
      type: 'input',
      name: 'version',
      message: '请输入自定义发布版本号, 默认取package.json中的version字段',
      default: ''
    },
    {
      type: 'input',
      name: 'desc',
      message: '请输入自定义发布备注, 默认取最近一次git commit message',
      default: ''
    }
  ]
  inquirer.prompt(uploadQuestions).then(result => {
    const deployConfig = { ...checkDeployConfigFile(currentDir), ...result }
    // new MiniAppCi(deployConfig, currentDir).upload()
    new MiniAppCi(deployConfig).upload()
  })
}

module.exports = {
  initAction,
  doctorAction,
  openAction,
  previewAction,
  uploadAction
}
