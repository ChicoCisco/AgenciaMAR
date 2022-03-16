import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Camion from './Camion'
import Chofer from './Chofer'
//import Viaje from './Viaje'

export default class CamionChofer extends BaseModel {
  @column()
  public camion_id: number

  @column()
  public chofer_id: number

  @column()
  public f_camion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Camion, {
    foreignKey: 'camion_id'
  })
  public Camion: BelongsTo<typeof Camion>

  @belongsTo(()=> Chofer, {
    foreignKey: 'chofer_id'
  })
  public Chofer: BelongsTo<typeof Chofer>
}
