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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <span class="ml-2 sm:ml-3 lg:ml-4 text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight truncate">
              <span class="hidden sm:inline">Gestion Utilisateurs</span>
              <span class="sm:hidden">Users</span>
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
            <NuxtLink
              to="/admin/panel"
              class="px-2 py-2 sm:px-3 sm:py-2 lg:px-4 lg:py-2 bg-white/10 text-white rounded-lg sm:rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20 text-xs sm:text-sm lg:text-base"
            >
              <span class="hidden sm:inline">← Panel Admin</span>
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
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Gestion des Utilisateurs</h1>
        <p class="text-sm sm:text-base text-orange-100/80">Gérez les rôles et permissions des utilisateurs</p>
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
            <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div class="ml-2 sm:ml-3 lg:ml-4 min-w-0">
              <p class="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">{{ stats.admins }}</p>
              <p class="text-orange-100/60 text-xs sm:text-sm">Admins</p>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <div class="flex items-center">
            <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div class="ml-2 sm:ml-3 lg:ml-4 min-w-0">
              <p class="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">{{ stats.professors }}</p>
              <p class="text-orange-100/60 text-xs sm:text-sm">Professeurs</p>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <div class="flex items-center">
            <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="ml-2 sm:ml-3 lg:ml-4 min-w-0">
              <p class="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">{{ stats.users }}</p>
              <p class="text-orange-100/60 text-xs sm:text-sm">Utilisateurs</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 mb-6 sm:mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 lg:items-center">
            <div class="w-full sm:w-auto">
              <label class="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">Filtrer par rôle</label>
              <select
                v-model="selectedRole"
                @change="filterUsers"
                class="custom-select w-full sm:w-auto bg-white/20 text-white rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2 border border-white/30 backdrop-blur-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              >
                <option value="">Tous les rôles</option>
                <option value="admin">Administrateurs</option>
                <option value="professor">Professeurs</option>
                <option value="user">Utilisateurs</option>
              </select>
            </div>

            <div class="w-full sm:w-auto">
              <label class="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">Rechercher</label>
              <input
                v-model="searchTerm"
                @input="filterUsers"
                type="text"
                placeholder="Email..."
                class="w-full sm:w-auto bg-white/20 text-white placeholder-white/60 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2 border border-white/30 backdrop-blur-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Users List -->
      <div class="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 overflow-hidden">
        <div v-if="loading" class="p-6 sm:p-8 text-center">
          <div class="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white mx-auto"></div>
          <p class="text-white mt-3 sm:mt-4 text-sm sm:text-base">Chargement des utilisateurs...</p>
        </div>

        <div v-else-if="filteredUsers.length === 0" class="p-6 sm:p-8 text-center">
          <p class="text-white text-base sm:text-lg">Aucun utilisateur trouvé</p>
        </div>

        <div v-else>
          <!-- Mobile: Cards Layout -->
          <div class="block sm:hidden space-y-3 p-4">
            <div v-for="user in paginatedUsers" :key="user.id" class="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <!-- Header -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center min-w-0 flex-1">
                  <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white font-bold text-sm">
                      {{ user.email.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <h3 class="text-sm font-medium text-white truncate">{{ user.email }}</h3>
                    <p class="text-xs text-orange-100/60">ID: {{ user.id }}</p>
                  </div>
                </div>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0" :class="getRoleClass(user.roles)">
                  {{ getRoleLabel(user.roles) }}
                </span>
              </div>

              <!-- Details -->
              <div class="space-y-2 text-sm mb-3">
                <div class="flex items-center justify-between">
                  <span class="text-orange-100/60">Inscrit le:</span>
                  <span class="text-white text-xs">{{ formatDate(user.createdAt) }}</span>
                </div>
                <div v-if="user._count.teachingGroups > 0" class="flex items-center justify-between">
                  <span class="text-orange-100/60">Groupes enseignés:</span>
                  <span class="text-white text-xs">{{ user._count.teachingGroups }}</span>
                </div>
              </div>

              <!-- Change Role -->
              <div class="pt-3 border-t border-white/10">
                <label class="block text-xs text-white mb-2">Changer le rôle</label>
                <select
                  v-model="user.roles"
                  @change="updateUserRole(user)"
                  class="custom-select w-full bg-white/20 text-white rounded-lg px-3 py-2 border border-white/30 text-sm"
                >
                  <option value="user">Utilisateur</option>
                  <option value="professor">Professeur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <!-- Manage Groups (Professor only) -->
              <div v-if="user.roles === 'professor'" class="pt-3 border-t border-white/10">
                <label class="block text-xs text-white mb-2">Groupes assignés</label>
                <div v-if="user.teachingGroups && user.teachingGroups.length > 0" class="mb-2">
                  <div v-for="group in user.teachingGroups" :key="group.id" class="flex items-center justify-between bg-white/10 rounded px-2 py-1 mb-1">
                    <span class="text-white text-xs">{{ group.name }}</span>
                    <button @click="removeGroupFromUser(user, group.id)" class="text-red-300 hover:text-red-100 text-xs">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <button @click="openGroupModal(user)" class="w-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 px-3 py-2 rounded-lg transition-colors text-xs">
                  + Assigner un groupe
                </button>
              </div>
            </div>
          </div>

          <!-- Desktop: Table Layout -->
          <div class="hidden sm:block">
            <table class="w-full">
              <thead class="bg-white/5">
                <tr>
                  <th class="px-4 py-4 lg:px-6 lg:py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Utilisateur</th>
                  <th class="px-4 py-4 lg:px-6 lg:py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Rôle</th>
                  <th class="hidden lg:table-cell px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Date d'inscription</th>
                  <th class="hidden lg:table-cell px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Groupes</th>
                  <th class="px-4 py-4 lg:px-6 lg:py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Changer Rôle</th>
                  <th class="px-4 py-4 lg:px-6 lg:py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/10">
                <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-white/5">
                  <td class="px-4 py-4 lg:px-6 lg:py-4">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="text-white font-bold text-sm">
                          {{ user.email.charAt(0).toUpperCase() }}
                        </span>
                      </div>
                      <div class="ml-3 lg:ml-4 min-w-0">
                        <div class="text-sm font-medium text-white">{{ user.email }}</div>
                        <div class="text-sm text-orange-100/60">ID: {{ user.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 lg:px-6 lg:py-4">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getRoleClass(user.roles)">
                      {{ getRoleLabel(user.roles) }}
                    </span>
                  </td>
                  <td class="hidden lg:table-cell px-6 py-4 text-sm text-white">
                    {{ formatDate(user.createdAt) }}
                  </td>
                  <td class="hidden lg:table-cell px-6 py-4 text-sm text-white">
                    <div v-if="user.roles === 'professor' && user.teachingGroups && user.teachingGroups.length > 0">
                      <div v-for="group in user.teachingGroups.slice(0, 2)" :key="group.id" class="text-xs text-white mb-1">
                        • {{ group.name }}
                      </div>
                      <span v-if="user.teachingGroups.length > 2" class="text-xs text-orange-100/60">
                        +{{ user.teachingGroups.length - 2 }} autre(s)
                      </span>
                    </div>
                    <span v-else-if="user._count.teachingGroups > 0" class="text-orange-100/60">
                      {{ user._count.teachingGroups }} groupe(s)
                    </span>
                    <span v-else class="text-orange-100/60">-</span>
                  </td>
                  <td class="px-4 py-4 lg:px-6 lg:py-4">
                    <select
                      v-model="user.roles"
                      @change="updateUserRole(user)"
                      class="custom-select bg-white/20 text-white rounded-lg px-3 py-1 border border-white/30 text-sm hover:bg-white/30 transition-colors"
                    >
                      <option value="user">Utilisateur</option>
                      <option value="professor">Professeur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </td>
                  <td class="px-4 py-4 lg:px-6 lg:py-4">
                    <button
                      v-if="user.roles === 'professor'"
                      @click="openGroupModal(user)"
                      class="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 px-3 py-1 rounded-lg transition-colors text-xs inline-flex items-center"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                      Gérer
                    </button>
                    <span v-else class="text-orange-100/60 text-xs">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="showPagination" class="px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border-t border-white/10">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div class="text-xs sm:text-sm text-white order-2 sm:order-1">
              <span class="hidden sm:inline">Affichage {{ ((currentPage - 1) * itemsPerPage) + 1 }} à {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} sur {{ filteredUsers.length }} utilisateur{{ filteredUsers.length > 1 ? 's' : '' }}</span>
              <span class="sm:hidden">{{ ((currentPage - 1) * itemsPerPage) + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }}/{{ filteredUsers.length }}</span>
            </div>

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

              <div class="flex items-center space-x-1">
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

      <!-- Success Toast -->
      <Transition name="toast">
        <div v-if="showToast" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {{ toastMessage }}
        </div>
      </Transition>

      <!-- Group Management Modal -->
      <Transition name="modal">
        <div v-if="showGroupModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="closeGroupModal">
          <div class="bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-white/20 shadow-2xl">
            <!-- Modal Header -->
            <div class="bg-white/10 backdrop-blur-xl p-4 sm:p-6 border-b border-white/20">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-white">Gérer les groupes</h3>
                  <p class="text-sm text-orange-100/80">{{ selectedUser?.email }}</p>
                </div>
                <button @click="closeGroupModal" class="text-white/60 hover:text-white transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Modal Body -->
            <div class="p-4 sm:p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
              <div v-if="loadingGroups" class="text-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p class="text-white/60">Chargement des groupes...</p>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="group in availableGroups"
                  :key="group.id"
                  class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  :class="{ 'border-purple-500 bg-purple-500/20': isGroupAssigned(group.id) }"
                  @click="toggleGroupAssignment(group.id)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center flex-1 min-w-0">
                      <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                      </div>
                      <div class="min-w-0 flex-1">
                        <h4 class="text-white font-medium text-sm truncate">{{ group.name }}</h4>
                        <p class="text-orange-100/60 text-xs truncate">{{ group.schedule }}</p>
                        <p class="text-orange-100/60 text-xs">{{ group.ageGroup }}</p>
                      </div>
                    </div>
                    <div class="flex-shrink-0 ml-3">
                      <div
                        class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
                        :class="isGroupAssigned(group.id) ? 'bg-purple-500 border-purple-500' : 'border-white/40'"
                      >
                        <svg v-if="isGroupAssigned(group.id)" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="availableGroups.length === 0" class="text-center py-8">
                  <p class="text-white/60">Aucun groupe disponible</p>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="bg-white/10 backdrop-blur-xl p-4 sm:p-6 border-t border-white/20">
              <div class="flex justify-between items-center">
                <p class="text-sm text-white/80">
                  {{ selectedUser?.teachingGroups?.length || 0 }} groupe(s) assigné(s)
                </p>
                <button
                  @click="closeGroupModal"
                  class="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth', 'admin']
})

const { logout } = useAuth()

// State
const users = ref([])
const filteredUsers = ref([])
const loading = ref(true)
const selectedRole = ref('')
const searchTerm = ref('')
const showToast = ref(false)
const toastMessage = ref('')

// Group management modal
const showGroupModal = ref(false)
const selectedUser = ref(null)
const availableGroups = ref([])
const loadingGroups = ref(false)

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10

// Stats
const stats = computed(() => {
  const total = users.value.length
  const admins = users.value.filter(u => u.roles === 'admin').length
  const professors = users.value.filter(u => u.roles === 'professor').length
  const regularUsers = users.value.filter(u => u.roles === 'user').length

  return { total, admins, professors, users: regularUsers }
})

// Pagination computed
const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage)
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredUsers.value.slice(start, end)
})

