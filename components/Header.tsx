import {
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
    <div className="mt-12 mb-12">
      <div className="w-full flex h-50 items-center">
        <IconHome2 className="ml-12" onClick={() => router.push("/")} />
        <span className="m-auto" />
        <IconShoppingCart
          className="mr-4"
          onClick={() => router.push("/cart")}
        />
        {session ? (
          //   <image
          //     // alt="user"
          //     // src={session.user?.image}
          //     width={30}
          //     height={30}
          //     style={{ borderRadius: "50%" }}
          //   />
          <IconUserCircle
            className="mr-12"
            onClick={() => router.push("/my")}
          />
        ) : (
          <IconUser
            className="mr-12"
            onClick={() => router.push("/auth/login")}
          />
        )}
      </div>
    </div>
  );
}
