-- CreateTable
CREATE TABLE "Propiedad" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "enVenta" BOOLEAN NOT NULL DEFAULT false,
    "precioVenta" DOUBLE PRECISION,
    "monedaVenta" TEXT DEFAULT 'USD',
    "enAlquiler" BOOLEAN NOT NULL DEFAULT false,
    "precioAlquiler" DOUBLE PRECISION,
    "monedaAlquiler" TEXT DEFAULT 'ARS',
    "m2" INTEGER NOT NULL,
    "ambientes" INTEGER NOT NULL,
    "habitaciones" INTEGER NOT NULL,
    "banos" INTEGER NOT NULL,
    "patio" BOOLEAN NOT NULL DEFAULT false,
    "cochera" BOOLEAN NOT NULL DEFAULT false,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "esPrincipal" BOOLEAN NOT NULL DEFAULT false,
    "propiedadId" INTEGER NOT NULL,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "Propiedad"("id") ON DELETE CASCADE ON UPDATE CASCADE;
