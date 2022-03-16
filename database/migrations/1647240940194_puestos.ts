import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Puestos extends BaseSchema {
  protected tableName = 'puestos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('puesto', 30).notNullable().unique()
      table.integer('valor').notNullable().unique()

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
