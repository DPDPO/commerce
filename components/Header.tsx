import { Button } from "@mantine/core";
import {
  IconHeart,
  IconHome2,
  IconShoppingCart,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {router.pathname === "/" ? undefined : (
        <div className="mt-12 mb-12">
          <div className="w-full flex h-50 items-center">
            <IconHome2 size={36} onClick={() => router.push("/shop")} />
            <span className="m-auto" />
            {session ? (
              <>
                {/* <image
                // alt="user"
                // src={session.user?.image}
                width={30}
                height={30}
                style={{ borderRadius: "50%" }}
            /> */}
                <IconHeart
                  size={36}
                  className="mr-4"
                  onClick={() => router.push("/wishlist")}
                />
                <IconShoppingCart
                  size={36}
                  className="mr-4"
                  onClick={() => router.push("/cart")}
                />
                <IconUserCircle
                  // className="mr-12"
                  size={36}
                  onClick={() => router.push("/my")}
                />
              </>
            ) : (
              <Button
                style={{ background: "black", color: "white" }}
                onClick={() => router.push("/auth/login")}
              >
                로그인
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
