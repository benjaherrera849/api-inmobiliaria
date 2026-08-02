import {PrismaClient} from '@prisma/client';
import {PrismaPg } from '@prisma/adapter-pg';
import {type Request, type Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


//FUNCION LOGIN
export const login = async (req: Request, res: Response) => {
    try{
  const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email: email },
    });

   //chequeamos que el usuario exista
   
    if(!user){
        return res.status(404).json({ message: 'email invalido' });
    }
   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({ message: 'Contraseña invalida' });
    }
   //comparamos la contraseña ingresada con la almacenada en la base de datos
   //si es valida creamos un token jwt y lo enviamos al cliente
    const secret = process.env.JWT_SECRET;
    
    if(!secret) {
        return res.status(500).json({ message: 'Error interno del servidor: falta clave secreta' });
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

    return res.json({ token });

} catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });

}
}