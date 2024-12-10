import Image from "next/image";
import { Button } from "../ui/button";
import { btnStyle } from "./login";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

export const GoogleBtn = () => {
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();

  const handleSignIn = async (
    provider: "oauth_google" | "oauth_apple" | "oauth_facebook"
  ) => {
    if (!isLoaded) {
      return;
    }
    try {
      const res = await signIn.create({
        strategy: provider,
        redirectUrl: "/",
      });

      console.log(res);
      const redirectUrl =
        res.firstFactorVerification.externalVerificationRedirectURL?.href;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={() => handleSignIn("oauth_google")}
      style={{
        background:
          "linear-gradient(279.01deg, #4285F4 36.31%, #34A853 63.69%)",
      }}
      className={btnStyle}>
      <div className="mr-2 w-6 h-6">
        <Image src={`/google.svg`} alt="apple" width={50} height={50} />
      </div>
      Login with Google
    </Button>
  );
};
