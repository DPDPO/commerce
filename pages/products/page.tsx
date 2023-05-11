import { products } from "@prisma/client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Pagination } from "@mantine/core";

const TAKE = 9;

export default function Products() {
  const [activePage, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<products[]>([]);
  useEffect(() => {
    fetch(`/api/get-products-count`)
      .then((res) => res.json())
      .then((data) => setTotal(Math.ceil(data.items / TAKE)));
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);

  useEffect(() => {
    const skip = TAKE * (activePage - 1);
    fetch(`/api/get-products?skip=${skip}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, [activePage]);

  return (
    <div className="px-36 mt-36 mb-36">
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => (
            <div key={item.id}>
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
                <span className="ml-8">
                  {item.price.toLocaleString("ko-KR")}원
                </span>
              </div>
              <span className="text-zinc-500">
                {item.category_id === 1 && "의류"}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex mt-6">
        <Pagination
          className="m-auto"
          value={activePage}
          onChange={setPage}
          total={total}
        />
      </div>
    </div>
  );
}