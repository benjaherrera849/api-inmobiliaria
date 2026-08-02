import * as propiedadController from '../controllers/propiedad-controller';
import {Router} from 'express';
import { autenticar } from '../middlewares/auth-middleware';

const router = Router();

//rutas GET para obtener todas las propiedades y para obtener una propiedad por su id

router.get('/propiedades', propiedadController.getPropiedades);
router.get('/propiedades/:id', propiedadController.getPropiedadById);


//rutas POST, PUT y DELETE para crear, actualizar y eliminar propiedades
//necesitan autenticacion, por lo que se agrega el middleware autenticar antes del controlador
router.post('/propiedades', autenticar, propiedadController.crearPropiedad);
router.put('/propiedades/:id', autenticar, propiedadController.updatePropiedad);
router.delete('/propiedades/:id', autenticar, propiedadController.deletePropiedad);


export default router;
