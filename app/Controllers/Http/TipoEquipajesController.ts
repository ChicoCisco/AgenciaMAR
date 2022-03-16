import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import TEquipaje from 'App/Models/TEquipaje'

export default class TipoEquipajesController {
  public async index({response}: HttpContextContract) {
    try{
      const t_equipaje = TEquipaje.all()

      response.status(200)
      return t_equipaje
    }
    catch(error){
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    try{
      const t_equipajeSchema = schema.create({
        tipo: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(3),
          rules.maxLength(30),
          rules.unique({table: 't_equipajes', column: 'tipo'})
        ]),

        costo: schema.number([rules.required()])
      })

      const t_equipaje = await request.validate({schema: t_equipajeSchema})
      TEquipaje.create(t_equipaje)

      response.status(200).json({
        menssage: "Se inserto correctamente el tipo de equipaje"
      })
    }
    catch(error){
      response.status(400).json({menssage:"NO SE INSERTO EL TIPO DE EQUIPAJE, REVISA TUS DATOS"})
    }
  }

  public async show({response, params}: HttpContextContract) {
    try{
      const t_equipaje = await TEquipaje.findOrFail(params.id)

      response.status(200)
      return t_equipaje
    }
    catch(error){
      response.status(400).json({message: "EL TIPO DE EQUIPAJE NO EXISTE"})
    }
  }

  public async update({response, request, params}: HttpContextContract) {
    try{
      const t_equipaje = await TEquipaje.findOrFail(params.id)

      t_equipaje.tipo=request.input('tipo')
      t_equipaje.costo=request.input('costo')

      t_equipaje.save()
      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({response, params}: HttpContextContract) {
    try{
      const t_equipaje = await TEquipaje.findOrFail(params.id)
      await t_equipaje.delete()

      response.status(200).json({message: "SE ELIMINO EL TIPO DE EQUIPAJE"})
    }
    catch(error){
      response.status(400).json({message: "EL TIPO DE EQUIPAJE NO EXISTE"})
    }
  }
}
