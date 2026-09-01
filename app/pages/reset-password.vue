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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
          </div>
          <h1 class="text-4xl font-black text-white mb-2 tracking-tight">
            <span class="bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
              SQUARE630
            </span>
          </h1>
          <p class="text-orange-200 font-medium text-lg">Nouveau mot de passe</p>
        </div>

        <!-- Card -->
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 animate-slide-in shadow-2xl border border-white/20 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-3xl"></div>

          <div class="relative">
            <!-- Vérification du lien -->
            <div v-if="checking" class="py-8 text-center">
              <div class="w-10 h-10 mx-auto border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
              <p class="text-gray-600 text-sm mt-4">Vérification du lien...</p>
            </div>

            <!-- Lien invalide -->
            <div v-else-if="!tokenValid" class="text-center space-y-6">
              <div class="mx-auto w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Lien invalide ou expiré</h2>
                <p class="text-gray-600 text-sm leading-relaxed">
                  Ce lien de réinitialisation n'est plus valable. Les liens expirent au bout d'une heure et ne peuvent servir qu'une seule fois.
                </p>
              </div>
              <button
                @click="goToForgot"
                class="w-full py-4 px-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
              >
                Demander un nouveau lien
              </button>
            </div>

            <!-- Succès -->
            <div v-else-if="done" class="text-center space-y-6">
              <div class="mx-auto w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Mot de passe modifié</h2>
                <p class="text-gray-600 text-sm leading-relaxed">
                  Votre nouveau mot de passe est enregistré. Vous pouvez maintenant vous connecter.
                </p>
              </div>
              <button
                @click="goToLogin"
                class="w-full py-4 px-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
              >
                Se connecter
              </button>
            </div>

            <!-- Formulaire -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
              <p class="text-gray-600 text-sm leading-relaxed">
                Choisissez un nouveau mot de passe pour votre compte.
              </p>

              <!-- Nouveau mot de passe -->
              <div class="space-y-3">
                <label class="block text-sm font-bold text-gray-800">
                  <span class="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    Nouveau mot de passe
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

              <!-- Confirmation -->
              <div class="space-y-3">
                <label class="block text-sm font-bold text-gray-800">
                  <span class="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    Confirmer le mot de passe
                  </span>
                </label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div class="w-5 h-5 text-slate-400 group-focus-within:text-red-600 transition-colors">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>
                  <input
                    v-model="passwordConfirm"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    :disabled="loading"
                    class="w-full pl-12 pr-4 py-4 rounded-2xl bg-gradient-to-r from-gray-50 to-red-50/50 border-2 border-slate-200/50 focus:border-red-500 focus:bg-white text-gray-800 font-medium placeholder-slate-400 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
                    required
                  />
                </div>
              </div>

              <!-- Règles -->
              <div class="bg-orange-50/70 border border-orange-200 rounded-xl p-4">
                <p class="text-xs font-bold text-orange-800 mb-2">Le mot de passe doit contenir :</p>
                <ul class="space-y-1">
                  <li v-for="rule in rules" :key="rule.label" class="flex items-center text-xs" :class="rule.ok ? 'text-green-700' : 'text-slate-500'">
                    <span class="mr-2">{{ rule.ok ? '✓' : '•' }}</span>{{ rule.label }}
                  </li>
                </ul>
              </div>

              <!-- Error Alert -->
              <div v-if="error" class="bg-red-50 border border-red-200 p-4 rounded-xl">
                <div class="flex items-start">
                  <div class="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5">
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
                  Enregistrer le nouveau mot de passe
                </span>
              </button>
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
import { computed, ref } from 'vue'
import { useHead, useRoute, navigateTo } from 'nuxt/app'

const route = useRoute()
const token = String(route.query.token || '')

const password = ref('')
const passwordConfirm = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const done = ref(false)
const checking = ref(true)
const tokenValid = ref(false)

// Mêmes règles que la validation côté serveur
const rules = computed(() => [
  { label: 'au moins 8 caractères', ok: password.value.length >= 8 },
  { label: 'une lettre minuscule', ok: /[a-z]/.test(password.value) },
  { label: 'une lettre majuscule', ok: /[A-Z]/.test(password.value) },
  { label: 'un chiffre', ok: /[0-9]/.test(password.value) },
  { label: 'un caractère spécial (!@#$%^&*)', ok: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(password.value) }
])

// Vérifier la validité du lien au chargement
if (token) {
  try {
    const check = await $fetch<{ valid: boolean }>('/api/auth/verify-reset-token', {
      query: { token }
    })
    tokenValid.value = check.valid
  } catch {
    tokenValid.value = false
  }
}
checking.value = false

const goToLogin = () => navigateTo('/')
const goToForgot = () => navigateTo('/forgot-password')

const handleSubmit = async () => {
  if (password.value !== passwordConfirm.value) {
    error.value = 'Les deux mots de passe ne correspondent pas'
    return
  }

  if (rules.value.some(r => !r.ok)) {
    error.value = 'Le mot de passe ne respecte pas toutes les règles ci-dessus'
    return
  }

  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { token, password: password.value }
    })
    done.value = true
  } catch (err: any) {
    error.value = err.data?.statusMessage || err.statusMessage || 'Une erreur s\'est produite'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Nouveau mot de passe - Square630',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script>
