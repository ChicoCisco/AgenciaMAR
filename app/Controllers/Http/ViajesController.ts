import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Viaje from 'App/Models/Viaje'

export default class ViajesController {
  public async index({response}: HttpContextContract) {
    try{
      const viaje = Viaje.query().preload('Usuario').preload('Pasajero').preload('Camion').preload('CiudadCosto').preload('TEquipaje')

      response.status(200)
      return viaje

    }
    catch(error){
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    try{
      const viajeSchema = schema.create({
        usuario: schema.number([rules.required()]),
        pasajero: schema.number([rules.required()]),
        unidad: schema.number([rules.required()]),
        destino: schema.number([rules.required()]),
        f_viaje: schema.string({trim:true}, [
          rules.required()
        ]),
        f_regreso: schema.string(),
        equipaje: schema.number([rules.required()]),
        subtotal: schema.number([rules.required()]),
        iva: schema.number([rules.required()]),
        total: schema.number([rules.required()])
      })

      const viaje = await request.validate({schema: viajeSchema})
      Viaje.create(viaje)

      response.status(200).json({
        menssage: "Se inserto correctamente el viaje"
      })
    }
    catch(error){
      response.status(400).json({menssage:"NO SE INSERTO A EL VIAJE, REVISA TUS DATOS"})
    }
  }

  public async show({response, params}: HttpContextContract) {
    try{
      const viaje = Viaje.query().where('id', params.id).preload('Usuario').preload('Pasajero').preload('Camion').preload('CiudadCosto').preload('TEquipaje')

      response.status(200)
      return viaje
    }
    catch(error){
      response.status(400).json({
        message: "Algo salio mal"
      })
    }
  }

  //public async update({}: HttpContextContract) {}

  public async destroy({params, response}: HttpContextContract) {
    try{
      const viaje = await Viaje.findOrFail(params.id)
      await viaje.delete()
      response.status(200).json({message: "SE ELIMINO EL VIAJE"})
    }
    catch(error){
      response.status(400).json({message: "EL VIAJE NO EXISTE"})
    }
  }
}
