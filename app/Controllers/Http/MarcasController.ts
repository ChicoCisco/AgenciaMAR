import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Marca from 'App/Models/Marca';

export default class MarcasController {
  public async index({response}: HttpContextContract) {
    try{
      const marca = Marca.all();

      response.status(200)
      return marca
    }
    catch{
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    const chequeo = await Database.rawQuery('SELECT COUNT(id) as conteo FROM `marcas` WHERE marca= ?', [request.input('marca')])
    const chequeo2 = chequeo[0]
    const chequeo3 = chequeo2[0] 

    if(chequeo3['conteo']==0){
      try{
        const marcaSchema = schema.create({
          marca: schema.string({trim:true}, [rules.required(), rules.maxLength(20)])
        })
        const marca = await request.validate({schema: marcaSchema})
        Marca.create(marca)

        response.status(200).json({
          menssage: "Se inserto correctamente la marca"
        })
      }

      catch(error){
        response.status(400).json({menssage:"NO SE INSERTO LA MARCA, REVISA TUS DATOS"})
      }
      
    }
    else{
      response.status(400).json({menssage: "ESTA MARCA YA ESTA REGISTRADO"})
    } 
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const marca = Marca.findOrFail(params.id)

      response.status(200)
      return marca
    }
    catch(error){
      response.status(400).json({message: "LA MARCA NO EXISTE"})
    }
  }

  public async update({params, response, request}: HttpContextContract) {
    try{
      const marca = await Marca.findOrFail(params.id)

      marca.marca=request.input('marca')

      marca.save()

      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({response, params}: HttpContextContract) {
    try{
      const marca = await Marca.findOrFail(params.id)
      await marca.delete()

      response.status(200).json({message: "SE ELIMINO LA MARCA"})
    }
    catch(error){
      response.status(400).json({message: "LA MARCA NO EXISTE"})
    }
  }
}
