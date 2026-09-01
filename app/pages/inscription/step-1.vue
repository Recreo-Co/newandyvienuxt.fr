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

    <!-- Navigation Header -->
    <nav class="relative z-20 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 lg:h-20">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span class="ml-3 lg:ml-4 text-xl lg:text-2xl font-black text-white tracking-tight">
              <span class="bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
                SQUARE630
              </span>
            </span>
          </div>

          <!-- Back Button Only -->
          <button
            @click="goBack"
            class="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-semibold py-2 px-4 lg:py-3 lg:px-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20 inline-flex items-center space-x-2 text-sm lg:text-base"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span class="hidden sm:inline">Retour</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Progress Bar -->
    <div class="relative z-10 bg-white/5 backdrop-blur-sm border-b border-white/10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <ProgressBar :current-step="1" />
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12 flex flex-col items-center justify-center min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-200px)]">
      
      <!-- Damien.C Avatar -->
      <div class="mb-6 lg:mb-8">
        <div class="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow relative mx-auto">
          <!-- Glow effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div class="relative">
            <svg class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
            </svg>
          </div>
        </div>
        <div class="text-center mt-3 lg:mt-4">
          <h2 class="text-xl lg:text-2xl font-bold text-white mb-2">Damien.C</h2>
          <div class="bg-gradient-to-r from-green-400 to-green-500 text-white text-xs lg:text-sm px-3 py-1 rounded-full inline-block">
            En ligne
          </div>
        </div>
      </div>

      <!-- Conversation Interface -->
      <div class="w-full max-w-2xl space-y-4 sm:space-y-6 px-4 sm:px-0">
        
        <!-- Damien.C Message -->
        <div class="flex items-start space-x-3 sm:space-x-4">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
            </svg>
          </div>
          <div class="bg-white/95 backdrop-blur-sm rounded-2xl rounded-tl-md p-4 sm:p-6 shadow-xl border border-white/20 flex-1">
            <div v-if="currentStep === 'greeting'" class="typewriter">
              {{ displayText }}
              <span v-if="showCursor" class="cursor">|</span>
            </div>
            <div v-else>
              <p v-if="currentStep === 'email'" class="text-gray-800 text-lg leading-relaxed">
                Parfait ! Pour commencer, j'ai besoin de l'adresse email du danseur.
              </p>
              <p v-else-if="currentStep === 'firstName'" class="text-gray-800 text-lg leading-relaxed">
                Merci ! Maintenant, quel est le prénom du danseur ?
              </p>
              <p v-else-if="currentStep === 'lastName'" class="text-gray-800 text-lg leading-relaxed">
                Parfait ! Et le nom de famille du danseur ?
              </p>
              <p v-else-if="currentStep === 'birthDate'" class="text-gray-800 text-lg leading-relaxed">
                Super ! Maintenant, quelle est la date de naissance du danseur ?
              </p>
              <p v-else-if="currentStep === 'address'" class="text-gray-800 text-lg leading-relaxed">
                Merci ! Où habite le danseur ? J'ai besoin de son adresse complète.
              </p>
              <p v-else-if="currentStep === 'phone'" class="text-gray-800 text-lg leading-relaxed">
                Parfait ! Quel est le numéro de téléphone du danseur ?
              </p>
              <p v-else-if="currentStep === 'schoolLevel'" class="text-gray-800 text-lg leading-relaxed">
                Génial ! Quel est le niveau scolaire actuel du danseur ?
              </p>
              <p v-else-if="currentStep === 'tshirtSize'" class="text-gray-800 text-lg leading-relaxed">
                Super ! Quelle est la taille de t-shirt du danseur ?
              </p>
              <p v-else-if="currentStep === 'otherInfo'" class="text-gray-800 text-lg leading-relaxed">
                Presque fini ! Y a-t-il d'autres informations concernant le danseur que vous souhaitez nous communiquer ?
              </p>
              <p v-else-if="currentStep === 'final'" class="text-gray-800 text-lg leading-relaxed">
                Excellent ! J'ai toutes les informations de base du danseur. Prêt(e) à continuer ?
              </p>
            </div>
          </div>
        </div>

        <!-- Response Area -->
        <!-- Email Input -->
        <div v-if="currentStep === 'email'" class="space-y-6">
          <div>
            <input
              v-model="form.email"
              type="email"
              class="answer-input"
              :class="{ 'border-red-500 border-2': validationErrors.email }"
              placeholder="email.danseur@exemple.com"
              @keyup.enter="handleEmailSubmit"
              @input="validationErrors.email = ''"
              :disabled="loading"
              required
            />
            <div v-if="validationErrors.email" class="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
              {{ validationErrors.email }}
            </div>
          </div>
          
          <div class="flex justify-end">
            <button
              @click="handleEmailSubmit"
              :disabled="loading || !form.email"
              class="btn-primary"
            >
              <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              <span v-else>Continuer</span>
              <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- First Name Input -->
        <div v-if="currentStep === 'firstName'" class="space-y-6">
          <div>
            <input
              v-model="form.firstName"
              type="text"
              class="answer-input"
              :class="{ 'border-red-500 border-2': validationErrors.firstName }"
              placeholder="Prénom du danseur"
              @keyup.enter="handleFirstNameSubmit"
              @input="validationErrors.firstName = ''"
              :disabled="loading"
              required
            />
            <div v-if="validationErrors.firstName" class="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
              {{ validationErrors.firstName }}
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Continue Button (first on mobile, right on desktop) -->
            <div class="order-1 sm:order-2">
              <button
                @click="handleFirstNameSubmit"
                :disabled="loading || !form.firstName"
                class="btn-primary w-full sm:w-auto"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                <span v-else>Continuer</span>
                <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <!-- Back Button (second on mobile, left on desktop) -->
            <div class="order-2 sm:order-1">
              <button
                @click="currentStep = 'email'"
                class="btn-secondary w-full sm:w-auto"
                :disabled="loading"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour
              </button>
            </div>
          </div>
        </div>

        <!-- Last Name Input -->
        <div v-if="currentStep === 'lastName'" class="space-y-6">
          <div>
            <input
              v-model="form.lastName"
              type="text"
              class="answer-input"
              :class="{ 'border-red-500 border-2': validationErrors.lastName }"
              placeholder="Nom du danseur"
              @keyup.enter="handleLastNameSubmit"
              @input="validationErrors.lastName = ''"
              :disabled="loading"
              required
            />
            <div v-if="validationErrors.lastName" class="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
              {{ validationErrors.lastName }}
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Continue Button (first on mobile, right on desktop) -->
            <div class="order-1 sm:order-2">
              <button
                @click="handleLastNameSubmit"
                :disabled="loading || !form.lastName"
                class="btn-primary w-full sm:w-auto"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                <span v-else>Continuer</span>
                <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <!-- Back Button (second on mobile, left on desktop) -->
            <div class="order-2 sm:order-1">
              <button
                @click="currentStep = 'firstName'"
                class="btn-secondary w-full sm:w-auto"
                :disabled="loading"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour
              </button>
            </div>
          </div>
        </div>

        <!-- Birth Date Input -->
        <div v-if="currentStep === 'birthDate'" class="space-y-6">
          <div class="relative w-full overflow-hidden">
            <input
              v-model="form.birthDate"
              type="date"
              class="answer-input date-input"
              :class="{ 'border-red-500 border-2': validationErrors.birthDate }"
              placeholder="jj/mm/aaaa"
              @keyup.enter="handleBirthDateSubmit"
              @input="validationErrors.birthDate = ''"
              :disabled="loading"
              required
            />
            <span v-if="!form.birthDate" class="date-placeholder">jj/mm/aaaa</span>
            <div v-if="validationErrors.birthDate" class="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
              {{ validationErrors.birthDate }}
            </div>
            <div v-if="form.birthDate && isMinor && !validationErrors.birthDate" class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
              ℹ️ Le danseur est mineur(e), nous aurons besoin des informations de son responsable légal à l'étape suivante.
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Continue Button (first on mobile, right on desktop) -->
            <div class="order-1 sm:order-2">
              <button
                @click="handleBirthDateSubmit"
                :disabled="loading || !form.birthDate"
                class="btn-primary w-full sm:w-auto"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                <span v-else>Continuer</span>
                <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <!-- Back Button (second on mobile, left on desktop) -->
            <div class="order-2 sm:order-1">
              <button
                @click="currentStep = 'lastName'"
                class="btn-secondary w-full sm:w-auto"
                :disabled="loading"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour
              </button>
            </div>
          </div>
        </div>

        <!-- Address Input -->
        <div v-if="currentStep === 'address'" class="space-y-6">
          <div class="space-y-4">
            <div>
              <input
                v-model="form.address"
                type="text"
                class="answer-input"
                :class="{ 'border-red-500 border-2': validationErrors.address }"
                placeholder="12 rue de la Danse"
                @input="validationErrors.address = ''"
                :disabled="loading"
                required
              />
              <div v-if="validationErrors.address" class="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
                {{ validationErrors.address }}
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <input
                  v-model="form.city"
                  type="text"
                  class="answer-input"
                  :class="{ 'border-red-500 border-2': validationErrors.city }"
                  placeholder="Ville"
                  @input="validationErrors.city = ''"
                  :disabled="loading"
                  required
                />
                <div v-if="validationErrors.city" class="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
                  {{ validationErrors.city }}
                </div>
              </div>
              <div>
                <input
                  v-model="form.postalCode"
                  type="text"
                  class="answer-input"
                  :class="{ 'border-red-500 border-2': validationErrors.postalCode }"
                  placeholder="Code postal"
                  pattern="[0-9]{5}"
                  @input="validationErrors.postalCode = ''"
                  :disabled="loading"
                  required
                />
                <div v-if="validationErrors.postalCode" class="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
                  {{ validationErrors.postalCode }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Continue Button (first on mobile, right on desktop) -->
            <div class="order-1 sm:order-2">
              <button
                @click="handleAddressSubmit"
                :disabled="loading || !form.address || !form.city || !form.postalCode"
                class="btn-primary w-full sm:w-auto"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                <span v-else>Continuer</span>
                <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <!-- Back Button (second on mobile, left on desktop) -->
            <div class="order-2 sm:order-1">
              <button
                @click="currentStep = 'birthDate'"
                class="btn-secondary w-full sm:w-auto"
                :disabled="loading"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour
              </button>
            </div>
          </div>
        </div>

        <!-- Phone Input -->
        <div v-if="currentStep === 'phone'" class="space-y-6">
          <div>
            <input
              v-model="form.phone"
              type="tel"
              class="answer-input"
              :class="{ 'border-red-500 border-2': validationErrors.phone }"
              placeholder="06 12 34 56 78"
              @keyup.enter="handlePhoneSubmit"
              @input="validationErrors.phone = ''"
              :disabled="loading"
              required
            />
            <div v-if="validationErrors.phone" class="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
              {{ validationErrors.phone }}
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Continue Button (first on mobile, right on desktop) -->
            <div class="order-1 sm:order-2">
              <button
                @click="handlePhoneSubmit"
                :disabled="loading || !form.phone"
                class="btn-primary w-full sm:w-auto"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                <span v-else>Continuer</span>
                <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <!-- Back Button (second on mobile, left on desktop) -->
            <div class="order-2 sm:order-1">
              <button
                @click="currentStep = 'address'"
                class="btn-secondary w-full sm:w-auto"
                :disabled="loading"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour
              </button>
            </div>
          </div>
        </div>

        <!-- School Level Input -->
        <div v-if="currentStep === 'schoolLevel'" class="space-y-6">
          <div>
            <select
              v-model="form.schoolLevel"
              class="answer-input"
              :class="{ 'border-red-500 border-2': validationErrors.schoolLevel }"
              @change="validationErrors.schoolLevel = ''"
              :disabled="loading"
              required
            >
              <option value="">Sélectionne le niveau du danseur</option>
              <option value="GS">Grande Section</option>
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
              <option value="ADULTE">Adulte +25 ans</option>
            </select>
            <div v-if="validationErrors.schoolLevel" class="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
              {{ validationErrors.schoolLevel }}
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Continue Button (first on mobile, right on desktop) -->
            <div class="order-1 sm:order-2">
              <button
                @click="handleSchoolLevelSubmit"
                :disabled="loading || !form.schoolLevel"
                class="btn-primary w-full sm:w-auto"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                <span v-else>Continuer</span>
                <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <!-- Back Button (second on mobile, left on desktop) -->
            <div class="order-2 sm:order-1">
              <button
                @click="currentStep = 'phone'"
                class="btn-secondary w-full sm:w-auto"
                :disabled="loading"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour
              </button>
            </div>
          </div>
        </div>

        <!-- T-shirt Size Input -->
        <div v-if="currentStep === 'tshirtSize'" class="space-y-6">
          <div>
            <select
              v-model="form.tshirtSize"
              class="answer-input"
              :class="{ 'border-red-500 border-2': validationErrors.tshirtSize }"
              @change="validationErrors.tshirtSize = ''"
              :disabled="loading"
              required
            >
              <option value="">Choisis la taille du danseur</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="XXS">XXS</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
            </select>
            <div v-if="validationErrors.tshirtSize" class="mt-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg">
              {{ validationErrors.tshirtSize }}
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Continue Button (first on mobile, right on desktop) -->
            <div class="order-1 sm:order-2">
              <button
                @click="handleTshirtSizeSubmit"
                :disabled="loading || !form.tshirtSize"
                class="btn-primary w-full sm:w-auto"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                <span v-else>Continuer</span>
                <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <!-- Back Button (second on mobile, left on desktop) -->
            <div class="order-2 sm:order-1">
              <button
                @click="currentStep = 'schoolLevel'"
                class="btn-secondary w-full sm:w-auto"
                :disabled="loading"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour
              </button>
            </div>
          </div>
        </div>

        <!-- Other Info Input -->
        <div v-if="currentStep === 'otherInfo'" class="space-y-6">
          <div>
            <textarea
              v-model="form.otherInfo"
              class="answer-input"
              placeholder="Partagez-nous toute information concernant le danseur que vous jugez utile (allergies, besoins spéciaux, etc.)"
              rows="4"
              :disabled="loading"
            ></textarea>
            <p class="text-sm text-white/70 mt-2">Ce champ est optionnel</p>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Continue Button (first on mobile, right on desktop) -->
            <div class="order-1 sm:order-2">
              <button
                @click="handleOtherInfoSubmit"
                :disabled="loading"
                class="btn-primary w-full sm:w-auto"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                <span v-else>Continuer</span>
                <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <!-- Back Button (second on mobile, left on desktop) -->
            <div class="order-2 sm:order-1">
              <button
                @click="currentStep = 'tshirtSize'"
                class="btn-secondary w-full sm:w-auto"
                :disabled="loading"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Retour
              </button>
            </div>
          </div>
        </div>

        <!-- Final Step -->
        <div v-if="currentStep === 'final'" class="space-y-6">
          <div class="bg-green-50 border border-green-200 rounded-xl p-4">
            <div class="text-green-700 text-sm">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <strong>Récapitulatif des informations du danseur :</strong>
              </div>
              <div class="space-y-1">
                <div>{{ form.firstName }} {{ form.lastName }}</div>
                <div>{{ form.email }}</div>
                <div>{{ form.address }}, {{ form.postalCode }} {{ form.city }}</div>
                <div>{{ form.phone }}</div>
                <div>{{ form.schoolLevel }}</div>
                <div>T-shirt : {{ form.tshirtSize }}</div>
                <div v-if="form.otherInfo">Autres infos : {{ form.otherInfo }}</div>
                <div>{{ isMinor ? 'Mineur(e)' : 'Majeur(e)' }}</div>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <!-- Continue Button (first on mobile, right on desktop) -->
            <div class="order-1 sm:order-2">
              <button
                @click="handleFinalSubmit"
                :disabled="loading"
                class="btn-primary w-full sm:w-auto"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                <span v-else>Étape suivante</span>
                <svg v-if="!loading" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <!-- Back Button (second on mobile, left on desktop) -->
            <div class="order-2 sm:order-1">
              <button
                @click="currentStep = 'otherInfo'"
                class="btn-secondary w-full sm:w-auto"
                :disabled="loading"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Modifier
              </button>
            </div>
          </div>
        </div>

        <!-- Already Registered Message -->
        <div v-if="hasExistingRegistration && currentStep === 'greeting'" class="space-y-6 mt-8">
          <div class="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-orange-800 mb-2">Inscription déjà existante</h3>
            <p class="text-orange-700 mb-4">Vous avez déjà une demande d'inscription en cours. Si vous souhaitez la modifier, contactez l'administration.</p>
            <div class="flex space-x-4">
              <button
                @click="navigateTo('/dashboard')"
                class="bg-orange-100 hover:bg-orange-200 text-orange-800 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Retour au tableau de bord
              </button>
              <a
                href="mailto:contact@square630.fr"
                class="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Contacter l'administration
              </a>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {{ error }}
        </div>

      </div>
    </div>

    <!-- Easter Egg Popup pour David -->
    <div v-if="showEasterEgg" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl p-8 mx-4 max-w-md shadow-2xl big-bounce">
        <div class="text-center">
          <div class="text-6xl mb-4">🥙</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Bonjour David !</h3>
          <p class="text-gray-600 mb-6">
            Arrête de manger trop de kebab ! 😄
          </p>
          <p class="text-sm text-gray-500 italic mb-6">
            T & D
          </p>
          <button 
            @click="closeEasterEgg"
            class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
          >
            Oui oui, j'ai compris ! 😅
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHead, navigateTo, useCookie } from 'nuxt/app'

