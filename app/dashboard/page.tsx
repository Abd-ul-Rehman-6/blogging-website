"use client"

import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PenTool, Eye, Clock, TrendingUp } from "lucide-react"
import { getPostsByAuthor, getAllPosts } from "@/lib/blog-data"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  const userPosts = user.role === "admin" ? getAllPosts() : getPostsByAuthor(user.id)
  const publishedPosts = userPosts.filter((post) => post.status === "published")
  const draftPosts = userPosts.filter((post) => post.status === "draft")
  const totalViews = publishedPosts.length * 150 // Mock view count
  const avgReadTime = Math.round(userPosts.reduce((acc, post) => acc + post.readTime, 0) / userPosts.length) || 0

  const recentPosts = userPosts.slice(0, 3)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground">Here's an overview of your blogging activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <PenTool className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userPosts.length}</div>
              <p className="text-xs text-muted-foreground">
                {publishedPosts.length} published, {draftPosts.length} drafts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Read Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgReadTime}m</div>
              <p className="text-xs text-muted-foreground">Per article</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Your latest blog posts</CardDescription>
              </div>
              <Button asChild>
                <Link href="/dashboard/posts">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium text-foreground">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime} min read</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{post.publishedAt.toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
