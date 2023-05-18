// import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "constants/googleOauth";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
