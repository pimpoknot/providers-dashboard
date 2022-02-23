import { Address, PrismaClient, Providers } from "@prisma/client";

export const prisma = new PrismaClient();


  type CreateRequest = Omit<Providers, "addressId" | "id"> & {
    address: Omit<Address, "id">;
  };
  
  export const CreateProviders = async ({ address, ...data }: CreateRequest) =>
    prisma.providers.create({
      data: {
        ...data,
        address: { create: address },
      },
    });
