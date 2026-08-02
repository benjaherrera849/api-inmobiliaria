import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
    try{
  const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email:email },
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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });

} catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });

}
}