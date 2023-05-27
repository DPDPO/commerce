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
  const scrollToBottom = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const variants = {
    start: { pathLength: 0, fill: "rgba(255, 255, 255,0)" },
    end: { pathLength: 1, fill: "#000000" },
  };
  return (
    <div>
      <motion.div
        className="box"
        animate={{ scale: [1, 1.5, 1.1] }}
        transition={{ duration: 3, times: [0, 0.2, 1] }}
      >
        Hello.
      </motion.div>
      <Lay>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
          <motion.path
            variants={variants}
            initial="start"
            animate="end"
            transition={{
              default: { duration: 1.8 },
              fill: { duration: 1, delay: 1.1 },
            }}
            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
          />
        </svg>
      </Lay>
      <img
        src={"https://www.webtro.co.kr/images/sub/marketing4_top1.png"}
        alt="img"
        width={400}
        height={600}
        // layout="responsive"
      />

      <img
        src={"https://cdn-icons-png.flaticon.com/512/263/263142.png"}
        alt="img"
        width={400}
        height={400}
        // layout="responsive"
      />
      <div
        className=" mt-36 mb-36"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          ref={divRef}
          className="box"
          initial={{ opacity: 0.2 }}
          whileInView={{
            opacity: 1,
            rotate: [0, 360],
            borderRadius: ["20%", "50%"],
            transition: { delay: 0.1 },
          }}
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
  width: 50vmin;
  margin-top: 15vmin;
`;
