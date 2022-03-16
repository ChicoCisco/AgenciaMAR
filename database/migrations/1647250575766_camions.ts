import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Camions extends BaseSchema {
  protected tableName = 'camions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('placa', 10).notNullable().unique()
      table.integer('num_unidad').notNullable().unique()
      table.integer('marca_id').unsigned().notNullable().references('id').inTable('marcas')
      table.string('modelo').notNullable()
      table.integer('clase_id').notNullable().unsigned().references('id').inTable('clases')
      table.text('estado').notNullable()

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