definePageMeta({
  middleware: ['auth', 'no-admin']
})

// Types
interface DancerInfo {
  id: number
  firstName: string
  lastName: string
  email: string
  registrations: any[]
}

interface CheckExistingResponse {
  hasExistingRegistration: boolean
  dancer?: DancerInfo
}

// Validation functions
const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return 'L\'email est obligatoire'
  if (!emailRegex.test(email)) return 'Format d\'email invalide'
  return null
}

const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^(?:(?:\+|00)33[\s.-]?(?:\(0\))?|0)[1-9](?:[\s.-]?\d{2}){4}$/
  if (!phone) return 'Le numéro de téléphone est obligatoire'
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Format de téléphone invalide (ex: 06 12 34 56 78)'
  return null
}

const validatePostalCode = (postalCode: string): string | null => {
  const postalCodeRegex = /^\d{5}$/
  if (!postalCode) return 'Le code postal est obligatoire'
  if (!postalCodeRegex.test(postalCode)) return 'Le code postal doit contenir 5 chiffres'
  return null
}

const validateBirthDate = (birthDate: string): string | null => {
  if (!birthDate) return 'La date de naissance est obligatoire'
  const birth = new Date(birthDate)
  const today = new Date()
  const hundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
  
  if (birth > today) return 'La date de naissance ne peut pas être dans le futur'
  if (birth < hundredYearsAgo) return 'Date de naissance invalide'
  return null
}

