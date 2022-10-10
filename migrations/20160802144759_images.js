exports.up = (knex) => {
  return knex.schema.createTable('images', (table) => {
    table.increments('id').primary()
    table.string('mimetype')
    table.string('image')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('images')
}
