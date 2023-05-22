import React, { useEffect, useState } from "react";
import Carousel from "nuka-carousel";
import Image from "next/image";
import CustomEditor from "@/components/Editor";
import { useRouter } from "next/router";
import { EditorState, convertFromRaw } from "draft-js";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { products } from "@prisma/client";
import { format } from "date-fns";
import { CATECORY_MAP } from "constants/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mantine/core";
import {
  IconHeart,
  IconHeartbeat,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { Count } from "@/components/Count";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await fetch(
    `http://localhost:3000/api/get-product?id=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => data.items);
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
    },
  };
}

// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];

const WISHLIST_QUERY = `/api/get-wishlist`;

export default function Products(props: {
  product: products & { images: string[]; category_id: any };
}) {
  const [index, setIndex] = useState(0);
  const { data: session } = useSession();

  const [quantity, setQuantity] = useState<any>();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: productId } = router.query;
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    // undefined
    () =>
      props.product?.contents
        ? EditorState.createWithContent(
            convertFromRaw(JSON.parse(props.product.contents))
          )
        : EditorState.createEmpty()
  );

  // useEffect(() => {
  //   if (productId != null) {
  //     fetch(`/api/get-product?id=${productId}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.items.contents) {
  //           setEditorState(
  //             EditorState.createWithContent(
  //               convertFromRaw(JSON.parse(data.items.contents))
  //             )
  //           );
  //         } else {
  //           setEditorState(EditorState.createEmpty());
  //         }
  //       });
  //   }
  // }, [productId]);

  const product = props.product;
  const { data: wishlist } = useQuery([WISHLIST_QUERY], () =>
    fetch(WISHLIST_QUERY)
      .then((res) => res.json())
      .then((data) => data.items)
  );
  const { mutate, isLoading } = useMutation<unknown, unknown, string, any>(
    (productId) =>
      fetch(`/api/update-wishlist`, {
        method: "POST",
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries({ queryKey: [WISHLIST_QUERY] });

        // Snapshot the previous value
        const previous = queryClient.getQueryData([WISHLIST_QUERY]);

        // Optimistically update to the new value
        queryClient.setQueryData<string[]>([WISHLIST_QUERY], (old) =>
          old
            ? old.includes(String(productId))
              ? old.filter((id) => id !== String(productId))
              : old.concat(String(productId))
            : []
        );

        // Return a context object with the snapshotted value
        return { previous };
      },
      // onError: (error, _, context) => {
      //   queryClient.setQueriesData([WISHLIST_QUERY], context.previous);
      // },
      onSuccess: () => {
        queryClient.invalidateQueries([WISHLIST_QUERY]);
      },
    }
  );
  const isWished =
    wishlist != null && productId != null
      ? wishlist.includes(String(productId))
      : false;

  const validate = (type: "cart" | "order") => {
    if (quantity == null) {
      alert("최소 수량을 입력하세요.");
      return;
    }
    alert("장바구니로 이동");
    //TODO 장바구니에 등록하는 기능 추가
    router.push("/cart");
  };
  return (
    <>
      {product != null && productId != null ? (
        <div className=" flex flex-row justify-center">
          <div style={{ maxWidth: 600, marginRight: 52 }}>
            <Carousel
              animation="zoom"
              withoutControls
              autoplay
              wrapAround
              slideIndex={index}
            >
              {product?.images.map((url, idx) => (
                <Image
                  key={`${url}-carousel-${idx}`}
                  src={url}
                  alt="img"
                  width={600}
                  height={600}
                  // layout="responsive"
                />
              ))}
            </Carousel>
            <div className="flex justify-center space-x-4">
              {product?.images.map((url, idx) => (
                <div key={`${url}-thub-${idx}`} onClick={() => setIndex(idx)}>
                  <Image src={url} alt="image" width={100} height={60} />
                </div>
              ))}
            </div>
            {editorState != null && (
              <CustomEditor editorState={editorState} readOnly />
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <div className="text-lg text-zinc-600">
              <span style={{ color: "grey" }}> Category : </span>
              {CATECORY_MAP[product.category_id - 1]}
            </div>
            <div className="text-lg text-zinc-600">{product.name}</div>
            <div className="text-lg text-zinc-600">
              {product.price.toLocaleString("ko-kr")}원
            </div>
            <div className="text-lg text-zinc-400">
              등록일자 :{" "}
              {format(new Date(product.createdAt), "yyyy년 M월 d 일")}
            </div>
            <Button
              // loading={isLoading}
              // disabled={wishlist == null}
              leftIcon={isWished ? <IconHeart /> : <IconHeartbeat />}
              style={{
                marginTop: 12,
                backgroundColor: isWished ? "red" : "grey",
              }}
              radius="xl"
              onClick={() => {
                if (session == null) {
                  alert("로그인이 필요합니다.");
                } else {
                  mutate(String(productId));
                }
              }}
            >
              찜하기
            </Button>
            <Button
              // loading={isLoading}
              // disabled={wishlist == null}
              leftIcon={<IconShoppingCart />}
              style={{
                marginTop: 12,
                backgroundColor: "black",
              }}
              radius="xl"
              onClick={() => {
                if (session == null) {
                  alert("로그인이 필요합니다.");
                } else {
                  validate("cart");
                }
              }}
            >
              장바구니
            </Button>
            <div>
              <span className="text-lg">수량</span>
              <Count value={quantity} setValue={setQuantity} max={200} />
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
