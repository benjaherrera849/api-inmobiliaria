import { Router } from 'express';
import { login } from '../controllers/auth-controller';


const router = Router();
// ruta para el login (POST)
router.post('/login', login);

export default router;