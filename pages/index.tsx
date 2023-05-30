import { categories, products } from "@prisma/client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

export default function Home() {
  const router = useRouter();
  // https://www.webtro.co.kr/images/sub/marketing4_top1.png
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <span style={{ fontSize: "120px" }}>Hello</span>\
      <Lay>
        <span style={{ fontSize: "120px" }}>PSC COMMERCE</span>
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0, 0.21, 0.2, 1.01],
          }}
        >
          <img
            src={"https://cdn-icons-png.flaticon.com/512/263/263142.png"}
            alt="img"
            width={400}
            height={300}
            // layout="responsive"
          />
        </motion.div>
      </Lay>
      <div
        className=" mt-16 mb-36"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          ref={divRef}
          className="box"
          // initial={{ opacity: 0.2 }}
          // whileInView={{
          //   opacity: 1,
          //   rotate: [0, 360],
          //   borderRadius: ["20%", "50%"],
          //   transition: { delay: 0.1 },
          // }}
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", stiffness: 400, damping: 30 },
          }}
        >
          <Button
            style={{ background: "black", color: "white", marginRight: "12px" }}
            onClick={() => router.push("/shop")}
          >
            쇼핑{" "}
          </Button>
        </motion.div>
        <motion.div
          ref={divRef}
          className="box"
          // initial={{ opacity: 0.2 }}
          // whileInView={{
          //   opacity: 1,
          //   rotate: [0, 360],
          //   borderRadius: ["20%", "50%"],
          //   transition: { delay: 0.1 },
          // }}
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", stiffness: 400, damping: 30 },
          }}
        >
          <Button
            style={{ background: "black", color: "white" }}
            onClick={() => router.push("/auth/login")}
          >
            로그인
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
const Lay = styled.div`
  display: flex;
  flex-direction: column;
`;
