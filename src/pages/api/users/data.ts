import type { NextApiRequest, NextApiResponse } from "next";
import { CreateProviders } from "../../../database/CreateProvider";
import { listProviders } from "../../../database/GetProvider";


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
    throw new Error("Method not valid");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "error" });
  }
}