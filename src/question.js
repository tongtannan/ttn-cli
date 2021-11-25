const create = [
  {
    name: 'conf',
    type: 'confirm',
    message: '是否创建新的项目？'
  },
  {
    type: 'list',
    message: '请选择项目类型？',
    name: 'type',
    choices: ['react', 'koa2'],
    filter: function (val) {
      return val.toLowerCase()
    },
    when: (res) => Boolean(res.conf)
  },
  {
    name: 'name',
    message: '请输入项目名称？',
    when: (res) => Boolean(res.conf)
  },
  {
    name: 'author',
    message: '请输入作者？',
    when: (res) => Boolean(res.conf)
  },
  {
    type: 'list',
    message: '请选择状态管理？',
    name: 'state',
    choices: ['redux', 'mobx', 'none'],
    filter: function (val) {
      return val.toLowerCase()
    },
    when: (res) => Boolean(res.conf) && res.type === 'react'
  },
  {
    type: 'list',
    message: '请选择包管理器？',
    name: 'package',
    choices: ['npm', 'yarn', 'pnpm'],
    filter: function (val) {
      return val.toLowerCase()
    },
    when: (res) => Boolean(res.conf)
  },
  {
    name: 'register',
    message: '请输入代理地址，不需要代理回车',
    when: (res) => Boolean(res.conf)
  },
  {
    name: 'template',
    type: 'confirm',
    message: '是否保存为模板？',
    when: (res) => Boolean(res.conf)
  }
]

module.exports = create
