import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Camion from './Camion'

export default class Marca extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public marca: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>Camion,{
    foreignKey: 'marca_id',
    localKey: 'id'
  })
  public Marca: HasMany<typeof Camion>
}
