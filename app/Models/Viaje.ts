import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Pasajero from './Pasajero'
import Camion from './Camion'
import CiudadCosto from './CiudadCosto'
import TEquipaje from './TEquipaje'

export default class Viaje extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario: number

  @column()
  public pasajero: number

  @column()
  public unidad: number

  @column()
  public destino: number

  @column()
  public f_viaje: string

  @column()
  public f_regreso: string

  @column()
  public equipaje: number

  @column()
  public subtotal: number

  @column()
  public iva: number

  @column()
  public total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Usuario, {
    foreignKey: 'usuario'
  })
  public Usuario: BelongsTo<typeof Usuario>

  @belongsTo(()=> Pasajero, {
    foreignKey: 'pasajero'
  })
  public Pasajero: BelongsTo<typeof Pasajero>

  @belongsTo(()=> Camion, {
    foreignKey: 'unidad'
  })
  public Camion: BelongsTo<typeof Camion>

  @belongsTo(()=> CiudadCosto, {
    foreignKey: 'destino'
  })
  public CiudadCosto: BelongsTo<typeof CiudadCosto>

  @belongsTo(()=> TEquipaje, {
    foreignKey: 'equipaje'
  })
  public TEquipaje: BelongsTo<typeof TEquipaje>
}
