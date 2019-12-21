import axios from 'axios'

const root = process.env.API_HOST

export function signIn(callback, name) {
  axios.get('/user/get_info', {
    params: {
      name: name
    }
  })
    .then(function (response) {
      console.log(response)
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function currentUser(callback, token) {
  axios.get('/user',
    {
      headers: {'Authorization': token}
    })
    .then(function (response) {
      callback(response.data)
    })
}

export function editUserInfo(callback, userInfo) {
  axios.post('/user/update_info',
    userInfo,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': userInfo.token
      }
    })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