const validateName = (name: string, fieldName: string): string | null => {
  if (!name) return `${fieldName} est obligatoire`
  if (name.length < 2) return `${fieldName} doit contenir au moins 2 caractères`
  if (name.length > 50) return `${fieldName} ne peut pas dépasser 50 caractères`
  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) return `${fieldName} contient des caractères invalides`
  return null
}

// @ts-ignore - Nuxt auto-import
const { user } = useAuth()

const currentStep = ref('greeting')
const displayText = ref('')
const showCursor = ref(true)
const loading = ref(false)
const error = ref('')
const validationErrors = ref<Record<string, string>>({})
const showEasterEgg = ref(false)

const form = ref({
  email: user.value?.email || '',
  firstName: user.value?.firstName || '',
  lastName: user.value?.lastName || '',
  birthDate: '',
  address: '',
  city: '',
  postalCode: '',
  phone: '',
  schoolLevel: '',
  tshirtSize: '',
  otherInfo: ''
})

const fullText = ref("Salut ! Moi c'est Damien.C, ton assistant virtuel pour Square630 ! 🤖✨ Je vais t'accompagner dans l'inscription du danseur étape par étape. C'est parti, commençons par recueillir les informations du danseur ! 😊")
const hasExistingRegistration = ref(false)
const existingDancer = ref<DancerInfo | null>(null)

