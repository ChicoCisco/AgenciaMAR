import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clases extends BaseSchema {
  protected tableName = 'clases'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('tipo_clase', 30).notNullable().unique()
      table.text('beneficios').notNullable()

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
