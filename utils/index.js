const chalk = require('chalk')

const colors = ['red', 'yellow', 'blue', 'green', 'cyan']

const consoleColors = {}

colors.forEach((color) => {
  consoleColors[color] = (text, isConsole = true) => {
    return isConsole ? console.log(chalk[color](text)) : chalk[color](text)
  }
})

module.exports = consoleColors
