import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CiudadCosto from './CiudadCosto'

export default class Costo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo_boleto: String

  @column()
  public costo: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>CiudadCosto,{
    foreignKey: 'costo_id',
    localKey: 'id'
  })
  public Costo: HasMany<typeof CiudadCosto>
}
