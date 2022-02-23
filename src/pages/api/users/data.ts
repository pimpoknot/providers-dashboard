import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Providers, Address, Prisma } from "@prisma/client";

type CreateRequest = Omit<Providers, "addressId" | "id"> & { address: Omit<Address, "id"> };


export const prisma = new PrismaClient();

export const CreateProviders = async ({ address, ...data }: CreateRequest) =>
  prisma.providers.create({
    data: {
      ...data,
      address: { create: address },
    },
  });


type IListRequest = {
  where?: Prisma.ProvidersWhereInput;
};

export const listProviders = async ({ where } = {} as IListRequest) =>
  prisma.providers.findMany({
    include: { address: true },
    where,
  });



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const providers = await listProviders();
      return res.status(200).json(providers);
    }
    if (req.method === "POST") {
      const providers = await CreateProviders(req.body);
      return res.status(201).json(providers);
    }
    throw new Error("Method not válid");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "error" });
  }
}
