import axios from 'axios'

const root = process.env.API_HOST

export function signIn(callback, name, region) {
  axios.get('/user/get_info', {
    params: {
      name: name,
      region: region
    }
  })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function editUserInfo(callback, userInfo) {
  axios.post('/user/update_info',
    userInfo,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function fetchReadList(callback, uid, region) {
  axios.get('/user/get_read_list', {
    params: {
      uid: uid,
      region: region
    }
  })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
