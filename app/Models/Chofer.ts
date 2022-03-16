import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Persona from './Persona'
import CamionChofer from './CamionChofer'

export default class Chofer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public persona_id: number

  @column()
  public num_licencia: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Persona, {
    foreignKey: "persona_id"
  })
  public Persona: BelongsTo<typeof Persona>

  @hasMany(()=> CamionChofer, {
    foreignKey: 'chofer_id',
    localKey: 'id'
  })
  public Chofer: HasMany<typeof CamionChofer>
}
