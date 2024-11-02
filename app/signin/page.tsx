"use client";
import { useSignIn, SignIn } from "@clerk/nextjs";

const SigniPage = () => {
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

  if (!isLoaded) {
    return null;
  }
  //   return <SignIn />;
  return (
    <div className="relative bg-gradient-to-br from-sky-50 to-gray-200 min-h-screen max-h-screen overflow-y-auto flex items-center justify-center">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4 flex flex-col justify-center items-center text-center">
                <img
                  src="/logo.png"
                  loading="lazy"
                  className="w-16"
                  alt="logo"
                />
                <h2 className="mb-8 text-2xl text-cyan-900">
                  Sign in to unlock the <br /> best of{" "}
                  <span className="font-bold">Duty AI</span>.
                </h2>
              </div>
              <div className="mt-16 grid space-y-4">
                <button
                  onClick={() => handleSignIn("oauth_google")}
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                  <div className="relative flex items-center space-x-4 justify-center">
                    <img
                      src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                      className="absolute left-0 w-5"
                      alt="google logo"
                    />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Google
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => handleSignIn("oauth_apple")}
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                  <div className="relative flex items-center space-x-4 justify-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                      className="absolute left-0 w-5"
                      alt="Facebook logo"
                    />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Apple
                    </span>
                  </div>
                </button>
                {/* <button
                  onClick={() => handleSignIn("oauth_facebook")}
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                      className="absolute left-0 w-5"
                      alt="Facebook logo"
                    />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Continue with Facebook
                    </span>
                  </div>
                </button> */}

                <div className="flex gap-4 py-8 pb-12 justify-center">
                  <a
                    href="https://apps.apple.com/us/app/duty-ai/id6476618432?l=en-US"
                    target="_blank">
                    <img src="/apple.svg" />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.easinarafat.dutyai"
                    target="_blank">
                    <img src="/play.svg" />
                  </a>
                </div>
              </div>

              <div className="space-y-4 text-gray-600 text-center sm:-mb-8">
                <p className="text-xs">
                  By proceeding, you agree to our{" "}
                  <a
                    href="https://www.dutyai.app/legal/terms-and-conditions"
                    target="_blank"
                    className="underline">
                    Terms of Use
                  </a>{" "}
                  and confirm you have read our{" "}
                  <a
                    href="https://www.dutyai.app/legal/privacy-policy"
                    target="_blank"
                    className="underline">
                    Privacy and Cookie Statement
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigniPage;
