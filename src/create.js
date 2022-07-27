const fs = require('fs')
const ora = require('ora')
const exec = require('child_process').exec

const { consoleColors, filterTemplate } = require('../utils')
const npm = require('./install')
const { savePreset, loadOptions } = require('../utils/options')

let questionRes = null
let originSourcePath = null
let commonSourcePath = null
let fileCount = 0 /* 文件数量 */
let dirCount = 0 /* 文件夹数量 */
let flat = 0 /* readir数量 */
let isInstall = false
let spinner = null

const PACKAGE_MANAGER_SHELL = {
  npm: {
    install: 'npm install',
    start: 'npm run dev'
  },
  yarn: {
    install: 'yarn install',
    start: 'yarn dev'
  },
  pnpm: {
    install: 'pnpm install',
    start: 'pnpm dev'
  }
}
const STATE_MANAGEMENT = {
  redux: '"redux": "^4.2.0"',
  recoil: '"recoil": "^0.7.4"',
  none: ''
}
const STORAGE_NAME = 'template_cli'

const DEFAULT_NAME = 'cli'

const specFile = ['npmrc', 'yarnrc', 'gitignore']

module.exports = function (res) {
  consoleColors.green('------开始构建-------')
  // 是否新建项目
  if (res.conf) {
    questionRes = res
    if (!questionRes.name) questionRes.name = DEFAULT_NAME
    // 保存为模板
    res.template && savePreset(STORAGE_NAME, questionRes)
  } else {
    // console.log('loadOptions', loadOptions())
    // 使用模板
    questionRes = loadOptions().presets[STORAGE_NAME] || {
      type: 'react',
      name: DEFAULT_NAME,
      list: 'none',
    }
  }
  const templateSourcePath = __dirname.slice(0, -3) + 'templates/'
  const sourcePath = `${templateSourcePath}${questionRes.type}`
  originSourcePath = sourcePath
  commonSourcePath = `${templateSourcePath}common`

  const currentPath = `${process.cwd()}/${questionRes.name}`
  spinner = ora('正在下载项目模板')
  spinner.start()
  fs.mkdir(currentPath, () => {
    consoleColors.yellow('创建文件夹：' + currentPath)
    copy(sourcePath, currentPath, npm())
  })
}

function copy(sourcePath, currentPath) {
  flat++
  fs.readdir(sourcePath, (err, paths) => {
    flat--
    if (err) {
      throw err
    }
    paths.forEach((path) => {
      if (path !== '.git') fileCount++
      const newSoucePath = sourcePath + '/' + path
      const newCurrentPath = currentPath + '/' + path
      fs.stat(newSoucePath, (err, stat) => {
        if (err) {
          throw err
        }
        if (stat.isFile()) {
          // 特殊文件publish失败，单独处理
          if (!specFile.includes(path)) {
            const readSteam = fs.createReadStream(newSoucePath)
            const writeSteam = fs.createWriteStream(newCurrentPath)
            readSteam.pipe(writeSteam)
            consoleColors.green('创建文件：' + newCurrentPath)
          }
          fileCount--
          completeControl()
        } else if (stat.isDirectory()) {
          if (path !== '.git') {
            dirCount++
            dirExist(newSoucePath, newCurrentPath, copy)
          }
        }
      })
    })
  })
}

function dirExist(sourcePath, currentPath, copyCallback) {
  fs.stat(sourcePath, (ext) => {
    if (ext) {
      copyCallback(sourcePath, currentPath)
    } else {
      fs.mkdir(currentPath, () => {
        fileCount--
        dirCount--
        copyCallback(sourcePath, currentPath)
        consoleColors.yellow('创建文件夹：' + currentPath)
        completeControl()
      })
    }
  })
}

function completeControl() {
  if (fileCount === 0 && dirCount === 0 && flat === 0) {
    if (!isInstall) {
      isInstall = true
      const list = [resolvePackage(), copySpecFile('gitignore')]
      if (questionRes.register) {
        list.push(resolveRegister('npmrc'), resolveRegister('yarnrc'))
      }
      Promise.all(list)
        .then(() => {
          // return
          spinner.succeed()
          consoleColors.green('------项目模板下载完成-------')
          spinner = ora('开始install，请稍等')
          spinner.start()

          setImmediate(() => {
            const cmdStr = `cd ${questionRes.name} && ${
              PACKAGE_MANAGER_SHELL[questionRes.package]['install']
            }`
            exec(cmdStr, (err, sudout) => {
              console.log(err, sudout)
              if (!err) {
                spinner.succeed()
                consoleColors.green('-----完成install-----')
                runProject()
              }
            })
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

function runProject() {
  // try {
  //   const cmdStr = `cd ${questionRes.name} && ${
  //     PACKAGE_MANAGER_SHELL[questionRes.package]['start']
  //   }`
  //   consoleColors.cyan(`-----正在启动，cd ${questionRes.name}-----`)
  //   exec(cmdStr, (err, sudout) => {
  //     consoleColors.green('-----启动成功-----')
  //   })
  // } catch (error) {
  //   consoleColors.red('自动启动失败，请手动启动项目')
  // }
  consoleColors.cyan(`👉  Get started with the following commands:`)
  consoleColors.green(`cd ${questionRes.name}`, 'and then')
  consoleColors.green(`${PACKAGE_MANAGER_SHELL[questionRes.package]['start']}`)
}

function resolvePackage() {
  return new Promise((resolve) => {
    fs.readFile(originSourcePath + '/package.json', (err, data) => {
      if (err) throw err
      const { author, name, state, type } = questionRes
      const templateObj = {
        demoName: name.trim(),
        demoAuthor: author.trim()
      }
      switch (type) {
        case 'react':
          templateObj.demoDevDependencies = STATE_MANAGEMENT[state] || ''
          templateObj.demoSymbol = STATE_MANAGEMENT[state] ? ',' : ''
          break

        default:
          break
      }
      const template = filterTemplate(data, templateObj)
      const path = `${process.cwd()}/${name}/package.json`

      fs.writeFile(path, new Buffer(template), () => {
        consoleColors.green('创建文件：' + path)
        resolve()
      })
    })
  })
}

function resolveRegister(fileName) {
  return new Promise((resolve) => {
    const { register, name } = questionRes
    const path = `${process.cwd()}/${name}/.${fileName}`

    fs.readFile(commonSourcePath + `/${fileName}`, (err, data) => {
      if (err) throw err
      const template = filterTemplate(data, {
        denoRegister: !register ? '' : register.trim()
      })
      fs.writeFile(path, new Buffer(template), () => {
        consoleColors.green('创建文件：' + path)
        resolve()
      })
    })
  })
}

function copySpecFile(fileName) {
  return new Promise((resolve) => {
    const { name } = questionRes
    const path = `${process.cwd()}/${name}/.${fileName}`

    fs.readFile(commonSourcePath + `/${fileName}`, (err, data) => {
      if (err) throw err
      const template = filterTemplate(data, {})
      fs.writeFile(path, new Buffer(template), () => {
        consoleColors.green('创建文件：' + path)
        resolve()
      })
    })
  })
}
