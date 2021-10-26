const inquirer = require('inquirer')

const questions = require('./question')

function create() {
  return new Promise((resolve) => {
    inquirer.prompt(questions).then((answer) => {
      resolve(answer)
    })
  })
}

module.exports = create
