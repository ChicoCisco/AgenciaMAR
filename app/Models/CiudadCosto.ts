import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CiudadEstado from './CiudadEstado'
import Costo from './Costo'
import Viaje from './Viaje'

export default class CiudadCosto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ciudad_estado_id: number

  @column()
  public costo_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> CiudadEstado, {
    foreignKey: 'ciudad_estado_id'
  })
  public CiudadEstado: BelongsTo<typeof CiudadEstado>

  @belongsTo(()=> Costo, {
    foreignKey: 'costo_id'
  })
  public Costo: BelongsTo<typeof Costo>

  @hasMany(()=> Viaje, {
    foreignKey: 'destino',
    localKey: 'id'
  })
  public CiudadCosto: HasMany<typeof Viaje>
}
