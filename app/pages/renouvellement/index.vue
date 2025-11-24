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
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span class="ml-4 text-2xl font-black text-white tracking-tight">
              <span class="bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
                SQUARE630
              </span>
            </span>
          </div>

          <!-- Title and Back Button -->
          <div class="flex items-center space-x-6">
            <div class="text-right">
              <p class="text-sm text-white/80">Année scolaire</p>
              <p class="text-lg font-bold text-white">{{ currentSchoolYear }}</p>
            </div>
            <button @click="$router.back()" class="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white p-3 rounded-2xl transition-all duration-300 border border-white/20">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="relative z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" v-if="!loading">
        <!-- Page Title -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-black text-white mb-4">
            <span class="bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
              Renouvellement d'inscription
            </span>
          </h1>
          <p class="text-xl text-white/80 font-medium">
            Mise à jour de votre inscription pour l'année {{ currentSchoolYear }}
          </p>
        </div>

        <!-- Progress Steps -->
        <div class="mb-8 md:mb-12">
          <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div class="flex items-center">
              <div :class="`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 ${
                currentStep >= 1 
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg' 
                  : 'bg-white/10 text-white/60 backdrop-blur-xl border border-white/20'
              }`">
                1
              </div>
              <span class="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-white">Informations personnelles</span>
            </div>
            <div class="flex items-center">
              <div :class="`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 ${
                currentStep >= 2 
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg' 
                  : 'bg-white/10 text-white/60 backdrop-blur-xl border border-white/20'
              }`">
                2
              </div>
              <span class="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-white">Questionnaire santé</span>
            </div>
            <div class="flex items-center">
              <div :class="`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 ${
                currentStep >= 3 
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg' 
                  : 'bg-white/10 text-white/60 backdrop-blur-xl border border-white/20'
              }`">
                3
              </div>
              <span class="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-white">Groupes de danse</span>
            </div>
          </div>
        </div>

        <!-- Step 1: Personal Information Review -->
        <div v-if="currentStep === 1" class="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
          <div class="text-center mb-6 sm:mb-8">
            <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text text-transparent mb-4">Vérification des informations</h2>
            <p class="text-sm sm:text-base text-gray-600">Vérifiez vos informations personnelles et celles de vos contacts. Vous pouvez les modifier si nécessaire.</p>
          </div>

          <!-- Personal Info -->
          <div class="space-y-6 sm:space-y-8">
            <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                <h3 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Informations personnelles</h3>
                <button @click="editPersonalInfo = !editPersonalInfo" class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg text-sm sm:text-base">
                  {{ editPersonalInfo ? 'Annuler' : 'Modifier' }}
                </button>
              </div>
              
              <div v-if="!editPersonalInfo" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><strong>Prénom :</strong> {{ dancerData?.firstName || 'Non renseigné' }}</div>
                <div><strong>Nom :</strong> {{ dancerData?.lastName || 'Non renseigné' }}</div>
                <div><strong>Email :</strong> {{ dancerData?.email || 'Non renseigné' }}</div>
                <div><strong>Téléphone :</strong> {{ dancerData?.phone || 'Non renseigné' }}</div>
                <div><strong>Date de naissance :</strong> {{ formatDate(dancerData?.birthDate) || 'Non renseigné' }}</div>
                <div><strong>Niveau scolaire :</strong> {{ formatSchoolLevel(dancerData?.schoolLevel) || 'Non renseigné' }}</div>
                <div><strong>Taille T-shirt :</strong> {{ dancerData?.tShirtSize || 'Non renseigné' }}</div>
                <div class="md:col-span-2"><strong>Adresse :</strong> {{ fullAddress || 'Non renseigné' }}</div>
                <div v-if="dancerData?.otherInfo" class="md:col-span-2"><strong>Autres informations :</strong> {{ dancerData.otherInfo }}</div>
              </div>

              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                  <input v-model="editForm.firstName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input v-model="editForm.lastName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input v-model="editForm.email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <input v-model="editForm.phone" type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date de naissance *</label>
                  <div class="relative">
                    <input v-model="editForm.birthDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 date-field" required>
                    <span v-if="!editForm.birthDate" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">jj/mm/aaaa</span>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Niveau scolaire *</label>
                  <select v-model="editForm.schoolLevel" class="custom-select w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                    <option value="">Sélectionner...</option>
                    <option value="CP">CP</option>
                    <option value="CE1">CE1</option>
                    <option value="CE2">CE2</option>
                    <option value="CM1">CM1</option>
                    <option value="CM2">CM2</option>
                    <option value="SIXIEME">6ème</option>
                    <option value="CINQUIEME">5ème</option>
                    <option value="QUATRIEME">4ème</option>
                    <option value="TROISIEME">3ème</option>
                    <option value="SECONDE">Seconde</option>
                    <option value="PREMIERE">Première</option>
                    <option value="TERMINALE">Terminale</option>
                    <option value="POST_BAC">Post-Bac</option>
                    <option value="ADULTE">Adulte</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Taille T-shirt *</label>
                  <select v-model="editForm.tShirtSize" class="custom-select w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                    <option value="">Sélectionner...</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
                  <input v-model="editForm.address" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Code postal *</label>
                  <input v-model="editForm.postalCode" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                  <input v-model="editForm.city" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Autres informations</label>
                  <textarea v-model="editForm.otherInfo" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" rows="3" placeholder="Informations complémentaires (allergies, traitements médicaux, etc.)"></textarea>
                </div>
              </div>
            </div>

            <!-- Guardian Info (if exists) -->
            <div v-if="guardianData" class="bg-gray-50 rounded-xl p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-800">Responsable légal</h3>
                <button @click="editGuardianInfo = !editGuardianInfo" class="text-orange-600 hover:text-orange-700 font-medium">
                  {{ editGuardianInfo ? 'Annuler' : 'Modifier' }}
                </button>
              </div>
              
              <div v-if="!editGuardianInfo" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><strong>Prénom :</strong> {{ guardianData?.firstName || 'Non renseigné' }}</div>
                <div><strong>Nom :</strong> {{ guardianData?.lastName || 'Non renseigné' }}</div>
                <div><strong>Email :</strong> {{ guardianData?.email || 'Non renseigné' }}</div>
                <div><strong>Téléphone :</strong> {{ guardianData?.phone || 'Non renseigné' }}</div>
                <div><strong>Relation :</strong> {{ guardianData?.relationship || 'Non renseigné' }}</div>
                <div><strong>Autorisé :</strong> {{ guardianData?.authorized ? 'Oui' : 'Non' }}</div>
              </div>

              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                  <input v-model="editGuardianForm.firstName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input v-model="editGuardianForm.lastName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input v-model="editGuardianForm.email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <input v-model="editGuardianForm.phone" type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Relation *</label>
                  <select v-model="editGuardianForm.relationship" class="custom-select w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                    <option value="Parent">Parent</option>
                    <option value="Tuteur légal">Tuteur légal</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Autorisé à récupérer</label>
                  <input v-model="editGuardianForm.authorized" type="checkbox" class="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded">
                </div>
              </div>
            </div>

            <!-- Emergency Contacts -->
            <div class="bg-gray-50 rounded-xl p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Contacts d'urgence</h3>
                <button @click="editEmergencyContacts = !editEmergencyContacts" class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg">
                  {{ editEmergencyContacts ? 'Annuler' : 'Modifier' }}
                </button>
              </div>
              
              <!-- Display mode -->
              <div v-if="!editEmergencyContacts">
                <div v-if="emergencyContacts?.length > 0" class="space-y-4">
                  <div v-for="(contact, index) in emergencyContacts" :key="index" class="bg-white rounded-lg p-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div><strong>Nom :</strong> {{ contact.firstName }} {{ contact.lastName }}</div>
                      <div><strong>Téléphone :</strong> {{ contact.phone }}</div>
                      <div><strong>Relation :</strong> {{ contact.relationship }}</div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-gray-500 text-center py-4">
                  Aucun contact d'urgence enregistré
                </div>
              </div>

              <!-- Edit mode -->
              <div v-else class="space-y-4">
                <div v-for="(contact, index) in editEmergencyContactsForm" :key="index" class="bg-white rounded-lg p-4 border">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                      <input v-model="contact.firstName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                      <input v-model="contact.lastName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                      <input v-model="contact.phone" type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Relation *</label>
                      <select v-model="contact.relationship" class="custom-select w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" required>
                        <option value="">Sélectionner...</option>
                        <option value="Parent">Parent</option>
                        <option value="Grand-parent">Grand-parent</option>
                        <option value="Oncle/Tante">Oncle/Tante</option>
                        <option value="Ami proche">Ami proche</option>
                        <option value="Voisin">Voisin</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex justify-end mt-3">
                    <button @click="removeEmergencyContact(index)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                      Supprimer
                    </button>
                  </div>
                </div>
                
                <button @click="addEmergencyContact" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Ajouter un contact d'urgence
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-8">
            <button @click="validatePersonalInfoAndContinue" class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl">
              Continuer
              <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Step 2: Health Questionnaire -->
        <div v-if="currentStep === 2" class="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
          <div class="text-center mb-6 sm:mb-8">
            <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text text-transparent mb-4">Questionnaire santé</h2>
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mx-auto max-w-2xl">
              <div class="flex items-start space-x-3">
                <svg class="w-6 h-6 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.081 18.5C3.311 20.333 4.273 22 5.813 22z"/>
                </svg>
                <div class="text-left">
                  <p class="text-amber-800 font-medium">Questionnaire obligatoire</p>
                  <p class="text-amber-700 text-sm">Ce questionnaire santé doit être rempli à nouveau pour chaque renouvellement d'inscription, conformément à la réglementation sportive.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Image du formulaire papier -->
            <div class="bg-white rounded-xl p-6 border-2 border-orange-200">
              <h3 class="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4 text-center">
                Référence du formulaire officiel CERFA
              </h3>
              <div class="flex justify-center">
                <img 
                  src="/assets/4 CERFA-Questionnaire-Santé-2024-2025.jpg" 
                  alt="Formulaire CERFA Questionnaire Santé 2024-2025" 
                  class="max-w-full h-auto rounded-lg shadow-lg border border-gray-200"
                  style="max-height: 600px;"
                />
              </div>
              <p class="text-sm text-gray-600 text-center mt-4 italic">
                Formulaire officiel de référence - Version dématérialisée ci-dessous
              </p>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div class="flex">
                <svg class="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div class="text-blue-700 text-sm">
                  <p class="font-semibold mb-1">Important :</p>
                  <p>Si vous répondez "OUI" à l'une des questions de ce questionnaire, vous devrez fournir un certificat médical d'aptitude à la pratique sportive.</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Déclaration sur l'honneur</h3>
              
              <p class="text-gray-700 mb-4">
                Après avoir pris connaissance du questionnaire santé, veuillez indiquer votre situation :
              </p>

              <!-- Options de réponse -->
              <div class="space-y-3">
                <!-- Option 1: Toutes négatives -->
                <label class="flex items-start space-x-3 cursor-pointer p-4 rounded-xl border-2 transition-all"
                  :class="healthForm.healthStatus === 'negative' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'"
                >
                  <input
                    v-model="healthForm.healthStatus"
                    type="radio"
                    value="negative"
                    class="mt-1 h-5 w-5 text-green-600 focus:ring-green-500"
                  />
                  <div class="text-gray-700 text-sm leading-relaxed">
                    <p class="font-semibold text-green-700">✅ Toutes mes réponses sont NÉGATIVES</p>
                    <p class="text-sm text-gray-600 mt-1">
                      Je certifie avoir répondu NON à toutes les questions du questionnaire santé.
                    </p>
                  </div>
                </label>

                <!-- Option 2: Au moins une positive -->
                <label class="flex items-start space-x-3 cursor-pointer p-4 rounded-xl border-2 transition-all"
                  :class="healthForm.healthStatus === 'positive' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'"
                >
                  <input
                    v-model="healthForm.healthStatus"
                    type="radio"
                    value="positive"
                    class="mt-1 h-5 w-5 text-orange-600 focus:ring-orange-500"
                  />
                  <div class="text-gray-700 text-sm leading-relaxed">
                    <p class="font-semibold text-orange-700">⚠️ Une ou plusieurs réponses sont POSITIVES</p>
                    <p class="text-sm text-gray-600 mt-1">
                      J'ai répondu OUI à au moins une question. Je comprends que je dois fournir un certificat médical d'aptitude à la pratique sportive.
                    </p>
                  </div>
                </label>
              </div>

              <!-- Confirmation checkbox -->
              <div v-if="healthForm.healthStatus" class="mt-6 p-4 rounded-xl"
                :class="healthForm.healthStatus === 'negative' ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'"
              >
                <label class="flex items-start space-x-3 cursor-pointer">
                  <input
                    v-model="healthForm.healthDeclaration"
                    type="checkbox"
                    class="mt-1 h-5 w-5"
                    :class="healthForm.healthStatus === 'negative' ? 'text-green-600 focus:ring-green-500' : 'text-orange-600 focus:ring-orange-500'"
                  />
                  <div class="text-sm leading-relaxed"
                    :class="healthForm.healthStatus === 'negative' ? 'text-green-700' : 'text-orange-700'"
                  >
                    <p class="font-semibold">Je confirme :</p>
                    <ul class="list-disc list-inside space-y-1 mt-1">
                      <li>Avoir lu et compris le questionnaire santé</li>
                      <li v-if="healthForm.healthStatus === 'negative'">
                        Que toutes mes réponses sont négatives et que je peux pratiquer sans certificat médical
                      </li>
                      <li v-else>
                        Que je dois fournir un <strong>certificat médical d'aptitude</strong> à la pratique sportive
                      </li>
                    </ul>
                  </div>
                </label>
              </div>

              <!-- Alert si certificat nécessaire -->
              <div v-if="healthForm.healthStatus === 'positive' && healthForm.healthDeclaration" class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div class="flex">
                  <svg class="w-5 h-5 text-yellow-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <div class="text-yellow-700 text-sm">
                    <p class="font-semibold">Certificat médical requis</p>
                    <p class="mt-1">Vous devrez transmettre votre certificat médical d'aptitude à la pratique de la danse pour finaliser votre inscription.</p>
                  </div>
                </div>
              </div>

              <div v-if="!healthForm.healthStatus || !healthForm.healthDeclaration" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-700 text-sm">
                  ⚠️ Vous devez sélectionner votre situation et confirmer pour continuer.
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <button @click="currentStep = 1" class="bg-white/20 hover:bg-white/30 backdrop-blur-xl text-gray-700 font-bold py-4 px-8 rounded-2xl transition-all duration-300 border border-gray-300">
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Précédent
            </button>
            <button 
              @click="currentStep = 3" 
              :disabled="!healthForm.healthStatus || !healthForm.healthDeclaration"
              class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer
              <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Step 3: Dance Groups Selection -->
        <div v-if="currentStep === 3" class="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
          <div class="text-center mb-6 sm:mb-8">
            <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text text-transparent mb-4">Choix des groupes de danse</h2>
            <p class="text-sm sm:text-base text-gray-600">Sélectionnez vos groupes de danse pour l'année scolaire {{ currentSchoolYear }}</p>
          </div>

          <!-- Previous groups -->
          <div v-if="previousDanceGroups?.length > 0" class="mb-8">
            <h3 class="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Vos groupes précédents</h3>
            <div class="bg-blue-50 rounded-xl p-4 mb-4">
              <div class="flex items-center space-x-2 mb-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-blue-800 font-medium">Vous pouvez reprendre vos groupes précédents ou en choisir de nouveaux</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="group in previousDanceGroups" :key="group.id" class="bg-gray-100 rounded-lg p-4">
                <div class="flex justify-between items-center">
                  <div>
                    <h4 class="font-bold text-gray-800">{{ group.name }}</h4>
                    <p class="text-sm text-gray-600">{{ group.ageGroup }} • {{ group.schedule }}</p>
                    <p class="text-xs text-gray-500">Année {{ group.schoolYear }} • Statut: {{ formatStatus(group.status) }}</p>
                  </div>
                  <button 
                    @click="selectSameGroup(group)"
                    :disabled="selectedGroups.some(g => availableGroups.find(ag => ag.name === group.name && ag.id === g.id))"
                    :class="`px-3 py-1 rounded text-sm transition-colors ${
                      selectedGroups.some(g => availableGroups.find(ag => ag.name === group.name && ag.id === g.id))
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`"
                  >
                    {{ selectedGroups.some(g => availableGroups.find(ag => ag.name === group.name && ag.id === g.id)) ? 'Déjà sélectionné' : 'Reprendre' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Available groups -->
          <div>
            <h3 class="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Groupes disponibles</h3>
            <div v-if="availableGroups?.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="group in availableGroups" 
                :key="group.id"
                @click="toggleGroup(group)"
                :class="`cursor-pointer rounded-xl p-6 border-2 transition-all duration-300 hover:shadow-lg ${
                  selectedGroups.some(g => g.id === group.id)
                    ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-2xl transform scale-105'
                    : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-xl'
                }`"
              >
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-xl font-bold text-gray-800">{{ group.name }}</h4>
                  <div v-if="selectedGroups.some(g => g.id === group.id)" class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
                <div class="space-y-2">
                  <p class="text-sm text-gray-600"><strong>Tranche d'âge :</strong> {{ group.ageGroup }}</p>
                  <p class="text-sm text-gray-600"><strong>Horaires :</strong> {{ group.schedule }}</p>
                  <p class="text-sm text-gray-600 line-clamp-2">{{ group.description }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <p class="text-gray-500">Aucun groupe disponible pour le moment.</p>
            </div>
          </div>

          <!-- Selected groups summary -->
          <div v-if="selectedGroups.length > 0" class="mt-8 bg-green-50 rounded-xl p-6">
            <h3 class="text-lg font-bold text-green-800 mb-4">Groupes sélectionnés ({{ selectedGroups.length }})</h3>
            <div class="space-y-2">
              <div v-for="group in selectedGroups" :key="group.id" class="flex justify-between items-center bg-white rounded-lg p-3">
                <div>
                  <span class="font-medium text-gray-800">{{ group.name }}</span>
                  <span class="text-sm text-gray-600 ml-2">{{ group.schedule }}</span>
                </div>
                <button @click="removeGroup(group)" class="text-red-500 hover:text-red-700">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <button @click="currentStep = 2" class="bg-white/20 hover:bg-white/30 backdrop-blur-xl text-gray-700 font-bold py-4 px-8 rounded-2xl transition-all duration-300 border border-gray-300">
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Précédent
            </button>
            <button 
              @click="submitRenewal" 
              :disabled="selectedGroups.length === 0 || submitting"
              class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement...
              </span>
              <span v-else>
                Finaliser le renouvellement
                <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="relative z-10 flex justify-center items-center min-h-screen">
        <div class="text-center">
          <svg class="animate-spin h-16 w-16 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-xl font-semibold text-white">Chargement de vos données...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentSchoolYear } from '../../../utils/schoolYear'

// Auth
const router = useRouter()

// Data
const loading = ref(true)
const submitting = ref(false)
const currentStep = ref(1)
const currentSchoolYear = ref(getCurrentSchoolYear())

// Forms
const editPersonalInfo = ref(false)
const editGuardianInfo = ref(false)
const editEmergencyContacts = ref(false)

// Original data from API
const dancerData = ref(null)
const guardianData = ref(null)
const emergencyContacts = ref([])
const previousDanceGroups = ref([])
const availableGroups = ref([])

// Edit forms
const editForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  schoolLevel: '',
  tShirtSize: '',
  address: '',
  postalCode: '',
  city: '',
  otherInfo: ''
})

const editGuardianForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  relationship: 'Parent',
  authorized: false
})

const healthForm = ref({
  healthStatus: '', // 'negative' ou 'positive'
  healthDeclaration: false
})

const selectedGroups = ref([])

// Emergency contacts edit form
const editEmergencyContactsForm = ref([])

const addEmergencyContact = () => {
  editEmergencyContactsForm.value.push({
    firstName: '',
    lastName: '',
    phone: '',
    relationship: ''
  })
}

const removeEmergencyContact = (index) => {
  editEmergencyContactsForm.value.splice(index, 1)
}

// Computed
const fullAddress = computed(() => {
  if (!dancerData.value) return ''
  const { address, postalCode, city } = dancerData.value
  return [address, postalCode, city].filter(Boolean).join(', ')
})

const requiresCertificate = computed(() => {
  return healthForm.value.healthStatus === 'positive'
})

// Methods
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('fr-FR')
}

const formatSchoolLevel = (level) => {
  const mapping = {
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
  return mapping[level] || level
}

const formatStatus = (status) => {
  const mapping = {
    'DRAFT': 'Brouillon',
    'SUBMITTED': 'Soumise',
    'APPROVED': 'Approuvée',
    'REJECTED': 'Refusée'
  }
  return mapping[status] || status
}

const loadData = async () => {
  try {
    loading.value = true
    
    // Load renewal data using $fetch instead of useFetch
    const renewalData = await $fetch('/api/inscriptions/renew', {
      method: 'POST',
      body: { schoolYear: currentSchoolYear.value }
    })

    console.log('Renewal data response:', renewalData)

    if (renewalData?.success) {
      dancerData.value = renewalData.dancer
      guardianData.value = renewalData.guardian
      emergencyContacts.value = renewalData.emergencyContacts
      previousDanceGroups.value = renewalData.previousDanceGroups

      console.log('Dancer data loaded:', dancerData.value)

      // Initialize emergency contacts edit form
      editEmergencyContactsForm.value = emergencyContacts.value.map(contact => ({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        phone: contact.phone || '',
        relationship: contact.relationship || ''
      }))

      // Initialize edit forms with current data
      editForm.value = {
        firstName: dancerData.value.firstName || '',
        lastName: dancerData.value.lastName || '',
        email: dancerData.value.email || '',
        phone: dancerData.value.phone || '',
        birthDate: dancerData.value.birthDate ? new Date(dancerData.value.birthDate).toISOString().split('T')[0] : '',
        schoolLevel: dancerData.value.schoolLevel || '',
        tShirtSize: dancerData.value.tShirtSize || '',
        address: dancerData.value.address || '',
        postalCode: dancerData.value.postalCode || '',
        city: dancerData.value.city || '',
        otherInfo: dancerData.value.otherInfo || ''
      }

      if (guardianData.value) {
        editGuardianForm.value = {
          firstName: guardianData.value.firstName || '',
          lastName: guardianData.value.lastName || '',
          email: guardianData.value.email || '',
          phone: guardianData.value.phone || '',
          relationship: guardianData.value.relationship || 'Parent',
          authorized: guardianData.value.authorized || false
        }
      }
    } else {
      console.error('API returned success: false')
      throw new Error('Impossible de récupérer les données de renouvellement')
    }

    // Calculate dancer's age and load available dance groups filtered by age
    let dancerAge = null
    if (dancerData.value?.birthDate) {
      const birthDate = new Date(dancerData.value.birthDate)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      dancerAge = age
      console.log('Calculated dancer age:', dancerAge)
    }

    // Load available dance groups filtered by dancer's age
    const groupsData = await $fetch('/api/dance-groups', {
      query: dancerAge !== null ? { age: dancerAge } : {}
    })
    availableGroups.value = groupsData?.groups || []
    console.log('Available groups after age filtering:', availableGroups.value.length)

  } catch (error) {
    console.error('Error loading renewal data:', error)
    alert('Erreur lors du chargement des données. Redirection vers le tableau de bord.')
    // Redirect back to dashboard on error
    router.push('/dashboard')
  } finally {
    loading.value = false
  }
}

const toggleGroup = (group) => {
  const index = selectedGroups.value.findIndex(g => g.id === group.id)
  if (index > -1) {
    selectedGroups.value.splice(index, 1)
  } else {
    selectedGroups.value.push(group)
  }
}

const removeGroup = (group) => {
  const index = selectedGroups.value.findIndex(g => g.id === group.id)
  if (index > -1) {
    selectedGroups.value.splice(index, 1)
  }
}

const selectSameGroup = (previousGroup) => {
  // Find the equivalent group in available groups
  const availableGroup = availableGroups.value.find(g => g.name === previousGroup.name)
  if (availableGroup && !selectedGroups.value.some(g => g.id === availableGroup.id)) {
    selectedGroups.value.push(availableGroup)
  }
}

const validatePersonalInfoAndContinue = async () => {
  if (editPersonalInfo.value) {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'birthDate', 'schoolLevel', 'tShirtSize', 'address', 'postalCode', 'city']
    const missingFields = requiredFields.filter(field => !editForm.value[field] || editForm.value[field].trim() === '')
    
    if (missingFields.length > 0) {
      alert(`Veuillez remplir tous les champs obligatoires : ${missingFields.join(', ')}`)
      return
    }

    // If birth date was changed, recalculate age and reload groups
    const originalBirthDate = dancerData.value?.birthDate ? new Date(dancerData.value.birthDate).toISOString().split('T')[0] : ''
    if (editForm.value.birthDate !== originalBirthDate) {
      console.log('Birth date changed, reloading groups...')
      
      // Calculate new age
      const birthDate = new Date(editForm.value.birthDate)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      console.log('New dancer age:', age)
      
      // Reload groups with new age filter
      try {
        const groupsData = await $fetch('/api/dance-groups', {
          query: { age }
        })
        availableGroups.value = groupsData?.groups || []
        console.log('Reloaded groups after age change:', availableGroups.value.length)
        
        // Clear selected groups if they're no longer available
        const originalSelectedCount = selectedGroups.value.length
        selectedGroups.value = selectedGroups.value.filter(selectedGroup => 
          availableGroups.value.some(availableGroup => availableGroup.id === selectedGroup.id)
        )
        
        if (selectedGroups.value.length !== originalSelectedCount) {
          console.log('Some selected groups were removed due to age restrictions')
        }
      } catch (error) {
        console.error('Error reloading groups:', error)
      }
    }
  }
  
  if (editEmergencyContacts.value) {
    // Validate emergency contacts
    for (let i = 0; i < editEmergencyContactsForm.value.length; i++) {
      const contact = editEmergencyContactsForm.value[i]
      const requiredContactFields = ['firstName', 'lastName', 'phone', 'relationship']
      const missingContactFields = requiredContactFields.filter(field => !contact[field] || contact[field].trim() === '')
      
      if (missingContactFields.length > 0) {
        alert(`Contact d'urgence ${i + 1} : veuillez remplir tous les champs obligatoires : ${missingContactFields.join(', ')}`)
        return
      }
    }
  }
  
  currentStep.value = 2
}

