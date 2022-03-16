import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CiudadEstados extends BaseSchema {
  protected tableName = 'ciudad_estados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('ciudad_id').unsigned().notNullable().references('id').inTable('ciudads')
      table.integer('estado_id').unsigned().notNullable().references('id').inTable('estados')

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
