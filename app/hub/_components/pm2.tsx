"use client";

import { Button } from "@/components/ui/button";

const Pm2 = () => {
  const restart = async (path: string) => {
    try {
      const res = await fetch(`/api/restart/${path}`, { method: "POST" });
      const data = await res.json();
      console.log(data);
      alert("Restarted successfully!");
    } catch (error) {
      alert("Something went wrong!");
    }
  };
  return (
    <div className="flex gap-8 justify-center flex-wrap">
      <Button onClick={() => restart("market")}>Restart Market</Button>
      <Button onClick={() => restart("market-data")} className="bg-amber-500">
        Restart Data
      </Button>
      <Button
        className="bg-emerald-500"
        onClick={() => restart("market-category")}
      >
        Restart Category
      </Button>
      <Button
        className="bg-sky-500"
        onClick={() => restart("ind")}
        variant="destructive"
      >
        Restart Index
      </Button>
      <Button
        className="bg-rose-500"
        onClick={() => restart("all")}
        variant="destructive"
      >
        Restart All
      </Button>
    </div>
  );
};

export default Pm2;
