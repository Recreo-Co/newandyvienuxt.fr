<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-orange-400/15 to-red-400/15 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>
    
    <!-- Floating particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
      <div class="absolute top-32 right-20 w-1 h-1 bg-orange-300/40 rounded-full animate-ping"></div>
      <div class="absolute bottom-20 left-32 w-1.5 h-1.5 bg-red-300/40 rounded-full animate-pulse"></div>
      <div class="absolute top-40 left-1/2 w-1 h-1 bg-orange-300/40 rounded-full animate-bounce" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-40 right-10 w-2 h-2 bg-red-300/30 rounded-full animate-ping" style="animation-delay: 2s;"></div>
    </div>

    <!-- Navigation Header -->
    <nav class="relative z-20 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 sm:h-20">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span class="ml-3 sm:ml-4 text-xl sm:text-2xl font-black text-white tracking-tight">
              <span class="bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
                SQUARE630
              </span>
            </span>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Desktop User Menu -->
          <div class="hidden md:flex items-center space-x-4 lg:space-x-6">
            <div class="text-white/90 font-medium text-sm lg:text-base">
              Bonjour, <span class="font-bold text-white">{{ user?.email?.split('@')[0] }}</span>
            </div>
            
            <!-- Admin Panel Link (only for admins) -->
            <NuxtLink
              v-if="user?.role === 'admin'"
              to="/admin/panel"
              class="bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 backdrop-blur-xl text-white font-semibold py-2 px-4 lg:py-3 lg:px-6 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-500/30 inline-flex items-center space-x-2 text-sm lg:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span>Panel Admin</span>
            </NuxtLink>
            
            <button
              @click="handleLogout"
              class="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-semibold py-2 px-4 lg:py-3 lg:px-6 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20 inline-flex items-center space-x-2 text-sm lg:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 transform -translate-y-2"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 transform translate-y-0"
          leave-to-class="opacity-0 transform -translate-y-2"
        >
          <div v-if="mobileMenuOpen" class="md:hidden py-4 space-y-3 border-t border-white/20">
            <div class="text-white/90 font-medium text-sm px-2">
              Bonjour, <span class="font-bold text-white">{{ user?.email?.split('@')[0] }}</span>
            </div>
            
            <NuxtLink
              v-if="user?.role === 'admin'"
              to="/admin/panel"
              @click="mobileMenuOpen = false"
              class="block w-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-orange-500/30 text-sm"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <span>Panel Admin</span>
              </div>
            </NuxtLink>
            
            <button
              @click="handleLogout"
              class="w-full bg-white/10 backdrop-blur-xl text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-white/20 text-sm text-left"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
                <span>Déconnexion</span>
              </div>
            </button>
          </div>
        </Transition>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Header Section -->
      <div class="mb-8 sm:mb-12 animate-fade-in text-center">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight">
          <span class="bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
            Mon Espace Danseur
          </span>
        </h1>
        <p class="text-orange-200 text-lg sm:text-xl font-medium">
          Association Andyvie • Square630
        </p>
      </div>

      <!-- Registration Status -->
      <div v-if="loading" class="text-center py-12">
        <div class="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white/80">Chargement de votre inscription...</p>
      </div>

      <div v-else-if="registration.hasRegistration && registration.registration" class="space-y-8">

        <!-- Renouvellement d'inscription -->
        <div v-if="showRenewalOption" class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
            <h2 class="text-2xl font-black text-gray-800 mb-3">Renouveler votre inscription</h2>
            <p class="text-gray-600 mb-6">
              Votre inscription n'est plus valide pour l'année scolaire actuelle {{ currentSchoolYear }}.<br>
              Renouvelez maintenant avec vos informations pré-remplies que vous pourrez modifier si nécessaire.
            </p>
            <button
              @click="goToRenewal"
              class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-2xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Renouveler pour {{ currentSchoolYear }}
            </button>
          </div>
        </div>

        <!-- Informations complètes -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          <!-- Informations personnelles complètes -->
          <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">Informations personnelles</h3>
                <p class="text-slate-600">Profil complet du danseur</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <!-- Identité -->
              <div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
                <h4 class="font-bold text-gray-800 mb-2">Identité</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span class="text-gray-500">Nom :</span>
                    <span class="font-semibold text-gray-800 ml-2">{{ registration.registration.dancer.lastName }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Prénom :</span>
                    <span class="font-semibold text-gray-800 ml-2">{{ registration.registration.dancer.firstName }}</span>
                  </div>
                  <div class="col-span-2">
                    <span class="text-gray-500">Date de naissance :</span>
                    <span class="font-semibold text-gray-800 ml-2">{{ formatDate(registration.registration.dancer.birthDate) }}</span>
                    <span class="text-gray-600 ml-2">({{ calculateAge(registration.registration.dancer.birthDate) }} ans)</span>
                  </div>
                </div>
              </div>

              <!-- Contact -->
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                <h4 class="font-bold text-gray-800 mb-2">Contact</h4>
                <div class="space-y-2 text-sm">
                  <div>
                    <span class="text-gray-500">Email :</span>
                    <span class="font-semibold text-gray-800 ml-2">{{ registration.registration.dancer.email }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Téléphone :</span>
                    <span class="font-semibold text-gray-800 ml-2">{{ registration.registration.dancer.phone }}</span>
                  </div>
                </div>
              </div>

              <!-- Adresse -->
              <div class="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl">
                <h4 class="font-bold text-gray-800 mb-2">Adresse</h4>
                <div class="text-sm">
                  <p class="font-semibold text-gray-800">{{ registration.registration.dancer.address }}</p>
                  <p class="text-gray-700">{{ registration.registration.dancer.postalCode }} {{ registration.registration.dancer.city }}</p>
                </div>
              </div>

              <!-- Informations supplémentaires -->
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                <h4 class="font-bold text-gray-800 mb-2">Informations complémentaires</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span class="text-gray-500">Niveau scolaire :</span>
                    <span class="font-semibold text-gray-800 ml-2">{{ formatSchoolLevel(registration.registration.dancer.schoolLevel) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Taille T-shirt :</span>
                    <span class="font-semibold text-gray-800 ml-2">{{ registration.registration.dancer.tShirtSize }}</span>
                  </div>
                </div>
                <div v-if="registration.registration.dancer.otherInfo" class="mt-2">
                  <span class="text-gray-500">Notes :</span>
                  <p class="font-semibold text-gray-800 mt-1">{{ registration.registration.dancer.otherInfo }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Groupes de danse -->
          <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12 7-12 6z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">Groupes de danse</h3>
                <p class="text-slate-600">{{ currentYearDanceGroups.length }} groupe(s) pour l'année {{ currentSchoolYear }}</p>
              </div>
            </div>
            
            <div class="space-y-4 max-h-96 overflow-y-auto">
              <div v-if="currentYearDanceGroups.length === 0" class="text-center py-8">
                <div class="bg-gray-50 rounded-xl p-6">
                  <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-3V6a3 3 0 016 0v3"/>
                  </svg>
                  <p class="text-gray-600">Aucune inscription valide pour l'année scolaire {{ currentSchoolYear }}</p>
                  <p class="text-sm text-gray-500 mt-2">Vous pouvez renouveler votre inscription si elle est disponible.</p>
                </div>
              </div>
              
              <div v-for="(group, index) in currentYearDanceGroups" :key="group.id" 
                   class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-200/50 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center">
                    <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      {{ index + 1 }}
                    </span>
                    <h4 class="font-bold text-gray-800">{{ group.name }}</h4>
                  </div>
                  <span class="px-3 py-1 rounded-full text-xs font-bold"
                        :class="getMainStatusClass(group.status).replace('px-8 py-4', 'px-3 py-1').replace('text-2xl', 'text-xs')">
                    {{ getStatusText(group.status) }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-3 ml-11">{{ group.description }}</p>
                <div class="ml-11 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span class="text-purple-600 font-semibold">📅 Horaire :</span>
                    <span class="text-gray-700 ml-1">{{ group.schedule }}</span>
                  </div>
                  <div>
                    <span class="text-purple-600 font-semibold">👥 Âge :</span>
                    <span class="text-gray-700 ml-1">{{ group.ageGroup }}</span>
                  </div>
                  <div v-if="group.sportCode" class="sm:col-span-2">
                    <span class="text-purple-600 font-semibold">🏃 Code sport :</span>
                    <span class="text-gray-700 ml-1">{{ group.sportCode }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contacts et responsables -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          <!-- Responsable légal -->
          <div v-if="registration.registration.guardian" class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">Responsable légal</h3>
                <p class="text-slate-600">Tuteur du danseur mineur</p>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl">
              <div class="flex items-center justify-between mb-3">
                <p class="font-bold text-gray-800 text-lg">
                  {{ displayValue(registration.registration.guardian.firstName, 'Prénom à compléter') }} {{ displayValue(registration.registration.guardian.lastName, 'Nom à compléter') }}
                </p>
                <span class="px-3 py-1 rounded-full text-xs font-bold" 
                      :class="registration.registration.guardian.authorized ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                  {{ registration.registration.guardian.authorized ? '✓ Autorisé' : '⏳ En attente' }}
                </span>
              </div>
              <div class="space-y-2 text-sm">
                <div>
                  <span class="text-gray-500">Email :</span>
                  <span class="font-semibold text-gray-800 ml-2">{{ displayValue(registration.registration.guardian.email, 'Email à compléter') }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Téléphone :</span>
                  <span class="font-semibold text-gray-800 ml-2">{{ displayValue(registration.registration.guardian.phone, 'Téléphone à compléter') }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Relation :</span>
                  <span class="font-semibold text-gray-800 ml-2">{{ displayValue(registration.registration.guardian.relationship, 'Relation à compléter') }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Adresse :</span>
                  <span class="font-semibold text-gray-800 ml-2">
                    {{ displayValue(registration.registration.guardian.address, 'Adresse à compléter') }}, 
                    {{ displayValue(registration.registration.guardian.postalCode, 'Code postal') }} 
                    {{ displayValue(registration.registration.guardian.city, 'Ville') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Contacts d'urgence -->
          <div v-if="registration.registration.emergencyContacts.length > 0" class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">Contacts d'urgence</h3>
                <p class="text-slate-600">{{ registration.registration.emergencyContacts.length }} contact(s) enregistré(s)</p>
              </div>
            </div>
            
            <div class="space-y-3 max-h-96 overflow-y-auto">
              <div v-for="(contact, index) in registration.registration.emergencyContacts" :key="contact.id" 
                   class="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-2xl border border-red-200/50">
                <div class="flex items-start">
                  <span class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                    {{ index + 1 }}
                  </span>
                  <div class="flex-1">
                    <p class="font-bold text-gray-800">{{ displayValue(contact.firstName, 'Prénom à compléter') }} {{ displayValue(contact.lastName, 'Nom à compléter') }}</p>
                    <p class="text-gray-700 text-sm">📞 {{ displayValue(contact.phone, 'Téléphone à compléter') }}</p>
                    <p class="text-gray-700 text-sm">👤 {{ displayValue(contact.relationship, 'Relation à compléter') }}</p>
                    <div class="mt-2">
                      <span class="text-xs px-2 py-1 rounded-full" 
                            :class="getContactTypeClass(contact.type)">
                        {{ getContactTypeText(contact.type) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes administratives si présentes -->
        <div v-if="registration.registration.notes" class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800">Notes administratives</h3>
          </div>
          <div class="bg-gray-50 rounded-xl p-5">
            <p class="text-gray-700 whitespace-pre-wrap">{{ registration.registration.notes }}</p>
          </div>
        </div>
      </div>

      <!-- No Registration -->
      <div v-else class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-3xl"></div>
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
        
        <div class="relative text-center">
          <div class="w-24 h-24 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl mx-auto mb-8">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            <span class="bg-gradient-to-r from-orange-700 to-pink-700 bg-clip-text text-transparent">
              Commencer mon inscription
            </span>
          </h2>
          
          <p class="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Vous n'avez pas encore d'inscription. Rejoignez nos cours de hip-hop en complétant votre dossier en 4 étapes simples.
          </p>

          <button
            @click="startRegistration"
            class="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-orange-500/20 inline-flex items-center space-x-3 text-sm sm:text-base"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
            <span>Commencer l'inscription</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useHead, navigateTo } from 'nuxt/app'

definePageMeta({
  middleware: 'auth'
})

// @ts-ignore - Nuxt auto-import
const { user, logout } = useAuth()

const loading = ref(true)
const registration = ref<{ hasRegistration: boolean; registration: any | null }>({ hasRegistration: false, registration: null })
const mobileMenuOpen = ref(false)

const fetchRegistration = async () => {
  try {
    const response = await $fetch('/api/inscriptions/my-registration')
    registration.value = response
    console.log(registration.value)
  } catch (error) {
    console.error('Erreur chargement inscription:', error)
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  await logout()
  await navigateTo('/')
}

const startRegistration = () => {
  navigateTo('/inscription/step-1')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

const formatSchoolLevel = (level: string) => {
  const levels: { [key: string]: string } = {
    'CP': 'CP',
    'CE1': 'CE1',
    'CE2': 'CE2',
    'CM1': 'CM1',
    'CM2': 'CM2',
    'SIXIEME': '6ème',
    'CINQUIEME': '5ème',
    'QUATRIEME': '4ème',
    'TROISIEME': '3ème',
    'SECONDE': 'Seconde',
    'PREMIERE': 'Première',
    'TERMINALE': 'Terminale',
    'POST_BAC': 'Post-Bac',
    'ADULTE': 'Adulte'
  }
  return levels[level] || level
}

const getStatusText = (status: string) => {
  const statusMap: { [key: string]: string } = {
    'DRAFT': 'Brouillon',
    'SUBMITTED': 'En attente de validation',
    'APPROVED': 'Inscription approuvée',
    'REJECTED': 'Inscription refusée'
  }
  return statusMap[status] || status
}

const getStatusDescription = (status: string) => {
  const descMap: { [key: string]: string } = {
    'DRAFT': 'Votre inscription n\'est pas encore finalisée',
    'SUBMITTED': 'Votre dossier est en cours d\'examen par l\'administration',
    'APPROVED': 'Votre inscription a été validée, bienvenue chez Square630 !',
    'REJECTED': 'Votre inscription a été refusée, veuillez contacter l\'administration'
  }
  return descMap[status] || ''
}

const getMainStatusClass = (status: string) => {
  const classMap: { [key: string]: string } = {
    'DRAFT': 'bg-gray-100 text-gray-800 border-2 border-gray-300',
    'SUBMITTED': 'bg-blue-100 text-blue-800 border-2 border-blue-300',
    'APPROVED': 'bg-green-100 text-green-800 border-2 border-green-300',
    'REJECTED': 'bg-red-100 text-red-800 border-2 border-red-300'
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const getContactTypeClass = (type: string) => {
  const classMap: { [key: string]: string } = {
    'EMERGENCY_AND_PICKUP': 'bg-red-100 text-red-800 border border-red-300',
    'EMERGENCY_ONLY': 'bg-orange-100 text-orange-800 border border-orange-300',
    'PICKUP_ONLY': 'bg-blue-100 text-blue-800 border border-blue-300'
  }
  return classMap[type] || 'bg-gray-100 text-gray-800'
}

const getContactTypeText = (type: string) => {
  const textMap: { [key: string]: string } = {
    'EMERGENCY_AND_PICKUP': '🚨 Urgence + Récupération',
    'EMERGENCY_ONLY': '🚨 Contact d\'urgence uniquement',
    'PICKUP_ONLY': '🚗 Peut récupérer l\'enfant'
  }
  return textMap[type] || type
}

const hasMedicalCertificateRequired = computed(() => {
  if (!registration.value.registration || !registration.value.registration.dancer) return false
  const otherInfo = registration.value.registration.dancer.otherInfo || ''
  return otherInfo.includes('CERTIFICAT MÉDICAL REQUIS')
})

// Helper pour gérer les valeurs vides
const displayValue = (value: string | null | undefined, fallback: string) => {
  return (value && value.trim() !== '') ? value : fallback
}

// Fonctions pour gérer les années scolaires
const getCurrentSchoolYear = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  return month >= 8 ? `${year}-${year + 1}` : `${year - 1}-${year}`
}

const getNextSchoolYear = () => {
  const current = getCurrentSchoolYear()
  const startYear = current.split('-').map(Number)[0] || new Date().getFullYear()
  return `${startYear + 1}-${startYear + 2}`
}

// Propriétés computed pour le renouvellement
const currentSchoolYear = computed(() => getCurrentSchoolYear())
const nextSchoolYear = computed(() => getNextSchoolYear())

// Obtenir le statut global de l'inscription basé sur les groupes de danse
const globalRegistrationStatus = computed(() => {
  if (!registration.value.hasRegistration || !registration.value.registration?.danceGroups) return 'DRAFT'
  
  const currentYear = getCurrentSchoolYear()
  const currentYearRegistrations = registration.value.registration.danceGroups.filter(
    (group: any) => group.schoolYear === currentYear
  )
  
  if (currentYearRegistrations.length === 0) return 'DRAFT'
  
  // Si au moins une inscription est approuvée
  if (currentYearRegistrations.some((group: any) => group.status === 'APPROVED')) {
    return 'APPROVED'
  }
  
  // Si au moins une inscription est refusée (et aucune approuvée)
  if (currentYearRegistrations.some((group: any) => group.status === 'REJECTED')) {
    return 'REJECTED'
  }
  
  // Si toutes les inscriptions sont soumises
  if (currentYearRegistrations.every((group: any) => group.status === 'SUBMITTED')) {
    return 'SUBMITTED'
  }
  
  // Par défaut
  return 'DRAFT'
})

// Obtenir la date de soumission la plus récente
const globalSubmittedAt = computed(() => {
  if (!registration.value.hasRegistration || !registration.value.registration?.danceGroups) return null
  
  const currentYear = getCurrentSchoolYear()
  const submittedDates = registration.value.registration.danceGroups
    .filter((group: any) => group.schoolYear === currentYear && group.submittedAt)
    .map((group: any) => group.submittedAt)
    .sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime())
    
  return submittedDates.length > 0 ? submittedDates[0] : null
})

// Obtenir la date de traitement la plus récente
const globalReviewedAt = computed(() => {
  if (!registration.value.hasRegistration || !registration.value.registration?.danceGroups) return null
  
  const currentYear = getCurrentSchoolYear()
  const reviewedDates = registration.value.registration.danceGroups
    .filter((group: any) => group.schoolYear === currentYear && group.reviewedAt)
    .map((group: any) => group.reviewedAt)
    .sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime())
    
  return reviewedDates.length > 0 ? reviewedDates[0] : null
})

// Filtrer les groupes de danse pour afficher tous ceux de l'année actuelle
const currentYearDanceGroups = computed(() => {
  if (!registration.value.hasRegistration || !registration.value.registration?.danceGroups) return []
  
  const currentYear = getCurrentSchoolYear()
  
  return registration.value.registration.danceGroups.filter(
    (group: any) => group.schoolYear === currentYear
  )
})

const showRenewalOption = computed(() => {
  if (!registration.value.hasRegistration || !registration.value.registration) return false
  
  const currentYear = getCurrentSchoolYear()
  
  // Vérifier si l'utilisateur a une inscription valide (SUBMITTED ou APPROVED) pour l'année scolaire actuelle
  const hasValidCurrentYearRegistration = registration.value.registration.danceGroups?.some(
    (group: any) => group.schoolYear === currentYear && ['SUBMITTED', 'APPROVED'].includes(group.status)
  )
  
  // Afficher l'option de renouvellement SEULEMENT si pas d'inscription valide pour l'année actuelle
  return !hasValidCurrentYearRegistration
})

const goToRenewal = () => {
  // Rediriger vers la page de renouvellement
  navigateTo('/renouvellement')
}

onMounted(async () => {
  // Rediriger les admins vers le panel admin
  if (user.value?.role === 'admin') {
    await navigateTo('/admin/panel')
    return
  }
  
  fetchRegistration()
})

// Meta
useHead({
  title: 'Mon Espace Danseur • Square630',
  meta: [
    { name: 'description', content: 'Espace personnel Square630 - Suivi de mon inscription hip-hop' }
  ]
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-slide-in {
  animation: slide-in 0.8s ease-out forwards;
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>