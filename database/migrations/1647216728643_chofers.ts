import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Chofers extends BaseSchema {
  protected tableName = 'chofers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('persona_id').unsigned().notNullable().references('id').inTable('personas')
      table.string('num_licencia', 10)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
