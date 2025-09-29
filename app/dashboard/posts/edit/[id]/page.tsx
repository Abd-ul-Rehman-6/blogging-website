"use client"

import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PostEditor } from "@/components/post-editor"
import { useRouter } from "next/navigation"
import { getPostById, type BlogPost } from "@/lib/blog-data"
import { useParams } from "next/navigation"

export default function EditPostPage() {
  const { user } = useAuth()
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
            <button onClick={() => router.push("/dashboard/posts")} className="text-primary hover:underline">
              Back to Posts
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Check if user can edit this post (own post or admin)
  if (user.role !== "admin" && post.authorId !== user.id) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">You don't have permission to edit this post.</p>
            <button onClick={() => router.push("/dashboard/posts")} className="text-primary hover:underline">
              Back to Posts
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const handleSave = (postData: Partial<BlogPost>) => {
    // In a real app, this would update the backend
    console.log("[v0] Updating post:", { id: postId, ...postData })

    // Simulate saving and redirect
    setTimeout(() => {
      router.push("/dashboard/posts")
    }, 1000)
  }

  const handleCancel = () => {
    router.push("/dashboard/posts")
  }

  return (
    <DashboardLayout>
      <PostEditor post={post} onSave={handleSave} onCancel={handleCancel} />
    </DashboardLayout>
  )
}
