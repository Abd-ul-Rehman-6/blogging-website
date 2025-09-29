"use client"

import { useAuth, type UserRole } from "@/lib/auth"

export function usePermissions() {
  const { user } = useAuth()

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role
  }

  const isAdmin = (): boolean => {
    return user?.role === "admin"
  }

  const isUser = (): boolean => {
    return user?.role === "user"
  }

  const canEditPost = (postAuthorId: string): boolean => {
    if (!user) return false
    return user.role === "admin" || user.id === postAuthorId
  }

  const canDeletePost = (postAuthorId: string): boolean => {
    if (!user) return false
    return user.role === "admin" || user.id === postAuthorId
  }

  const canManageUsers = (): boolean => {
    return user?.role === "admin"
  }

  const canAccessAdminPanel = (): boolean => {
    return user?.role === "admin"
  }

  const canModerateContent = (): boolean => {
    return user?.role === "admin"
  }

  return {
    user,
    hasRole,
    isAdmin,
    isUser,
    canEditPost,
    canDeletePost,
    canManageUsers,
    canAccessAdminPanel,
    canModerateContent,
  }
}
