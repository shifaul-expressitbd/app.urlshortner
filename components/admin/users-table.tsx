"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { LuEllipsis, LuTrash2, LuShield, LuBan, LuCheck } from "react-icons/lu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  systemRole: string;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  avatar?: string;
}

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
}

export function UsersTable({ users, isLoading }: UsersTableProps) {
  if (isLoading) {
      return <div className="p-8 text-center text-muted-foreground">Loading users...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                   <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                   </Avatar>
                   <div className="flex flex-col">
                       <span className="font-medium">{user.firstName} {user.lastName}</span>
                       <span className="text-xs text-muted-foreground">{user.email}</span>
                   </div>
                </div>
              </TableCell>
              <TableCell>
                 <Badge variant={user.systemRole === 'SYSTEM_ADMIN' ? 'default' : 'secondary'}>
                    {user.systemRole === 'SYSTEM_ADMIN' && <LuShield className="mr-1 h-3 w-3" />}
                    {user.systemRole}
                 </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                    {user.isEmailVerified ? (
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Verified</Badge>
                    ) : (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Pending</Badge>
                    )}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(user.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <LuEllipsis className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <LuBan className="mr-2 h-4 w-4" />
                      Suspend User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
