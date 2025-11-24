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
          <!-- Logo -->
          <div class="flex items-center min-w-0 flex-1 sm:flex-none">
            <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="ml-2 sm:ml-3 lg:ml-4 text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight truncate">
              <span class="hidden sm:inline">Panel Admin</span>
              <span class="sm:hidden">Admin</span>
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
            <NuxtLink
              to="/dashboard"
              class="px-2 py-2 sm:px-3 sm:py-2 lg:px-4 lg:py-2 bg-white/10 text-white rounded-lg sm:rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20 text-xs sm:text-sm lg:text-base"
            >
              <span class="hidden sm:inline">← Dashboard</span>
              <span class="sm:hidden">←</span>
            </NuxtLink>
            <button
              @click="logout"
              class="px-2 py-2 sm:px-3 sm:py-2 lg:px-4 lg:py-2 bg-red-500/20 text-white rounded-lg sm:rounded-xl hover:bg-red-500/30 transition-all duration-200 backdrop-blur-sm border border-red-500/30 text-xs sm:text-sm lg:text-base"
            >
              <span class="hidden sm:inline">Déconnexion</span>
              <span class="sm:hidden">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Gestion des Inscriptions</h1>
        <p class="text-sm sm:text-base text-orange-100/80">Visualisez, approuvez ou rejetez les demandes d'inscription</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <div class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <div class="flex items-center">
            <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <div class="ml-2 sm:ml-3 lg:ml-4 min-w-0">
              <p class="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">{{ stats.total }}</p>
              <p class="text-orange-100/60 text-xs sm:text-sm">Total</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <div class="flex items-center">
            <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-yellow-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-2 sm:ml-3 lg:ml-4 min-w-0">
              <p class="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">{{ stats.pending }}</p>
              <p class="text-orange-100/60 text-xs sm:text-sm">En attente</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <div class="flex items-center">
            <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-2 sm:ml-3 lg:ml-4 min-w-0">
              <p class="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">{{ stats.approved }}</p>
              <p class="text-orange-100/60 text-xs sm:text-sm">Approuvées</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <div class="flex items-center">
            <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-2 sm:ml-3 lg:ml-4 min-w-0">
              <p class="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">{{ stats.rejected }}</p>
              <p class="text-orange-100/60 text-xs sm:text-sm">Rejetées</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions & Filters -->
      <div class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 mb-6 sm:mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 lg:items-center">
            <div class="w-full sm:w-auto">
              <label class="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">Filtrer par statut</label>
              <select
                v-model="selectedStatus"
                @change="filterRegistrations"
                class="custom-select w-full sm:w-auto bg-white/20 text-white rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2 border border-white/30 backdrop-blur-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              >
                <option value="">Tous les statuts</option>
                <option value="SUBMITTED">En attente</option>
                <option value="APPROVED">Approuvées</option>
                <option value="REJECTED">Rejetées</option>
              </select>
            </div>
            
            <div class="w-full sm:w-auto">
              <label class="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">Rechercher</label>
              <input
                v-model="searchTerm"
                @input="filterRegistrations"
                type="text"
                placeholder="Nom, email, groupe..."
                class="w-full sm:w-auto bg-white/20 text-white placeholder-white/60 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2 border border-white/30 backdrop-blur-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              >
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:flex-shrink-0">
            <NuxtLink
              to="/admin/stats"
              class="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 backdrop-blur-xl text-white font-semibold py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 border border-purple-500/30 inline-flex items-center justify-center space-x-2 text-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span class="hidden sm:inline">Stats par Groupe</span>
              <span class="sm:hidden">Stats</span>
            </NuxtLink>
            
            <NuxtLink
              to="/admin/groups"
              class="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 backdrop-blur-xl text-white font-semibold py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 border border-teal-500/30 inline-flex items-center justify-center space-x-2 text-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span class="hidden sm:inline">Gérer Groupes</span>
              <span class="sm:hidden">Groupes</span>
            </NuxtLink>
            
            <NuxtLink
              to="/admin/users"
              class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 backdrop-blur-xl text-white font-semibold py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 border border-blue-500/30 inline-flex items-center justify-center space-x-2 text-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
              <span class="hidden sm:inline">Gérer Utilisateurs</span>
              <span class="sm:hidden">Users</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Registrations List -->
      <div class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 overflow-hidden">
        <div v-if="loading" class="p-6 sm:p-8 text-center">
          <div class="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white mx-auto"></div>
          <p class="text-white mt-3 sm:mt-4 text-sm sm:text-base">Chargement des inscriptions...</p>
        </div>

        <div v-else-if="filteredRegistrations.length === 0" class="p-6 sm:p-8 text-center">
          <p class="text-white text-base sm:text-lg">Aucune inscription trouvée</p>
        </div>

        <div v-else>
          <!-- Mobile: Cards Layout -->
          <div class="block sm:hidden space-y-3 p-4">
            <div v-for="registration in paginatedRegistrations" :key="registration.id" class="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <!-- Header with avatar and name -->
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
                    <p class="text-xs text-orange-100/60 truncate">{{ registration.dancer.email }}</p>
                  </div>
                </div>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0" :class="getStatusClass(registration.status)">
                  {{ registration.status === 'SUBMITTED' ? '⏳' : registration.status === 'APPROVED' ? '✅' : '❌' }}
                </span>
              </div>
              
              <!-- Details -->
              <div class="space-y-2 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-orange-100/60">Groupe:</span>
                  <span class="text-white font-medium">{{ registration.danceGroup.name }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-orange-100/60">Horaire:</span>
                  <span class="text-white text-xs">{{ registration.danceGroup.schedule }}</span>
                </div>
                <div v-if="registration.sportCode" class="flex items-center justify-between">
                  <span class="text-orange-100/60">Code sport:</span>
                  <span class="text-white text-xs">{{ registration.sportCode }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-orange-100/60">Date:</span>
                  <span class="text-white text-xs">{{ formatDate(registration.createdAt) }}</span>
                </div>
              </div>
              
              <!-- Action button -->
              <div class="mt-4 pt-3 border-t border-white/10">
                <NuxtLink
                  :to="`/admin/registration/${registration.id}`"
                  class="w-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-4 py-2 rounded-lg transition-colors inline-flex items-center justify-center text-sm font-medium"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Voir les détails
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Desktop: Table Layout -->
          <div class="hidden sm:block">
            <table class="w-full">
              <thead class="bg-white/5">
                <tr>
                  <th class="px-4 py-4 lg:px-6 lg:py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Danseur</th>
                  <th class="px-4 py-4 lg:px-6 lg:py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Groupe</th>
                  <th class="px-4 py-4 lg:px-6 lg:py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Statut</th>
                  <th class="hidden lg:table-cell px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                  <th class="px-4 py-4 lg:px-6 lg:py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/10">
                <tr v-for="registration in paginatedRegistrations" :key="registration.id" class="hover:bg-white/5">
                  <td class="px-4 py-4 lg:px-6 lg:py-4">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="text-white font-bold text-sm">
                          {{ registration.dancer.firstName.charAt(0) }}{{ registration.dancer.lastName.charAt(0) }}
                        </span>
                      </div>
                      <div class="ml-3 lg:ml-4 min-w-0">
                        <div class="text-sm font-medium text-white">
                          {{ registration.dancer.firstName }} {{ registration.dancer.lastName }}
                        </div>
                        <div class="text-sm text-orange-100/60">{{ registration.dancer.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 lg:px-6 lg:py-4">
                    <div class="text-sm text-white">{{ registration.danceGroup.name }}</div>
                    <div class="text-xs text-orange-100/60">{{ registration.danceGroup.schedule }}</div>
                    <div v-if="registration.sportCode" class="text-xs text-orange-300">Sport: {{ registration.sportCode }}</div>
                  </td>
                  <td class="px-4 py-4 lg:px-6 lg:py-4">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getStatusClass(registration.status)">
                      {{ getStatusText(registration.status) }}
                    </span>
                  </td>
                  <td class="hidden lg:table-cell px-6 py-4 text-sm text-white">
                    {{ formatDate(registration.createdAt) }}
                  </td>
                  <td class="px-4 py-4 lg:px-6 lg:py-4 text-sm font-medium">
                    <NuxtLink
                      :to="`/admin/registration/${registration.id}`"
                      class="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-3 py-1 rounded-lg transition-colors inline-block text-sm"
                    >
                      Voir
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="showPagination" class="px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border-t border-white/10">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <!-- Info pagination -->
            <div class="text-xs sm:text-sm text-white order-2 sm:order-1">
              <span class="hidden sm:inline">Affichage {{ ((currentPage - 1) * itemsPerPage) + 1 }} à {{ Math.min(currentPage * itemsPerPage, filteredRegistrations.length) }} sur {{ filteredRegistrations.length }} inscription{{ filteredRegistrations.length > 1 ? 's' : '' }}</span>
              <span class="sm:hidden">{{ ((currentPage - 1) * itemsPerPage) + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredRegistrations.length) }}/{{ filteredRegistrations.length }}</span>
            </div>
            
            <!-- Navigation pagination -->
            <div class="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-2 py-2 sm:px-3 sm:py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <!-- Numéros de page - Version mobile simplifiée -->
              <div class="flex items-center space-x-1">
                <!-- Mobile: afficher seulement 3 pages au maximum -->
                <template v-if="isMobile">
                  <button
                    v-for="page in visiblePagesForMobile"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'px-3 py-2 text-sm rounded-lg backdrop-blur-sm border w-10',
                      currentPage === page
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    ]"
                  >
                    {{ page }}
                  </button>
                </template>
                
                <!-- Desktop: affichage complet -->
                <template v-else>
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'px-3 py-2 text-sm rounded-lg backdrop-blur-sm border',
                      currentPage === page
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    ]"
                  >
                    {{ page }}
                  </button>
                  
                  <span v-if="totalPages > 7 && currentPage < totalPages - 2" class="text-white px-2">...</span>
                  
                  <button
                    v-if="totalPages > 7 && currentPage < totalPages - 2"
                    @click="goToPage(totalPages)"
                    :class="[
                      'px-3 py-2 text-sm rounded-lg backdrop-blur-sm border',
                      currentPage === totalPages
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    ]"
                  >
                    {{ totalPages }}
                  </button>
                </template>
              </div>
              
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-2 py-2 sm:px-3 sm:py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth', 'admin']
})

