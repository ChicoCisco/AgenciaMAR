import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Personas extends BaseSchema {
  protected tableName = 'personas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id').primary()
      table.string('CURP').notNullable()
      table.string('nombre', 50).notNullable()
      table.string('a_paterno').notNullable()
      table.string('a_materno').notNullable()
      table.date('f_nac').notNullable()
      table.bigInteger('telefono').notNullable()
      table.bigInteger('tel_emergencia').nullable()

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
