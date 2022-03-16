import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Marca from './Marca'
import Clase from './Clase'
import CamionChofer from './CamionChofer'

export default class Camion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public placa: string

  @column()
  public num_unidad: number

  @column()
  public marca_id: number

  @column()
  public modelo: string

  @column()
  public clase_id: number

  @column()
  public estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //----------------------- BELONGS TO ------------------//

  @belongsTo(()=>Marca,{
    foreignKey: 'marca_id'
  })
  public Marca: BelongsTo<typeof Marca>

  @belongsTo(()=>Clase,{
    foreignKey: 'clase_id'
  })
  public Clase: BelongsTo<typeof Clase>

  //-----------------------------------------------------//

  @hasMany(()=> CamionChofer, {
    foreignKey: 'camion_id',
    localKey: 'id'
  })
  public Camion: HasMany<typeof CamionChofer>
}
