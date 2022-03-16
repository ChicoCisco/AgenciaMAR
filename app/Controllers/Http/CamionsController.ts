import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Camion from 'App/Models/Camion'

export default class CamionsController {
  public async index({response}: HttpContextContract) {
    try{
      const camion = await Camion.query().preload('Marca').preload('Clase')

      response.status(200)
      return camion
    }
    catch(error){
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    try{
      const camionSchema = schema.create({
        placa: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(3),
          rules.maxLength(10),
          rules.unique({table: 'camions', column: 'placa'})
        ]),

        num_unidad: schema.number([
          rules.required(),
          rules.unique({table: 'camions', column: 'num_unidad'})
        ]),

        marca_id: schema.number([
          rules.required()
        ]),

        modelo: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(2),
          rules.maxLength(10)
        ]),

        clase_id: schema.number([
          rules.required()
        ]),

        estado: schema.string({trim: true}, [
          rules.required()
        ])
      })

      const camion = await request.validate({schema: camionSchema})
      Camion.create(camion)

      response.status(200).json({
        menssage: "Se inserto correctamente el camion"
      })
    }
    catch(error){
      response.status(400).json({menssage:"NO SE INSERTO EL CAMION, REVISA TUS DATOS"})
    }
  }

  public async show({response, params}: HttpContextContract) {
    try{
      const camion = await Camion.query().where('id', params.id).preload('Marca').preload('Clase')

      response.status(200)
      return camion

    }
    catch(error){
      response.status(400).json({message: "EL CAMION NO EXISTE"})
    }
  }

  public async update({response, request, params}: HttpContextContract) {
    try{
      const camion = await Camion.findOrFail(params.id)

      camion.placa=request.input('placa')
      camion.num_unidad=request.input('num_unidad')
      camion.marca_id=request.input('marca_id')
      camion.modelo=request.input('modelo')
      camion.clase_id=request.input('clase_id')
      camion.estado=request.input('estado')

      camion.save()
      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({response,params}: HttpContextContract) {
    try{
      const camion = await Camion.findOrFail(params.id)
      await camion.delete()

      response.status(200).json({message: "SE ELIMINO EL CAMION"})
    }
    catch(error){
      response.status(400).json({message: "EL CAMION NO EXISTE"})
    }
  }
}