const showPagination = computed(() => {
  return filteredUsers.value.length > itemsPerPage
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
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
const fetchUsers = async () => {
  try {
    loading.value = true
    const response = await $fetch('/api/admin/users')
    users.value = response.users
    filteredUsers.value = response.users
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error)
  } finally {
    loading.value = false
  }
}

const filterUsers = () => {
  let filtered = users.value

  if (selectedRole.value) {
    filtered = filtered.filter(u => u.roles === selectedRole.value)
  }

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(u =>
      u.email.toLowerCase().includes(term)
    )
  }

  filteredUsers.value = filtered
  currentPage.value = 1
}

const updateUserRole = async (user) => {
  try {
    const response = await $fetch(`/api/admin/users/${user.id}`, {
      method: 'PUT',
      body: {
        roles: user.roles
      }
    })

    if (response.success) {
      toastMessage.value = `Rôle mis à jour pour ${user.email}`
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)

      // Refresh the user list to get updated counts
      await fetchUsers()
      filterUsers()
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle:', error)
    alert('Erreur lors de la mise à jour du rôle')
    // Revert the change
    await fetchUsers()
    filterUsers()
  }
}

// Group management functions
const openGroupModal = async (user) => {
  selectedUser.value = user
  showGroupModal.value = true
  loadingGroups.value = true

  try {
    const response = await $fetch('/api/admin/groups')
    availableGroups.value = response.groups || []
  } catch (error) {
    console.error('Erreur lors du chargement des groupes:', error)
    alert('Erreur lors du chargement des groupes')
  } finally {
    loadingGroups.value = false
  }
}

