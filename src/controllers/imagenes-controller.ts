import { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {PrismaPg } from '@prisma/adapter-pg';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });



//FUNCION INSERT

export const agregarImagen = async (req: Request, res: Response) => {
    try{

  const propiedadId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if(!propiedadId) {
    return res.status(400).json({ mensaje: 'ID de propiedad no proporcionado' });
  }

  const idNumerico = parseInt(propiedadId, 10);
  if (isNaN(idNumerico)) {
    return res.status(400).json({ mensaje: 'ID de propiedad inválido' });
  }
  const { url, esPrincipal } = req.body;

  const nuevaImagen = await prisma.imagen.create({
    data: { url, esPrincipal, propiedadId: idNumerico },
  });

  return res.status(201).json(nuevaImagen);
}catch(error){
  console.error(error);
  return res.status(500).json({ mensaje: 'Error al agregar la imagen' });
}
};




//FUNCION DELETE

export const eliminarImagen = async (req: Request, res: Response) => {

try{
  const id = Array.isArray(req.params.imagenId) ? req.params.imagenId[0] : req.params.imagenId;

  if(!id) {
    return res.status(400).json({ mensaje: 'ID de imagen no proporcionado' });
  }

  const idNumerico = parseInt(id ?? '', 10);

  if (isNaN(idNumerico)) {
    return res.status(400).json({ mensaje: 'ID de imagen inválido' });
  }
  
  await prisma.imagen.delete({ where: { id: idNumerico } });

  return res.status(200).json({ mensaje: 'Imagen eliminada' });
} catch (error) {
  console.error(error);
  return res.status(500).json({ mensaje: 'Error al eliminar la imagen' });
}
};