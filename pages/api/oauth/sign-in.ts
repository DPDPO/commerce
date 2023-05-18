import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwtDecode from "jwt-decode";

const prisma = new PrismaClient();

async function signIn(credential: string) {
  const decoded: { name: string; email: string; picture: string } =
    jwtDecode(credential);
  try {
    // create는 없는걸 생성, update는 있는걸 업데이트 , upsert는 없다면 생성,있으면 업데이트
    const response = await prisma.user.upsert({
      where: {
        email: decoded.email,
      },
      update: {
        name: decoded.name,
        image: decoded.picture,
      },
      create: {
        email: decoded.email,
        name: decoded.name,
        image: decoded.picture,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  list?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { credential } = req.query;

  try {
    const Jwt = await signIn(String(credential));
    res.status(200).json({ list: Jwt, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed ` });
  }
}
