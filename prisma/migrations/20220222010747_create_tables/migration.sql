-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "aditional" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "corporate" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
