import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import CiudadCosto from 'App/Models/CiudadCosto'

export default class CiudadCostosController {
  public async index({response}: HttpContextContract) {
    try{
      const ciudad_costo = await CiudadCosto.query().preload('CiudadEstado').preload('Costo')

      response.status(200)
      return ciudad_costo
    }
    catch(error){
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    try{
      const ciudad_costoSchema = schema.create({
        ciudad_estado_id: schema.number([rules.required()]),
        costo_id: schema.number([rules.required()])
      })

      const ciudad_costo = await request.validate({schema:ciudad_costoSchema})
      CiudadCosto.create(ciudad_costo)

      response.status(200).json({
        menssage: "Se inserto correctamente a la union"
      })
    }
    catch(error){
      response.status(400).json({menssage:"NO SE INSERTO A LA UNION, REVISA TUS DATOS"})
    }
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const ciudad_costo = await CiudadCosto.query().where('id', params.id).preload('CiudadEstado').preload('Costo')

      response.status(200)
      return ciudad_costo
    }
    catch(error){
      response.status(400).json({message: "LA UNION NO EXISTE"})
    }
  }

  public async update({response,request,params}: HttpContextContract) {
    try{
      const ciudad_costo = await CiudadCosto.findOrFail(params.id)

      ciudad_costo.ciudad_estado_id=request.input('ciudad_estado_id')
      ciudad_costo.costo_id=request.input('costo_id')

      ciudad_costo.save()
      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({params,response}: HttpContextContract) {
    try{
      const ciudad_costo = await CiudadCosto.findOrFail(params.id)
      await ciudad_costo.delete()

      response.status(200).json({message: "SE ELIMINO LA UNION"})
    }
    catch(error){
      response.status(400).json({message: "LA UNION NO EXISTE"})
    }
  }
}
