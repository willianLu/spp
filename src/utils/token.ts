import Cookies from 'js-cookie'

const TOKEN = 'AUTH_TOKEN'

export function setToken(token: string) {
  return Cookies.set(TOKEN, token)
}

export function getToken() {
  return Cookies.get(TOKEN)
}

export function removeToken() {
  return Cookies.remove(TOKEN)
}