const { logout } = useAuth()

// State
const registrations = ref([])
const filteredRegistrations = ref([])
const loading = ref(true)
const selectedStatus = ref('')
const searchTerm = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10

// Stats
const stats = computed(() => {
  const total = registrations.value.length
  const pending = registrations.value.filter(r => r.status === 'SUBMITTED').length
  const approved = registrations.value.filter(r => r.status === 'APPROVED').length
  const rejected = registrations.value.filter(r => r.status === 'REJECTED').length
  
  return { total, pending, approved, rejected }
})

// Pagination computed
const totalPages = computed(() => {
  return Math.ceil(filteredRegistrations.value.length / itemsPerPage)
})

// Paginated registrations
const paginatedRegistrations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredRegistrations.value.slice(start, end)
})

const showPagination = computed(() => {
  return filteredRegistrations.value.length > itemsPerPage
})

// Responsive
const isMobile = computed(() => {
  return process.client && window.innerWidth < 640
})

// Pagination visible pages for mobile (simplified)
const visiblePagesForMobile = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 3) {
    // If 3 pages or less, show all
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show current page and neighbors
    if (current === 1) {
      pages.push(1, 2, 3)
    } else if (current === total) {
      pages.push(total - 2, total - 1, total)
    } else {
      pages.push(current - 1, current, current + 1)
    }
  }
  
  return pages
})

