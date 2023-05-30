// import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "constants/googleOauth";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <div className="px-24">
            <Header />
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}
