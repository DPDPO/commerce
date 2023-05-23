import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getOrderBy } from "constants/products";
const prisma = new PrismaClient();

async function getProducts({
  skip,
  take,
  category,
  orderBy,
  contains,
}: {
  skip: number;
  take: number;
  category: number;
  orderBy: string;
  contains: string;
}) {
  const containsCondition =
    contains && contains !== ""
      ? {
          name: { contains: contains },
        }
      : undefined;
  const where =
    category && category !== -1
      ? {
          category_id: category,
          ...containsCondition,
        }
      : containsCondition
      ? containsCondition
      : undefined;
  // const orderBycondition = getOrderBy(orderBy)
  // console.log(where);

  try {
    const response = await prisma.products.findMany({
      skip: skip,
      take: take,
      //가격순으로 정렬
      // orderBy: {
      //   price: "asc",
      // },
      ...getOrderBy(orderBy),
      where: where,
      // ...orderBycondition,
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
  const { skip, take, category, orderBy, contains } = req.query;
  if (skip == null || take == null) {
    res.status(400).json({ message: "no skip or take" });
    return;
  }
  try {
    const products = await getProducts({
      skip: Number(skip),
      take: Number(take),
      category: Number(category),
      orderBy: String(orderBy),
      //cart페이지에서 추천상품 불러올때 contains 없기때문에 조건문 활용해줘야됨
      contains: contains ? String(contains) : "",
    });
    res.status(200).json({ items: products, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed ` });
  }
}
