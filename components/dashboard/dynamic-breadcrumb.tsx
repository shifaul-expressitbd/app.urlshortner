"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.length > 0 && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}

        {segments.map((segment, index) => {
          // Skip 'dashboard' if it's the root (already handled above)
          if (segment === "dashboard" && index === 0) return null;

          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const title = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <React.Fragment key={href}>
              {index > (segments[0] === "dashboard" ? 1 : 0) && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="hidden md:block">
                    {title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
