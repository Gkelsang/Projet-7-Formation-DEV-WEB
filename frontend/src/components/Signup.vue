<template>
    <div class="page-container">
        <b-container fluid>
            <b-row class="text-center justify-content-center">
                <b-col cols="12" lg="4">
                    <b-card class="account-card border-0 shadow p-3 mb-5 mt-3 bg-white rounded">
                        <div class="pt-sm-3 pt-lg-0">
                            <b-card-text class="login-text h4">S'inscrire</b-card-text>
                            <b-form>
                                <b-form-group>
                                    <b-form-input
                                        id="firstName"
                                        type="text"
                                        placeholder="Prénom"
                                        class="account-input text-dark mb-2 mt-4 pl-3 w-100"
                                        v-model="input.firstName"
                                        aria-label="Ecrire votre prénom"        
                                    ></b-form-input>
                                    <b-form-input
                                        id="lastName"
                                        type="text"
                                        placeholder="Nom"
                                        class="account-input text-dark mb-2 pl-3 w-100"
                                        v-model="input.lastName"
                                        aria-label="Ecrire votre nom"
                                    ></b-form-input>
                                    <b-form-input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        class="account-input text-dark mb-2 pl-3 w-100"
                                        v-model="input.email"
                                        aria-label="Entrez votre adresse email"
                                    ></b-form-input>
                                    <b-form-input
                                        id="password"
                                        type="password"
                                        placeholder="Mot de passe"
                                        class="account-input text-dark mb-2 pl-3 w-100"
                                        v-model="input.password"
                                        aria-label="Ecrire votre mot de passe"
                                    ></b-form-input>
                                </b-form-group>

                                <button
                                    v-on:click.stop="signup()"
                                    type="submit"
                                    id="signup-button"
                                    class="account-btn font-weight-bold"
                                    aria-label="S'inscrire"
                                > Inscription </button>
                                <p class="my-3 text-danger"> {{ errorMessage }}</p>
                            </b-form>
                        </div>
                        <div class="line my-3"></div>
                        <p class="font-small grey-text d-flex justify-content-center mb-1">
                            Déjà inscrit ?
                            <router-link to="/login" class="font-weight-bold ml-1">
                            Se connecter</router-link>
                        </p>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'

export default {
    name: 'Signup',
    data () {
        return {
            errorMessage: '',
            input: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        signup () {
            if (
                this.input.firstName != '' &&
                this.input.lastName != '' &&
                this.input.email != '' &&
                this.input.password != ''
            ) {
                apiClient
                    .post('api/auth/signup', this.input)
                    .then(data => {
                        if (!data.token) {
                            this.errorMessage = data.error.errors[0].message
                        } else {
                            localStorage.setItem('userToken', data.token)
                            localStorage.setItem('userData', JSON.stringify(data.user))
                            router.push({ name: 'Posts' })
                        }
                    })
                    .catch(error => {
                        if (error.error) {
                            return (this.errorMessage = error.error.errors[0].message)
                        }

                        this.errorMessage = 'Problème de connexion'
                    })
            } else {
                this.errorMessage = 'Veuillez rentrer votre email et un mot de passe'
            }
        }
    }
}
</script>