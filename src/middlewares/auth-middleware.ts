import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';



export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  //extraemos la autorizacion(token) del header de la peticion
  const authHeader = req.headers.authorization;
  //si no hay token devolvemos un 401 al cliente
  if (!authHeader) return res.status(401).json({ mensaje: 'Acceso denegado: falta token' });

  //extraemos el token del header de la peticion, el formato del header es "bearer <token>, entonces separamos por el espacio y tomamos el segundo elemento del array que es el token"
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Acceso denegado: falta token' });

  try {
    //verificamos que el token sea valido, si no es valido se lanzara un error y se devolvera un 401 al cliente
    const secret = process.env.JWT_SECRET;

    if(!secret) {
      return res.status(500).json({ mensaje: 'Error interno del servidor: falta clave secreta' });
    }
    
    jwt.verify(token, secret);
    
    //si es valido, llamamos a next() para que continue con la ejecucion de la ruta
    next();
  } catch (error) {
    //verificamos el tipo de error que se produjo al verificar el token y devolvemos un mensaje de error adecuado al cliente
    if(error instanceof jwt.TokenExpiredError){
      return res.status(401).json({ mensaje: 'Token vencido' });
    }

    if(error instanceof jwt.JsonWebTokenError){
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};