#!/usr/bin/env node
'use strict'

const commander = require('commander')

const { version } = require('../package.json')
const inquirer = require('../src/inquirer')
const create = require('../src/create')
const { consoleColors } = require('../utils/index.js')
const { green } = consoleColors

commander.version(version)

commander
  .command('create')
  .description('create project')
  .action(function () {
    green(`😎 😎 😎 欢迎使用cli ${version},轻松构建react项目～ 🎉🎉🎉 `)
    inquirer().then((res) => {
      create(res)
    })
  })

commander.parse(process.argv)
