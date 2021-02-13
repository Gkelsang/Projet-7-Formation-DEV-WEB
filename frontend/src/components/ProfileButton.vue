<template>
  <div>
    <!-- Configuration du boutton profil de l'utilisateur -->
    <button @click="toggleActions" class="profile-btn d-flex position-fixed justify-content-center justify-content-lg-between align-items-center" aria-label="Afficher les actions" >
      <!-- Permet d'afficher le prénom et la PP de l'utilisateur connecté -->
      <span class="name-profile-btn d-none d-lg-block">{{ userData.firstName }}</span>
      <ProfileImage :src="userData.imageUrl" customClass="profile-btn__img" divCustomClass="div-profile-btn-img" />
    </button>

    <!-- Menu déroulant avec les différents options -->
    <b-collapse id="profile-collapsed" v-bind:class=" `collapsed mt-2 position-fixed ${areActionsVisible && 'visible'}` " >
      <b-card class="border-0" @click="toggleActions">

        <!-- Boutton pour afficher le profil de l'utilisateur connecté -->
        <p class="card-text">
          <button class="collapsed-btn btn-block text-left" @click="changeOrReloadPage('Profile')" aria-label="Voir mon profil" >
            <b-icon icon="person" class="mr-2"></b-icon> Voir mon profil
          </button>
        </p>

        <!-- Boutton pour afficher la page d'accueil pour l'utilisateur connecté -->
        <p class="card-text">
          <button class="collapsed-btn btn-block text-left" @click="changeOrReloadPage('Posts')" aria-label="Voir la page d'accueil" >
            <b-icon icon="house" class="mr-2"></b-icon> Voir la page d'accueil
          </button>
        </p>

        <!-- Boutton qui permet à l'utilisateur de se déconnecter -->
        <p class="card-text">
          <button class="collapsed-btn btn-block text-left" @click="logout" aria-label="Se déconnecter" >
            <b-icon icon="box-arrow-right" class="mr-2"></b-icon> Se déconnecter
          </button>
        </p>

      </b-card>
    </b-collapse>
  </div>
</template>

<script>
// Importation //
import ProfileImage from './ProfileImage'

// Exportation du module //
export default {
  name: 'ProfileButton',
  components: {
    ProfileImage
  },
  props: {},
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      areActionsVisible: false
    }
  },
  methods: {
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    },
    changeOrReloadPage (name) {
      if (name === this.$route.name) return window.location.reload()
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss">
.profile-btn {
  border: none;
  color: white;
  top: 10%;
  right: 3%;
  height: 6%;
  padding: 5px 5px 5px 16px;
  box-shadow: 0px 1px 1px 1px #d1515a;
  background-color: #323639;
  border-radius: 40px;
  z-index: 2;
  &:focus {
    outline: none;
  }
  &:hover,
  &:visited {
    background-color: rgba(108, 117, 125, 0.2);
  }
  &__img {
    height: 30px;
  }
}

.collapsed-btn {
  font-weight: 500;
  color: #000;
  background-color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  &:hover,
  &:focus,
  &active {
    background-color: rgba(108, 117, 125, 0.1);
    outline: none;
  }
  .b-icon.bi {
    font-size: 125%;
    vertical-align: text-bottom;
  }
}

.div-profile-btn-img {
  width: 30px;
  height: 30px;
  margin-left: 8px;
}

#profile-collapsed {
  top: 62px;
  right: 44px;
  z-index: 1;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .profile-btn {
    top: 0.80%;
    right: 20%;
    height: 32px;
    width: 32px;
    padding: 0;
    &__img {
      height: 35px;
    }
  }

  .div-profile-btn-img {
    width: 35px;
    height: 35px;
    margin-left: 0;
  }

  #profile-collapsed {
    top: 45px;
    right: 15px;
  }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
  .name-profile-btn {
    display: block !important;
  }
}
</style>
