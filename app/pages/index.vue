<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-orange-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>
    
    <!-- Floating particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
      <div class="absolute top-32 right-20 w-1 h-1 bg-orange-300/40 rounded-full animate-ping"></div>
      <div class="absolute bottom-20 left-32 w-1.5 h-1.5 bg-red-300/40 rounded-full animate-pulse"></div>
      <div class="absolute top-40 left-1/2 w-1 h-1 bg-orange-300/40 rounded-full animate-bounce" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-40 right-10 w-2 h-2 bg-red-300/30 rounded-full animate-ping" style="animation-delay: 2s;"></div>
    </div>

    <div class="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <!-- Logo Section -->
        <div class="text-center mb-8 animate-fade-in">
          <div class="mx-auto w-20 h-20 bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-white/20 backdrop-blur-sm">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
          </div>
          <h1 class="text-4xl font-black text-white mb-2 tracking-tight">
            <span class="bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
              SQUARE630
            </span>
          </h1>
          <p class="text-orange-200 font-medium text-lg">Hip-Hop • Danse • Passion</p>
        </div>

        <!-- Login Card -->
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 animate-slide-in shadow-2xl border border-white/20 relative overflow-hidden">
          <!-- Card glow effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-3xl"></div>
          
          <div class="relative">
            <form @submit.prevent="handleLogin" class="space-y-6">
              <!-- Email Field -->
              <div class="space-y-3">
                <label class="block text-sm font-bold text-gray-800">
                  <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Adresse email
                  </span>
                </label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div class="w-5 h-5 text-slate-400 group-focus-within:text-orange-600 transition-colors">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                      </svg>
                    </div>
                  </div>
                  <input
                    v-model="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    :disabled="loading"
                    class="w-full pl-12 pr-4 py-4 rounded-2xl bg-gradient-to-r from-gray-50 to-orange-50/50 border-2 border-slate-200/50 focus:border-orange-500 focus:bg-white text-gray-800 font-medium placeholder-slate-400 transition-all duration-300 focus:shadow-lg focus:shadow-orange-500/20"
                    required
                  />
                </div>
              </div>

              <!-- Password Field -->
              <div class="space-y-3">
                <label class="block text-sm font-bold text-gray-800">
                  <span class="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    Mot de passe
                  </span>
                </label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div class="w-5 h-5 text-slate-400 group-focus-within:text-red-600 transition-colors">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                  </div>
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    :disabled="loading"
                    class="w-full pl-12 pr-12 py-4 rounded-2xl bg-gradient-to-r from-gray-50 to-red-50/50 border-2 border-slate-200/50 focus:border-red-500 focus:bg-white text-gray-800 font-medium placeholder-slate-400 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    :disabled="loading"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <div class="w-5 h-5">
                      <svg v-if="showPassword" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                      </svg>
                      <svg v-else fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Forgot Password Link -->
              <div class="flex justify-end -mt-2">
                <button
                  type="button"
                  @click="goToForgotPassword"
                  :disabled="loading"
                  class="text-sm font-semibold text-slate-500 hover:text-orange-700 transition-colors disabled:opacity-50"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              <!-- Error Alert -->
              <div v-if="error" class="bg-red-50 border border-red-200 p-4 rounded-xl">
                <div class="flex items-center">
                  <div class="w-5 h-5 text-red-600 mr-3 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                  <p class="text-red-800 font-medium text-sm">{{ error }}</p>
                </div>
              </div>

              <!-- Login Button -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full py-4 px-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 group overflow-hidden"
              >
                <!-- Shine effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
                  <div class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
                <span :class="{ 'invisible': loading }" class="relative flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span>{{ loading ? 'Connexion...' : 'Se connecter' }}</span>
                </span>
              </button>
            </form>

            <!-- Divider -->
            <div class="my-8 flex items-center">
              <div class="flex-1 border-t border-slate-200"></div>
              <div class="mx-4 text-sm font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent px-4 py-2 bg-white rounded-full shadow-sm">ou</div>
              <div class="flex-1 border-t border-slate-200"></div>
            </div>

            <!-- Register Link -->
            <div class="text-center">
              <p class="text-gray-600 mb-4 text-sm font-medium">Pas encore de compte ?</p>
              <button
                @click="goToRegister"
                :disabled="loading"
                class="bg-gradient-to-r from-gray-100 to-orange-50 hover:from-orange-50 hover:to-red-50 border-2 border-slate-200 hover:border-orange-400 text-slate-700 hover:text-orange-800 font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50"
              >
                <span class="flex items-center justify-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  </svg>
                  <span>Créer un compte</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 text-center animate-slide-in-delay">
          <p class="text-sm text-orange-300/80 font-medium">
            © 2024 Square630 • Association Andyvie • 
            <span class="bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
              Tous droits réservés
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead, navigateTo } from 'nuxt/app'

// @ts-ignore - Nuxt auto-import
const { login, isAuthenticated } = useAuth()

// Rediriger si déjà connecté
if (isAuthenticated.value) {
  await navigateTo('/dashboard')
}

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const goToRegister = () => {
  navigateTo('/register')
}

const goToForgotPassword = () => {
  navigateTo('/forgot-password')
}

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  error.value = ''
  loading.value = true

  try {
    const result = await login(email.value, password.value)
    
    if (!result.success) {
      error.value = result.error || 'Erreur de connexion'
    }
  } catch (err) {
    error.value = 'Une erreur s\'est produite'
  } finally {
    loading.value = false
  }
}

// Meta
useHead({
  title: 'Connexion - Portail',
  meta: [
    { name: 'description', content: 'Connectez-vous à votre espace personnel' }
  ]
})
</script>