const goBack = () => {
  navigateTo('/dashboard')
}

const isMinor = computed(() => {
  if (!form.value.birthDate) return false
  const today = new Date()
  const birth = new Date(form.value.birthDate)
  const age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return (age - 1) < 18
  }
  return age < 18
})

const checkExistingRegistration = async () => {
  try {
    const response = await $fetch<CheckExistingResponse>('/api/inscriptions/check-existing')
    if (response.hasExistingRegistration && response.dancer) {
      hasExistingRegistration.value = true
      existingDancer.value = response.dancer
      fullText.value = `Bonjour ${response.dancer.firstName} ! 👋 Je vois que vous avez déjà une demande d'inscription en cours. Vous ne pouvez avoir qu'un seul dossier d'inscription par compte. Si vous souhaitez modifier votre inscription, contactez l'administration. 📧`
      typeText()
      return true
    }
    return false
  } catch (err) {
    console.error('Erreur vérification inscription:', err)
    return false
  }
}

const typeText = () => {
  let index = 0
  const interval = setInterval(() => {
    if (index < fullText.value.length) {
      displayText.value += fullText.value[index]
      index++
    } else {
      clearInterval(interval)
      if (!hasExistingRegistration.value) {
        setTimeout(() => {
          currentStep.value = 'email'
        }, 800)
      }
    }
  }, 20)
}