const closeGroupModal = () => {
  showGroupModal.value = false
  selectedUser.value = null
}

const isGroupAssigned = (groupId) => {
  if (!selectedUser.value || !selectedUser.value.teachingGroups) return false
  return selectedUser.value.teachingGroups.some(g => g.id === groupId)
}

const toggleGroupAssignment = async (groupId) => {
  if (!selectedUser.value) return

  const isAssigned = isGroupAssigned(groupId)

  try {
    let response
    if (isAssigned) {
      // Remove group
      response = await $fetch(`/api/admin/users/${selectedUser.value.id}/groups`, {
        method: 'DELETE',
        body: { groupId }
      })
      toastMessage.value = 'Groupe retiré avec succès'
    } else {
      // Add group
      response = await $fetch(`/api/admin/users/${selectedUser.value.id}/groups`, {
        method: 'POST',
        body: { groupId }
      })
      toastMessage.value = 'Groupe assigné avec succès'
    }

    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 3000)

    // Update only the modified user in the list
    if (response.user) {
      const userIndex = users.value.findIndex(u => u.id === selectedUser.value.id)
      if (userIndex !== -1) {
        // Use splice to trigger reactivity
        users.value.splice(userIndex, 1, response.user)
      }

      // Update filtered list as well
      const filteredIndex = filteredUsers.value.findIndex(u => u.id === selectedUser.value.id)
      if (filteredIndex !== -1) {
        filteredUsers.value.splice(filteredIndex, 1, response.user)
      }

      // Update the selected user in the modal
      selectedUser.value = response.user
    }
  } catch (error) {
    console.error('Erreur lors de la modification du groupe:', error)
    alert(error.data?.statusMessage || 'Erreur lors de la modification du groupe')
  }
}

