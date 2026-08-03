import { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {PrismaPg } from '@prisma/adapter-pg';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });




//FUNCION GET ALL

export const getPropiedades = async (req:Request, res:Response) => {
  try{
    //buscamos todos los elementos de la tabla propiedad en la base de datos y los devolvemos en formato json al cliente
  const propiedades = await prisma.propiedad.findMany();
  res.json(propiedades);

} catch(error){
  //si hay un error del servidor lo mostramos en la consola y devolvemos un 500 al cliente
  console.error(error);
  res.status(500).json({ message: 'Error interno del servidor' });
}
}


//FUNCION GET BY ID

export const getPropiedadById = async (req:Request, res:Response) => {

  try{
  const { id: idParam } = req.params;
  //como req.params puede ser un string o un array de strings, verificamos si es un array y tomamos el primer elemento
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  //pasamos el id (string) que recibimos por params a un numero para poder buscarlo en la base de datos
  const idNumber = parseInt(id ?? '', 10);

  if (isNaN(idNumber)) {
    //verificamos si es un numero para mantener los codigos de estado HTTP correctos y no enviar un 500 al cliente
    return res.status(400).json({ message: 'ID inválido' });
  }
  const propiedad = await prisma.propiedad.findUnique({
    //buscamos la propiedad por su id en la base de datos
    where:
     { id: idNumber },
  });
  //verificamos que la propiedad exista, si no existe enviamos un 404 al cliente
  if(!propiedad){
    return res.status(404).json({ message: 'Propiedad no encontrada' });
  }

  //devolvemos la propiedad en formato json al cliente
  res.json(propiedad);

} catch(error){

  console.error(error);
  res.status(500).json({ message: 'Error interno del servidor' });
  
}
}



//FUNCION CREATE

 export const crearPropiedad = async (req: Request, res: Response) => {
  try {
    /*tomamos todo el objeto, y comparamos con la estructura de la tabla propiedad en la base de datos,
      si hay algun campo que no coincida con la estructura de la tabla, prisma nos devolvera un error,
      esto lo hago para no tener que escribir todos los campos de la tabla propiedad ya que son muchos y quedaria un codigo poco legible*/

    const {id, imagenes, ...datosPropiedad} = req.body;
    //aislamos el id del resto de datos, en caso de que alguien quiera ingresar un id manualmente, lo cual romperia el sistema ya que esta definido como autoincremental

    const nuevaPropiedad = await prisma.propiedad.create({
      data: {
        ...datosPropiedad
      }
    });

    return res.status(201).json(nuevaPropiedad);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al crear la propiedad' });
  }
}



//FUNCION UPDATE

  export const updatePropiedad = async (req: Request, res: Response) => {
    try {
      const { id: idParam } = req.params;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;
      const idNumber = parseInt(id ?? '', 10);
      
      if(isNaN(idNumber)) {
        return res.status(400).json({ mensaje: 'ID inválido' });
      }

      const propiedadExistente = await prisma.propiedad.findUnique({
        where: { id: idNumber },
      });

      if(!propiedadExistente) {
        return res.status(404).json({ mensaje: 'Propiedad no encontrada' });
      }
     //igual que antes, separamos el id en caso de que lo manden en el body manualmente
      const {id: id_body, imagenes, ...datosPropiedad} = req.body
      
      const propiedadUpdate = await prisma.propiedad.update({
        where: { id: idNumber },
        data:{...datosPropiedad, imagenes: imagenes ? {create : imagenes} : undefined}
      });

      return res.status(200).json(propiedadUpdate);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al actualizar la propiedad' });
    }
  }


    //FUNCION DELETE


    export const deletePropiedad = async (req: Request, res: Response) => {
      try {
        const { id: idParam } = req.params;
        const id = Array.isArray(idParam) ? idParam[0] : idParam;
        const idNumber = parseInt(id ?? '', 10);

        if(isNaN(idNumber)) {
          return res.status(400).json({ mensaje: 'ID inválido' });
        }

        const propiedadExistente = await prisma.propiedad.findUnique({
          where: { id: idNumber },
        });

        if(!propiedadExistente) {
          return res.status(404).json({ mensaje: 'Propiedad no encontrada' });
        }

        await prisma.propiedad.delete({
          where: { id: idNumber },
        });
        return res.status(200).json({ mensaje: 'Propiedad eliminada correctamente' });
      }
      catch (error) { 
      return res.status(500).json({ mensaje: 'Error al eliminar la propiedad' });
      }
    }





  


