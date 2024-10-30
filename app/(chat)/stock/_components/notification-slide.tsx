import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api";
import useUi from "@/lib/hooks/useUi";
import { cn, useColorScheme } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";
import { Expand, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const NotificationSlide = ({ open, setOpen, entityId }: any) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const pathname = usePathname();
  const params = useSearchParams();
  const [data, setData] = useState<any>([]);
  const { refreash, setRefreash } = useUi();
  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);
  const { getToken } = useAuth();
  const client = apiClient();
  const [modal, setModal] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await client.get(
        `/noti/get-analysis/${entityId}`,
        token
      );
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [entityId, pathname, open]);

  useEffect(() => {
    if (open === false) {
      setData([]);
    }
  }, []);

  const isNeg = data?.changePer?.startsWith("-");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side={"bottom"}
        className="w-full h-full md:max-h-[calc(100vh-2.5rem)] bg-white dark:bg-[#171B26] md:rounded-t-2xl p-0 ring-0 outline-none focus:ring-0 focus-within:ring-0 border-t-0">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <X
          onClick={() => setOpen(false)}
          className="cursor-pointer absolute right-3 top-3 md:-top-8 md:right-2 w-5 h-5 md:w-6 md:h-6 text-foreground md:text-background dark:text-foreground md:dark:text-foreground z-50"
        />

        <div className="overflow-y-auto h-full md:rounded-t-2xl relative">
          <>
            {data?.photoLight && data?.photoDark && (
              <div
                className={cn(
                  "absolute top-14 w-full h-full",
                  isDark && "top-0"
                )}>
                <div className="relative w-full h-full opacity-45">
                  {isDark ? (
                    <Image
                      src={"./grid-dark.svg"}
                      alt="grid"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={"./grid-light.svg"}
                      alt="grid"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            )}

            <div className="py-24 container mx-auto max-w-[960px] flex flex-col gap-16 relative z-10">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg lg:text-xl font-normal">
                  {data?.companyName}
                </h2>
                {data?.price && (
                  <h1 className="text-xl lg:text-3xl font-bold">
                    ৳ {data?.price}
                  </h1>
                )}
                <div className="flex flex-col gap-2">
                  {data?.changePer && (
                    <p className="text-lg lg:text-xl">
                      Today{" "}
                      <span
                        className={cn("text-[#2ECC71]", isNeg && "#FF0000")}>
                        {data?.changePer}
                      </span>
                    </p>
                  )}
                  <p className="text-xs lg:text-base">
                    {format(new Date(data?.createdAt || new Date()), "PP")}
                  </p>
                </div>
              </div>
              {data?.photoLight && data?.photoDark && (
                <div className="relative">
                  <div
                    onClick={() => setModal(true)}
                    className="noti-greadient dark:noti-greadient-dark bg-cover bg-center w-full aspect-[961/520] bg-background rounded-2xl cursor-pointer">
                    {/* Image with onLoad handlers */}
                    <div className="aspect-[961/520] relative rounded-2xl">
                      <Skeleton
                        className={`w-full aspect-[961/520] bg-background rounded-2xl transition-opacity duration-300 ${
                          loading2 ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <Image
                        alt="stock"
                        fill
                        src={isDark ? data?.photoDark : data?.photoLight}
                        className="rounded-2xl transition-opacity duration-300"
                        onLoadStart={() => setLoading2(true)}
                        onLoad={() => setLoading2(false)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-foreground text-xl lg:text-3xl font-bold"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-foreground text-lg lg:text-xl font-bold"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h2
                      className="text-foreground text-base lg:text-lg font-bold"
                      {...props}
                    />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4
                      className="text-foreground text-sm lg:text-base font-bold"
                      {...props}
                    />
                  ),
                  h5: ({ node, ...props }) => (
                    <h5
                      className="text-foreground text-xs lg:text-sm font-bold"
                      {...props}
                    />
                  ),
                  h6: ({ node, ...props }) => (
                    <h6
                      className="text-foreground text-xs font-bold"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      className="text-foreground font-medium"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-primary underline underline-offset-2"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-foreground" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="text-foreground" {...props} />
                  ),
                }}
                className={"text-foreground whitespace-pre-wrap"}>
                {data?.content}
              </ReactMarkdown>
            </div>
            <Dialog open={modal} onOpenChange={setModal}>
              <DialogContent className="w-full max-w-screen-xl aspect-[961/520] data-[state=open]:bg-dark">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                <Image
                  alt="stock"
                  fill
                  src={isDark ? data?.photoDark : data?.photoLight}
                  className="transition-opacity duration-300 cursor-pointer"
                />
              </DialogContent>
            </Dialog>
          </>
        </div>
      </SheetContent>
    </Sheet>
  );
};
