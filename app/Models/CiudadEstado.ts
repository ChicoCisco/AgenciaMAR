import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Ciudad from './Ciudad'
import Estado from './Estado'
import CiudadCosto from './CiudadCosto'

export default class CiudadEstado extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ciudad_id: number

  @column()
  public estado_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //-------------------------------------------------------//
  @belongsTo(()=>Ciudad,{
    foreignKey: 'ciudad_id'
  })
  public Ciudad: BelongsTo<typeof Ciudad>

  @belongsTo(()=>Estado,{
    foreignKey: 'estado_id'
  })
  public Estado: BelongsTo<typeof Estado>

  //---------------------------------------------------//

  @hasMany(()=>CiudadCosto,{
      foreignKey: 'ciudad_estado_id',
      localKey: 'id'
    })
    public CiudadEstado: HasMany<typeof CiudadCosto>
}
