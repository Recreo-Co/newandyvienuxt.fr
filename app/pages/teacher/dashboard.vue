<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <!-- Header -->
    <div class="relative z-20 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/dashboard" class="flex items-center space-x-2 text-white hover:text-purple-200 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Retour au dashboard</span>
            </NuxtLink>
            <div class="h-6 w-px bg-white/20"></div>
            <h1 class="text-xl font-bold text-white">Espace Professeur</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>

      <div v-else-if="error" class="bg-white/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 text-center">
        <p class="text-red-300">{{ error }}</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Welcome Section -->
        <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
          <h2 class="text-2xl font-bold text-white mb-2">Bienvenue, Professeur</h2>
          <p class="text-purple-100/80">Voici la liste de vos groupes et danseurs assignés.</p>
        </div>

        <!-- Groups List -->
        <div v-if="groups.length === 0" class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center">
          <svg class="w-16 h-16 text-purple-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <h3 class="text-lg font-medium text-white mb-2">Aucun groupe assigné</h3>
          <p class="text-purple-100/60">Vous n'avez pas encore de groupes assignés. Contactez l'administrateur.</p>
        </div>

        <div v-else class="space-y-6">
          <div v-for="group in groups" :key="group.id" class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <!-- Group Header -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-xl font-bold text-white mb-1">{{ group.name }}</h3>
                <p class="text-purple-100/80 text-sm">{{ group.description }}</p>
                <div class="flex items-center gap-4 mt-2 text-sm text-purple-100/60">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ group.schedule }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    {{ group.ageGroup }}
                  </span>
                </div>
              </div>
              <div class="bg-purple-500/20 text-purple-200 px-4 py-2 rounded-lg border border-purple-500/30">
                <span class="text-2xl font-bold">{{ group.registrations.length }}</span>
                <span class="text-sm ml-1">danseur{{ group.registrations.length > 1 ? 's' : '' }}</span>
              </div>
            </div>

            <!-- Dancers List -->
            <div v-if="group.registrations.length === 0" class="text-center py-8 text-purple-100/60">
              Aucun danseur approuvé dans ce groupe
            </div>

            <div v-else class="space-y-3">
              <div v-for="reg in group.registrations" :key="reg.id" class="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span class="text-white font-bold text-sm">
                          {{ reg.dancer.firstName.charAt(0) }}{{ reg.dancer.lastName.charAt(0) }}
                        </span>
                      </div>
                      <div>
                        <h4 class="text-white font-semibold">{{ reg.dancer.firstName }} {{ reg.dancer.lastName }}</h4>
                        <p class="text-purple-100/60 text-sm">{{ calculateAge(reg.dancer.birthDate) }} ans</p>
                      </div>
                    </div>

                    <!-- Dancer Details (Expandable) -->
                    <button @click="toggleDancerDetails(reg.id)" class="text-purple-300 hover:text-purple-200 text-sm flex items-center gap-1 mt-2">
                      <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-90': expandedDancers.includes(reg.id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                      Voir les détails
                    </button>

                    <div v-if="expandedDancers.includes(reg.id)" class="mt-4 space-y-3 pl-4 border-l-2 border-purple-500/30">
                      <!-- Contact Info -->
                      <div>
                        <h5 class="text-purple-200 font-medium text-sm mb-2">Contact</h5>
                        <p class="text-purple-100/80 text-sm">{{ reg.dancer.email }}</p>
                        <p class="text-purple-100/80 text-sm">{{ reg.dancer.phone }}</p>
                        <p class="text-purple-100/60 text-sm">{{ reg.dancer.address }}, {{ reg.dancer.postalCode }} {{ reg.dancer.city }}</p>
                      </div>

                      <!-- Medical Info -->
                      <div v-if="reg.dancer.otherInfo">
                        <h5 class="text-yellow-200 font-medium text-sm mb-2">⚠️ Informations médicales</h5>
                        <p class="text-yellow-100/80 text-sm bg-yellow-500/10 p-2 rounded border border-yellow-500/20">{{ reg.dancer.otherInfo }}</p>
                      </div>

                      <!-- Guardian -->
                      <div v-if="reg.dancer.guardian">
                        <h5 class="text-purple-200 font-medium text-sm mb-2">Responsable légal</h5>
                        <p class="text-purple-100/80 text-sm">{{ reg.dancer.guardian.firstName }} {{ reg.dancer.guardian.lastName }} ({{ reg.dancer.guardian.relationship }})</p>
                        <p class="text-purple-100/60 text-sm">{{ reg.dancer.guardian.phone }} • {{ reg.dancer.guardian.email }}</p>
                      </div>

                      <!-- Emergency Contacts -->
                      <div v-if="reg.dancer.emergencyContacts && reg.dancer.emergencyContacts.length > 0">
                        <h5 class="text-purple-200 font-medium text-sm mb-2">Contacts d'urgence</h5>
                        <div class="space-y-2">
                          <div v-for="contact in reg.dancer.emergencyContacts" :key="contact.id" class="text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
                            <p class="text-red-100">{{ contact.firstName }} {{ contact.lastName }} ({{ contact.relationship }})</p>
                            <p class="text-red-100/60">{{ contact.phone }} {{ contact.email ? `• ${contact.email}` : '' }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
const loading = ref(true)
const error = ref('')
const groups = ref<any[]>([])
const expandedDancers = ref<number[]>([])

// Check if user is a teacher
onMounted(async () => {
  if (!user.value || (user.value.role !== 'PROF' && user.value.role !== 'admin')) {
    navigateTo('/dashboard')
    return
  }

  await fetchGroups()
})

async function fetchGroups() {
  try {
    loading.value = true
    const { data } = await useFetch('/api/teacher/my-groups')
    
    if (data.value) {
      groups.value = data.value.groups || []
    }
  } catch (err: any) {
    error.value = err.message || 'Erreur lors du chargement des groupes'
  } finally {
    loading.value = false
  }
}

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

function toggleDancerDetails(dancerId: number) {
  const index = expandedDancers.value.indexOf(dancerId)
  if (index > -1) {
    expandedDancers.value.splice(index, 1)
  } else {
    expandedDancers.value.push(dancerId)
  }
}
</script>
