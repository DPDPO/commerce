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
            <IconHome2 onClick={() => router.push("/shop")} />
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
                  className="mr-4"
                  onClick={() => router.push("/wishlist")}
                />
                <IconShoppingCart
                  className="mr-4"
                  onClick={() => router.push("/cart")}
                />
                <IconUserCircle
                  // className="mr-12"
                  onClick={() => router.push("/my")}
                />
              </>
            ) : (
              <IconUser
                // className="mr-12"
                onClick={() => router.push("/auth/login")}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
