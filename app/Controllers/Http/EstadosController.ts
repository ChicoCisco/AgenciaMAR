import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Estado from 'App/Models/Estado';

export default class EstadosController {
  public async index({response}: HttpContextContract) {
    const estado = await Estado.all();

    response.status(200)
    return estado
  }

  public async store({request, response}: HttpContextContract) {
    const chequeo = await Database.rawQuery('SELECT COUNT(id) as conteo FROM `estados` WHERE nombre_estado= ?', [request.input('nombre_estado')])
    const chequeo2 = chequeo[0]
    const chequeo3 = chequeo2[0]

    if(chequeo3['conteo']==0){
      try{
        const estadoSchema = schema.create({
          nombre_estado: schema.string({trim:true}, [
            rules.required(),
            rules.minLength(4),
            rules.maxLength(50)
          ])
        })

        const estado = await request.validate({schema: estadoSchema})
        Estado.create(estado)

        response.status(200).json({
          menssage: "Se inserto correctamente a el estado"
        })
      }
      catch(error){
        response.status(400).json({menssage:"NO SE INSERTO EL ESTADO, REVISA TUS DATOS"})
      }
    }

    else{
      response.status(400).json({menssage: "ESTE ESTADO YA ESTA REGISTRADA"})
    }  
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const estado = await Estado.findOrFail(params.id)

      response.status(200)
      return estado
    }
    catch(error){
      response.status(400).json({message: "EL ESTADO NO EXISTE"})
    }
  }

  public async update({request,params,response}: HttpContextContract) {
    try{
      const estado = await Estado.findOrFail(params.id)

      estado.nombre_estado=request.input('nombre_estado')

      estado.save()
      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({response, params}: HttpContextContract) {
    try{
      const estado = await Estado.findOrFail(params.id)
      await estado.delete()

      response.status(200).json({message: "SE ELIMINO EL ESTADO"})
    }
    catch(error){
      response.status(400).json({message: "EL ESTADO NO EXISTE"})
    }
  }
}