const handleEmailSubmit = () => {
  const error = validateEmail(form.value.email)
  if (error) {
    validationErrors.value.email = error
    return
  }
  validationErrors.value.email = ''
  setTimeout(() => {
    currentStep.value = 'firstName'
  }, 500)
}

const handleFirstNameSubmit = () => {
  const error = validateName(form.value.firstName, 'Le prénom')
  if (error) {
    validationErrors.value.firstName = error
    return
  }
  validationErrors.value.firstName = ''
  setTimeout(() => {
    currentStep.value = 'lastName'
  }, 500)
}

const handleLastNameSubmit = () => {
  const error = validateName(form.value.lastName, 'Le nom')
  if (error) {
    validationErrors.value.lastName = error
    return
  }
  validationErrors.value.lastName = ''
  
  // Easter egg pour David Regnard 🥙
  if (form.value.firstName.toLowerCase().trim() === 'david' && form.value.lastName.toLowerCase().trim() === 'regnard') {
    showEasterEgg.value = true
    // La popup reste affichée jusqu'à ce que David clique
  } else {
    setTimeout(() => {
      currentStep.value = 'birthDate'
    }, 500)
  }
}

const closeEasterEgg = () => {
  showEasterEgg.value = false
  setTimeout(() => {
    currentStep.value = 'birthDate'
  }, 500)
}

