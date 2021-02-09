<template>
    <div>
        <button
            @click="toggleActions"
            class="profile-btn d-flex position-fixed justify-content-center justify-content-lg-between align-items-center"
            aria-label="Afficher les actions">

            <span class="name-profile-btn d-none d-lg-block">{{ userData.firstName }}</span>

            <ProfileImage
            :src="userData.imageUrl"
            customClass="profile-btn__img"
            divCustomClass="div-profile-btn-img"
            />
        </button>
        <b-collapse id="profile-collapsed" v-bind:class=" `collapsed mt-2 position-fixed ${areActionsVisible && 'visible'}`" >
            <b-card>
                <p class="card-text">
                <button
                    class="collapsed-btn btn-block text-left"
                    @click="changeOrReloadPage('Profile')"
                    aria-label="Voir mon profil" >

                    <b-icon icon="person" class="mr-2"></b-icon>
                    Voir mon profil
                </button>
                </p>
                <p class="card-text">
                <button
                    class="collapsed-btn btn-block text-left"
                    @click="changeOrReloadPage('Posts')"
                    aria-label="Voir la page d'accueil" >

                <b-icon icon="house" class="mr-2"></b-icon>Voir la page d'accueil
                </button>
                </p>
                <p class="card-text">
                <button
                    class="collapsed-btn btn-block text-left"
                    @click="logout"
                    aria-label="Se déconnecter" >
                    <b-icon icon="box-arrow-right" class="mr-2"></b-icon>
                    Se déconnecter
                </button>
                </p> 
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
import ProfileImage from './ProfileImage'

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