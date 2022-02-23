import { Address, Providers } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { DBProviders } from "../../../models/databaseModel";
import { prisma } from "./data";


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

 export const findProvider = async (id: string) =>
  prisma.providers.findFirst({
    where: { id },
    include: { address: true },
  });


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    if (req.method === "GET" && typeof id === "string") {
      const providers = await findProvider(id);
      return res.status(200).json(providers);
    }
    if (req.method === "PUT" && typeof id === "string") {
      const provider = await updateProviders(id, req.body);
      return res.status(201).json(provider);
    }
    if (req.method === "DELETE" && typeof id === "string") {
      await deleteProvider(id);
      return res.status(200).json({});
    }
    throw new Error("invalid method");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Ocorreu um erro" });
  }
}
