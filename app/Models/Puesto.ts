import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'

export default class Puesto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public puesto: string

  @column()
  public valor: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> Usuario, {
    foreignKey: 'puesto_id',
    localKey: 'id'
  })
  public Usuario: HasMany<typeof Usuario>
}
