"use client";

import * as React from "react";
import {
  IconDashboard,
  IconFileWord,
  IconListDetails,
} from "@tabler/icons-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AuthUser } from "@/types/auth-user";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Foods",
      url: "/dashboard/foods",
      icon: IconListDetails,
    },
    {
      title: "Blogs",
      url: "/dashboard/blogs",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: AuthUser }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <div className="w-6 h-6 overflow-hidden rounded-md bg-muted p-0.5 flex">
                  <div className="relative w-6 h-6 mix-blend-multiply">
                    <Image
                      src={"/images/logo-i.png"}
                      objectFit="cover"
                      fill
                      alt="Radiant Pharma"
                    />
                  </div>
                </div>
                <span className="text-base font-semibold">
                  Calcium Calculator
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
