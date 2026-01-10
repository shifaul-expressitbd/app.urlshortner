"use client";

import * as React from "react";
import {
  LuLayoutDashboard,
  LuLink,
  LuFolder,
  LuSettings,
  LuChartBar,
  LuLogOut,
  LuSparkles,
  LuUser,
  LuChevronsUpDown,
  LuBell,
  LuCheck,
  LuSun,
  LuMoon,
  LuMonitor,
  LuSunMoon,
} from "react-icons/lu";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";

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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

function ThemeToggleItem({
  theme,
  icon,
  currentTheme,
  setTheme,
}: {
  theme: string;
  icon: React.ReactNode;
  currentTheme?: string;
  setTheme: (theme: string) => void;
}) {
  const isActive = currentTheme === theme;
  return (
    <div
      className={cn(
        "h-6 w-6 flex items-center justify-center rounded-md cursor-pointer transition-all hover:text-foreground",
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-background/50",
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setTheme(theme);
      }}
      title={`Switch to ${theme} mode`}
    >
      {icon}
    </div>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  // Fallback if user is loading or null (though protected route handles this, good for safety)
  const userData = user || {
    firstName: "User",
    lastName: "",
    email: "user@example.com",
    avatar: "",
  };
  const fullName = `${userData.firstName} ${userData.lastName}`.trim();
  const initials = userData.firstName?.charAt(0) || "U";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LuSparkles className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">UrlShortener</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <a href="/dashboard">
                  <LuLayoutDashboard />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="My Links">
                <a href="/links">
                  <LuLink />
                  <span>My Links</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Analytics">
                <a href="/analytics">
                  <LuChartBar />
                  <span>Analytics</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Folders">
                <a href="/folders">
                  <LuFolder />
                  <span>Folders</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <a href="/settings">
                  <LuSettings />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={userData.avatar || undefined}
                      alt={fullName}
                    />
                    <AvatarFallback className="rounded-lg">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">{fullName}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {userData.email}
                    </span>
                  </div>
                  <LuChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "top"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={userData.avatar || undefined}
                        alt={fullName}
                      />
                      <AvatarFallback className="rounded-lg">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{fullName}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {userData.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <a href="/settings">
                      <LuSparkles className="mr-2 h-4 w-4" />
                      Upgrade to Pro
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <a
                      href="/settings"
                      className="flex items-center cursor-pointer"
                    >
                      <LuCheck className="mr-2 h-4 w-4" />
                      Account
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="/settings"
                      className="flex items-center cursor-pointer"
                    >
                      <LuBell className="mr-2 h-4 w-4" />
                      Notifications
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <div className="flex items-center justify-between px-2 py-1.5 text-sm select-none">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <LuSunMoon className="mr-2 h-4 w-4" />
                      Theme
                    </span>
                    <div className="flex items-center gap-1 border rounded-lg p-0.5 bg-muted/50">
                      <ThemeToggleItem
                        theme="light"
                        icon={<LuSun className="h-3 w-3" />}
                        currentTheme={theme}
                        setTheme={setTheme}
                      />
                      <ThemeToggleItem
                        theme="system"
                        icon={<LuMonitor className="h-3 w-3" />}
                        currentTheme={theme}
                        setTheme={setTheme}
                      />
                      <ThemeToggleItem
                        theme="dark"
                        icon={<LuMoon className="h-3 w-3" />}
                        currentTheme={theme}
                        setTheme={setTheme}
                      />
                    </div>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LuLogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
