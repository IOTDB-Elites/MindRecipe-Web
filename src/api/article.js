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

export function fetchPopularList(callback) {
  axios.get('/article/get_popular', {})
    .then(function (response) {
      callback(response.data)
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function fetchArticle(callback, aid) {
  axios.get('/article/get_article', {
    params: {
      aid: aid
    }
  })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function fetchFeedback(callback, aid) {
  axios.get('/article/get_feedback', {
    params: {
      aid: aid
    }
  })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
