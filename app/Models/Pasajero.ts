import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Persona from './Persona'
import Viaje from './Viaje'

export default class Pasajero extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public persona_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Persona,{
    foreignKey: "persona_id"
  })
  public Persona: BelongsTo<typeof Persona>

  @hasMany(()=>Viaje,{
    foreignKey: 'pasajero',
    localKey: 'id'
  })
  public Pasajero: HasMany<typeof Viaje>
  
}
