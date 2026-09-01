<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <div class="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <!-- Logo Section -->
        <div class="text-center mb-8 animate-fade-in">
          <div class="mx-auto w-20 h-20 bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-white/20 backdrop-blur-sm">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
              </svg>
            </div>
          </div>
          <h1 class="text-4xl font-black text-white mb-2 tracking-tight">
            <span class="bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
              SQUARE630
            </span>
          </h1>
          <p class="text-orange-200 font-medium text-lg">Mot de passe oublié</p>
        </div>

        <!-- Card -->
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 animate-slide-in shadow-2xl border border-white/20 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-3xl"></div>

          <div class="relative">
            <!-- Confirmation -->
            <div v-if="sent" class="text-center space-y-6">
              <div class="mx-auto w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Vérifiez votre boîte mail</h2>
                <p class="text-gray-600 text-sm leading-relaxed">{{ message }}</p>
                <p class="text-gray-500 text-xs mt-4">
                  Pensez à regarder dans vos courriers indésirables. Le lien est valable 1 heure.
                </p>
              </div>
              <button
                @click="goToLogin"
                class="w-full py-4 px-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
              >
                Retour à la connexion
              </button>
            </div>

            <!-- Formulaire -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
              <p class="text-gray-600 text-sm leading-relaxed">
                Saisissez l'adresse email de votre compte. Nous vous enverrons un lien pour choisir un nouveau mot de passe.
              </p>

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

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full py-4 px-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 group overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
                  <div class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
                <span :class="{ 'invisible': loading }" class="relative">
                  Envoyer le lien de réinitialisation
                </span>
              </button>

              <!-- Back to login -->
              <div class="text-center">
                <button
                  type="button"
                  @click="goToLogin"
                  :disabled="loading"
                  class="text-sm font-semibold text-slate-600 hover:text-orange-700 transition-colors disabled:opacity-50"
                >
                  ← Retour à la connexion
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 text-center animate-slide-in-delay">
          <p class="text-sm text-orange-300/80 font-medium">
            © 2024 Square630 • Association Andyvie
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead, navigateTo } from 'nuxt/app'

const email = ref('')
const loading = ref(false)
const error = ref('')
const sent = ref(false)
const message = ref('')

const goToLogin = () => {
  navigateTo('/')
}

const handleSubmit = async () => {
  if (!email.value) {
    error.value = 'Veuillez saisir votre adresse email'
    return
  }

  error.value = ''
  loading.value = true

  try {
    const data = await $fetch<{ success: boolean; message: string }>('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value }
    })

    message.value = data.message
    sent.value = true
  } catch (err: any) {
    error.value = err.data?.statusMessage || err.statusMessage || 'Une erreur s\'est produite'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Mot de passe oublié - Square630',
  meta: [
    { name: 'description', content: 'Réinitialisez le mot de passe de votre espace personnel' }
  ]
})
</script>
