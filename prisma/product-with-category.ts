import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const getRandom = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const sneakers = [
  {
    name: `Sneakers 1`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Sneakers ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      "https://as2.ftcdn.net/v2/jpg/05/44/69/13/1000_F_544691377_60BJEfTNlQvKCKADBzeVweCvGI3VOoi8.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 2`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Sneakers ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      "https://t3.ftcdn.net/jpg/01/21/81/86/240_F_121818673_6EID5iF76VCCc4aGOLJkd94Phnggre3o.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 3`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Sneakers ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      "https://t3.ftcdn.net/jpg/04/36/65/92/240_F_436659277_vp2706cMybOmUSoGNbRDGeGWttlVOqL9.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 4`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Sneakers ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      " https://t4.ftcdn.net/jpg/05/60/67/35/240_F_560673542_A1WBTPnbePTAiU4ORU8CCqlPGAUqNX9S.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 4`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Sneakers ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      " https://t4.ftcdn.net/jpg/04/32/39/97/240_F_432399766_IO6Ng1sGStdQrU77TeqrZU9Hllm8x4q6.jpg",
    price: getRandom(300000, 100000),
  },
];

const tShirt = [
  {
    name: `T-Shirt 1`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good T-Shirt ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      "https://t4.ftcdn.net/jpg/05/54/99/09/240_F_554990923_qI5smNgRoXaK8whAGSSmk9rosVPWbyxN.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 2`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good T-Shirt ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      "https://t4.ftcdn.net/jpg/04/57/57/75/240_F_457577527_o7izXDtA1GeaHOtpC0ws5QCFvsMBbT2u.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 3`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good T-Shirt ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      "https://t3.ftcdn.net/jpg/05/66/21/26/240_F_566212653_UPVnQzeO8EIDmW4S246BQRQo9ld8vBqb.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 4`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good T-Shirt ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      "https://t4.ftcdn.net/jpg/02/56/00/03/240_F_256000308_jeYRaRHVHOpASWiUEp3Qht7LY8U8ZFw8.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 5`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good T-Shirt ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      "https://t4.ftcdn.net/jpg/05/66/15/51/240_F_566155130_563oaqmbzHdB78xfaxnWaovRTIwvkhxT.jpg",
    price: getRandom(300000, 100000),
  },
];

const pants = [
  {
    name: `Pants 1`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Pants ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      "https://t4.ftcdn.net/jpg/05/82/62/33/240_F_582623333_bYyAgcn8ydPyxeNHxIuO0DkbX1NWTY2c.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 2`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Pants ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      "https://t3.ftcdn.net/jpg/01/31/00/60/240_F_131006084_xvDsbZtMf9jOqWNd8OEVeaMtmzB5ziFm.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 3`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Pants ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      "https://t3.ftcdn.net/jpg/00/51/39/00/240_F_51390094_GOAqRzEmYDsPrJJ2k2AsAqket2WW6ZoD.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 4`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Pants ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      "https://t4.ftcdn.net/jpg/01/69/27/39/240_F_169273924_TF9xaJHZlBq33m6rMhnC00tfDRNYf2sz.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 5`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Pants ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      "https://t3.ftcdn.net/jpg/05/75/52/62/240_F_575526261_Ottr1SASMqqK6733ofwVJD3FXDjGaoGN.jpg",
    price: getRandom(300000, 100000),
  },
];
const cap = [
  {
    name: `Cap 1`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Cap ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      "https://t3.ftcdn.net/jpg/00/15/10/90/240_F_15109044_ArxhhCPA08qvXWUB6221awQXzVk5qLXr.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 2`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Cap ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      "https://t4.ftcdn.net/jpg/03/55/26/89/240_F_355268936_36TVmrE7OE7gzTinisWiatH2MG5YaOJT.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 3`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Cap ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      "https://t3.ftcdn.net/jpg/04/48/56/80/240_F_448568056_ewmo2VcOW7o7saexNbrNKY9cCf5qAnxE.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 4`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Cap ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      "https://t4.ftcdn.net/jpg/04/48/56/81/240_F_448568128_xxSYJWAsbX3ssC1czccEHa5FHfsZDSwn.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 5`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Cap ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      "https://t4.ftcdn.net/jpg/05/37/16/85/240_F_537168520_4FPKw6vGfwr0B0o6m6gjDWbGBi2uvXX6.jpg",
    price: getRandom(300000, 100000),
  },
];
const hoodie = [
  {
    name: `Hoodie 1`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Hoodie ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      "https://t4.ftcdn.net/jpg/02/58/98/99/240_F_258989952_88GbEoXeMZHypGbkvK7wkC9eVBUqYICX.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 2`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Hoodie ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      "https://t4.ftcdn.net/jpg/02/35/26/67/240_F_235266711_IJ5fvcNRLbDvDut7z8voNaMR7GdUceQl.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 3`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Hoodie ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      "https://t3.ftcdn.net/jpg/02/57/96/38/240_F_257963840_592B8L2EtKrYwKaQnlKn6vaKLokUBX37.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 4`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Hoodie ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      "https://t4.ftcdn.net/jpg/04/21/27/93/240_F_421279314_98uOYeFsTHr5KP6gjkZYj1UVnmhjJRFJ.jpg",
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 5`,
    contents: `{"blocks":[{"key":"a5rl3","text":"Good Hoodie ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      "https://t3.ftcdn.net/jpg/03/13/01/44/240_F_313014436_eq8KYee4fxcU1wRT7Rh3GPC9VlB353gZ.jpg",
    price: getRandom(300000, 100000),
  },
];

const productData: Prisma.productsCreateInput[] = [
  ...sneakers,
  ...tShirt,
  ...pants,
  ...cap,
  ...hoodie,
];

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
