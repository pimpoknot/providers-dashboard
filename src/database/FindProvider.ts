import { prisma } from "../../prisma/prisma";

export const findProvider = async (id: string) =>
  prisma.providers.findFirst({
    where: { id },
    include: { address: true },
  });
