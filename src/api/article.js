import axios from 'axios'

const root = process.env.API_HOST;

export function fetchArticleList(callback, category, start, end) {
  axios.get('/article/get_list', {
    params: {
      category: category,
      start: start,
      end: end
    }
  })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