const handleBirthDateSubmit = () => {
  const error = validateBirthDate(form.value.birthDate)
  if (error) {
    validationErrors.value.birthDate = error
    return
  }
  validationErrors.value.birthDate = ''
  setTimeout(() => {
    currentStep.value = 'address'
  }, 500)
}

const handleAddressSubmit = () => {
  let hasError = false
  
  // Validate address
  if (!form.value.address || form.value.address.length < 5) {
    validationErrors.value.address = 'L\'adresse doit contenir au moins 5 caractères'
    hasError = true
  } else {
    validationErrors.value.address = ''
  }
  
  // Validate city
  const cityError = validateName(form.value.city, 'La ville')
  if (cityError) {
    validationErrors.value.city = cityError
    hasError = true
  } else {
    validationErrors.value.city = ''
  }
  
  // Validate postal code
  const postalError = validatePostalCode(form.value.postalCode)
  if (postalError) {
    validationErrors.value.postalCode = postalError
    hasError = true
  } else {
    validationErrors.value.postalCode = ''
  }
  
  if (hasError) return
  
  setTimeout(() => {
    currentStep.value = 'phone'
  }, 500)
}

const handlePhoneSubmit = () => {
  const error = validatePhone(form.value.phone)
  if (error) {
    validationErrors.value.phone = error
    return
  }
  validationErrors.value.phone = ''
  setTimeout(() => {
    currentStep.value = 'schoolLevel'
  }, 500)
}

const handleSchoolLevelSubmit = () => {
  if (!form.value.schoolLevel) {
    validationErrors.value.schoolLevel = 'Le niveau scolaire est obligatoire'
    return
  }
  validationErrors.value.schoolLevel = ''
  setTimeout(() => {
    currentStep.value = 'tshirtSize'
  }, 500)
}

