<template>
  <div class="page-container">
    <b-container fluid>
      <b-row class="text-center justify-content-center">
        <b-col cols="12" lg="4">
          <b-card class="account-card border-0 shadow p-3 mb-5 mt-3 bg-white rounded" >
            <div class="pt-sm-3 pt-lg-0">
              <!-- Affiche le formulaire de connexion -->
              <b-card-text class="login-text h4">Se connecter</b-card-text>

              <b-form>
                <b-form-group>
                  <!-- Ajout de l'email -->
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="account-input text-dark mb-2 mt-4 pl-3 w-100"
                    aria-label="Écrire votre adresse mail">
                  </b-form-input>

                  <!-- Ajout du mot de passe -->
                  <b-form-input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    v-model="input.password"
                    class="account-input text-dark mb-2 pl-3 w-100"
                    aria-label="Écrire votre mot de passe">
                  </b-form-input>
                </b-form-group>

                <!-- Boutton de connexion -->
                <button
                  v-on:click.stop="login()"
                  type="submit"
                  id="login-button"
                  class="account-btn font-weight-bold"
                  aria-label="Connexion">
                  Connexion
                </button>

                <p class="my-3 text-danger">{{ errorMessage }}</p>
              </b-form>
            </div>

            <!-- Trait de séparation -->
            <div class="line my-3"></div>

            <!-- Ajout de la partie si la personne n'est pas connecter -->
            <p class="font-small grey-text d-flex justify-content-center mb-1">
              Vous n'êtes pas encore inscrit ?
              <router-link to="/signup" class="font-weight-bold ml-1">
                Créer un compte
              </router-link>
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// Importations //
import Signup from '../components/Signup'
import { apiClient } from '../services/ApiClient'
import router from '../router/index'

// Exportation du module //
export default {
  name: 'Login',
  components: {
    Signup
  },
  props: ['notification'],
  data () {
    return {
      errorMessage: '',
      input: {
        email: '',
        password: ''
      }
    }
  },

  mounted () {
    if (this.$route.query.deletedAccount) {
      this.$bvToast.toast('Votre compte a bien été supprimé', {
        title: 'Notification',
        autoHideDelay: 4000
      })
    }
  },
  methods: {
    login () {
      if (this.input.email != '' && this.input.password != '') {
        apiClient
          .post('api/auth/login', this.input)
          .then(data => {
            if (!data.token) {
              this.errorMessage = 'Utilisateur introuvable'
            } else {
              localStorage.setItem('userToken', data.token)
              localStorage.setItem('userData', JSON.stringify(data.user))
              router.push({ name: 'Posts' })
            }
          })
          .catch(error => {
            if (error.error) {
              return (this.errorMessage = error.error)
            }
            this.errorMessage = 'Problème de connexion'
          })
      } else {
        this.errorMessage = 'Veuillez renseigner un email et un mot de passe'
      }
    }
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: #d1515a !important;
}

.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #323639;
}

// Config des champs d'entré du formulaire de connexion //
.account-input {
  border: solid #323639 1px;
  &:focus {
    border: none;
    border-radius: 6px;
    outline: 0;
    box-shadow: 0 0 0 0.2rem #d1515a;
  }
}
</style>
