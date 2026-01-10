"use client"

import * as React from "react"
import {
  LuLayoutDashboard,
  LuUsers,
  LuServer,
  LuShieldAlert,
  LuLogOut,
  LuGlobe,
} from "react-icons/lu"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-destructive text-destructive-foreground">
                  <LuShieldAlert className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Admin Panel</span>
                  <span className="">System</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Overview">
                <a href="/admin">
                  <LuLayoutDashboard />
                  <span>Overview</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Users">
                <a href="/admin/users">
                  <LuUsers />
                  <span>Users</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="System">
                <a href="/admin/system">
                  <LuServer />
                  <span>System Health</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Global Links">
                <a href="/admin/links">
                  <LuGlobe />
                  <span>Global Links</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
           <SidebarMenuItem>
                <SidebarMenuButton className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                    <LuLogOut />
                    <span>Log out</span>
                </SidebarMenuButton>
           </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
