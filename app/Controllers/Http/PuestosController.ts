import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Puesto from 'App/Models/Puesto';

export default class PuestosController {
  public async index({response}: HttpContextContract) {
    try{
      const puesto = Puesto.all();

      response.status(200)
      return puesto
    }
    catch{
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    const chequeo = await Database.rawQuery('SELECT COUNT(id) as conteo FROM `puestos` WHERE puesto= ?', [request.input('puesto')])
    const chequeo2 = chequeo[0]
    const chequeo3 = chequeo2[0] 

    const cheo = await Database.rawQuery('SELECT COUNT(id) as conteo2 FROM `puestos` WHERE valor= ?', [request.input('valor')])
    const cheo2 = cheo[0]
    const cheo3 = cheo2[0] 

    if(chequeo3['conteo']==0 && cheo3['conteo2']==0){
      try{
        const puestoSchema = schema.create({
          puesto: schema.string({trim: true}, [
            rules.required(),
            rules.minLength(3),
            rules.maxLength(30)
          ]),
          valor: schema.number([rules.required()])
        })

        const puesto = await request.validate({schema: puestoSchema})
        Puesto.create(puesto)

        response.status(200).json({
          menssage: "Se inserto correctamente el puesto"
        })
      }
      catch(error){
        response.status(400).json({menssage:"NO SE INSERTO A LA PERSONA, REVISA TUS DATOS"})
      }
    }
    else{
      response.status(400).json({menssage: "ESTE PUESTO O VALOR YA ESTA REGISTRADO"})
    } 
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const puesto = Puesto.findOrFail(params.id)

      response.status(200)
      return puesto
    }
    catch(error){
      response.status(400).json({message: "EL PUESTO NO EXISTE"})
    }
  }

  public async update({response, request, params}: HttpContextContract) {

    try{
      const puesto = await Puesto.findOrFail(params.id)

      puesto.puesto=request.input('puesto')
      puesto.valor=request.input('valor')

      puesto.save()

      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }
    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const puesto = await Puesto.findOrFail(params.id)
      await puesto.delete()

      response.status(200).json({message: "SE ELIMINO EL PUESTO"})
    }
    catch(error){
      response.status(400).json({message: "EL PUESTO NO EXISTE"})
    }
  }
}
