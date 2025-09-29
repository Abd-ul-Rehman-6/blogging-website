"use client"

import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, Eye, TrendingUp, UserPlus, Shield, Activity, BarChart3 } from "lucide-react"
import { getAllPosts, getPublishedPosts } from "@/lib/blog-data"
import { getUserStats } from "@/lib/user-data"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard")
    }
  }, [user, router])

  if (!user || user.role !== "admin") {
    return <div>Loading...</div>
  }

  const allPosts = getAllPosts()
  const publishedPosts = getPublishedPosts()
  const draftPosts = allPosts.filter((post) => post.status === "draft")
  const userStats = getUserStats()
  const totalViews = publishedPosts.length * 250 // Mock view count
  const avgEngagement = 87 // Mock engagement rate

  const recentPosts = allPosts.slice(0, 4)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your blogging platform and monitor performance</p>
        </div>

        {/* Admin Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+{userStats.newUsersThisMonth} new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allPosts.length}</div>
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
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgEngagement}%</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                <UserPlus className="h-6 w-6" />
                <span>Add User</span>
              </Button>
              <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                <FileText className="h-6 w-6" />
                <span>New Post</span>
              </Button>
              <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                <Shield className="h-6 w-6" />
                <span>Moderation</span>
              </Button>
              <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                <BarChart3 className="h-6 w-6" />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Posts</CardTitle>
                  <CardDescription>Latest posts from all users</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm text-foreground">{post.title}</h4>
                      <p className="text-xs text-muted-foreground">by {post.author}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant={post.status === "published" ? "default" : "secondary"} className="text-xs">
                          {post.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.readTime} min</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{post.publishedAt.toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Recent user registrations and activity</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">New user registered</p>
                      <p className="text-xs text-muted-foreground">sarah@example.com</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Post published</p>
                      <p className="text-xs text-muted-foreground">by John Writer</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">5 hours ago</span>
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">User profile updated</p>
                      <p className="text-xs text-muted-foreground">mike@example.com</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Platform health and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Server Status</p>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
                <Badge variant="default" className="bg-green-500">
                  Online
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Database</p>
                  <p className="text-xs text-muted-foreground">Response time: 45ms</p>
                </div>
                <Badge variant="default" className="bg-green-500">
                  Healthy
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">CDN</p>
                  <p className="text-xs text-muted-foreground">Global edge locations</p>
                </div>
                <Badge variant="default" className="bg-green-500">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
