import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Persona from 'App/Models/Persona'
import Database from '@ioc:Adonis/Lucid/Database';

export default class PersonasController {
  public async index({response}: HttpContextContract) {
    try{
      const persona = Persona.all();

      response.status(200)
      return persona
    }
    catch{
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async store({request, response}: HttpContextContract) { 

    const chequeo = await Database.rawQuery('SELECT COUNT(CURP) as COUNTCURP FROM `personas` WHERE CURP= ?', [request.input('CURP')])
    const chequeo2 = chequeo[0]
    const chequeo3 = chequeo2[0] 
    //from('personas').where('CURP', request.input('CURP'))

    if(chequeo3['COUNTCURP']==0){
      try{
        const personaSchema = schema.create({
          CURP: schema.string({trim: true}, [
            rules.minLength(18),
            rules.maxLength(18),
            rules.required()
          ]),
    
          nombre: schema.string({trim: true}, [
            rules.minLength(3),
            rules.maxLength(50),
            rules.required()
          ]),
    
          a_paterno: schema.string({trim: true}, [
            rules.minLength(3),
            rules.maxLength(50),
            rules.required()
          ]),
    
          a_materno: schema.string({trim: true}, [
            rules.minLength(3),
            rules.maxLength(50),
            rules.required()
          ]),
    
          f_nac: schema.string({trim: true}, [
            rules.minLength(3),
            rules.maxLength(50),
            rules.required()
          ]),
    
          telefono: schema.number([
            rules.required()
          ]),
    
          tel_emergencia: schema.number([
            rules.required()
          ])
    
        })
    
        const persona = await request.validate({schema: personaSchema})
        Persona.create(persona)
    
        response.status(200).json({
          menssage: "Se inserto correctamente a la persona"
        })
      }
      catch(error){
        response.status(400).json({menssage:"NO SE INSERTO A LA PERSONA, REVISA TUS DATOS"})
      }
    }

    else{
      response.status(400).json({menssage: "ESTA CURP YA ESTA REGISTRADA A OTRA PERSONA"})
    }    
  }

  public async show({params, response}: HttpContextContract) {

    try{
      const persona = Persona.findOrFail(params.id)

      response.status(200)
      return persona
    }
    catch(error){
      response.status(400).json({message: "LA PERSONA NO EXISTE"})
    }
  }

  public async update({response, request, params}: HttpContextContract) {
    try{
      const persona = await Persona.findOrFail(params.id)

      persona.CURP=request.input("CURP")
      persona.nombre=request.input("nombre");
      persona.a_paterno=request.input("a_paterno");
      persona.a_materno=request.input("a_materno");
      persona.f_nac=request.input("f_nac");
      persona.telefono=request.input("telefono");
      persona.tel_emergencia=request.input("tel_emergencia");

      persona.save()

      response.status(200).json({message: "LOS DATOS FUERON MODIFICADOS SATISFACTORIAMENTE"})
    }

    catch(error){
      response.status(400).json({message: "OCURRIO UN ERROR INTENTALO DE NUEVO"})
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const persona = await Persona.findOrFail(params.id)
      await persona.delete()

      response.status(200).json({message: "SE ELIMINO A LA PERSONA"})
    }
    catch(error){
      response.status(400).json({message: "LA PERSONA NO EXISTE"})
    }
  }
}
