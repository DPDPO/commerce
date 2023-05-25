import { categories, products } from "@prisma/client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  Pagination,
  SegmentedControl,
  Select,
} from "@mantine/core";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className=" mt-36 mb-36"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        style={{ background: "black", color: "white", marginRight: "12px" }}
        onClick={() => router.push("/shop")}
      >
        쇼핑{" "}
      </Button>
      <Button
        style={{ background: "black", color: "white" }}
        onClick={() => router.push("/auth/login")}
      >
        로그인
      </Button>
    </div>
  );
}
