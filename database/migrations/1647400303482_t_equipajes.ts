import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TEquipajes extends BaseSchema {
  protected tableName = 't_equipajes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('tipo', 30).notNullable().unique()
      table.float('costo').notNullable()

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
