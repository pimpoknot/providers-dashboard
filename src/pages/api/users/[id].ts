import type { NextApiRequest, NextApiResponse } from "next";
import { deleteProvider } from "../../../database/DeleteProvider";
import { findProvider } from "../../../database/FindProvider";
import { updateProviders } from "../../../database/UpdateProvider";


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