const handleTshirtSizeSubmit = () => {
  if (!form.value.tshirtSize) {
    validationErrors.value.tshirtSize = 'La taille de T-shirt est obligatoire'
    return
  }
  validationErrors.value.tshirtSize = ''
  setTimeout(() => {
    currentStep.value = 'otherInfo'
  }, 500)
}

const handleOtherInfoSubmit = () => {
  setTimeout(() => {
    currentStep.value = 'final'
  }, 500)
}

const handleFinalSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    // Sauvegarder les données
    const formDataCookie = useCookie('registration-step1', {
      default: () => ({})
    })
    
    formDataCookie.value = {
      ...form.value,
      isMinor: isMinor.value
    }
    
    console.log('Step 1 data:', formDataCookie.value)
    
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Aller à l'étape santé
    await navigateTo('/inscription/sante')
    
  } catch (err) {
    error.value = 'Une erreur s\'est produite lors de la sauvegarde'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  // Vérifier d'abord si l'utilisateur a déjà une inscription
  const hasExisting = await checkExistingRegistration()
  
  if (!hasExisting) {
    // Démarrer l'animation de frappe normale
    setTimeout(() => {
      typeText()
    }, 1000)
  }

  // Cursor blinking
  setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
})

// Meta
useHead({
  title: 'Étape 1 - Informations personnelles • Square630',
  meta: [
    { name: 'description', content: 'Damien.C, ton assistant virtuel pour l\'inscription Square630' }
  ]
})
</script>

<style scoped>
.typewriter {
  color: #1f2937;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.answer-input {
  width: 100%;
  padding: 1.5rem;
  background-color: white;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  color: #1e293b;
  font-size: 1.125rem;
  line-height: 1.75rem;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
  max-width: 100%;
}

.answer-input::placeholder {
  color: #94a3b8;
}

.answer-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

/* Fix pour afficher le placeholder sur mobile pour les champs date */
.date-input {
  min-height: 4rem;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box;
  -webkit-appearance: none;
  appearance: none;
}

/* Sur mobile, ajuster le padding pour éviter le débordement */
@media (max-width: 640px) {
  .date-input {
    padding-right: 3rem;
    font-size: 16px; /* Éviter le zoom sur iOS */
  }
}

.date-placeholder {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1.125rem;
  pointer-events: none;
  z-index: 1;
  max-width: calc(100% - 3rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Masquer le placeholder natif sur mobile */
input[type="date"].date-input::-webkit-date-and-time-value {
  text-align: left;
}

/* Pour les navigateurs qui n'affichent pas de placeholder */
input[type="date"].date-input:invalid::-webkit-datetime-edit {
  color: transparent;
}

input[type="date"].date-input:focus::-webkit-datetime-edit,
input[type="date"].date-input:valid::-webkit-datetime-edit {
  color: #1e293b;
}

.option-button {
  width: 100%;
  padding: 1rem;
  background-color: white;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  text-align: left;
  transition: all 0.2s ease;
  outline: none;
}

.option-button:hover {
  border-color: #93c5fd;
  background-color: #eff6ff;
}

.option-button:focus {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.option-button.selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(to right, #475569, #2563eb, #4f46e5);
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(1);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(to right, #334155, #1d4ed8, #4338ca);
  transform: scale(1.05);
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: scale(1);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border: 2px solid #e2e8f0;
  color: #374151;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: #cbd5e1;
  background-color: #f8fafc;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

@keyframes bounce-around {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  10% {
    transform: translate(300px, -200px) rotate(36deg);
  }
  20% {
    transform: translate(-200px, -300px) rotate(72deg);
  }
  30% {
    transform: translate(400px, 100px) rotate(108deg);
  }
  40% {
    transform: translate(-300px, 200px) rotate(144deg);
  }
  50% {
    transform: translate(200px, -100px) rotate(180deg);
  }
  60% {
    transform: translate(-400px, -150px) rotate(216deg);
  }
  70% {
    transform: translate(350px, 250px) rotate(252deg);
  }
  80% {
    transform: translate(-150px, -250px) rotate(288deg);
  }
  90% {
    transform: translate(100px, 150px) rotate(324deg);
  }
  100% {
    transform: translate(0px, 0px) rotate(360deg);
  }
}

.big-bounce {
  animation: bounce-around 45s ease-in-out infinite;
  transform-origin: center center;
}
</style>