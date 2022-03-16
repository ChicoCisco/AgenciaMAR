import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Pasajero from 'App/Models/Pasajero'

export default class PasajerosController {
  public async index({response}: HttpContextContract) {

    try{
      const pasajero = await Pasajero.query().preload('Persona')

      const pasajeroJ = pasajero.map((pasajero) => pasajero.serialize())

      response.status(200)
      return pasajeroJ
    }
    catch(error){
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    const chequeo = await Database.rawQuery('SELECT COUNT(id) as conteo FROM `pasajeros` WHERE persona_id= ?', [request.input('persona_id')])
    const chequeo2 = chequeo[0]
    const chequeo3 = chequeo2[0] 

    if(chequeo3['conteo']==0){
      try{
        const pasajeroSchema = schema.create({
          persona_id: schema.number([rules.required()])
        })

        const pasajero = await request.validate({schema: pasajeroSchema})
        Pasajero.create(pasajero)

        response.status(200).json({
          menssage: "Se inserto correctamente a el pasajero"
        })
      }
      catch(error){
        response.status(400).json({menssage:"NO SE INSERTO A EL PASAJERO, REVISA TUS DATOS"})
      }
    }

    else{
      response.status(400).json({menssage: "ESTA CURP YA ESTA REGISTRADA A OTRA PERSONA"})
    }
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const pasajero = await Pasajero.query().where('id', params.id).preload('Persona')

      response.status(200)
      return pasajero
    }

    catch(error){
      response.status(400).json({message: "NO EXISTE NINGUN PASAJERO CON ESTE ID"})
    }
  }

  public async update({response, request, params}: HttpContextContract) {
    try{
      const pasajero = await Pasajero.findOrFail(params.id)

      pasajero.persona_id=request.input('persona_id')
      
      pasajero.save()

      response.status(200).json({
        message: "LOS DATOS FUERON MODIFICADOS"
      })
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({params,response}: HttpContextContract) {
    try{
      const pasajero = await Pasajero.findOrFail(params.id)

      pasajero.delete()

      response.status(200).json({
      message: "SE ELIMINO EL REGISTRO"
      })

    }
    catch(error){
      response.status(500).json({
        message: "OCURRIO UN ERROR AL ELIMINAR"
      })
    }
    
  }
}
