const chalk = require('chalk')
const handlebars = require('handlebars')

const colors = ['red', 'yellow', 'blue', 'green', 'cyan']

const consoleColors = {}

colors.forEach((color) => {
  consoleColors[color] = (text, primaryText = '', isConsole = true) => {
    return isConsole
      ? console.log(chalk[color](text) + ` ${primaryText}`)
      : chalk[color](text)
  }
})

exports.consoleColors = consoleColors

function filterTemplate(json, data) {
  let template = handlebars.compile(json.toString())
  const result = template(data).replace(/&quot;/g, '"')
  return result
}

exports.filterTemplate = filterTemplate
