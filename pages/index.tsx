import { useRef } from "react";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useSession, signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);

  const routeHandler = () => {
    setTimeout(() => {
      router.push("/shop");
    });
  };
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <span>이동중입니다.</span>
          {routeHandler()}
        </>
      ) : (
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 35 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0, 0.21, 0.2, 1.01],
            }}
          >
            <span style={{ fontSize: "80px" }}>Hello</span>
          </motion.div>
          <Lay>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 35 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0, 0.21, 0.2, 1.01],
              }}
            >
              <span style={{ fontSize: "80px" }}>PSC COMMERCE</span>
            </motion.div>
            <motion.div
              className="box"
              initial={{ opacity: 0, x: -100 }}
              animate={{ x: 30, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: [0, 0.21, 0.2, 1.01],
              }}
            >
              <img
                src={"https://cdn-icons-png.flaticon.com/512/263/263142.png"}
                alt="img"
                width={300}
                height={200}
                style={{ marginTop: "20px" }}
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
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                // rotate: [0, 360],
                borderRadius: ["20%", "50%"],
                transition: { delay: 1.8 },
              }}
              whileHover={{
                scale: 1.2,
                transition: { type: "spring", stiffness: 400, damping: 30 },
              }}
            >
              <Button
                style={{
                  background: "black",
                  color: "white",
                  marginRight: "12px",
                  width: "120px",
                }}
                onClick={() => router.push("/shop")}
              >
                쇼핑
              </Button>
            </motion.div>
            <motion.div
              ref={divRef}
              className="box"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                // rotate: [0, 360],
                borderRadius: ["20%", "50%"],
                transition: { delay: 1.8 },
              }}
              whileHover={{
                scale: 1.2,
                transition: { type: "spring", stiffness: 400, damping: 30 },
              }}
            >
              <Button
                style={{ background: "black", color: "white", width: "120px" }}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                로그인
              </Button>
            </motion.div>
          </div>
        </div>
      )}
      {/* <div>
        <span style={{ fontSize: "120px" }}>Hello</span>
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
              style={{
                background: "black",
                color: "white",
                marginRight: "12px",
                width: "120px",
              }}
              onClick={() => router.push("/shop")}
            >
              쇼핑
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
              style={{ background: "black", color: "white", width: "120px" }}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              로그인
            </Button>
          </motion.div>
        </div>
      </div> */}
    </>
  );
}
const Lay = styled.div`
  display: flex;
  flex-direction: column;
  .im {
    transform: scaleX(-1);
  }
`;
