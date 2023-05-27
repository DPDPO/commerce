/* eslint-disable react-hooks/rules-of-hooks */
import { Count } from "@/components/Count";
import styled from "@emotion/styled";
import { Badge, Button } from "@mantine/core";
import { Cart, OrderItem, Orders } from "@prisma/client";
import { IconRefresh, IconX } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

interface OrderItemDetail extends OrderItem {
  name: string;
  image_url: string;
}

interface OrderDetail extends Orders {
  orderItems: OrderItemDetail[];
}

const ORDER_STATUS_MAP = [
  "주문취소",
  "주문대기",
  "결제대기",
  "결제완료",
  "배송대기",
  "배송중",
  "환불대기",
  "환불완료",
  "반품대기",
  "반품완료",
];
export const ORDER_QUERY_KEY = `/api/get-order`;

export default function MyPage() {
  const { data } = useQuery<{ items: OrderDetail[] }, unknown, OrderDetail[]>(
    [ORDER_QUERY_KEY],
    () =>
      fetch(ORDER_QUERY_KEY)
        .then((res) => res.json())
        .then((data) => data.items)
  );

  return (
    <div>
      <span className="text-2xl mb-3">
        주문내역 ({data ? data.length : 0}){" "}
      </span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {data ? (
            data?.length > 0 ? (
              data.map((item, idx) => (
                <>
                  <DetailItem {...item} key={idx} />
                </>
              ))
            ) : (
              <div>주문내역이 아무것도 없습니다.</div>
            )
          ) : (
            <div>불러오는 중 입니다...</div>
          )}
        </div>
      </div>
    </div>
  );
}
const DetailItem = (props: OrderDetail) => {
  const queryClient = useQueryClient();
  // const [sta, setSta] = useState<number>(props.status);
  console.log(props.status);

  const { mutate: updateOrderStatus } = useMutation<
    unknown,
    unknown,
    number,
    any
  >(
    (status) =>
      fetch(`/api/update-order-status`, {
        method: "POST",
        body: JSON.stringify({
          id: props.id,
          status: status,
          userId: props.userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (status) => {
        await queryClient.cancelQueries({ queryKey: [ORDER_QUERY_KEY] });

        // Snapshot the previous value
        const previous = queryClient.getQueryData([ORDER_QUERY_KEY]);

        // Optimistically update to the new value
        queryClient.setQueryData<Cart[]>([ORDER_QUERY_KEY], (old) =>
          old?.map((c) => {
            if (c.id !== props.id) {
              return { ...c, status: status };
            }
            return c;
          })
        );

        // Return a context object with the snapshotted value
        return { previous };
      },
      // onError: (error, _, context) => {
      //   queryClient.setQueriesData([WISHLIST_QUERY], context.previous);
      // },
      onSuccess: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
    }
  );
  const handlePayment = () => {
    // 주문상태를 5로 바꿈

    updateOrderStatus(5);
  };
  const handleCancel = () => {
    // 주문상태를 0로 바꿈
    updateOrderStatus(-1);
  };

  return (
    <div
      className="w-full flex flex-col p-4 rounded-md"
      style={{ border: "1px solid grey" }}
    >
      <div className="flex">
        {props.status === undefined ? (
          <Badge size="lg" color="red">
            주문대기
          </Badge>
        ) : (
          <Badge size="lg">{ORDER_STATUS_MAP[props.status + 1]}</Badge>
        )}
        {/* <Badge size="lg">{ORDER_STATUS_MAP[props.status + 1]}</Badge> */}
        <IconX onClick={handleCancel} className="ml-auto" />
      </div>

      {props.orderItems.map((orderItem, idx) => (
        <Item key={idx} {...orderItem} />
      ))}
      <div className="flex mt-4">
        <div className="flex flex-col">
          <span style={{ fontWeight: "bold", marginBottom: "8px" }}>
            주문 정보
          </span>
          <span>
            받는사람:{" "}
            {props.receiver ?? <span style={{ color: "red" }}>입력필요</span>}
          </span>
          <span>
            주소:{" "}
            {props.address ?? <span style={{ color: "red" }}>입력필요</span>}
          </span>
          <span>
            연락처:{" "}
            {props.phoneNumber ?? (
              <span style={{ color: "red" }}>입력필요</span>
            )}
          </span>
        </div>
        {/* <>{console.log(props)}</> */}
        <div className="flex flex-col ml-auto mr-4 text-right">
          <span style={{ fontWeight: "bold" }}>
            합계금액:{" "}
            <span style={{ color: "red" }}>
              {props.orderItems
                .map((item) => item.amount)
                .reduce((prev, curr) => prev + curr, 0)
                .toLocaleString("ko-kr")}{" "}
              원
            </span>
          </span>
          <span className="text-zinc-400 mt-auto mb-auto">
            주문일자:{" "}
            {props.createdAt === undefined
              ? "23년 05월 29일 15:39"
              : format(new Date(props.createdAt), "yy년 MM월 DD일 HH:mm")}
            {/* {format(new Date(props.createdAt), "yy년 MM월 DD일 HH:mm")} */}
          </span>
          <Button
            onClick={handlePayment}
            style={{ backgroundColor: "black", color: "white" }}
          >
            결제 처리
          </Button>
        </div>
      </div>
    </div>
  );
};

const Item = (props: OrderItemDetail) => {
  const [quantity, setQuantity] = useState<number | any>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);
  const router = useRouter();
  // console.log(props);

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price);
    }
  }, [quantity, props.price]);

  return (
    <div className="w-full flex p-4" style={{ borderBottom: "1px solid grey" }}>
      {props.image_url && (
        <Image
          src={props.image_url}
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
          {/* <Count value={quantity} setValue={setQuantity} max={20} /> */}
          수량 : {quantity}
        </div>
      </div>
      <div className="flex ml-auto space-x-4">
        <span>{amount.toLocaleString("ko-kr")} 원</span>
      </div>
    </div>
  );
};
