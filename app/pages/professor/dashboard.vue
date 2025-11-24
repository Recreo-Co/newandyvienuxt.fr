<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <!-- Navigation Header -->
    <nav class="relative z-20 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          <div class="flex items-center min-w-0 flex-1 sm:flex-none">
            <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <span class="ml-2 sm:ml-3 lg:ml-4 text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight truncate">
              <span class="hidden sm:inline">Mes Groupes</span>
              <span class="sm:hidden">Groupes</span>
            </span>
          </div>

          <div class="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
            <button
              @click="logout"
              class="px-2 py-2 sm:px-3 sm:py-2 lg:px-4 lg:py-2 bg-red-500/20 text-white rounded-lg sm:rounded-xl hover:bg-red-500/30 transition-all duration-200 backdrop-blur-sm border border-red-500/30 text-xs sm:text-sm lg:text-base"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Mes Groupes de Danse</h1>
        <p class="text-sm sm:text-base text-orange-100/80">Consultez vos groupes et leurs danseurs inscrits</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>

      <!-- No Groups -->
      <div v-else-if="groups.length === 0" class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-8 border border-white/20 text-center">
        <p class="text-white text-lg">Aucun groupe assigné pour le moment</p>
      </div>

      <!-- Groups List -->
      <div v-else class="space-y-6">
        <div v-for="group in groups" :key="group.id" class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 overflow-hidden">
          <!-- Group Header -->
          <div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 sm:p-6 border-b border-white/20">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl sm:text-2xl font-bold text-white">{{ group.name }}</h2>
                <p class="text-sm sm:text-base text-orange-100/80 mt-1">{{ group.description }}</p>
                <div class="flex flex-wrap gap-3 mt-3">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ group.schedule }}
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white">
                    {{ group.ageGroup }}
                  </span>
                </div>
              </div>
              <div class="flex-shrink-0">
                <div class="text-center bg-white/10 rounded-xl px-4 py-2">
                  <div class="text-2xl font-bold text-white">{{ group.registrations.length }}</div>
                  <div class="text-xs text-orange-100/60">Danseur{{ group.registrations.length > 1 ? 's' : '' }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dancers List -->
          <div v-if="group.registrations.length > 0" class="p-4 sm:p-6">
            <!-- Mobile: Cards -->
            <div class="block sm:hidden space-y-3">
              <div v-for="registration in group.registrations" :key="registration.id"
                   class="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center min-w-0 flex-1">
                    <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white font-bold text-sm">
                        {{ registration.dancer.firstName.charAt(0) }}{{ registration.dancer.lastName.charAt(0) }}
                      </span>
                    </div>
                    <div class="ml-3 min-w-0 flex-1">
                      <h3 class="text-sm font-medium text-white truncate">
                        {{ registration.dancer.firstName }} {{ registration.dancer.lastName }}
                      </h3>
                      <p class="text-xs text-orange-100/60">{{ formatAge(registration.dancer.birthDate) }} ans</p>
                    </div>
                  </div>
                  <button @click="toggleDancerDetails(registration.dancer.id)" class="text-white/60 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                </div>

                <!-- Expanded Details -->
                <div v-if="expandedDancers.includes(registration.dancer.id)" class="mt-3 pt-3 border-t border-white/10 space-y-2 text-sm">
                  <div><span class="text-orange-100/60">Email:</span> <span class="text-white">{{ registration.dancer.email }}</span></div>
                  <div><span class="text-orange-100/60">Tél:</span> <span class="text-white">{{ registration.dancer.phone }}</span></div>
                  <div><span class="text-orange-100/60">Taille:</span> <span class="text-white">{{ registration.dancer.tShirtSize }}</span></div>
                  <div v-if="registration.dancer.otherInfo">
                    <span class="text-orange-100/60">Infos:</span>
                    <span class="text-white">{{ registration.dancer.otherInfo }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop: Table -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="w-full">
                <thead class="bg-white/5">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Danseur</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Âge</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Contact</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Taille</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/10">
                  <tr v-for="registration in group.registrations" :key="registration.id" class="hover:bg-white/5">
                    <td class="px-4 py-3">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span class="text-white font-bold text-sm">
                            {{ registration.dancer.firstName.charAt(0) }}{{ registration.dancer.lastName.charAt(0) }}
                          </span>
                        </div>
                        <div class="ml-3">
                          <div class="text-sm font-medium text-white">
                            {{ registration.dancer.firstName }} {{ registration.dancer.lastName }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm text-white">{{ formatAge(registration.dancer.birthDate) }} ans</td>
                    <td class="px-4 py-3">
                      <div class="text-sm text-white">{{ registration.dancer.email }}</div>
                      <div class="text-xs text-orange-100/60">{{ registration.dancer.phone }}</div>
                    </td>
                    <td class="px-4 py-3 text-sm text-white">{{ registration.dancer.tShirtSize }}</td>
                    <td class="px-4 py-3">
                      <button @click="viewDancerDetails(registration.dancer)"
                              class="text-purple-300 hover:text-purple-100 text-sm">
                        Détails
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- No Dancers -->
          <div v-else class="p-6 text-center">
            <p class="text-white/60">Aucun danseur inscrit dans ce groupe</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dancer Details Modal -->
    <Transition name="modal">
      <div v-if="selectedDancer" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="closeDancerModal">
        <div class="bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-white/20 shadow-2xl">
          <!-- Modal Header -->
          <div class="bg-white/10 backdrop-blur-xl p-4 sm:p-6 border-b border-white/20">
            <div class="flex items-center justify-between">
              <h3 class="text-lg sm:text-xl font-bold text-white">
                {{ selectedDancer.firstName }} {{ selectedDancer.lastName }}
              </h3>
              <button @click="closeDancerModal" class="text-white/60 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="p-4 sm:p-6 overflow-y-auto max-h-[calc(80vh-120px)] space-y-4">
            <!-- Personal Info -->
            <div class="bg-white/10 rounded-xl p-4">
              <h4 class="text-white font-semibold mb-3">Informations personnelles</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-orange-100/60">Âge:</span>
                  <span class="text-white">{{ formatAge(selectedDancer.birthDate) }} ans</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-orange-100/60">Email:</span>
                  <span class="text-white">{{ selectedDancer.email }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-orange-100/60">Téléphone:</span>
                  <span class="text-white">{{ selectedDancer.phone }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-orange-100/60">Taille T-Shirt:</span>
                  <span class="text-white">{{ selectedDancer.tShirtSize }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-orange-100/60">Niveau scolaire:</span>
                  <span class="text-white">{{ selectedDancer.schoolLevel }}</span>
                </div>
              </div>
            </div>

            <!-- Address -->
            <div class="bg-white/10 rounded-xl p-4">
              <h4 class="text-white font-semibold mb-3">Adresse</h4>
              <div class="text-sm text-white">
                <p>{{ selectedDancer.address }}</p>
                <p>{{ selectedDancer.postalCode }} {{ selectedDancer.city }}</p>
              </div>
            </div>

            <!-- Emergency Contacts -->
            <div v-if="selectedDancer.emergencyContacts && selectedDancer.emergencyContacts.length > 0" class="bg-white/10 rounded-xl p-4">
              <h4 class="text-white font-semibold mb-3">Contacts d'urgence</h4>
              <div class="space-y-3">
                <div v-for="contact in selectedDancer.emergencyContacts" :key="contact.id" class="bg-white/5 rounded-lg p-3">
                  <div class="text-sm space-y-1">
                    <div class="text-white font-medium">{{ contact.firstName }} {{ contact.lastName }}</div>
                    <div class="text-orange-100/60">{{ contact.relationship }}</div>
                    <div class="text-white">{{ contact.phone }}</div>
                    <div v-if="contact.email" class="text-white">{{ contact.email }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Guardian -->
            <div v-if="selectedDancer.guardian" class="bg-white/10 rounded-xl p-4">
              <h4 class="text-white font-semibold mb-3">Tuteur légal</h4>
              <div class="bg-white/5 rounded-lg p-3 text-sm space-y-1">
                <div class="text-white font-medium">{{ selectedDancer.guardian.firstName }} {{ selectedDancer.guardian.lastName }}</div>
                <div class="text-white">{{ selectedDancer.guardian.email }}</div>
                <div class="text-white">{{ selectedDancer.guardian.phone }}</div>
              </div>
            </div>

            <!-- Other Info -->
            <div v-if="selectedDancer.otherInfo" class="bg-white/10 rounded-xl p-4">
              <h4 class="text-white font-semibold mb-3">Informations complémentaires</h4>
              <p class="text-sm text-white">{{ selectedDancer.otherInfo }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const { logout } = useAuth()

// State
const groups = ref([])
const loading = ref(true)
const expandedDancers = ref([])
const selectedDancer = ref(null)

// Fetch groups
const fetchGroups = async () => {
  try {
    loading.value = true
    const response = await $fetch('/api/teacher/my-groups')
    groups.value = response.groups || []
  } catch (error) {
    console.error('Erreur lors du chargement des groupes:', error)
    alert('Erreur lors du chargement des groupes')
  } finally {
    loading.value = false
  }
}

// Toggle dancer details (mobile)
const toggleDancerDetails = (dancerId) => {
  const index = expandedDancers.value.indexOf(dancerId)
  if (index > -1) {
    expandedDancers.value.splice(index, 1)
  } else {
    expandedDancers.value.push(dancerId)
  }
}

// View dancer details (desktop)
const viewDancerDetails = (dancer) => {
  selectedDancer.value = dancer
}

// Close modal
const closeDancerModal = () => {
  selectedDancer.value = null
}

// Format age
const formatAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

// Lifecycle
onMounted(() => {
  fetchGroups()
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>
