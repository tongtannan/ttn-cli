const create = [
  {
    name: 'conf',
    type: 'confirm',
    message: '是否创建新的项目？'
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
    message: '请选择包管理器？',
    name: 'packageManager',
    choices: ['npm', 'yarn'],
    filter: function (val) {
      return val.toLowerCase()
    },
    when: (res) => Boolean(res.conf)
  },
  {
    name: 'register',
    message: '请输入代理地址，不需要代理回车？'
  }
]

module.exports = create
