import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { path: string } }
) {
  const path = params.path;
  try {
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
