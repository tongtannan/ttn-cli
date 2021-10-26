#!/usr/bin/env node
'use strict'

const commander = require('commander')

const inquirer = require('../src/inquirer')
const create = require('../src/create')
const colors = require('../utils/index.js')
const { green } = colors

commander.version('1.0.0')

commander
  .command('create')
  .description('create project')
  .action(function () {
    green('👽 👽 👽 ' + '欢迎使用ttncli,轻松构建react ts项目～🎉🎉🎉')
    inquirer().then((res) => {
      create(res)
    })
  })

commander.parse(process.argv)
