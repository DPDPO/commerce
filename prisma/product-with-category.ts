import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const getRandom = (max:number , min : number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const sneakers = [
  {
  name: `Sneakers 1`,
  contents: `{"blocks":[{"key":"a5rl3","text":"Good Sneakers ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  category_id: 1,
  image_url: ,
  price: getRandom(300000 , 100000),
  },
]

const tShirt = [
  {
    name: `T-Shirt 1`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good T-Shirt ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: ,
    price: getRandom(300000 , 100000),
    },
]

const pants = [
  {
    name: `Pants 1`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Pants ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: ,
    price: getRandom(300000 , 100000),
    },
]
const cap = [
  {
    name: `Cap 1`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Cap ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url: ,
    price: getRandom(300000 , 100000),
    },
]
const hoodie = [
  {
    name: `Hoodie 1`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Hoodie ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url: ,
    price: getRandom(300000 , 100000),
    },
]


const productData: Prisma.productsCreateInput[] = [
  ...sneakers,
  ...tShirt,
  ...pants,
  ...cap,
  ...hoodie
]
//   null,
//   Array(100)
// ).map((_, index) => ({
//   name: `dark jean ${index + 1}`,
//   contents: `{"blocks":[{"key":"a5rl3","text":"Good ${
//     index + 1
//   } ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//   category_id: 1,
//   image_url: `https://picsum.photos/id/${
//     (index + 1) % 10 === 0 ? 10 : (index + 1) % 10
//   }/250/150/`,
//   price: Math.floor(Math.random() * (100000 - 10000) + 10000),
// }));


async function main() {
  await prisma.products.deleteMany({});

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    });
    console.log(`Created id : ${product.id}`);
  }
}

main()
  .then(async () => {
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
