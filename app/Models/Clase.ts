import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Camion from './Camion'

export default class Clase extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo_clase: string

  @column()
  public beneficios: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> Camion, {
    foreignKey: 'clase_id',
    localKey: 'id'
  })
  public Clase: HasMany<typeof Camion>
}