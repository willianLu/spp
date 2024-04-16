import { Mock } from 'vite-plugin-simple-mock'

const mock = new Mock()

mock.post('/api/user/list', (req, res) => {
  const body = {
    code: 200,
    body: req.body,
    data: {}
  }
  return body
})
mock.post('/qtapi/user', (req, res) => {
  const body = {
    code: 0,
    body: req.body,
    data: {
      id: '127',
      name: '七天小明'
    }
  }
  return body
})

mock.post('/server/api/user', (req, res) => {
  const body = {
    code: 0,
    body: req.body,
    data: {
      id: '127',
      name: '七天server'
    }
  }
  return body
})

export default mock
