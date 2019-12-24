import axios from 'axios'

const root = process.env.API_HOST;

export function fetchMonitorData(callback) {
  setInterval(() => {
    axios.get('/admin/monitor', {})
      .then(function (response) {
        callback(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, 1000)
}

export function addDBMS(callback, ip, db_port) {
  axios.get('/admin/add_dbms', {
    params: {
      ip: ip,
      db_port: db_port
    }
  })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function deleteDBMS(callback, ip) {
  axios.get('/admin/delete_dbms', {
    params: {
      ip: ip
    }
  })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
