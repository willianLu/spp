import chalk from 'chalk'

/**
 * @description 打印日志处理函数
 * @param {array<any>} messages 日志信息
 * @param {string} type 数据类型
 * @returns {void}
 */
function handleLogMsg(messages: any, type: string) {
  const list: any = []
  let chalkFun: any
  let logFun = console.log
  switch (type) {
    case 'debug':
      chalkFun = chalk.blueBright
      list.push(chalkFun('[ DEBUG   ]'))
      break
    case 'warn':
      chalkFun = chalk.yellow
      list.push(chalkFun('[ WARN    ]'))
      logFun = console.warn
      break
    case 'error':
      chalkFun = chalk.redBright
      list.push(chalkFun('[ ERROR   ]'))
      logFun = console.error
      break
    case 'success':
      chalkFun = chalk.greenBright
      list.push(chalkFun('[ SUCCESS ]'))
      break
    default:
      list.push('[ INFO    ]')
      break
  }
  messages.forEach((msg: any) => {
    list.push(chalkFun ? chalkFun(msg) : msg)
  })
  logFun(...list)
}

/**
 * @description 日志对象
 */
export default {
  chalk,
  info(...messages: any) {
    handleLogMsg(messages, 'info')
  },
  debug(...messages: any) {
    handleLogMsg(messages, 'debug')
  },
  warn(...messages: any) {
    handleLogMsg(messages, 'warn')
  },
  error(...messages: any) {
    handleLogMsg(messages, 'error')
  },
  success(...messages: any) {
    handleLogMsg(messages, 'success')
  }
}
