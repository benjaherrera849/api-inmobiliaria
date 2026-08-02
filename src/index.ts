import './.env.js';
import application from 'express';
import propiedadRoutes from './routes/propiedad-routes.js';
import authRoutes from './routes/auth-routes.js';



const app = application();

// Middleware para transformar el body de las peticiones HTTP a objetos JSON
app.use(application.json());

// Conectamos el archivo de rutas
app.use('/', propiedadRoutes);
app.use('/', authRoutes);

// Levantamos el servidor TCP
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});