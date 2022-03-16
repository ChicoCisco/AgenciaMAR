import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
  public async index({response}: HttpContextContract) {
    try{
      const usuario = await Usuario.query().preload('Persona1').preload('Puesto')

      response.status(200)
      return usuario
    }
    catch(error){
      response.status(500).json({
        message: "OCURRIO UN ERROR"
      })
    }
  }

  public async RegistrarUsuario({request, response}: HttpContextContract){
    try{
      const userSchema = schema.create({
        persona_id: schema.number([rules.required()]),
        puesto_id: schema.number([rules.required()]),
        email: schema.string({trim:true},[
          rules.required(),
          rules.email()
        ]),
        password: schema.string({trim:true})
      })

      const user = await request.validate({schema: userSchema})
      Usuario.create(user)

      response.status(200).json({
        menssage: "Se inserto correctamente el usuario"
      })
    }
    catch(error){
      response.status(400).json({menssage:"NO SE INSERTO A EL USUARIO, REVISA TUS DATOS"})
    }
  }

  public async IniciarSesion({request, response, auth}: HttpContextContract){
    const email = request.input('email')
    const password = request.input('password')

    try{
      const token = await auth.use('api').attempt(email, password, {expiresIn: '280mins'})
      return token
    }
    catch{
      return response.status(400).json({message: 'Datos NO Coinciden'})
    }
  }

  public async CerrarSesion({auth, response}: HttpContextContract){

    try{
      await auth.use('api').revoke()
      response.status(200).json({message: "SE CERRO LA SESION"})
      return {
        revoked:true
      }
    }
    catch(error){
      response.status(500).json({message: "OCURRIO UN ERROR"})
    }
    
  }

}
