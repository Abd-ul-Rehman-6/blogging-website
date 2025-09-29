"use client"

import { useAuth } from "@/lib/auth"
import { usePermissions } from "@/hooks/use-permissions"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PostViewer } from "@/components/post-viewer"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { getPostById } from "@/lib/blog-data"
import { useParams } from "next/navigation"
import { Edit, ArrowLeft } from "lucide-react"

export default function ViewPostPage() {
  const { user } = useAuth()
  const { canEditPost } = usePermissions()
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  if (!user) {
    return <div>Loading...</div>
  }

  const post = getPostById(postId)

  if (!post) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Post Not Found</h2>
            <p className="text-muted-foreground mb-4">The post you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/dashboard/posts")}>Back to Posts</Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {canEditPost(post.authorId) && (
            <Button onClick={() => router.push(`/dashboard/posts/edit/${postId}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Post
            </Button>
          )}
        </div>

        <PostViewer post={post} />
      </div>
    </DashboardLayout>
  )
}
