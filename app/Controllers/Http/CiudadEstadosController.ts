import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import CiudadEstado from 'App/Models/CiudadEstado'

export default class CiudadEstadosController {

  public async index({response}: HttpContextContract) {
    try{
      const ciudad_estado = await CiudadEstado.query().preload('Ciudad').preload('Estado')

      response.status(200)
      return ciudad_estado
    }
    catch(error){
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {

      try{
        const ciudad_estadoSchema = schema.create({
          ciudad_id: schema.number([rules.required()]),
          estado_id: schema.number([rules.required()])
        })

        const ciudad_estado = await request.validate({schema:ciudad_estadoSchema})
        CiudadEstado.create(ciudad_estado)

        response.status(200).json({
          menssage: "Se inserto correctamente a la union"
        })
      }
      catch(error){
        response.status(400).json({menssage:"NO SE INSERTO A LA UNION, REVISA TUS DATOS"})
      }
  }

  public async show({response, params}: HttpContextContract) {
    try{
      const ciudadestado = await CiudadEstado.query().where('id', params.id).preload('Ciudad').preload('Estado')

      response.status(200)
      return ciudadestado
    }
    catch(error){
      response.status(400).json({message: "LA UNION NO EXISTE"})
    }
  }

  public async update({response,params,request}: HttpContextContract) {
    try{
      const ciudadestado = await CiudadEstado.findOrFail(params.id)

      ciudadestado.ciudad_id=request.input('ciudad_id')
      ciudadestado.estado_id=request.input('estado_id')

      ciudadestado.save()
      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({response,params}: HttpContextContract) {
    try{
      const ciudadestado = await CiudadEstado.findOrFail(params.id)
      await ciudadestado.delete()

      response.status(200).json({message: "SE ELIMINO LA UNION"})
    }
    catch(error){
      response.status(400).json({message: "LA UNION NO EXISTE"})
    }
  }
}
