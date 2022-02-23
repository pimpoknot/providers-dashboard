import { Address, Providers } from "@prisma/client";
import { prisma } from "../../prisma/prisma";

type UpdateRequest = Omit<Providers, "addressId" | "id"> & {
    address: Omit<Address, "id">;
  }
  
   export const updateProviders = async (
    id: string,
    { address, ...data }: UpdateRequest
  ) => {
    const providerUpdated = await prisma.providers.update({
      where: { id },
      data,
    });
    const addressUpdated = await prisma.address.update({
      where: { id: providerUpdated.addressId },
      data: address,
    });
    return { ...providerUpdated, address: addressUpdated };
  };