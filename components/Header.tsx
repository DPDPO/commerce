import styled from "@emotion/styled";
import {
  IconHeart,
  IconHome2,
  IconList,
  IconLogin,
  IconLogout,
  IconShoppingCart,
  IconUserCircle,
} from "@tabler/icons-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {router.pathname === "/" ? undefined : (
        <div className="mt-12 mb-10">
          <div className="w-full flex items-center" style={{ height: "80px" }}>
            <List>
              <IconList
                style={{ cursor: "pointer" }}
                size={40}
                onClick={() => router.push("/shop")}
              />
              <span className="list">상품 목록</span>
            </List>

            <span className="m-auto" />
            {session ? (
              <>
                <Heart>
                  <IconHeart
                    size={36}
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/wishlist")}
                  />
                  <span className="heart">찜 목록</span>
                </Heart>
                <Cart>
                  <IconShoppingCart
                    size={36}
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/cart")}
                  />
                  <span className="cart">장바구니</span>
                </Cart>
                <My>
                  <IconUserCircle
                    size={36}
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/my")}
                  />
                  <span className="my">마이 페이지</span>
                </My>
                {/* <Button
                  style={{
                    marginLeft: "16px",
                    background: "black",
                    color: "white",
                  }}
                  onClick={() => {
                    // e.preventDefault();
                    signOut();
                  }}
                >
                  로그아웃
                </Button> */}
                <Logout>
                  <IconLogout // className="mr-12"
                    size={36}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  />
                  <span className="logout">로그아웃</span>
                </Logout>
              </>
            ) : (
              <Login>
                <IconLogin
                  size={36}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                />
                <span className="login">로그인</span>
              </Login>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const Logout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 58px;
  &:hover > .logout {
    color: black;
  }
  .logout {
    color: white;
    font-size: 12px;
  }
`;
const My = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 58px;
  &:hover > .my {
    color: black;
  }
  .my {
    color: white;
    font-size: 12px;
  }
`;

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 58px;
  &:hover > .cart {
    color: black;
  }
  .cart {
    color: white;
    font-size: 12px;
  }
`;

const Heart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 58px;
  &:hover > .heart {
    color: black;
  }
  .heart {
    color: white;
    font-size: 12px;
  }
`;
const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 58px;
  &:hover > .login {
    color: black;
  }
  .login {
    color: white;
    font-size: 12px;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 58px;
  &:hover > .list {
    color: black;
  }
  .list {
    color: white;
    font-size: 12px;
  }
`;
