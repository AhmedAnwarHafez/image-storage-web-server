const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  addImage,
}

function addImage(input, db = connection) {
  const { filename, mimetype, imageBase64 } = input
  const file = {
    file_name: filename,
    mime_type: mimetype,
    image_base64: imageBase64,
  }

  return db('images').insert(file)
}
