/* eslint-disable react-hooks/rules-of-hooks */
import { Count } from "@/components/Count";
import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { Cart, OrderItem, products } from "@prisma/client";
import { IconRefresh, IconX } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CATECORY_MAP } from "constants/products";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { ORDER_QUERY_KEY } from "./my";

interface CartItem extends Cart {
  name: string;
  price: number;
  Image_url: string;
}

export const CART_QUERY_KEY = `/api/get-cart`;

export default function CartPage() {
  const { data } = useQuery<{ items: CartItem[] }, unknown, CartItem[]>(
    [CART_QUERY_KEY],
    () =>
      fetch(CART_QUERY_KEY)
        .then((res) => res.json())
        .then((data) => data.items)
  );
  const router = useRouter();
  const dilveryAcount = data && data.length > 0 ? 5000 : 0;
  const discountDily = 0;
  const queryClient = useQueryClient();

  const amount = useMemo(() => {
    if (data == null) {
      return 0;
    }
    return data.map((item) => item.amount).reduce((pre, cur) => pre + cur, 0);
  }, [data]);

  const { mutate: addOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItem, "id">[],
    any
  >(
    (items) =>
      fetch(`/api/add-order`, {
        method: "POST",
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
      onSuccess: () => {
        router.push("/my");
      },
    }
  );

  const handleOrder = () => {
    if (data == null) {
      return;
    }
    addOrder(
      data.map((cart) => ({
        productId: cart.productId,
        price: cart.price,
        amount: cart.amount,
        quantity: cart.quantity,
      }))
    );
  };

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
      <span className="text-2xl mb-3">Cart ({data ? data.length : 0}) </span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {data ? (
            data?.length > 0 ? (
              data.map((item, idx) => <Item key={idx} {...item} />)
            ) : (
              <div>장바구니에 아무것도 없습니다.</div>
            )
          ) : (
            <div>불러오는 중 입니다...</div>
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
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    await deleteCart(props.id);
  };

  const handleUpdate = () => {
    updateCart({
      ...props,
      quantity: quantity,
      amount: props.price * quantity,
    });
  };

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price);
    }
  }, [quantity, props.price]);

  const { mutate: updateCart } = useMutation<unknown, unknown, Cart, any>(
    (item) =>
      fetch(`/api/update-cart`, {
        method: "POST",
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries({ queryKey: [CART_QUERY_KEY] });

        // Snapshot the previous value
        const previous = queryClient.getQueryData([CART_QUERY_KEY]);

        // Optimistically update to the new value
        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== item.id).concat(item)
        );

        // Return a context object with the snapshotted value
        return { previous };
      },
      // onError: (error, _, context) => {
      //   queryClient.setQueriesData([WISHLIST_QUERY], context.previous);
      // },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
    }
  );

  const { mutate: deleteCart } = useMutation<unknown, unknown, number, any>(
    (id) =>
      fetch(`/api/delete-cart`, {
        method: "POST",
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: [CART_QUERY_KEY] });

        // Snapshot the previous value
        const previous = queryClient.getQueryData([CART_QUERY_KEY]);

        // Optimistically update to the new value
        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== id)
        );

        // Return a context object with the snapshotted value
        return { previous };
      },
      // onError: (error, _, context) => {
      //   queryClient.setQueriesData([WISHLIST_QUERY], context.previous);
      // },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
    }
  );
  return (
    <div className="w-full flex p-4" style={{ borderBottom: "1px solid grey" }}>
      {props.Image_url && (
        <Image
          src={props.Image_url}
          width={155}
          height={195}
          alt={props.name}
          onClick={() => router.push(`/products/${props.productId}`)}
        />
      )}

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
