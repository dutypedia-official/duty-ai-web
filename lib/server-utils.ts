"use server";

export async function fetchFn(url: string, options: any) {
  try {
    const customOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://node.dutyai.app/ai-node${url}`
        : `${process.env.NEXT_PUBLIC_ADMIN_URL}${url}`,
      customOptions
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
