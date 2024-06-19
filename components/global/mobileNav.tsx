"use client";

import React, { Fragment, useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import ActiveLink from "@/components/activeLink";
import { initialNav, navCenterItems } from "@/components/global/navData";

export const MobileNav = () => {
  const user = null;

  const pathname = usePathname();

  const activeIndex = navCenterItems?.findIndex((item: any) =>
    item?.dropdown?.some((dropdownItem: any) => dropdownItem.link === pathname)
  );

  const Item = (item: any, i: number) => {
    const hasActiveLink = item?.dropdown?.some(
      (dropdownItem: any) => dropdownItem.link === pathname
    );

    return (
      <Fragment>
        {item?.link ? (
          <ActiveLink href={item?.link} activeClassName="">
            <div className=" py-2 px-3 inline-flex items-center gap-2">
              <div>{item?.icon}</div>
              <h1 className="text-sm capitalize">{item?.label}</h1>
            </div>
          </ActiveLink>
        ) : (
          <AccordionItem
            key={i}
            value={i.toString()}
            className="border-none flex flex-col gap-0.5"
          >
            <AccordionTrigger
              className={`py-2 px-5  ${hasActiveLink ? "" : ""}`}
            >
              <h1 className="text-sm capitalize font-normal text-left">
                {item?.label}
              </h1>
            </AccordionTrigger>
            <AccordionContent className="hover:no-underline px-8">
              {item?.dropdown?.map((subitem: any, id: number) => {
                return (
                  <ActiveLink key={id} href={subitem?.link} activeClassName="">
                    <div
                      className={`flex gap-2 items-center py-2 cursor-pointer ${
                        pathname.includes(subitem?.link)
                          ? "text-foreground"
                          : "text-foreground"
                      }`}
                    >
                      <div className="flex flex-1 justify-between items-center">
                        <h1 className="text-sm capitalize ">
                          {subitem?.label}
                        </h1>
                      </div>
                    </div>
                  </ActiveLink>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        )}
      </Fragment>
    );
  };
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={activeIndex.toString()}
      className="flex flex-col text-left py-8"
    >
      {user
        ? navCenterItems.map((item: any, i: number) => {
            return (
              // <div key={i} className="">
              //   {Item(item, i)}
              // </div>
              <></>
            );
          })
        : initialNav.map((item: any, i: number) => {
            return (
              <div key={i} className="">
                {Item(item, i)}
              </div>
            );
          })}
    </Accordion>
  );
};
