/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
  
  Route.resource('personas', 'PersonasController')
  Route.resource('pasajeros', 'PasajerosController')
  Route.resource('chofer', 'ChofersController')
  Route.resource('ciudades', 'CiudadsController')
  Route.resource('estados', 'EstadosController')
  Route.resource('ciudad_estado', 'CiudadEstadosController')
  Route.resource('costos', 'CostosController')
  Route.resource('ciudad_costo', 'CiudadCostosController')
  Route.resource('puestos', 'PuestosController')
  Route.resource('clases', 'ClasesController')
  Route.resource('marcas', 'MarcasController')
  Route.resource('camiones', 'CamionsController')
  Route.resource('camion_chofer', 'CamionChofersController')
  Route.resource('tipo_equipaje', 'TipoEquipajesController')
  Route.resource('viajes', 'ViajesController')
  Route.get('VerUser', 'UsuariosController.index')
  Route.get('CerrarSesion', 'UsuariosController.CerrarSesion')

}).prefix('api').middleware(['auth'])

//--------------------ROUTAS USUARIOS-------------------------//

Route.group(()=>{

  Route.post('registro', 'UsuariosController.RegistrarUsuario')
  Route.post('login', 'UsuariosController.IniciarSesion')

}).prefix('user')