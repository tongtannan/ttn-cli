const fs = require('fs')
const ora = require('ora')
const exec = require('child_process').exec

const { consoleColors, filterTemplate } = require('../utils')
const npm = require('./install')
const { savePreset, loadOptions } = require('../utils/options')

let questionRes = null
let originSourcePath = null
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
    install: 'yarn',
    start: 'yarn dev'
  }
}
const STORAGE_NAME = 'template'

module.exports = function (res) {
  consoleColors.green('------开始构建-------')
  // 是否新建项目
  if (res.conf) {
    // 保存为模板
    res.template && savePreset(STORAGE_NAME, res)
    questionRes = res
  } else {
    console.log('loadOptions', loadOptions())
    // 使用模板
    questionRes = loadOptions().presets[STORAGE_NAME]
  }
  const sourcePath = __dirname.slice(0, -3) + 'template'
  originSourcePath = sourcePath

  const currentPath = `${process.cwd()}/${questionRes.name}`
  spinner = ora('正在下载项目模板')
  spinner.start()
  fs.mkdir(currentPath, () => {
    consoleColors.yellow('创建文件夹：' + currentPath)
    copy(sourcePath, currentPath, npm())
  })
}

function copy(sourcePath, currentPath, cb) {
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
          const readSteam = fs.createReadStream(newSoucePath)
          const writeSteam = fs.createWriteStream(newCurrentPath)
          readSteam.pipe(writeSteam)
          consoleColors.green('创建文件：' + newCurrentPath)
          fileCount--
          completeControl(cb, sourcePath)
        } else if (stat.isDirectory()) {
          if (path !== '.git') {
            dirCount++
            dirExist(newSoucePath, newCurrentPath, copy, cb)
          }
        }
      })
    })
  })
}

function dirExist(sourcePath, currentPath, copyCallback, cb) {
  fs.stat(sourcePath, (ext) => {
    if (ext) {
      copyCallback(sourcePath, currentPath, cb)
    } else {
      fs.mkdir(currentPath, () => {
        fileCount--
        dirCount--
        copyCallback(sourcePath, currentPath, cb)
        consoleColors.yellow('创建文件夹：' + currentPath)
        completeControl(cb)
      })
    }
  })
}

function completeControl(cb) {
  if (fileCount === 0 && dirCount === 0 && flat === 0) {
    if (cb && !isInstall) {
      isInstall = true
      Promise.all([
        resolvePackage(),
        resolveRegister('.npmrc'),
        resolveRegister('.yarnrc')
      ])
        .then(() => {
          spinner.succeed()
          consoleColors.green('------项目模板下载完成-------')
          spinner = ora('开始install，请稍等')
          spinner.start()
          // consoleColors.cyan('-----开始install，请稍等...-----')

          const cmdStr = `cd ${questionRes.name} && ${
            PACKAGE_MANAGER_SHELL[questionRes.package]['install']
          }`
          exec(cmdStr, (err, sudout) => {
            if (!err) {
              spinner.succeed()
              consoleColors.green('-----完成install-----')
              runProject()
            }
          })
          // cb(() => {
          //   consoleColors.cyan('-----完成install-----')
          //   runProject()
          // })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

function runProject() {
  try {
    const cmdStr = `cd ${questionRes.name} && ${
      PACKAGE_MANAGER_SHELL[questionRes.package]['start']
    }`
    consoleColors.cyan('-----正在启动-----')
    exec(cmdStr, (err, sudout) => {
      consoleColors.green('-----启动成功-----')
    })
    // const run = npm['run dev']
    // run()
  } catch (error) {
    consoleColors.red('自动启动失败，请手动yarn dev 启动项目')
  }
}

function resolvePackage() {
  return new Promise((resolve) => {
    fs.readFile(originSourcePath + '/package.json', (err, data) => {
      if (err) throw err
      const { author, name } = questionRes
      const template = filterTemplate(data, {
        demoName: name.trim(),
        demoAuthor: author.trim(),
        demoDevDependencies: '"moment": "^2.25.3"'
      })
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
    const path = `${process.cwd()}/${name}/${fileName}`
    if (!register) {
      fs.writeFile(path, new Buffer(''), () => {
        resolve()
      })
    } else {
      fs.readFile(originSourcePath + `/${fileName}`, (err, data) => {
        if (err) throw err
        const template = filterTemplate(data, {
          denoRegister: register.trim()
        })
        fs.writeFile(path, new Buffer(template), () => {
          resolve()
        })
      })
    }
  })
}
