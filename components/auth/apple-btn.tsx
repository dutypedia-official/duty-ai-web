import Image from "next/image";
import { Button } from "../ui/button";
import { btnStyle } from "./login";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
}

export const AppleBtn = () => {
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
      onClick={() => handleSignIn("oauth_apple")}
      style={{
        background:
          "linear-gradient(279.01deg, #2E2E2E 36.31%, #000000 63.69%)",
      }}
      className={btnStyle}>
      <div className="mr-2 w-6 h-6">
        <Image src={`/apple-icon.svg`} alt="apple" width={50} height={50} />
      </div>
      Login with Apple
    </Button>
  );
};
