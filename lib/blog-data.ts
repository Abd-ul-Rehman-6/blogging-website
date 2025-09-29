export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  authorId: string
  publishedAt: Date
  status: "draft" | "published"
  tags: string[]
  readTime: number
}

// Mock blog posts data
export const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Modern Web Development",
    content: `# Getting Started with Modern Web Development

Web development has evolved significantly over the past few years. In this comprehensive guide, we'll explore the latest trends and technologies that are shaping the future of web development.

## Key Technologies

### Frontend Frameworks
- React and Next.js for building scalable applications
- Vue.js for progressive web apps
- Svelte for lightweight, fast applications

### Backend Solutions
- Node.js with Express or Fastify
- Python with Django or FastAPI
- Go for high-performance services

## Best Practices

1. **Performance First**: Always optimize for speed and user experience
2. **Accessibility**: Ensure your applications work for everyone
3. **Security**: Implement proper authentication and data protection
4. **Testing**: Write comprehensive tests for reliability

The future of web development is bright, with new tools and frameworks constantly emerging to help developers build better applications faster.`,
    excerpt:
      "Explore the latest trends and technologies shaping modern web development, from frontend frameworks to backend solutions.",
    author: "John Writer",
    authorId: "2",
    publishedAt: new Date("2024-01-15"),
    status: "published",
    tags: ["web development", "javascript", "react"],
    readTime: 8,
  },
  {
    id: "2",
    title: "The Art of Clean Code",
    content: `# The Art of Clean Code

Writing clean, maintainable code is one of the most important skills a developer can master. Clean code is not just about making your code work—it's about making it readable, understandable, and maintainable for future developers.

## Principles of Clean Code

### 1. Meaningful Names
Choose names that reveal intent and make your code self-documenting.

### 2. Small Functions
Keep your functions small and focused on a single task.

### 3. Comments
Write comments that explain why, not what.

### 4. Consistent Formatting
Use consistent indentation and formatting throughout your codebase.

## Benefits

- Easier debugging and maintenance
- Better collaboration with team members
- Reduced technical debt
- Faster development cycles

Remember, code is read more often than it's written. Make it count!`,
    excerpt: "Learn the principles and practices of writing clean, maintainable code that stands the test of time.",
    author: "John Writer",
    authorId: "2",
    publishedAt: new Date("2024-01-10"),
    status: "published",
    tags: ["programming", "best practices", "clean code"],
    readTime: 6,
  },
  {
    id: "3",
    title: "Building Scalable APIs",
    content: `# Building Scalable APIs

Creating APIs that can handle growth and scale effectively is crucial for modern applications. This guide covers the essential patterns and practices for building robust, scalable APIs.

## Design Principles

### RESTful Architecture
Follow REST principles for predictable and intuitive API design.

### Proper HTTP Status Codes
Use appropriate status codes to communicate the result of operations.

### Versioning Strategy
Implement a clear versioning strategy to manage API evolution.

## Performance Considerations

- Implement caching strategies
- Use pagination for large datasets
- Optimize database queries
- Consider rate limiting

## Security Best Practices

- Implement proper authentication
- Use HTTPS everywhere
- Validate all inputs
- Implement proper error handling

Building scalable APIs requires careful planning and attention to detail, but the investment pays off as your application grows.`,
    excerpt: "Essential patterns and practices for building robust, scalable APIs that can handle growth effectively.",
    author: "Admin User",
    authorId: "1",
    publishedAt: new Date("2024-01-05"),
    status: "published",
    tags: ["api", "backend", "scalability"],
    readTime: 10,
  },
  {
    id: "4",
    title: "Draft: Future of AI in Development",
    content: `# The Future of AI in Development

This is a draft post about how AI is transforming the development landscape...

## Current State
- Code completion tools
- Automated testing
- Bug detection

## Future Possibilities
- Automated code generation
- Intelligent debugging
- Predictive maintenance

More content to be added...`,
    excerpt: "Exploring how artificial intelligence is transforming the software development landscape.",
    author: "John Writer",
    authorId: "2",
    publishedAt: new Date("2024-01-20"),
    status: "draft",
    tags: ["ai", "development", "future"],
    readTime: 5,
  },
]

export function getPostsByAuthor(authorId: string): BlogPost[] {
  return mockPosts.filter((post) => post.authorId === authorId)
}

export function getAllPosts(): BlogPost[] {
  return mockPosts
}

export function getPostById(id: string): BlogPost | undefined {
  return mockPosts.find((post) => post.id === id)
}

export function getPublishedPosts(): BlogPost[] {
  return mockPosts.filter((post) => post.status === "published")
}
