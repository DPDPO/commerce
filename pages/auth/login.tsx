import GoogleLogin from "@/components/GoogleLogin";

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        // width: "100vw",
        height: "50vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GoogleLogin />
    </div>
  );
}
