import application from 'express';
import propiedadRoutes from './routes/propiedad-routes';

const app = application();
const PORT = 3000;

// Middleware para transformar el body de las peticiones HTTP a objetos JSON
app.use(application.json());

// Conectamos el archivo de rutas
app.use('/', propiedadRoutes);

// Levantamos el servidor TCP
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});