<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <!-- Header avec navigation -->
    <div class="relative z-20 bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div class="flex items-center space-x-3 sm:space-x-4">
            <NuxtLink 
              to="/admin/panel" 
              class="flex items-center space-x-2 text-white hover:text-orange-200 transition-colors text-sm sm:text-base"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span class="hidden sm:inline">Retour au panel</span>
              <span class="sm:hidden">Retour</span>
            </NuxtLink>
            <div class="h-4 sm:h-6 w-px bg-white/20"></div>
            <h1 class="text-lg sm:text-xl font-bold text-white">Détail de l'inscription</h1>
          </div>
          
          <!-- Actions -->
          <div class="flex flex-wrap gap-2 sm:gap-3" v-if="registration">
            <button
              @click="printRegistration"
              class="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span class="hidden sm:inline">Imprimer</span>
              <span class="sm:hidden">Print</span>
            </button>

            <button
              v-if="!editMode"
              @click="toggleEditMode"
              class="px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span class="hidden sm:inline">Modifier</span>
              <span class="sm:hidden">Edit</span>
            </button>

            <button
              v-if="editMode"
              @click="saveChanges"
              :disabled="savingChanges"
              class="px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
            >
              <div v-if="savingChanges" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="hidden sm:inline">Sauvegarder</span>
              <span class="sm:hidden">Save</span>
            </button>

            <button
              v-if="editMode"
              @click="cancelEdit"
              class="px-3 py-2 sm:px-4 sm:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="hidden sm:inline">Annuler</span>
              <span class="sm:hidden">Cancel</span>
            </button>
            
            <button
              v-if="registration.status !== 'APPROVED'"
              @click="updateStatus('APPROVED')"
              :disabled="loading"
              class="px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="hidden sm:inline">{{ registration.status === 'REJECTED' ? 'Approuver finalement' : 'Approuver' }}</span>
              <span class="sm:hidden">✓</span>
            </button>
            
            <button
              v-if="registration.status !== 'REJECTED'"
              @click="updateStatus('REJECTED')"
              :disabled="loading"
              class="px-3 py-2 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="hidden sm:inline">{{ registration.status === 'APPROVED' ? 'Rejeter finalement' : 'Rejeter' }}</span>
              <span class="sm:hidden">✗</span>
            </button>
            
            <button
              v-if="registration.status !== 'SUBMITTED'"
              @click="updateStatus('SUBMITTED')"
              :disabled="loading"
              class="px-3 py-2 sm:px-4 sm:py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="hidden sm:inline">Remettre en attente</span>
              <span class="sm:hidden">⏳</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="pending" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <p class="text-white mt-4 ml-4">Chargement...</p>
      </div>

      <div v-else-if="error" class="bg-white/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 text-center">
        <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="text-lg font-medium text-white mb-2">Erreur</h3>
        <p class="text-red-300">{{ error }}</p>
      </div>

      <div v-else-if="registration" class="space-y-6">
        <!-- Header avec statut -->
        <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-lg">
                    {{ registration.dancer.firstName.charAt(0) }}{{ registration.dancer.lastName.charAt(0) }}
                  </span>
                </div>
                <div>
                  <div v-if="editMode" class="grid grid-cols-2 gap-3 mb-2">
                    <input v-model="editableData.firstName" 
                           type="text" 
                           placeholder="Prénom"
                           class="bg-white/10 border rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xl font-bold"
                           :class="validationErrors.firstName ? 'border-red-500' : 'border-white/20'"
                    />
                    <p v-if="validationErrors.firstName" class="text-red-400 text-xs mt-1">{{ validationErrors.firstName }}</p>
                    <input v-model="editableData.lastName" 
                           type="text" 
                           placeholder="Nom de famille"
                           class="bg-white/10 border rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xl font-bold"
                           :class="validationErrors.lastName ? 'border-red-500' : 'border-white/20'"
                    />
                    <p v-if="validationErrors.lastName" class="text-red-400 text-xs mt-1">{{ validationErrors.lastName }}</p>
                  </div>
                  <h2 v-else class="text-2xl font-bold text-white">
                    {{ registration.dancer.firstName }} {{ registration.dancer.lastName }}
                  </h2>
                  <p class="text-orange-100/60">Inscription #{{ registration.id }}</p>
                </div>
              </div>
              <div class="flex flex-wrap gap-4 text-sm text-orange-100/80">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Inscrit le {{ formatDate(registration.createdAt) }}
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  {{ registration.danceGroup.name }}
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <div class="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold"
                   :class="getStatusClass(registration.status)">
                <div class="w-3 h-3 rounded-full mr-3"
                     :class="getStatusDotClass(registration.status)"></div>
                {{ getStatusText(registration.status) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Layout en 2 colonnes -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Colonne principale -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Informations personnelles -->
            <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                <svg class="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Informations personnelles
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-4">
                  <div>
                    <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Date de naissance</label>
                    <input v-if="editMode" 
                           v-model="editableData.birthDate" 
                           type="date" 
                           class="mt-1 block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <p v-else class="text-white mt-1">
                      {{ formatDate(registration.dancer.birthDate) }}
                      <span v-if="calculateAge(registration.dancer.birthDate) !== null"
                            class="ml-2 text-orange-200/80 text-sm">
                        ({{ calculateAge(registration.dancer.birthDate) }} ans)
                      </span>
                    </p>
                  </div>
                  <div>
                    <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Email</label>
                    <input v-if="editMode" 
                           v-model="editableData.email" 
                           type="email" 
                           class="mt-1 block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <p v-else class="text-white mt-1">{{ registration.dancer.user?.email }}</p>
                  </div>
                  <div>
                    <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Téléphone</label>
                    <input v-if="editMode" 
                           v-model="editableData.phone" 
                           type="tel" 
                           class="mt-1 block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <p v-else class="text-white mt-1">{{ registration.dancer.phone || 'Non renseigné' }}</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Adresse</label>
                    <input v-if="editMode" 
                           v-model="editableData.address" 
                           type="text" 
                           class="mt-1 block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <div v-if="editMode" class="grid grid-cols-2 gap-2 mt-2">
                      <input v-model="editableData.postalCode" 
                             type="text" 
                             placeholder="Code postal"
                             class="block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <input v-model="editableData.city" 
                             type="text" 
                             placeholder="Ville"
                             class="block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div v-else>
                      <p class="text-white mt-1">{{ registration.dancer.address }}</p>
                      <p class="text-orange-100/80 text-sm">{{ registration.dancer.postalCode }} {{ registration.dancer.city }}</p>
                    </div>
                  </div>
                  <div>
                    <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Niveau scolaire</label>
                    <select v-if="editMode" 
                            v-model="editableData.schoolLevel" 
                            class="mt-1 block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="" class="text-gray-900">-- Sélectionner --</option>
                      <option value="GS" class="text-gray-900">Grande Section</option>
                      <option value="CP" class="text-gray-900">CP</option>
                      <option value="CE1" class="text-gray-900">CE1</option>
                      <option value="CE2" class="text-gray-900">CE2</option>
                      <option value="CM1" class="text-gray-900">CM1</option>
                      <option value="CM2" class="text-gray-900">CM2</option>
                      <option value="SIXIEME" class="text-gray-900">6ème</option>
                      <option value="CINQUIEME" class="text-gray-900">5ème</option>
                      <option value="QUATRIEME" class="text-gray-900">4ème</option>
                      <option value="TROISIEME" class="text-gray-900">3ème</option>
                      <option value="SECONDE" class="text-gray-900">Seconde</option>
                      <option value="PREMIERE" class="text-gray-900">Première</option>
                      <option value="TERMINALE" class="text-gray-900">Terminale</option>
                      <option value="POST_BAC" class="text-gray-900">Études supérieures</option>
                      <option value="ADULTE" class="text-gray-900">Adulte +25 ans</option>
                    </select>
                    <p v-else class="text-white mt-1">{{ registration.dancer.schoolLevel || 'Non renseigné' }}</p>
                  </div>
                  <div>
                    <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Taille T-shirt</label>
                    <select v-if="editMode" 
                            v-model="editableData.tShirtSize" 
                            class="mt-1 block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="" class="text-gray-900">-- Sélectionner --</option>
                      <option value="6" class="text-gray-900">6 ans</option>
                      <option value="8" class="text-gray-900">8 ans</option>
                      <option value="10" class="text-gray-900">10 ans</option>
                      <option value="12" class="text-gray-900">12 ans</option>
                      <option value="14" class="text-gray-900">14 ans</option>
                      <option value="16" class="text-gray-900">16 ans</option>
                      <option value="XXS" class="text-gray-900">XXS</option>
                      <option value="XS" class="text-gray-900">XS</option>
                      <option value="S" class="text-gray-900">S</option>
                      <option value="M" class="text-gray-900">M</option>
                      <option value="L" class="text-gray-900">L</option>
                      <option value="XL" class="text-gray-900">XL</option>
                      <option value="XXL" class="text-gray-900">XXL</option>
                      <option value="XXXL" class="text-gray-900">XXXL</option>
                    </select>
                    <p v-else class="text-white mt-1">{{ registration.dancer.tShirtSize || 'Non renseigné' }}</p>
                  </div>
                </div>
              </div>

              <div v-if="editMode || registration.dancer.medicalInfo || registration.dancer.otherInfo" class="mt-6 pt-6 border-t border-white/10">
                <div class="mb-4">
                  <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Informations médicales</label>
                  <textarea v-if="editMode" 
                            v-model="editableData.medicalInfo" 
                            rows="3" 
                            placeholder="Informations médicales importantes à signaler..."
                            class="mt-2 block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  ></textarea>
                  <div v-else-if="registration.dancer.medicalInfo" class="mt-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                    <p class="text-white">{{ registration.dancer.medicalInfo }}</p>
                  </div>
                </div>
                <div>
                  <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Autres informations</label>
                  <textarea v-if="editMode" 
                            v-model="editableData.otherInfo" 
                            rows="3" 
                            placeholder="Autres informations utiles..."
                            class="mt-2 block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  ></textarea>
                  <p v-else-if="registration.dancer.otherInfo" class="text-white mt-2">{{ registration.dancer.otherInfo }}</p>
                </div>
              </div>
            </div>

            <!-- Responsable légal et contacts -->
            <div v-if="editMode || registration.dancer.guardian || (registration.dancer.emergencyContacts && registration.dancer.emergencyContacts.length > 0)"
                 class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                <svg class="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                Contacts
              </h3>

              <!-- Responsable légal -->
              <div v-if="editMode" class="mb-6">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-orange-100/80 font-medium">Responsable légal</h4>
                  <button v-if="!editableGuardian"
                          @click="addGuardian"
                          class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Ajouter
                  </button>
                </div>
                <div v-if="!editableGuardian" class="text-orange-100/60 text-sm">
                  Aucun responsable légal enregistré
                </div>
                <div v-else class="bg-white/5 rounded-lg p-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Prénom *</label>
                      <input v-model="editableGuardian.firstName"
                             type="text"
                             class="mt-1 block w-full bg-white/10 border rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                             :class="validationErrors.guardian?.firstName ? 'border-red-500' : 'border-white/20'"
                      />
                      <p v-if="validationErrors.guardian?.firstName" class="text-red-400 text-xs mt-1">{{ validationErrors.guardian.firstName }}</p>
                    </div>
                    <div>
                      <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Nom *</label>
                      <input v-model="editableGuardian.lastName"
                             type="text"
                             class="mt-1 block w-full bg-white/10 border rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                             :class="validationErrors.guardian?.lastName ? 'border-red-500' : 'border-white/20'"
                      />
                      <p v-if="validationErrors.guardian?.lastName" class="text-red-400 text-xs mt-1">{{ validationErrors.guardian.lastName }}</p>
                    </div>
                    <div>
                      <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Relation</label>
                      <input v-model="editableGuardian.relationship"
                             type="text"
                             placeholder="Parent"
                             class="mt-1 block w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Téléphone *</label>
                      <input v-model="editableGuardian.phone"
                             type="tel"
                             class="mt-1 block w-full bg-white/10 border rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                             :class="validationErrors.guardian?.phone ? 'border-red-500' : 'border-white/20'"
                      />
                      <p v-if="validationErrors.guardian?.phone" class="text-red-400 text-xs mt-1">{{ validationErrors.guardian.phone }}</p>
                    </div>
                    <div class="md:col-span-2">
                      <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Email *</label>
                      <input v-model="editableGuardian.email"
                             type="email"
                             class="mt-1 block w-full bg-white/10 border rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                             :class="validationErrors.guardian?.email ? 'border-red-500' : 'border-white/20'"
                      />
                      <p v-if="validationErrors.guardian?.email" class="text-red-400 text-xs mt-1">{{ validationErrors.guardian.email }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="registration.dancer.guardian" class="mb-6">
                <h4 class="text-orange-100/80 font-medium mb-3">Responsable légal</h4>
                <div class="bg-white/5 rounded-lg p-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Nom complet</label>
                      <p class="text-white mt-1">{{ registration.dancer.guardian.firstName }} {{ registration.dancer.guardian.lastName }}</p>
                    </div>
                    <div>
                      <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Relation</label>
                      <p class="text-white mt-1">{{ registration.dancer.guardian.relationship }}</p>
                    </div>
                    <div>
                      <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Email</label>
                      <p class="text-white mt-1">{{ registration.dancer.guardian.email }}</p>
                    </div>
                    <div>
                      <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Téléphone</label>
                      <p class="text-white mt-1">{{ registration.dancer.guardian.phone }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contacts d'urgence -->
              <div>
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-orange-100/80 font-medium">Contacts d'urgence</h4>
                  <button v-if="editMode" 
                          @click="addEmergencyContact"
                          class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Ajouter
                  </button>
                </div>
                
                <div v-if="!editMode && (!registration.dancer.emergencyContacts || registration.dancer.emergencyContacts.length === 0)" class="text-orange-100/60 text-sm">
                  Aucun contact d'urgence enregistré
                </div>
                
                <div class="space-y-3">
                  <!-- Contacts existants -->
                  <div v-for="(contact, index) in (editMode ? editableEmergencyContacts : registration.dancer.emergencyContacts)" :key="contact.id || index"
                       class="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-2">
                        <div class="w-6 h-6 bg-red-500/30 rounded-full flex items-center justify-center">
                          <span class="text-red-200 text-xs font-bold">{{ index + 1 }}</span>
                        </div>
                        <span v-if="!editMode" class="text-white font-medium">{{ contact.firstName }} {{ contact.lastName }}</span>
                      </div>
                      <button v-if="editMode" 
                              @click="removeEmergencyContact(index)"
                              class="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div v-if="editMode" class="space-y-3 mb-3">
                      <div>
                        <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Type de contact</label>
                        <select v-model="contact.type" 
                                class="mt-1 w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                          <option value="EMERGENCY_AND_PICKUP" class="text-gray-900">Urgence et récupération</option>
                          <option value="EMERGENCY_ONLY" class="text-gray-900">Urgence seulement</option>
                          <option value="PICKUP_ONLY" class="text-gray-900">Récupération seulement</option>
                        </select>
                      </div>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <input v-model="contact.firstName" 
                                 type="text" 
                                 placeholder="Prénom"
                                 class="w-full bg-white/10 border rounded px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                 :class="validationErrors[`contact_${index}`]?.firstName ? 'border-red-500' : 'border-white/20'"
                          />
                          <p v-if="validationErrors[`contact_${index}`]?.firstName" class="text-red-400 text-xs mt-1">
                            {{ validationErrors[`contact_${index}`].firstName }}
                          </p>
                        </div>
                        <div>
                          <input v-model="contact.lastName" 
                                 type="text" 
                                 placeholder="Nom"
                                 class="w-full bg-white/10 border rounded px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                 :class="validationErrors[`contact_${index}`]?.lastName ? 'border-red-500' : 'border-white/20'"
                          />
                          <p v-if="validationErrors[`contact_${index}`]?.lastName" class="text-red-400 text-xs mt-1">
                            {{ validationErrors[`contact_${index}`].lastName }}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Type</label>
                        <p v-if="!editMode" class="text-orange-100/80 mt-1">
                          {{ contact.type === 'EMERGENCY_AND_PICKUP' ? 'Urgence et récupération' :
                             contact.type === 'EMERGENCY_ONLY' ? 'Urgence seulement' :
                             contact.type === 'PICKUP_ONLY' ? 'Récupération seulement' : contact.type }}
                        </p>
                      </div>
                      <div>
                        <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Relation</label>
                        <div v-if="editMode">
                          <input v-model="contact.relationship" 
                                 type="text" 
                                 placeholder="Relation (ex: Mère, Père, Ami...)"
                                 class="mt-1 w-full bg-white/10 border rounded px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                 :class="validationErrors[`contact_${index}`]?.relationship ? 'border-red-500' : 'border-white/20'"
                          />
                          <p v-if="validationErrors[`contact_${index}`]?.relationship" class="text-red-400 text-xs mt-1">
                            {{ validationErrors[`contact_${index}`].relationship }}
                          </p>
                        </div>
                        <p v-else class="text-orange-100/80 mt-1">{{ contact.relationship }}</p>
                      </div>
                      <div>
                        <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Téléphone</label>
                        <div v-if="editMode">
                          <input v-model="contact.phone" 
                                 type="tel" 
                                 placeholder="Téléphone"
                                 class="mt-1 w-full bg-white/10 border rounded px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                 :class="validationErrors[`contact_${index}`]?.phone ? 'border-red-500' : 'border-white/20'"
                          />
                          <p v-if="validationErrors[`contact_${index}`]?.phone" class="text-red-400 text-xs mt-1">
                            {{ validationErrors[`contact_${index}`].phone }}
                          </p>
                        </div>
                        <p v-else class="text-orange-100/80 mt-1">{{ contact.phone }}</p>
                      </div>
                      <div>
                        <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Email (optionnel)</label>
                        <div v-if="editMode">
                          <input v-model="contact.email" 
                                 type="email" 
                                 placeholder="Email (optionnel)"
                                 class="mt-1 w-full bg-white/10 border rounded px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                 :class="validationErrors[`contact_${index}`]?.email ? 'border-red-500' : 'border-white/20'"
                          />
                          <p v-if="validationErrors[`contact_${index}`]?.email" class="text-red-400 text-xs mt-1">
                            {{ validationErrors[`contact_${index}`].email }}
                          </p>
                        </div>
                        <p v-else-if="contact.email" class="text-orange-100/80 mt-1">{{ contact.email }}</p>
                        <p v-else class="text-orange-100/60 mt-1 text-xs">Non renseigné</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Colonne latérale -->
          <div class="space-y-6">
            <!-- Groupe de danse -->
            <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                <svg class="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-4H3m12 8H7"/>
                </svg>
                Groupe de danse
              </h3>
              
              <div class="space-y-4">
                <div class="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4">
                  <h4 class="text-white font-bold text-lg mb-2">{{ registration.danceGroup.name }}</h4>
                  <p class="text-orange-100/90 text-sm mb-3">{{ registration.danceGroup.description }}</p>
                  
                  <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-orange-100/80">{{ registration.danceGroup.schedule }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <span class="text-orange-100/80">{{ registration.danceGroup.ageGroup }}</span>
                    </div>
                    <div v-if="editMode" class="pt-2">
                      <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Code sport (Pass'Sport)</label>
                      <input v-model="editableSportCode"
                             type="text"
                             maxlength="50"
                             placeholder="Aucun code"
                             class="mt-1 block w-full bg-white/10 border rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                             :class="validationErrors.sportCode ? 'border-red-500' : 'border-white/20'"
                      />
                      <p v-if="validationErrors.sportCode" class="text-red-400 text-xs mt-1">{{ validationErrors.sportCode }}</p>
                      <p class="text-orange-100/50 text-xs mt-1">Appliqué à toutes les inscriptions du danseur pour cette année.</p>
                    </div>
                    <div v-else-if="registration.sportCode" class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      <span class="text-orange-100/80">Code sport: {{ registration.sportCode }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Informations de révision -->
            <div v-if="registration.reviewer || registration.reviewedAt" 
                 class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                <svg class="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Révision
              </h3>
              
              <div class="space-y-4">
                <div v-if="registration.reviewer">
                  <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Révisé par</label>
                  <p class="text-white mt-1">{{ registration.reviewer.email }}</p>
                </div>
                <div v-if="registration.reviewedAt">
                  <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Date</label>
                  <p class="text-white mt-1">{{ formatDate(registration.reviewedAt) }}</p>
                </div>
                <div v-if="registration.notes">
                  <label class="text-xs font-medium text-orange-100/60 uppercase tracking-wide">Notes</label>
                  <div class="mt-2 bg-white/10 border border-white/20 rounded-lg p-3">
                    <p class="text-white text-sm">{{ registration.notes }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast notifications -->
    <div v-if="toast.show" class="fixed bottom-4 right-4 z-50">
      <div class="bg-white/10 backdrop-blur-xl border-l-4 border-green-400 rounded-lg shadow-lg p-4 max-w-sm border border-white/20">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-white">{{ toast.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const route = useRoute()
const registrationId = parseInt(route.params.id)

const { data: registration, pending, error, refresh } = await useFetch(`/api/admin/registrations/${registrationId}`, {
  transform: (data) => data.registration
})

const loading = ref(false)
const editMode = ref(false)
const savingChanges = ref(false)
const editableData = ref({})
const originalData = ref({})
const editableEmergencyContacts = ref([])
const editableGuardian = ref(null)
const editableSportCode = ref('')
const validationErrors = ref({})
const toast = ref({
  show: false,
  message: ''
})

const updateStatus = async (newStatus) => {
  loading.value = true
  
  try {
    const response = await $fetch(`/api/admin/registrations/${registrationId}`, {
      method: 'PUT',
      body: { status: newStatus }
    })
    
    if (response.success) {
      await refresh()
      showToast(`Inscription ${newStatus === 'APPROVED' ? 'approuvée' : 'rejetée'} avec succès`)
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    showToast('Erreur lors de la mise à jour du statut', 'error')
  } finally {
    loading.value = false
  }
}

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const printRegistration = () => {
  // Créer une nouvelle fenêtre pour l'impression
  const printWindow = window.open('', '_blank')
  
  if (!printWindow || !registration.value) return
  
  // Contenu HTML pour l'impression
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Inscription - ${registration.value.dancer.firstName} ${registration.value.dancer.lastName}</title>
      <style>
        @page {
          size: A4;
          margin: 2cm;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 210mm;
          margin: 0 auto;
          background: white;
        }
        
        .header {
          text-align: center;
          border-bottom: 3px solid #ea580c;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .header h1 {
          color: #ea580c;
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        
        .header p {
          color: #666;
          margin: 5px 0;
          font-size: 14px;
        }
        
        .dancer-info {
          background: #fff;
          border: 2px solid #ea580c;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
        }
        
        .dancer-info h2 {
          color: #ea580c;
          margin: 0 0 15px 0;
          font-size: 24px;
          text-align: center;
        }
        
        .status-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
          margin-left: 10px;
        }
        
        .status-submitted { background: #fef3c7; color: #92400e; }
        .status-approved { background: #d1fae5; color: #065f46; }
        .status-rejected { background: #fee2e2; color: #991b1b; }
        .status-draft { background: #f3f4f6; color: #374151; }
        
        .section {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }
        
        .section h3 {
          color: #ea580c;
          font-size: 18px;
          margin: 0 0 15px 0;
          padding-bottom: 5px;
          border-bottom: 2px solid #fed7aa;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .info-item {
          margin-bottom: 15px;
        }
        
        .info-label {
          font-weight: bold;
          color: #374151;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 3px;
          display: block;
        }
        
        .info-value {
          color: #111827;
          font-size: 14px;
        }
        
        .dance-group {
          background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        
        .dance-group h4 {
          color: #9a3412;
          font-size: 20px;
          margin: 0 0 10px 0;
        }
        
        .dance-group p {
          color: #9a3412;
          margin: 5px 0;
        }
        
        .contact-card {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
        }
        
        .contact-card h4 {
          color: #dc2626;
          margin: 0 0 10px 0;
          font-size: 16px;
        }
        
        .emergency-number {
          background: #dc2626;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          margin-right: 10px;
        }
        
        .medical-alert {
          background: #fef3c7;
          border: 2px solid #f59e0b;
          border-radius: 8px;
          padding: 15px;
          margin-top: 15px;
        }
        
        .medical-alert .info-value {
          color: #92400e;
          font-weight: 500;
        }
        
        .review-section {
          background: #f3f4f6;
          border-radius: 8px;
          padding: 15px;
        }
        
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #d1d5db;
          color: #6b7280;
          font-size: 12px;
        }
        
        @media print {
          body { -webkit-print-color-adjust: exact; }
          .page-break { page-break-before: always; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>FICHE D'INSCRIPTION</h1>
        <p>École de Danse</p>
        <p>Inscription #${registration.value.id} - ${formatDate(registration.value.createdAt)}</p>
      </div>
      
      <div class="dancer-info">
        <h2>
          ${registration.value.dancer.firstName} ${registration.value.dancer.lastName}
          <span class="status-badge status-${registration.value.status.toLowerCase()}">
            ${getStatusText(registration.value.status)}
          </span>
        </h2>
      </div>
      
      <div class="section">
        <h3>Informations Personnelles</h3>
        <div class="info-grid">
          <div>
            <div class="info-item">
              <span class="info-label">Date de naissance</span>
              <div class="info-value">${formatDate(registration.value.dancer.birthDate)}${calculateAge(registration.value.dancer.birthDate) !== null ? ' (' + calculateAge(registration.value.dancer.birthDate) + ' ans)' : ''}</div>
            </div>
            <div class="info-item">
              <span class="info-label">Email</span>
              <div class="info-value">${registration.value.dancer.user?.email || 'Non renseigné'}</div>
            </div>
            <div class="info-item">
              <span class="info-label">Téléphone</span>
              <div class="info-value">${registration.value.dancer.phone || 'Non renseigné'}</div>
            </div>
          </div>
          <div>
            <div class="info-item">
              <span class="info-label">Adresse complète</span>
              <div class="info-value">
                ${registration.value.dancer.address}<br>
                ${registration.value.dancer.postalCode} ${registration.value.dancer.city}
              </div>
            </div>
            <div class="info-item">
              <span class="info-label">Niveau scolaire</span>
              <div class="info-value">${registration.value.dancer.schoolLevel || 'Non renseigné'}</div>
            </div>
            <div class="info-item">
              <span class="info-label">Taille T-shirt</span>
              <div class="info-value">${registration.value.dancer.tShirtSize || 'Non renseigné'}</div>
            </div>
          </div>
        </div>
        
        ${registration.value.dancer.medicalInfo ? `
          <div class="medical-alert">
            <span class="info-label">⚠️ Informations médicales importantes</span>
            <div class="info-value">${registration.value.dancer.medicalInfo}</div>
          </div>
        ` : ''}
        
        ${registration.value.dancer.otherInfo ? `
          <div class="info-item">
            <span class="info-label">Autres informations</span>
            <div class="info-value">${registration.value.dancer.otherInfo}</div>
          </div>
        ` : ''}
      </div>
      
      <div class="section">
        <h3>Groupe de Danse</h3>
        <div class="dance-group">
          <h4>${registration.value.danceGroup.name}</h4>
          <p><strong>Description:</strong> ${registration.value.danceGroup.description}</p>
          <p><strong>Horaires:</strong> ${registration.value.danceGroup.schedule}</p>
          <p><strong>Groupe d'âge:</strong> ${registration.value.danceGroup.ageGroup}</p>
          ${registration.value.sportCode ? `<p><strong>Code sport:</strong> ${registration.value.sportCode}</p>` : ''}
        </div>
      </div>
      
      ${registration.value.dancer.guardian ? `
        <div class="section">
          <h3>Responsable Légal</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nom complet</span>
              <div class="info-value">${registration.value.dancer.guardian.firstName} ${registration.value.dancer.guardian.lastName}</div>
            </div>
            <div class="info-item">
              <span class="info-label">Relation</span>
              <div class="info-value">${registration.value.dancer.guardian.relationship}</div>
            </div>
            <div class="info-item">
              <span class="info-label">Email</span>
              <div class="info-value">${registration.value.dancer.guardian.email}</div>
            </div>
            <div class="info-item">
              <span class="info-label">Téléphone</span>
              <div class="info-value">${registration.value.dancer.guardian.phone}</div>
            </div>
          </div>
        </div>
      ` : ''}
      
      ${registration.value.dancer.emergencyContacts?.length ? `
        <div class="section">
          <h3>Contacts d'Urgence</h3>
          ${registration.value.dancer.emergencyContacts.map((contact, index) => `
            <div class="contact-card">
              <h4>
                <span class="emergency-number">${index + 1}</span>
                ${contact.firstName} ${contact.lastName}
              </h4>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Relation</span>
                  <div class="info-value">${contact.relationship}</div>
                </div>
                <div class="info-item">
                  <span class="info-label">Téléphone</span>
                  <div class="info-value">${contact.phone}</div>
                </div>
                ${contact.email ? `
                  <div class="info-item">
                    <span class="info-label">Email</span>
                    <div class="info-value">${contact.email}</div>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${registration.value.reviewer || registration.value.reviewedAt ? `
        <div class="section">
          <h3>Informations de Révision</h3>
          <div class="review-section">
            ${registration.value.reviewer ? `
              <div class="info-item">
                <span class="info-label">Révisé par</span>
                <div class="info-value">${registration.value.reviewer.email}</div>
              </div>
            ` : ''}
            ${registration.value.reviewedAt ? `
              <div class="info-item">
                <span class="info-label">Date de révision</span>
                <div class="info-value">${formatDate(registration.value.reviewedAt)}</div>
              </div>
            ` : ''}
            ${registration.value.notes ? `
              <div class="info-item">
                <span class="info-label">Notes de révision</span>
                <div class="info-value">${registration.value.notes}</div>
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}
      
      <div class="footer">
        <p>Document généré le ${new Date().toLocaleDateString('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
        <p>École de Danse - Système de Gestion des Inscriptions</p>
      </div>
    </body>
    </html>
  `
  
  // Écrire le contenu dans la nouvelle fenêtre
  printWindow.document.write(printContent)
  printWindow.document.close()
  
  // Attendre que le contenu soit chargé puis imprimer
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)
  }
}

const formatDate = (date) => {
  if (!date) return 'Non renseigné'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Âge révolu à la date du jour. On compare le mois puis le jour, sinon on
// compterait une année en trop tant que l'anniversaire n'est pas passé.
const calculateAge = (date) => {
  if (!date) return null
  const naissance = new Date(date)
  if (isNaN(naissance.getTime())) return null
  const aujourdhui = new Date()
  let age = aujourdhui.getFullYear() - naissance.getFullYear()
  const ecartMois = aujourdhui.getMonth() - naissance.getMonth()
  if (ecartMois < 0 || (ecartMois === 0 && aujourdhui.getDate() < naissance.getDate())) {
    age--
  }
  return age >= 0 ? age : null
}

const getStatusClass = (status) => {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-100 text-green-800'
    case 'REJECTED':
      return 'bg-red-100 text-red-800'
    case 'SUBMITTED':
      return 'bg-yellow-100 text-yellow-800'
    case 'DRAFT':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusDotClass = (status) => {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-400'
    case 'REJECTED':
      return 'bg-red-400'
    case 'SUBMITTED':
      return 'bg-yellow-400'
    case 'DRAFT':
      return 'bg-gray-400'
    default:
      return 'bg-gray-400'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'APPROVED':
      return 'Approuvée'
    case 'REJECTED':
      return 'Rejetée'
    case 'SUBMITTED':
      return 'En attente'
    case 'DRAFT':
      return 'Brouillon'
    default:
      return 'Inconnu'
  }
}

const toggleEditMode = () => {
  if (!editMode.value) {
    // Entrer en mode édition - copier les données actuelles
    originalData.value = JSON.parse(JSON.stringify(registration.value.dancer))
    editableData.value = JSON.parse(JSON.stringify(registration.value.dancer))
    
    // Copier les contacts d'urgence pour l'édition
    editableEmergencyContacts.value = JSON.parse(JSON.stringify(registration.value.dancer.emergencyContacts || []))

    // Copier le responsable légal (null s'il n'y en a pas) et le code sport
    editableGuardian.value = registration.value.dancer.guardian
      ? JSON.parse(JSON.stringify(registration.value.dancer.guardian))
      : null
    editableSportCode.value = registration.value.sportCode || ''

    // Formater la date pour l'input date
    if (editableData.value.birthDate) {
      const date = new Date(editableData.value.birthDate)
      editableData.value.birthDate = date.toISOString().split('T')[0]
    }
    
    editMode.value = true
  }
}

const cancelEdit = () => {
  editMode.value = false
  editableData.value = {}
  originalData.value = {}
  editableEmergencyContacts.value = []
  editableGuardian.value = null
  editableSportCode.value = ''
  validationErrors.value = {}
}

const validateDancerData = () => {
  const errors = {}
  
  // Validation prénom
  if (!editableData.value.firstName || editableData.value.firstName.trim() === '') {
    errors.firstName = 'Le prénom est obligatoire'
  } else if (editableData.value.firstName.length < 2) {
    errors.firstName = 'Le prénom doit contenir au moins 2 caractères'
  }
  
  // Validation nom
  if (!editableData.value.lastName || editableData.value.lastName.trim() === '') {
    errors.lastName = 'Le nom est obligatoire'
  } else if (editableData.value.lastName.length < 2) {
    errors.lastName = 'Le nom doit contenir au moins 2 caractères'
  }
  
  // Validation email
  if (editableData.value.email && editableData.value.email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(editableData.value.email)) {
      errors.email = 'L\'adresse email n\'est pas valide'
    }
  }
  
  // Validation téléphone
  if (editableData.value.phone && editableData.value.phone.trim() !== '') {
    const phoneRegex = /^[\d\s\-\.\+\(\)]{10,}$/
    if (!phoneRegex.test(editableData.value.phone)) {
      errors.phone = 'Le numéro de téléphone n\'est pas valide'
    }
  }
  
  // Validation date de naissance
  if (editableData.value.birthDate) {
    const birthDate = new Date(editableData.value.birthDate)
    const today = new Date()
    if (birthDate > today) {
      errors.birthDate = 'La date de naissance ne peut pas être dans le futur'
    }
  }
  
  // Validation adresse
  if (editableData.value.address && editableData.value.address.length < 5) {
    errors.address = 'L\'adresse doit contenir au moins 5 caractères'
  }
  
  // Validation code postal
  if (editableData.value.postalCode) {
    const postalCodeRegex = /^\d{5}$/
    if (!postalCodeRegex.test(editableData.value.postalCode)) {
      errors.postalCode = 'Le code postal doit contenir 5 chiffres'
    }
  }
  
  // Validation ville
  if (editableData.value.city && editableData.value.city.length < 2) {
    errors.city = 'La ville doit contenir au moins 2 caractères'
  }
  
  return errors
}

const validateEmergencyContacts = () => {
  const errors = {}
  
  editableEmergencyContacts.value.forEach((contact, index) => {
    const contactErrors = {}
    
    // Validation prénom
    if (!contact.firstName || contact.firstName.trim() === '') {
      contactErrors.firstName = 'Le prénom est obligatoire'
    }
    
    // Validation nom
    if (!contact.lastName || contact.lastName.trim() === '') {
      contactErrors.lastName = 'Le nom est obligatoire'
    }
    
    // Validation téléphone
    if (!contact.phone || contact.phone.trim() === '') {
      contactErrors.phone = 'Le téléphone est obligatoire'
    } else {
      const phoneRegex = /^[\d\s\-\.\+\(\)]{10,}$/
      if (!phoneRegex.test(contact.phone)) {
        contactErrors.phone = 'Le numéro de téléphone n\'est pas valide'
      }
    }
    
    // Validation relation
    if (!contact.relationship || contact.relationship.trim() === '') {
      contactErrors.relationship = 'La relation est obligatoire'
    }
    
    // Validation email (optionnel mais format validé si fourni)
    if (contact.email && contact.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(contact.email)) {
        contactErrors.email = 'L\'adresse email n\'est pas valide'
      }
    }
    
    if (Object.keys(contactErrors).length > 0) {
      errors[`contact_${index}`] = contactErrors
    }
  })
  
  return errors
}

const addGuardian = () => {
  editableGuardian.value = {
    firstName: '',
    lastName: '',
    relationship: 'Parent',
    email: '',
    phone: ''
  }
}

const validateGuardian = () => {
  const errors = {}
  const guardian = editableGuardian.value

  // Pas de responsable légal en cours d'édition : rien à valider
  if (!guardian) return errors

  const guardianErrors = {}

  if (!guardian.firstName || guardian.firstName.trim() === '') {
    guardianErrors.firstName = 'Le prénom est obligatoire'
  }

  if (!guardian.lastName || guardian.lastName.trim() === '') {
    guardianErrors.lastName = 'Le nom est obligatoire'
  }

  if (!guardian.email || guardian.email.trim() === '') {
    guardianErrors.email = 'L\'email est obligatoire'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guardian.email.trim())) {
    guardianErrors.email = 'L\'adresse email n\'est pas valide'
  }

  if (!guardian.phone || guardian.phone.trim() === '') {
    guardianErrors.phone = 'Le téléphone est obligatoire'
  } else if (!/^[\d\s\-\.\+\(\)]{10,}$/.test(guardian.phone.trim())) {
    guardianErrors.phone = 'Le numéro de téléphone n\'est pas valide'
  }

  if (Object.keys(guardianErrors).length > 0) {
    errors.guardian = guardianErrors
  }

  return errors
}

const validateSportCode = () => {
  const errors = {}

  if ((editableSportCode.value || '').trim().length > 50) {
    errors.sportCode = 'Le code sport ne peut pas dépasser 50 caractères'
  }

  return errors
}

// N'appelle l'API que si le responsable légal a réellement été modifié
const saveGuardian = async () => {
  const guardian = editableGuardian.value
  if (!guardian) return

  const original = registration.value.dancer.guardian
  const fields = ['firstName', 'lastName', 'relationship', 'email', 'phone']
  const changed = !original || fields.some(field => (guardian[field] || '').trim() !== (original[field] || ''))
  if (!changed) return

  await $fetch(`/api/admin/dancers/${registration.value.dancer.id}/guardian`, {
    method: 'PUT',
    body: {
      firstName: guardian.firstName,
      lastName: guardian.lastName,
      relationship: guardian.relationship,
      email: guardian.email,
      phone: guardian.phone
    }
  })
}

// N'appelle l'API que si le code sport a réellement été modifié
const saveSportCode = async () => {
  const newCode = (editableSportCode.value || '').trim()
  if (newCode === (registration.value.sportCode || '')) return

  await $fetch(`/api/admin/registrations/${registrationId}/sport-code`, {
    method: 'PUT',
    body: { sportCode: newCode }
  })
}

const saveChanges = async () => {
  // Valider les données
  const dancerErrors = validateDancerData()
  const contactErrors = validateEmergencyContacts()
  const guardianErrors = validateGuardian()
  const sportCodeErrors = validateSportCode()

  validationErrors.value = { ...dancerErrors, ...contactErrors, ...guardianErrors, ...sportCodeErrors }
  
  // Si il y a des erreurs, arrêter la sauvegarde
  if (Object.keys(validationErrors.value).length > 0) {
    showToast('Veuillez corriger les erreurs dans le formulaire', 'error')
    return
  }
  
  savingChanges.value = true
  
  try {
    // Sauvegarder les informations du danseur
    const response = await $fetch(`/api/admin/dancers/${registration.value.dancer.id}`, {
      method: 'PUT',
      body: editableData.value
    })
    
    if (response.success) {
      // Sauvegarder les contacts d'urgence modifiés
      await saveEmergencyContacts()

      // Sauvegarder le responsable légal et le code sport s'ils ont changé
      await saveGuardian()
      await saveSportCode()

      await refresh()
      editMode.value = false
      showToast('Modifications sauvegardées avec succès')
    } else {
      showToast('Erreur lors de la sauvegarde', 'error')
    }
  } catch (error) {
    console.error('Erreur sauvegarde:', error)
    showToast('Erreur lors de la sauvegarde', 'error')
  } finally {
    savingChanges.value = false
  }
}

const addEmergencyContact = () => {
  editableEmergencyContacts.value.push({
    id: null,
    type: 'EMERGENCY_AND_PICKUP',
    firstName: '',
    lastName: '',
    relationship: '',
    phone: '',
    email: ''
  })
}

const removeEmergencyContact = (index) => {
  editableEmergencyContacts.value.splice(index, 1)
}

const saveEmergencyContacts = async () => {
  const originalContacts = registration.value.dancer.emergencyContacts || []
  const editedContacts = editableEmergencyContacts.value
  
  // Supprimer les contacts qui ont été enlevés
  for (const originalContact of originalContacts) {
    const stillExists = editedContacts.find(c => c.id === originalContact.id)
    if (!stillExists) {
      await $fetch(`/api/admin/emergency-contacts/${originalContact.id}`, {
        method: 'DELETE'
      })
    }
  }
  
  // Ajouter ou modifier les contacts
  for (const contact of editedContacts) {
    if (contact.firstName && contact.lastName && contact.phone && contact.relationship) {
      if (contact.id) {
        // Modifier un contact existant
        await $fetch(`/api/admin/emergency-contacts/${contact.id}`, {
          method: 'PUT',
          body: {
            type: contact.type,
            firstName: contact.firstName,
            lastName: contact.lastName,
            relationship: contact.relationship,
            phone: contact.phone,
            email: contact.email || null
          }
        })
      } else {
        // Ajouter un nouveau contact
        await $fetch(`/api/admin/dancers/${registration.value.dancer.id}/emergency-contacts`, {
          method: 'POST',
          body: {
            type: contact.type,
            firstName: contact.firstName,
            lastName: contact.lastName,
            relationship: contact.relationship,
            phone: contact.phone,
            email: contact.email || null
          }
        })
      }
    }
  }
}
</script>