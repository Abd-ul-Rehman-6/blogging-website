"use client"

import { useAuth } from "@/lib/auth"
import { usePermissions } from "@/hooks/use-permissions"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, Eye, PenTool } from "lucide-react"
import { getPostsByAuthor } from "@/lib/blog-data"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PostsPage() {
  const { user } = useAuth()
  const { canEditPost, canDeletePost } = usePermissions()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  if (!user) {
    return <div>Loading...</div>
  }

  const userPosts = getPostsByAuthor(user.id)
  const filteredPosts = userPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Posts</h1>
            <p className="text-muted-foreground">Manage your blog posts and drafts</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/posts/new">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/posts/view/${post.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {canEditPost(post.authorId) && (
                      <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/posts/edit/${post.id}`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {canDeletePost(post.authorId) && (
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime} min read</span>
                    <span className="text-sm text-muted-foreground">{post.publishedAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <PenTool className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No posts found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first blog post"}
              </p>
              <Button asChild>
                <Link href="/dashboard/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
