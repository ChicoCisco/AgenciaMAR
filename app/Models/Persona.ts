import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pasajero from './Pasajero'
import Usuario from './Usuario'

export default class Persona extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public CURP: String

  @column()
  public nombre: String

  @column()
  public a_paterno:String

  @column()
  public a_materno: String

  @column()
  public f_nac: String

  @column()
  public telefono: Number

  @column()
  public tel_emergencia: Number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> Pasajero, {
    foreignKey: 'persona_id',
    localKey: 'id'
  })
  public Persona: HasMany<typeof Pasajero>

  @hasMany(()=> Usuario, {
    foreignKey: 'persona_id',
    localKey: 'id'
  })
  public Persona1: HasMany<typeof Usuario>
}