const removeGroupFromUser = async (user, groupId) => {
  if (!confirm('Êtes-vous sûr de vouloir retirer ce groupe ?')) return

  try {
    const response = await $fetch(`/api/admin/users/${user.id}/groups`, {
      method: 'DELETE',
      body: { groupId }
    })

    toastMessage.value = 'Groupe retiré avec succès'
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 3000)

    // Update only the modified user in the list
    if (response.user) {
      const userIndex = users.value.findIndex(u => u.id === user.id)
      if (userIndex !== -1) {
        // Use splice to trigger reactivity
        users.value.splice(userIndex, 1, response.user)
      }

      // Update filtered list as well
      const filteredIndex = filteredUsers.value.findIndex(u => u.id === user.id)
      if (filteredIndex !== -1) {
        filteredUsers.value.splice(filteredIndex, 1, response.user)
      }
    }
  } catch (error) {
    console.error('Erreur lors du retrait du groupe:', error)
    alert('Erreur lors du retrait du groupe')
  }
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

const getRoleClass = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-red-500/20 text-red-300'
    case 'professor':
      return 'bg-purple-500/20 text-purple-300'
    case 'user':
      return 'bg-green-500/20 text-green-300'
    default:
      return 'bg-gray-500/20 text-gray-300'
  }
}

const getRoleLabel = (role) => {
  switch (role) {
    case 'admin':
      return 'Administrateur'
    case 'professor':
      return 'Professeur'
    case 'user':
      return 'Utilisateur'
    default:
      return role
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

// Lifecycle
onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

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

/* Modal transitions */
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
