import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.products.deleteMany({});

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    });
    console.log(`Created id : ${product.id}`);
  }
}

const productData: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(100)
).map((_, index) => ({
  name: `dark jean ${index + 1}`,
  contents: `{"blocks":[{"key":"a5rl3","text":"Good ${
    index + 1
  } ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  category_id: 1,
  image_url: `https://picsum.photos/id/${
    (index + 1) % 10 === 0 ? 10 : (index + 1) % 10
  }/250/150/`,
  price: Math.floor(Math.random() * (100000 - 10000) + 10000),
}));

main()
  .then(async () => {
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
