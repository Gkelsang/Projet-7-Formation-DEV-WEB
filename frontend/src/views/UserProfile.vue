<template>
    <div>
        <Menu />
        <b-row class="text-center justify-content-center">
            <div class="d-flex align-items-center flex-column">
                <ProfileImage
                    :src="UserProfile.imageUrl"
                    customClass="profile-main-picture"
                    divCustomClasse="div-user-profile-picture"/>
                <p class="user-name">
                    {{ userProfile.firstName }} {{ userProfile.lastName }}
                </p>
                <AdminDeleteAccount v-if="userData.admin && !userProfile.deleted" :userProfile="userProfile"/>
            </div>
        </b-row>
        <PostsList :userId="this.$route.params.userId" />
    </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import ProfileImage from '../components/ProfileImage'
import PostsList from '../components/PostsList'
import Menu from '../components/Menu'
import AdminDeleteAccount from '../components/AdminDeleteAccount'


export default {
    name: 'UserProfile',
    components: {
        ProfileImage, PostsList, Menu, AdminDeleteAccount
    },
    watch: {
        $route (to, from) {
            window.location.reload()
        }
    },
    data () {
        return {
            userProfile: {},
            userData: JSON.parse(localStorage.getItem('userData')) 
        }
    },
    async mounted () {
        const res = await apiClient.get(`api/users/${this.$route.params.userId}/`)
    },
    methods: {}
}
</script>