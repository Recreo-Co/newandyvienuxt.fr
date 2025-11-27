import { defineNuxtRouteMiddleware, navigateTo, useCookie, useState } from 'nuxt/app'

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie<string | null>('auth-token')
  const userCookie = useCookie<any>('auth-user')
  const user = useState<any>('auth.user')

  // Si pas de token, rediriger
  if (!token.value) {
    return navigateTo('/')
  }

  // Si pas d'user en mémoire mais cookie présent, restaurer
  if (!user.value && userCookie.value) {
    user.value = userCookie.value
  }

  // Vérification finale
  if (!user.value) {
    return navigateTo('/')
  }
})