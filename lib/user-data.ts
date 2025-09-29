export interface UserData {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatar?: string
  joinedAt: Date
  lastActive: Date
  postsCount: number
  status: "active" | "inactive" | "suspended"
}

// Mock users data
export const mockUsers: UserData[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@blogsite.com",
    role: "admin",
    avatar: "/placeholder.svg?key=91coq",
    joinedAt: new Date("2023-01-01"),
    lastActive: new Date(),
    postsCount: 1,
    status: "active",
  },
  {
    id: "2",
    name: "John Writer",
    email: "user@blogsite.com",
    role: "user",
    avatar: "/placeholder.svg?key=5286z",
    joinedAt: new Date("2023-06-15"),
    lastActive: new Date("2024-01-20"),
    postsCount: 3,
    status: "active",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "user",
    avatar: "/placeholder.svg?key=abc123",
    joinedAt: new Date("2023-08-20"),
    lastActive: new Date("2024-01-18"),
    postsCount: 2,
    status: "active",
  },
  {
    id: "4",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "user",
    avatar: "/placeholder.svg?key=def456",
    joinedAt: new Date("2023-11-10"),
    lastActive: new Date("2024-01-15"),
    postsCount: 0,
    status: "inactive",
  },
]

export function getAllUsers(): UserData[] {
  return mockUsers
}

export function getUserById(id: string): UserData | undefined {
  return mockUsers.find((user) => user.id === id)
}

export function getUserStats() {
  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter((user) => user.status === "active").length
  const adminUsers = mockUsers.filter((user) => user.role === "admin").length
  const newUsersThisMonth = mockUsers.filter((user) => {
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    return user.joinedAt > oneMonthAgo
  }).length

  return {
    totalUsers,
    activeUsers,
    adminUsers,
    newUsersThisMonth,
  }
}
