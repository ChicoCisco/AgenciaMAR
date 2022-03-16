import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Costo from 'App/Models/Costo';

export default class CostosController {
  public async index({response}: HttpContextContract) {
    try{
      const costo = Costo.all();

      response.status(200)
      return costo
    }
    catch{
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    try{
      const costoSchema = schema.create({
        tipo_boleto: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(3),
          rules.maxLength(20)
        ]),

        costo: schema.number([rules.required()])
      })

      const costo = await request.validate({schema: costoSchema})
      Costo.create(costo)

      response.status(200).json({
        menssage: "Se inserto correctamente el costo"
      })
    }
    catch(error){
      response.status(400).json({menssage:"NO SE INSERTO EL COSTO, REVISA TUS DATOS"})
    }
  }

  public async show({response, params}: HttpContextContract) {
    try{
      const costo = Costo.findOrFail(params.id)

      response.status(200)
      return costo
    }
    catch(error){
      response.status(400).json({message: "EL COSTO NO EXISTE"})
    }
  }

  public async update({response, request, params}: HttpContextContract) {
    try{
      const costo = await Costo.findOrFail(params.id)

      costo.tipo_boleto=request.input('tipo_boleto')
      costo.costo=request.input('costo')

      costo.save()

      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }

    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({params,response}: HttpContextContract) {
    try{
      const costo = await Costo.findOrFail(params.id)
      await costo.delete()

      response.status(200).json({message: "SE ELIMINO A LA PERSONA"})
    }
    catch(error){
      response.status(400).json({message: "LA PERSONA NO EXISTE"})
    }
  }
}
