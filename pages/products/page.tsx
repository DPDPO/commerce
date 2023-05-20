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

export default function Products() {
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
    <div className="px-36 mt-36 mb-36">
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
          {products.map((item) => (
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
