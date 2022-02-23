import { prisma } from "../../prisma/prisma";
import { DBProviders } from "../models/databaseModel";

export const deleteProvider = async (id: string): Promise<DBProviders> => {
    const proviData = await prisma.providers.delete({
      where: { id },
    });
    const address = await prisma.address.delete({
      where: { id: proviData.addressId },
    });
    return {
      ...proviData,
      address,
    };
  };
  