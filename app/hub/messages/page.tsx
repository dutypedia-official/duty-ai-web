import { fetchFn } from "@/lib/server-utils";
import { MessagesTable } from "./_components/messageTable";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    perPage?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 50;
  let data = null;
  try {
    data = await fetchFn(`/messages/get-all-messages/${currentPage}`, {
      method: "GET",
      next: {
        revalidate: 0,
        tags: ["messages"],
      },
    });
  } catch (error) {
    console.log(error);
  }
  return (
    <MessagesTable
      items={data[0] || []}
      total={data[1] || 0}
      totalPages={data[2] || 1}
    />
  );
};

export default page;
