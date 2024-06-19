import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
// import { fetchFn, getSubdomain } from "@/lib/server-utils";
import { UsersTable } from "./_components/users-table";
import { notFound } from "next/navigation";
import { fetchFn } from "@/lib/server-utils";

export default async function ExpensesPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
  };
}) {
  const q = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 50;
  const sortBy = searchParams?.sortBy || "created_at";
  let data: any = null;

  try {
    data = await fetchFn(
      `/auth/get/active/users?q=${q}&page=${currentPage}&perPage=${perPage}&sortBy=${sortBy}`,
      {
        method: "GET",
        next: {
          revalidate: 60 * 60 * 60 * 24,
          tags: ["users", "active"],
        },
      }
    );
  } catch (error) {
    console.log(error);
    notFound();
  }

  return (
    <>
      <div className="py-3">
        <div className="flex justify-between items-end gap-5">
          <div className="max-w-sm">
            <h2 className="capitalize font-semibold text-2xl">
              Users <span className="text-brand">({data?.total || 0})</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              All your users are listed here.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <UsersTable
          invoices={data?.users || []}
          total={data?.total || 0}
          totalPages={data?.totalPages || 1}
        />
      </div>
    </>
  );
}
