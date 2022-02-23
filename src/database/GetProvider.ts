import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/prisma";

type IListRequest = {
    where?: Prisma.ProvidersWhereInput;
  };
  
  export const listProviders = async ({ where } = {} as IListRequest) =>
    prisma.providers.findMany({
      include: { address: true },
      where,
    });

    