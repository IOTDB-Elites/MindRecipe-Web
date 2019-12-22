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
  console.log(userInfo);
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
