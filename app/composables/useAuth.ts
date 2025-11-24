import { computed, readonly } from 'vue'
import { useState, useCookie, navigateTo } from 'nuxt/app'

interface User {
  id: number
  email: string
  firstName?: string | null
  lastName?: string | null
  role: string
}

interface AuthResponse {
  success: boolean
  token: string
  user: User
}

interface AuthResult {
  success: boolean
  error?: string
}

export const useAuth = () => {
  const token = useCookie<string | null>('auth-token', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7 // 7 jours
  })
  
  const userCookie = useCookie<User | null>('auth-user', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7 // 7 jours
  })
  
  // Initialiser user state avec les données du cookie
  const user = useState<User | null>('auth.user', () => {
    return userCookie.value
  })

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const data = await $fetch<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      token.value = data.token
      user.value = data.user
      userCookie.value = data.user

      // Rediriger selon le rôle
      if (data.user.role === 'admin') {
        await navigateTo('/admin/panel')
      } else if (data.user.role === 'professor') {
        await navigateTo('/professor/dashboard')
      } else {
        await navigateTo('/dashboard')
      }

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.statusMessage || error.statusMessage || 'Erreur de connexion'
      }
    }
  }

  const register = async (
    email: string, 
    password: string, 
    firstName?: string, 
    lastName?: string
  ): Promise<AuthResult> => {
    try {
      const data = await $fetch<AuthResponse>('/api/auth/register', {
        method: 'POST',
        body: { email, password, firstName, lastName }
      })

      token.value = data.token
      user.value = data.user
      userCookie.value = data.user

      await navigateTo('/dashboard')
      
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.statusMessage || error.statusMessage || 'Erreur lors de l\'inscription'
      }
    }
  }

  const logout = async (): Promise<void> => {
    token.value = null
    user.value = null
    userCookie.value = null
    await navigateTo('/')
  }

  const isAuthenticated = computed(() => {
    return !!token.value && !!user.value
  })

  return {
    user: readonly(user),
    login,
    register,
    logout,
    isAuthenticated
  }
}