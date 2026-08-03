import * as imagenesController from '../controllers/imagenes-controller.js';
import { Router } from 'express';
import { autenticar } from '../middlewares/auth-middleware.js';

const router = Router();

//rutas POST y DELETE para agregar y eliminar imagenes
//necesitan autenticacion, por lo que se agrega el middleware autenticar antes del controlador
router.post('/propiedades/:id/imagenes', autenticar, imagenesController.agregarImagen);
router.delete('/propiedades/:id/imagenes/:imagenId', autenticar, imagenesController.eliminarImagen);

export default router;