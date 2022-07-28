#!/usr/bin/env node
'use strict'

const semver = require('semver')
const { consoleColors } = require('../utils/index.js')
const { green, red } = consoleColors

// Check node version before requiring/doing anything else
// The user may be on a very old node version
const requiredVersion = require('../package.json').engines.node

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    red(
      'You are using Node ' +
        process.version +
        ', but this version of ' +
        id +
        ' requires Node ' +
        wanted +
        '.\nPlease upgrade your Node version.'
    )
    process.exit(1)
  }
}

checkNodeVersion(requiredVersion, 'ttn-cli')

const commander = require('commander')

const { version } = require('../package.json')
const inquirer = require('../src/inquirer')
const create = require('../src/create')

commander.version(`ttn-cli ${version}`)

commander
  .command('create')
  .description('create project')
  .action(function () {
    green(`🤗 🤗 🤗欢迎使用ttn-cli ${version},轻松构建react/koa2项目～ 🎉🎉🎉 `)
    inquirer().then((res) => {
      create(res)
    })
  })

commander.parse(process.argv)
