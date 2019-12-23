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
