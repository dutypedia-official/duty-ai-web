"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion,
} from "@/components/ui/accordion";
import { PlusCircle } from "lucide-react";
import ActiveLink from "@/components/activeLink";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const MenuItems = ({ data }: any) => {
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = data.findIndex((item: any) =>
    item?.dropdown?.some(
      (dropdownItem: any) =>
        dropdownItem.link === pathname || dropdownItem.new === pathname
    )
  );

  const Item = (item: any, i: number) => {
    switch (item.type) {
      case "dropdown": {
        const hasActiveLink = item?.dropdown?.some(
          (dropdownItem: any) =>
            dropdownItem.link === pathname || dropdownItem?.new === pathname
        );
        return (
          <AccordionItem
            key={i}
            value={i.toString()}
            className="border-none flex flex-col gap-1">
            <AccordionTrigger
              className={cn(
                "p-4 hover:no-underline hover:bg-accent rounded-md",
                hasActiveLink && "text-primary bg-background"
              )}>
              <div className="flex items-center gap-2">
                <div className="text-xl">{item?.licon}</div>
                <div className="text-sm capitalize font-normal text-left line-clamp-1">
                  {item?.label}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="hover:no-underline">
              {item?.dropdown?.map((item: any, i: number) => {
                return (
                  <ActiveLink
                    key={i}
                    href={item?.link}
                    activeClassName={cn("bg-primary text-background")}>
                    <div
                      className={cn(
                        "group flex gap-1 items-center p-4 rounded-md cursor-pointer",
                        pathname.includes(item?.link)
                          ? "bg-primary text-background"
                          : "text-foreground hover:bg-accent"
                      )}>
                      <div className="w-5"></div>
                      <div className="flex flex-1 justify-between items-center w-max">
                        <h1 className="text-sm capitalize line-clamp-1">
                          {item?.title}
                        </h1>
                      </div>
                      {item?.new && (
                        <PlusCircle
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(`${item?.new}`);
                          }}
                          className={`w-4 h-4 ${
                            pathname.includes(item?.link)
                              ? "block"
                              : "hidden group-hover:block"
                          }`}
                        />
                      )}
                    </div>
                  </ActiveLink>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        );
      }
      default:
        return (
          <ActiveLink key={i} href={item?.link} activeClassName="!text-primary">
            <div
              className={cn(
                "group flex gap-1 items-center p-4 rounded-md hover:bg-accent",
                pathname.split("/")[2]?.includes(item?.link.split("/")[2])
                  ? "text-primary bg-background"
                  : "text-foreground"
              )}>
              <div>{item?.licon}</div>
              <div className="flex flex-1 justify-between items-center">
                <h1 className="text-sm capitalize line-clamp-1">
                  {item?.label}
                </h1>
              </div>
            </div>
          </ActiveLink>
        );
    }
  };
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={activeIndex.toString()}
      className="flex flex-col gap-1">
      {data.map((item: any, i: number) => {
        return Item(item, i);
      })}
    </Accordion>
  );
};
