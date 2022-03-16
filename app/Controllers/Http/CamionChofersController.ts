import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import CamionChofer from 'App/Models/CamionChofer'

export default class CamionChofersController {
  public async index({response}: HttpContextContract) {
    try{
      const cam_chof = await CamionChofer.query().preload('Camion').preload('Chofer')

      response.status(200)
      return cam_chof
    }
    catch(error){
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    try{
      const cam_chofSchema = schema.create({
        camion_id: schema.number([rules.required()]),
        chofer_id: schema.number([rules.required()]),
        f_camion: schema.string({trim:true}, [rules.required()])
      })

      const cam_chof = await request.validate({schema: cam_chofSchema})
      CamionChofer.create(cam_chof)

      response.status(200).json({
        menssage: "Se inserto correctamente la union"
      })
    }
    catch(error){
      response.status(400).json({menssage:"NO SE INSERTO LA UNION, REVISA TUS DATOS"})
    }
  }

  public async show({response, params}: HttpContextContract) {
    try{
      const cam_cho = await CamionChofer.query().where('chofer_id', params.id).preload('Camion').preload('Chofer')

      response.status(200)
      return cam_cho
    }
    catch(error){
      response.status(400).json({message: "LA UNION NO EXISTE"})
    }
  }
}
