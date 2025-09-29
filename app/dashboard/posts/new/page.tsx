"use client"

import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PostEditor } from "@/components/post-editor"
import { useRouter } from "next/navigation"
import type { BlogPost } from "@/lib/blog-data"

export default function NewPostPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    return <div>Loading...</div>
  }

  const handleSave = (postData: Partial<BlogPost>) => {
    // In a real app, this would save to the backend
    console.log("[v0] Saving new post:", postData)

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
      <PostEditor onSave={handleSave} onCancel={handleCancel} />
    </DashboardLayout>
  )
}
