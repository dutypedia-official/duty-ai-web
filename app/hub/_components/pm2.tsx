"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Pm2 = () => {
  const [loading, setLoading] = useState("");
  const restart = async (path: string) => {
    try {
      setLoading(path);
      const res = await fetch(`/api/restart/${path}`, { method: "POST" });
      const data = await res.json();
      console.log(data);
      alert("Restarted successfully!");
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading("");
    }
  };
  return (
    <div className="flex gap-8 justify-center flex-wrap">
      <Button disabled={loading == "market"} onClick={() => restart("market")}>
        {loading == "market" && (
          <Loader2 className="animate-spin size-4 mr-1" />
        )}
        Restart Market
      </Button>
      <Button
        disabled={loading == "market-data"}
        onClick={() => restart("market-data")}
        className="bg-amber-500">
        {loading == "market-data" && (
          <Loader2 className="animate-spin size-4 mr-1" />
        )}
        Restart Data
      </Button>
      <Button
        disabled={loading == "market-category"}
        className="bg-emerald-500"
        onClick={() => restart("market-category")}>
        {loading == "market-category" && (
          <Loader2 className="animate-spin size-4 mr-1" />
        )}
        Restart Category
      </Button>
      <Button
        disabled={loading == "ind"}
        className="bg-sky-500"
        onClick={() => restart("ind")}
        variant="destructive">
        {loading == "ind" && <Loader2 className="animate-spin size-4 mr-1" />}
        Restart Index
      </Button>
      <Button
        disabled={loading == "all"}
        className="bg-rose-500"
        onClick={() => restart("all")}
        variant="destructive">
        {loading == "all" && <Loader2 className="animate-spin size-4 mr-1" />}
        Restart All
      </Button>
      <Button
        disabled={loading == "transfer"}
        className="bg-fuchsia-500"
        onClick={() => restart("transfer")}>
        {loading == "transfer" && (
          <Loader2 className="animate-spin size-4 mr-1" />
        )}
        Transfer Database
      </Button>
      <Button
        disabled={loading == "tv-all"}
        className="bg-indigo-500"
        onClick={() => restart("tv-all")}>
        {loading == "tv-all" && (
          <Loader2 className="animate-spin size-4 mr-1" />
        )}
        TV All Stock
      </Button>
      <Button
        disabled={loading == "tv-mover"}
        className="bg-indigo-500"
        onClick={() => restart("tv-mover")}>
        {loading == "tv-mover" && (
          <Loader2 className="animate-spin size-4 mr-1" />
        )}
        TV Market Mover
      </Button>
      <Button
        disabled={loading == "tv-index"}
        className="bg-indigo-500"
        onClick={() => restart("tv-index")}>
        {loading == "tv-index" && (
          <Loader2 className="animate-spin size-4 mr-1" />
        )}
        TV Index
      </Button>
      <Button
        disabled={loading == "tv-sectors"}
        className="bg-indigo-500"
        onClick={() => restart("tv-sectors")}>
        {loading == "tv-sectors" && (
          <Loader2 className="animate-spin size-4 mr-1" />
        )}
        TV Sectors
      </Button>
    </div>
  );
};

export default Pm2;
