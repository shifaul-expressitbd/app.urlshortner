"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api-client"
import { UsersTable } from "@/components/admin/users-table"
import { toast } from "sonner"
import { LuPlus } from "react-icons/lu"
import { Button } from "@/components/ui/button"

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true)
        const res = await api.get<{ data: any[] }>('/users')
        if (res.data) {
             setUsers(res.data)
        } else {
             // Fallback if data is returned directly (array)
             setUsers(Array.isArray(res) ? res : [])
        }
      } catch (error) {
        toast.error("Failed to load users")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
         <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage system users and their roles.
          </p>
        </div>
        <Button>
          <LuPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <UsersTable users={users} isLoading={isLoading} />
    </div>
  )
}
