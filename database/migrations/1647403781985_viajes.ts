import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Viajes extends BaseSchema {
  protected tableName = 'viajes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('usuario').unsigned().notNullable().references('id').inTable('usuarios')
      table.integer('pasajero').unsigned().notNullable().references('id').inTable('pasajeros')
      table.integer('unidad').unsigned().notNullable().references('id').inTable('camions')
      table.integer('destino').unsigned().notNullable().references('id').inTable('ciudad_costos')
      table.date('f_viaje').notNullable()
      table.date('f_regreso').nullable()
      table.integer('equipaje').notNullable().unsigned().references('id').inTable('t_equipajes')
      table.float('subtotal').notNullable()
      table.float('iva').notNullable()
      table.float('total').notNullable()

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
