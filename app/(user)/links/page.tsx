"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api-client"
import { Link, PaginatedResponse } from "@/components/dashboard/types"
import { LinkTable } from "@/components/dashboard/link-table"
import { LinkCard } from "@/components/dashboard/link-card"
import { CreateLinkModal } from "@/components/dashboard/create-link-modal"
import { Button } from "@/components/ui/button"
import { LuPlus, LuLink } from "react-icons/lu"
import { toast } from "sonner"

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchLinks = async () => {
    try {
      setIsLoading(true)
      const res = await api.get<PaginatedResponse<Link>>('/urls')
      setLinks(res.items)
    } catch (error) {
      toast.error("Failed to load links")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Links</h2>
          <p className="text-muted-foreground">
            Manage your shortened URLs and track their performance.
          </p>
        </div>
        <CreateLinkModal onSuccess={fetchLinks} />
      </div>
      
      {isLoading ? (
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 {[1,2,3,4,5,6].map(i => <div key={i} className="h-40 bg-muted/50 animate-pulse rounded-lg" />)}
             </div>
          ) : links.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                {links.map(link => (
                    <LinkCard key={link.id} link={link} onRefresh={fetchLinks} />
                ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10 border-dashed">
                  <div className="p-4 bg-muted rounded-full mb-4">
                      <LuLink className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No links created yet</h3>
                  <p className="text-muted-foreground mb-4 text-center max-w-sm">
                      Create your first shortened URL to start tracking clicks and engagement.
                  </p>
              </div>
          )}
    </div>
  )
}
