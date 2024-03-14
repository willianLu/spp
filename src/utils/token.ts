import Cookies from 'js-cookie'
import Env from '@/env'

const TOKEN = 'AUTH_TOKEN'

export function setToken(token: string) {
  return Cookies.set(TOKEN, token, { domain: Env.cookieDomin })
}

export function getToken() {
  return Cookies.get(TOKEN)
}

export function removeToken() {
  return Cookies.remove(TOKEN)
}