// Pagination visible pages for desktop (complete)
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    // If 7 pages or less, show all
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show first 3, current neighbors, and handle ellipsis logic
    pages.push(1, 2, 3)
    
    if (current > 5) {
      pages.push(current - 1, current, current + 1)
    } else if (current > 3) {
      pages.push(current, current + 1)
    }
  }
  
  return [...new Set(pages)].sort((a, b) => a - b)
})

// Methods
const fetchRegistrations = async () => {
  try {
    loading.value = true
    const response = await $fetch('/api/admin/registrations')
    registrations.value = response.registrations
    filteredRegistrations.value = response.registrations
  } catch (error) {
    console.error('Erreur lors du chargement des inscriptions:', error)
  } finally {
    loading.value = false
  }
}

const filterRegistrations = () => {
  let filtered = registrations.value

  if (selectedStatus.value) {
    filtered = filtered.filter(r => r.status === selectedStatus.value)
  }

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(r => 
      r.dancer.firstName.toLowerCase().includes(term) ||
      r.dancer.lastName.toLowerCase().includes(term) ||
      r.dancer.email.toLowerCase().includes(term) ||
      r.danceGroup.name.toLowerCase().includes(term)
    )
  }

  filteredRegistrations.value = filtered
  currentPage.value = 1 // Reset to first page when filtering
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}


const getStatusClass = (status) => {
  switch (status) {
    case 'SUBMITTED':
      return 'bg-yellow-500/20 text-yellow-300'
    case 'APPROVED':
      return 'bg-green-500/20 text-green-300'
    case 'REJECTED':
      return 'bg-red-500/20 text-red-300'
    default:
      return 'bg-gray-500/20 text-gray-300'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'SUBMITTED':
      return 'En attente'
    case 'APPROVED':
      return 'Approuvée'
    case 'REJECTED':
      return 'Rejetée'
    default:
      return status
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

// Lifecycle
onMounted(() => {
  fetchRegistrations()
})
</script>

<style scoped>
/* Fix select options visibility */
.custom-select option {
  background-color: white;
  color: #1f2937;
  padding: 8px;
}

.custom-select option:checked {
  background-color: #f97316;
  color: white;
}
</style>
