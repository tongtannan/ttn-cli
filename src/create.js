const fs = require('fs')
const consoleColors = require('../utils')
const npm = require('./install')
const exec = require('child_process').exec
let LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch')

let questionRes = null
let originSourcePath = null
let fileCount = 0 /* 文件数量 */
let dirCount = 0 /* 文件夹数量 */
let flat = 0 /* readir数量 */
let isInstall = false

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
const DEFAULT_CONFIG = {
  name: 'demoName',
  author: 'demoAuthor',
  packageManager: 'npm'
}

module.exports = function (res) {
  consoleColors.green('------开始构建-------')
  // 是否使用缓存
  console.log(localStorage.getItem('ttn-cli'))
  if (res.conf) {
    localStorage.setItem('ttn-cli', JSON.stringify(res))
    questionRes = res
  } else {
    questionRes = JSON.parse(localStorage.getItem('ttn-cli')) || DEFAULT_CONFIG
  }
  const sourcePath = __dirname.slice(0, -3) + 'template'
  originSourcePath = sourcePath

  const currentPath = `${process.cwd()}/${questionRes.name}`

  // consoleColors.green('当前路径:' + process.cwd())
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
          consoleColors.green('------构建完成-------')
          consoleColors.cyan('-----开始install，请稍等...-----')

          const cmdStr = `cd ${questionRes.name} && ${
            PACKAGE_MANAGER_SHELL[questionRes.packageManager]['install']
          }`
          exec(cmdStr, (err, sudout) => {
            if (!err) {
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
      PACKAGE_MANAGER_SHELL[questionRes.packageManager]['start']
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
      let json = data.toString()
      json = json.replace(/demoName/g, name.trim())
      json = json.replace(/demoAuthor/g, author.trim())
      const path = `${process.cwd()}/${name}/package.json`
      fs.writeFile(path, new Buffer(json), () => {
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
        let json = data.toString()
        json = json.replace(/denoRegister/g, register.trim())
        fs.writeFile(path, new Buffer(json), () => {
          resolve()
        })
      })
    }
  })
}
