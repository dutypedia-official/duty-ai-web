"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isIOS, isAndroid } from "react-device-detect";

const GetApps = () => {
  const router = useRouter();

  useEffect(() => {
    if (isIOS) {
      window.location.href =
        "https://apps.apple.com/us/app/duty-ai/id6476618432?l=en-US";
    } else if (isAndroid) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.easinarafat.dutyai";
    } else {
      router.replace("/");
    }
  }, []);
  return <div className="py-16 text-center">Please wait...</div>;
};

export default GetApps;
