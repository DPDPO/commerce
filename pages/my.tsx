/* eslint-disable react-hooks/rules-of-hooks */
import { Badge, Button } from "@mantine/core";
import { Cart, OrderItem, Orders } from "@prisma/client";
import { IconX } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CART_QUERY_KEY } from "./cart";
import axios from "axios";

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
    () => axios(ORDER_QUERY_KEY).then((res) => res.data.items)
  );

  return (
    <div>
      <div className="text-2xl ml-4 mb-3">
        주문내역 ({data ? data.length : 0}){" "}
      </div>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {data ? (
            data?.length > 0 ? (
              data.map((item, idx) => (
                <>
                  <DetailItem item={item} key={idx} />
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
const DetailItem = ({ item }: { item: OrderDetail }) => {
  const queryClient = useQueryClient();
  // const [sta, setSta] = useState<number>(props.status);
  console.log(item.status);

  const { mutate: updateOrderStatus } = useMutation<
    unknown,
    unknown,
    number,
    any
  >(
    (status) =>
      axios
        .post(`/api/update-order-status`, {
          id: item.id,
          status: item.status,
          userId: item.userId,
        })
        .then((data) => data.data.items),
    {
      onMutate: async (status) => {
        await queryClient.cancelQueries({ queryKey: [ORDER_QUERY_KEY] });

        // Snapshot the previous value
        const previous = queryClient.getQueryData([ORDER_QUERY_KEY]);

        // Optimistically update to the new value
        queryClient.setQueryData<Cart[]>([ORDER_QUERY_KEY], (old) =>
          old?.map((c) => {
            if (c.id !== item.id) {
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
    alert("준비중인 기능입니다.");
  };

  const { mutate: deleteOrderItem } = useMutation(
    () => axios(`/api/delete-my/${item.id}`, { method: "DELETE" }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
    }
  );

  const handleCancel = async () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      try {
        await deleteOrderItem();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };
  return (
    <div
      className="w-full flex flex-col p-4 rounded-md"
      style={{ border: "1px solid grey" }}
    >
      <div className="flex">
        {item.status === undefined ? (
          <Badge size="lg">주문 대기</Badge>
        ) : (
          <Badge size="lg">{ORDER_STATUS_MAP[item.status + 1]}</Badge>
        )}

        <IconX onClick={handleCancel} className="ml-auto" />
      </div>

      {item.orderItems.map((orderItem, idx) => (
        <Item key={idx} {...orderItem} />
      ))}
      <div className="flex mt-4">
        <div className="flex flex-col">
          <span style={{ fontWeight: "bold", marginBottom: "8px" }}>
            주문 정보
          </span>
          <span>
            받는사람:{" "}
            {item.receiver ?? <span style={{ color: "red" }}>입력필요</span>}
          </span>
          <span>
            주소:{" "}
            {item.address ?? <span style={{ color: "red" }}>입력필요</span>}
          </span>
          <span>
            연락처: <span style={{ color: "red" }}>입력필요</span>
          </span>
        </div>
        {/* <>{console.log(props)}</> */}
        <div className="flex flex-col ml-auto mr-4 text-right">
          <span style={{ fontWeight: "bold" }}>
            합계금액:{" "}
            <span style={{ color: "red" }}>
              {item.orderItems
                .map((item) => item.amount)
                .reduce((prev, curr) => prev + curr, 0)
                .toLocaleString("ko-kr")}{" "}
              원
            </span>
          </span>
          <span className="text-zinc-400 mt-auto mb-auto">
            주문일자:{" "}
            {item.createdAt
              ? format(new Date(item.createdAt), "yy년 MM월 DD일 HH:mm")
              : "오늘"}
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
