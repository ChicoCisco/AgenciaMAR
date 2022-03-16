import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Chofer from 'App/Models/Chofer'

export default class ChofersController {
  public async index({response}: HttpContextContract) {
    try{
      const chofer = await Chofer.query().preload('Persona')

      const choferJ = chofer.map((chofer)=> chofer.serialize())

      response.status(200)
      return choferJ
    }
    catch(error){
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    const chequeo = await Database.rawQuery('SELECT COUNT(id) as conteo FROM `chofers` WHERE persona_id= ?', [request.input('persona_id')])
    const chequeo2 = chequeo[0]
    const chequeo3 = chequeo2[0] 

    if(chequeo3['conteo']==0){
      try{
        const choferSchema = schema.create({
          persona_id: schema.number([rules.required()]),
          num_licencia: schema.string({trim:true}, [
            rules.required(),
            rules.minLength(10),
            rules.maxLength(10)
          ])
        })

        const chofer = await request.validate({schema: choferSchema})
        Chofer.create(chofer)

        response.status(200).json({
          menssage: "Se inserto correctamente a el chofer"
        })
      }

      catch(error){
        response.status(400).json({menssage:"NO SE INSERTO A EL CHOFER, REVISA TUS DATOS"})
      }
    }
    else{
      response.status(400).json({menssage: "ESTA CURP YA ESTA REGISTRADA A OTRA PERSONA"})
    }
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const chofer = await Chofer.query().where('id', params.id).preload('Persona')

      response.status(200)
      return chofer
    }

    catch(error){
      response.status(400).json({message: "NO EXISTE NINGUN CHOFER CON ESTE ID"})
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({response, request, params}: HttpContextContract) {
    try{
      const chofer = await Chofer.findOrFail(params.id)

      chofer.persona_id=request.input('persona_id')
      chofer.num_licencia=request.input('num_licencia')

      chofer.save()
      
      response.status(200).json({
        message: "LOS DATOS FUERON MODIFICADOS"
      })
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const chofer = await Chofer.findOrFail(params.id)

      chofer.delete()

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
