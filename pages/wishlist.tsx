import { products } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CATECORY_MAP } from "constants/products";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Wishlist() {
  const router = useRouter();
  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >([`/api/get-wishlists`], () =>
    axios(`/api/get-wishlists`).then((res) => res.data.items)
  );
  return (
    <div>
      <p className="text-2xl mb-4">내가 찜한 상품</p>
      {products ? (
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
      ) : (
        "Loading..."
      )}
    </div>
  );
}
