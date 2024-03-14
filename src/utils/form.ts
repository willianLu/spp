// 验证手机号
export function validatePhone(phone: string) {
  return /^1\d{10}$/.test(phone)
}
// 验证密码，字母、数字和特殊符号组成，共6-18位
export function validatePassword(password: string) {
  return /^[a-zA-Z\d~!@#$%^&*()_+`\-={}:";'<>?,./]{6,18}$/.test(password)
}

// 输入手机号格式处理
export function handleFormatPhone(val: string) {
  if (val && !/^1\d{0,10}$/g.test(val)) {
    return val.slice(0, val.length - 1).replace(/[^\d]/g, '')
  }
  return val
}
// 输入空格处置
export function handleFormatTrim(val: string) {
  return val.trim()
}
