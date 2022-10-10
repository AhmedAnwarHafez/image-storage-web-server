exports.up = (knex) => {
  return knex.schema.createTable('images', (table) => {
    table.increments('id').primary()
    table.string('file_name')
    table.string('mime_type')
    table.string('image_base64')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('images')
}
