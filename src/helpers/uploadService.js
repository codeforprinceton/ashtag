// uploadService.js

//import axios from 'axios'

function upload (formData) {
  const url = 'https://s3.amazonaws.com/ash-tree-photos'
  return this.$axios.post(url, formData)
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error + Date.now())
    })
}

export { upload }
