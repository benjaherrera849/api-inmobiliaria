import './.env.js';
import application from 'express';
import propiedadRoutes from './routes/propiedad-routes.js';
import authRoutes from './routes/auth-routes.js';
import imagenesRoutes from './routes/imagenes-routes.js';
import cors from 'cors';



const app = application();
app.use(cors());

// Middleware para transformar el body de las peticiones HTTP a objetos JSON
app.use(application.json());

// Conectamos el archivo de rutas
app.use('/', propiedadRoutes);
app.use('/', authRoutes);
app.use('/', imagenesRoutes);

// Levantamos el servidor TCP
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});