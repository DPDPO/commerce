import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "constants/googleOauth";
import { useRouter } from "next/router";

export default function Google() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div style={{ display: "flex" }}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            fetch(
              `/api/auth/sign-up?credential=${credentialResponse.credential}`
            )
              .then((res) => res.json())
              .then((data) => console.log(data));
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
