import { Count } from "@/components/Count";
import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { products } from "@prisma/client";
import { IconRefresh, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { CATECORY_MAP } from "constants/products";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

interface CartItem {
  name: string;
  productId: number;
  price: number;
  quantity: number;
  amount: number;
  Image_url: string;
}

export default function cart() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState<CartItem[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const amount = useMemo(() => {
    return data.map((item) => item.amount).reduce((pre, cur) => pre + cur, 0);
  }, [data]);
  const dilveryAcount = 5000;
  const discountDily = 0;
  const handleOrder = () => {
    alert("주문하기");
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const mockData = [
      {
        name: "멋있는 신발",
        productId: 5,
        price: 20000,
        quantity: 2,
        amount: 40000,
        Image_url: ` https://t4.ftcdn.net/jpg/04/32/39/97/240_F_432399766_IO6Ng1sGStdQrU77TeqrZU9Hllm8x4q6.jpg`,
      },
      {
        name: "느낌있는 후드",
        productId: 5,
        price: 30240,
        quantity: 1,
        amount: 30240,
        Image_url: ` https://t4.ftcdn.net/jpg/04/32/39/97/240_F_432399766_IO6Ng1sGStdQrU77TeqrZU9Hllm8x4q6.jpg`,
      },
    ];
    setData(mockData);
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [`/api/get-products?skip=0&take=3`],
    () => fetch(`/api/get-products?skip=0&take=3`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );
  return (
    <div>
      <span className="text-2xl mb-3">cart {data.length}</span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {data?.length > 0 ? (
            data.map((item, idx) => <Item key={idx} {...item} />)
          ) : (
            <div>장바구니에 아무것도 없습니다.</div>
          )}
        </div>
        <div className="px-4">
          <div
            className="flex flex-col p-4 space-y-4"
            style={{ minWidth: 300, border: "1px solid grey" }}
          >
            <div>info</div>
            <Row>
              <span>금액</span>
              <span>{amount.toLocaleString("ko-kr")}원</span>
            </Row>
            <Row>
              <span>배송비</span>
              <span>{dilveryAcount.toLocaleString("ko-kr")}원</span>
            </Row>
            <Row>
              <span>할인금액</span>
              <span>0원</span>
            </Row>
            <Row>
              <span className="font-semibold">결제금액</span>
              <span className="font-semibold text-red-600">
                {(amount + dilveryAcount).toLocaleString("ko-kr")} 원
              </span>
            </Row>
            <Button
              // loading={isLoading}
              // disabled={wishlist == null}
              style={{
                marginTop: 12,
                backgroundColor: "black",
              }}
              radius="xl"
              onClick={handleOrder}
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <p>추천상품</p>
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
      </div>
    </div>
  );
}
const Item = (props: CartItem) => {
  const [quantity, setQuantity] = useState<number | any>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);
  const router = useRouter();
  const handleDelete = () => {
    alert("장바구니에서 삭제");
  };

  const handleUpdate = () => {
    alert("장바구니에서 업데이트");
  };

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price);
    }
  }, [quantity, props.price]);
  return (
    <div className="w-full flex p-4" style={{ borderBottom: "1px solid grey" }}>
      <Image
        src={props.Image_url}
        width={155}
        height={195}
        alt={props.name}
        onClick={() => router.push(`/products/${props.productId}`)}
      />
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{props.name}</span>
        <span className="mb-auto">
          가격: {props.price.toLocaleString("ko-kr")} 원
        </span>
        <div className="flex items-center space-x-4">
          <Count value={quantity} setValue={setQuantity} max={20} />
          <IconRefresh onClick={handleUpdate} />
        </div>
      </div>
      <div className="flex ml-auto space-x-4">
        <span>{amount.toLocaleString("ko-kr")} 원</span>
        <IconX onClick={handleDelete} />
      </div>
    </div>
  );
};

const Row = styled.div`
  display: flex;
  * ~ * {
    margin-left: auto;
  }
`;
