import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Ciudad from 'App/Models/Ciudad';

export default class CiudadsController {
  public async index({response}: HttpContextContract) {
    const ciudad = await Ciudad.all();

    response.status(200)
    return ciudad
  }

  public async store({request, response}: HttpContextContract) {
    const chequeo = await Database.rawQuery('SELECT COUNT(id) as conteo FROM `ciudads` WHERE nombre_ciudad= ?', [request.input('nombre_ciudad')])
    const chequeo2 = chequeo[0]
    const chequeo3 = chequeo2[0]

    if(chequeo3['conteo']==0){
      try{
        const ciudadSchema = schema.create({
          nombre_ciudad: schema.string({trim:true}, [
            rules.required(),
            rules.minLength(4),
            rules.maxLength(50)
          ])
        })

        const ciudad = await request.validate({schema: ciudadSchema})
        Ciudad.create(ciudad)

        response.status(200).json({
          menssage: "Se inserto correctamente a la ciudad"
        })
      }
      catch(error){
        response.status(400).json({menssage:"NO SE INSERTO A LA CIUDAD, REVISA TUS DATOS"})
      }
    }

    else{
      response.status(400).json({menssage: "ESTA CIUDAD YA ESTA REGISTRADA"})
    }  
  }

  public async show({response, params}: HttpContextContract) {
    try{
      const ciudad = await Ciudad.findOrFail(params.id)

      response.status(200)
      return ciudad
    }
    catch(error){
      response.status(400).json({message: "LA CIUDAD NO EXISTE"})
    }
  }

  public async update({params, request, response}: HttpContextContract) {
    try{
      const ciudad = await Ciudad.findOrFail(params.id)

      ciudad.nombre_ciudad=request.input('nombre_ciudad')

      ciudad.save()
      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const ciudad = await Ciudad.findOrFail(params.id)
      await ciudad.delete()

      response.status(200).json({message: "SE ELIMINO A LA CIUDAD"})
    }
    catch(error){
      response.status(400).json({message: "LA CIUDAD NO EXISTE"})
    }
  }
}
