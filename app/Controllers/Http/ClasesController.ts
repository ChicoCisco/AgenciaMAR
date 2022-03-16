import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Clase from 'App/Models/Clase'

export default class ClasesController {
  public async index({response}: HttpContextContract) {
    try{
      const clase = Clase.all();

      response.status(200)
      return clase
    }
    catch{
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    const chequeo = await Database.rawQuery('SELECT COUNT(id) as conteo FROM `clases` WHERE tipo_clase= ?', [request.input('tipo_clase')])
    const chequeo2 = chequeo[0]
    const chequeo3 = chequeo2[0] 

    if(chequeo3['conteo']==0){
      try{
        const clasesSchema = schema.create({
          tipo_clase: schema.string({trim:true}, [rules.required(), rules.maxLength(30)]),
          beneficios: schema.string({trim:true}, [rules.required()])
        })
        const clases = await request.validate({schema: clasesSchema})
        Clase.create(clases)

        response.status(200).json({
          menssage: "Se inserto correctamente la clase"
        })
      }

      catch(error){
        response.status(400).json({menssage:"NO SE INSERTO LA CLASE, REVISA TUS DATOS"})
      }
      
    }
    else{
      response.status(400).json({menssage: "ESTA CLASE YA ESTA REGISTRADO"})
    } 
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const clase = Clase.findOrFail(params.id)

      response.status(200)
      return clase
    }
    catch(error){
      response.status(400).json({message: "LA CLASE NO EXISTE"})
    }
  }

  public async update({request, response, params}: HttpContextContract) {
    try{
      const clase = await Clase.findOrFail(params.id)

      clase.tipo_clase=request.input('tipo_clase')
      clase.beneficios=request.input('beneficios')

      clase.save()

      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const clase = await Clase.findOrFail(params.id)
      await clase.delete()

      response.status(200).json({message: "SE ELIMINO LA CLASE"})
    }
    catch(error){
      response.status(400).json({message: "LA CLASE NO EXISTE"})
    }
  }
}
