import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Persona from './Persona'
import Puesto from './Puesto'
import Viaje from './Viaje'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public persona_id: number

  @column()
  public puesto_id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (usuario: Usuario) {
    if (usuario.$dirty.password) {
      usuario.password = await Hash.make(usuario.password)
    }
  }

  @belongsTo(()=>Persona,{
    foreignKey: 'persona_id'
  })
  public Persona1: BelongsTo<typeof Persona>

  @belongsTo(()=>Puesto,{
    foreignKey: 'puesto_id'
  })
  public Puesto: BelongsTo<typeof Puesto>

  @hasMany(()=> Viaje, {
    foreignKey: 'usuario',
    localKey: 'id'
  })
  public Usuario: HasMany<typeof Viaje>
}
