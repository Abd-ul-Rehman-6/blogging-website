"use client"

import type { BlogPost } from "@/lib/blog-data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, User } from "lucide-react"

interface PostViewerProps {
  post: BlogPost
}

export function PostViewer({ post }: PostViewerProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Post Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-foreground text-balance">{post.title}</h1>

        <p className="text-xl text-muted-foreground text-pretty">{post.excerpt}</p>

        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>by {post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{post.publishedAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <Card>
        <CardContent className="p-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">{post.content}</div>
          </div>
        </CardContent>
      </Card>

      {/* Author Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" alt={post.author} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-foreground">{post.author}</h3>
              <p className="text-sm text-muted-foreground">
                Passionate writer sharing insights about technology and development.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
