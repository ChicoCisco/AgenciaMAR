import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CamionChofers extends BaseSchema {
  protected tableName = 'camion_chofers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('camion_id').unsigned().notNullable().references('id').inTable('camions')
      table.integer('chofer_id').unsigned().notNullable().references('id').inTable('chofers')
      table.date('f_camion').notNullable()

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
