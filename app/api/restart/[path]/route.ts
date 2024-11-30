import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { path: string } }
) {
  const path = params.path;
  try {
    if (path == "transfer") {
      const res = await fetch(
        `http://v4wwsggw48wko0s084080www.95.111.237.82.sslip.io/transfer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_db_url:
              "postgresql://postgres:12291229@37.60.243.213:5433/dutyai",
            target_db_url:
              "postgres://postgres:aip99vyuE1R3qk36iTRnir3SdaG0xnUBnsWBCnPk8BFJwP7oPzdPeywK2TMfPWqD@153.92.210.77:5432/postgres",
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      return NextResponse.json({ success: true });
    }

    const res = await fetch(`http://158.220.101.235/pm2/api/restart/${path}`, {
      method: "POST",
    });
    const data = await res.json();
    console.log(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