const submitRenewal = async () => {
  console.log('=== DÉBUT submitRenewal ===')
  console.log('selectedGroups.length:', selectedGroups.value.length)
  console.log('healthDeclaration:', healthForm.value.healthDeclaration)
  
  if (selectedGroups.value.length === 0 || !healthForm.value.healthDeclaration) {
    console.log('Validation échouée - arrêt de la soumission')
    return
  }

  try {
    console.log('Début de la soumission...')
    submitting.value = true

    // Use edited data if available, otherwise use original data
    const personalData = editPersonalInfo.value ? {
      ...editForm.value,
      // Convert date back to ISO format if it was edited
      birthDate: editForm.value.birthDate ? new Date(editForm.value.birthDate).toISOString() : dancerData.value.birthDate
    } : {
      firstName: dancerData.value.firstName,
      lastName: dancerData.value.lastName,
      email: dancerData.value.email,
      phone: dancerData.value.phone,
      birthDate: dancerData.value.birthDate,
      schoolLevel: dancerData.value.schoolLevel,
      tShirtSize: dancerData.value.tShirtSize,
      address: dancerData.value.address,
      postalCode: dancerData.value.postalCode,
      city: dancerData.value.city,
      otherInfo: dancerData.value.otherInfo
    }

    const guardianDataToSend = guardianData.value ? (
      editGuardianInfo.value ? editGuardianForm.value : {
        firstName: guardianData.value.firstName,
        lastName: guardianData.value.lastName,
        email: guardianData.value.email,
        phone: guardianData.value.phone,
        relationship: guardianData.value.relationship,
        authorized: guardianData.value.authorized
      }
    ) : null

    // Use edited emergency contacts if available, otherwise use original data
    const emergencyContactsToSend = editEmergencyContacts.value ? editEmergencyContactsForm.value : emergencyContacts.value

    console.log('Données à envoyer:', {
      schoolYear: currentSchoolYear.value,
      personalData: personalData ? 'OK' : 'MISSING',
      guardianData: guardianDataToSend ? 'OK' : 'NULL',
      emergencyContacts: emergencyContactsToSend ? emergencyContactsToSend.length : 'MISSING',
      healthData: healthForm.value,
      selectedGroups: selectedGroups.value.length
    })

    console.log('Appel API /api/inscriptions/renew-complete...')
    const result = await $fetch('/api/inscriptions/renew-complete', {
      method: 'POST',
      body: {
        schoolYear: currentSchoolYear.value,
        personalData,
        guardianData: guardianDataToSend,
        emergencyContacts: emergencyContactsToSend,
        healthData: healthForm.value,
        selectedGroups: selectedGroups.value.map(g => ({
          id: g.id,
          name: g.name,
          ageGroup: g.ageGroup,
          schedule: g.schedule,
          description: g.description
        }))
      }
    })
    
    console.log('Réponse API:', result)

    if (result?.success) {
      console.log('Renouvellement réussi, redirection vers page de succès')
      // Redirect to success page
      router.push('/renouvellement/succes')
    } else {
      console.error('API returned success: false', result)
    }

  } catch (error) {
    console.error('Erreur lors de la soumission du renouvellement:', error)
    alert('Erreur lors du renouvellement: ' + (error.data?.message || error.message || 'Erreur inconnue'))
  } finally {
    submitting.value = false
  }
}

// Load data on mount
onMounted(() => {
  loadData()
})

// Meta
useHead({
  title: 'Renouvellement d\'inscription • Square630',
  meta: [
    { name: 'description', content: 'Renouvelez votre inscription pour la nouvelle année scolaire' }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Fix pour afficher le placeholder sur mobile pour les champs date */
.date-field:not(:focus):not(:valid)::-webkit-datetime-edit {
  color: transparent;
}

.date-field:focus::-webkit-datetime-edit,
.date-field:valid::-webkit-datetime-edit {
  color: #374151;
}

/* Support pour les navigateurs mobiles */
@supports (-webkit-touch-callout: none) or (-webkit-overflow-scrolling: touch) {
  .date-field:not(:focus):invalid {
    color: transparent;
  }
}

/* Fix select options visibility */
.custom-select option {
  background-color: white;
  color: #1f2937;
  padding: 8px;
}

.custom-select option:checked {
  background-color: #ef4444;
  color: white;
}
</style>