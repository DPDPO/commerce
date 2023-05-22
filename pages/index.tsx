import { categories, products } from "@prisma/client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Input, Pagination, SegmentedControl, Select } from "@mantine/core";
import { CATECORY_MAP, FILTERS, TAKE } from "constants/products";
import { IconSearch } from "@tabler/icons-react";
// import { IconSearch } from "@tabler/icons";
import useDebounce from "hooks/useDebounce";
import { useQuery } from "@tanstack/react-query"; //캐싱관리
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const { data: session } = useSession();

  const [activePage, setPage] = useState(1);
  // const [total, setTotal] = useState(0); useQuery product때문에 주석
  // const [categories, setCategories] = useState<categories[]>([]); useQuery product때문에 주석
  // const [products, setProducts] = useState<products[]>([]); useQuery product때문에 주석
  const [selectCategory, setSelectCategory] = useState<string>("-1");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    FILTERS[0].value
  );
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce<string>(keyword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // useEffect(() => {
  //   fetch(`/api/get-categories`)
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data.items));
  // }, []);
  const { data: categories } = useQuery<
    { items: categories[] },
    unknown,
    categories[]
  >(
    [`/api/get-categories`],
    () => fetch(`/api/get-categories`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  // useEffect(() => {
  //   fetch(
  //     // `/api/get-products-count?category=${selectCategory}&contains=${keyword}` => 매입력마다 불필요한 랜더링 때문에 debounce해줌 밑에도 마찬가지
  //     `/api/get-products-count?category=${selectCategory}&contains=${debouncedKeyword}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setTotal(Math.ceil(data.items / TAKE)));
  // }, [selectCategory, /*keyword */ debouncedKeyword]);

  const { data: total } = useQuery(
    [
      `/api/get-products-count?category=${selectCategory}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products-count?category=${selectCategory}&contains=${debouncedKeyword}`
      )
        .then((res) => res.json())
        // select 안쓰고 then으로
        .then((data) => Math.ceil(data.items / TAKE))
    // {
    //   select: (data) => Math.ceil(data.items / TAKE),
    // }
  );
  // useEffect(() => {
  //   const skip = TAKE * (activePage - 1);
  //   fetch(
  //     `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items));
  // }, [activePage, selectCategory, selectedFilter, debouncedKeyword]);

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [
      `/api/get-products?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&category=${selectCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&category=${selectCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  return (
    <div className=" mt-36 mb-36">
      {session && <p>안녕하세요. {session.user?.name}님</p>}
      <div className="mb-4">
        <Input
          icon={<IconSearch />}
          placeholder="Search"
          value={keyword}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Select
          value={selectedFilter}
          onChange={setSelectedFilter}
          data={FILTERS}
        />
      </div>
      {categories && (
        <div className="mb-4">
          <SegmentedControl
            value={selectCategory}
            onChange={setSelectCategory}
            data={[
              { label: "ALL", value: "-1" },
              ...categories.map((category) => ({
                label: category.name,
                value: String(category.id),
              })),
            ]}
            color="dark"
          />
        </div>
      )}
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item: any) => (
            <div
              key={item.id}
              style={{ maxWidth: 300, cursor: "pointer" }}
              onClick={() => router.push(`/products/${item.id}`)}
            >
              <Image
                className="rounded"
                key={item.id}
                src={item.image_url ?? ""}
                width={300}
                height={200}
                alt={item.name}
              />
              <div className="flex">
                <span>{item.name}</span>
                <span className="ml-auto">
                  {item.price.toLocaleString("ko-KR")}원
                </span>
              </div>
              <span className="text-zinc-500">
                {CATECORY_MAP[item.category_id - 1]}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex mt-6">
        {total && (
          <Pagination
            className="m-auto"
            value={activePage}
            onChange={setPage}
            total={total}
          />
        )}
      </div>
    </div>
  );
}

// /** @jsxImportSource @emotion/react */

// // import Head from "next/head";
// // import Image from "next/image";
// // import { Inter } from 'next/font/google'
// import styles from "../styles/Home.module.css";
// import { useEffect, useRef, useState } from "react";
// import { css } from "@emotion/react";
// import Link from "next/link";
// // const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   // const [products, setProducts] = useState<
//   //   { id: string; properties: { id: string }[] }[]
//   // >([]);
//   const [products, setProducts] = useState<
//     { id: string; name: string; createdAt: string }[]
//   >([]);
//   // useEffect(() => {
//   //   fetch("/api/get-items")
//   //     .then((res) => res.json())
//   //     .then((data) => setProducts(data.items));
//   // }, []);
//   useEffect(() => {
//     fetch("/api/get-products")
//       .then((res) => res.json())
//       .then(
//         (data) => setProducts(data.items)
//         // console.log(data.items)
//       );
//   }, []);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const handleClick = () => {
//     if (inputRef.current === null || inputRef.current.value === "") {
//       alert("name을 입력해주세요.");
//     } else {
//       fetch(`/api/add-item?name=${inputRef.current?.value}`)
//         .then((res) => res.json())
//         .then((data) => alert(data.message));
//     }
//   };

//   return (
//     <>
//       {/* <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head> */}
//       {/* <main className={`${styles.main} ${inter.className}`}> */}
//       <div
//         css={css`
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           margin-top: 30px;
//         `}
//         className={styles.description}
//       >
//         <p>
//           Get started by editing&nbsp;
//           <code className={styles.code}>commerce</code>
//         </p>
//         <input
//           className="placeholder:italic placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
//           placeholder="Search for anything..."
//           type="text"
//           name="search"
//           ref={inputRef}
//         />
//         {/* <button
//           css={css`
//             padding: 12px;
//             background-color: hotpink;
//             font-size: 14px;
//             border-radius: 4px;
//             margin-top: 12px;
//           `}
//           onClick={handleClick}
//         >
//           Add jaket
//         </button> */}
//         <div>
//           <p>Product List</p>
//           {products &&
//             products.map((item) => (
//               <>
//                 <div key={item.id}>{item.name}</div>
//                 <span>{item.createdAt}</span>
//                 <br />
//                 <br />
//               </>
//             ))}

//           {/* {products &&
//             products.map((item) => (
//               <div key={item.id}>
//                 {JSON.stringify(item)}
//                 {item?.properties &&
//                   Object.entries(item.properties).map(([key, value]) => (
//                     <button
//                       key={key}
//                       onClick={() => {
//                         fetch(
//                           `/api/get-detail?pageId=${item.id}&propertyId=${value.id}`
//                         )
//                           .then((res) => res.json())
//                           .then((data) => alert(JSON.stringify(data.detail)));
//                       }}
//                     >
//                       {key}
//                     </button>
//                   ))}
//                 <br />
//                 <br />
//               </div>
//             ))} */}
//         </div>
//         <Link href="/products/page">
//           <button
//             css={css`
//               padding: 12px;
//               background-color: hotpink;
//               font-size: 14px;
//               border-radius: 4px;
//               margin-top: 12px;
//             `}
//           >
//             products
//           </button>
//         </Link>
//       </div>
//       {/* {console.log(products)} */}
//       {/* </main> */}
//       {/* <Image
//         width={300}
//         height={300}
//         alt="img"
//         src="https://as2.ftcdn.net/v2/jpg/05/44/69/13/1000_F_544691377_60BJEfTNlQvKCKADBzeVweCvGI3VOoi8.jpg"
//       ></Image> */}
//     </>
//   );
// }
