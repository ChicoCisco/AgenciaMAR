import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CiudadEstado from './CiudadEstado'

export default class Ciudad extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre_ciudad: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>CiudadEstado,{
    foreignKey: 'ciudad_id',
    localKey: 'id'
  })
  public Ciudad: HasMany<typeof CiudadEstado>
}
