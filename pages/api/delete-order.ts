import type { NextApiRequest, NextApiResponse } from "next";
import { Cart, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

async function deleteOrder(id: number) {
  try {
    const response = await prisma.cart.delete({
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
  const { id } = JSON.parse(req.body);

  if (session == null) {
    res.status(200).json({ items: [], message: `no Session ` });
    return;
  }

  try {
    const wishlist = await deleteOrder(id);
    res.status(200).json({ items: wishlist, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed ` });
  }
}