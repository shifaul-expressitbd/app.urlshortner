"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { api } from "@/lib/api-client"
import { LinkTable } from "@/components/dashboard/link-table"
import { CreateLinkCard } from "@/components/dashboard/create-link-card"
import { LinkCard } from "@/components/dashboard/link-card"
import { Button } from "@/components/ui/button"
import { LuArrowLeft, LuFolder, LuLink } from "react-icons/lu"
import { Link } from "@/components/dashboard/types"

export default function FolderDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  
  const [folder, setFolder] = useState<any>(null)
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    try {
      setLoading(true)
      const [folderRes, linksRes] = await Promise.all([
          api.get(`/folders/${id}`),
          api.get<{ items: Link[] }>(`/urls?folderId=${id}&limit=100`)
      ])
      
      setFolder(folderRes)
      setLinks(linksRes.items || [])
    } catch (error) {
      console.error(error)
      // Redirect if folder not found? Or just show error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
        fetchData()
    }
  }, [id])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/folders')}>
           <LuArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
                <LuFolder className="h-6 w-6 text-primary" />
            </div>
            <div>
                 <h2 className="text-2xl font-bold tracking-tight">{folder?.name || 'Folder Details'}</h2>
                 <p className="text-muted-foreground text-sm">Manage links in this folder</p>
            </div>
        </div>
      </div>

      <CreateLinkCard 
        onLinkCreated={fetchData} 
        folderId={id}
        className="max-w-xl"
      />

      <div className="space-y-4">
          <h3 className="text-lg font-medium">Links in Folder</h3>
{loading ? (
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 {[1,2,3].map(i => <div key={i} className="h-40 bg-muted/50 animate-pulse rounded-lg" />)}
             </div>
          ) : links.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {links.map(link => (
                    <LinkCard key={link.id} link={link} />
                ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10 border-dashed">
                  <div className="p-4 bg-muted rounded-full mb-4">
                      <LuLink className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No links in this folder</h3>
                  <p className="text-muted-foreground mb-4 text-center max-w-sm">
                      Create a link above to add it to this folder.
                  </p>
              </div>
          )}
      </div>
    </div>
  )
}
