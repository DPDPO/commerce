import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

async function deleteMy(id: number) {
  try {
    const response = await prisma.orders.delete({
      where: {
        id: id,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session: any = await getServerSession(req, res, authOptions);
  const { id } = req.query;

  if (session == null) {
    res.status(200).json({ items: [], message: `no Session ` });
    return;
  }

  if (req.method === "DELETE") {
    try {
      const wishlist = await deleteMy(Number(id));
      res.status(200).json({ items: wishlist, message: `Success` });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: `Failed ` });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
