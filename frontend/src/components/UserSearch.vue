<template>
    <div>
        <div :class="`search-bar ${visible ?'' : 'position-fixed d-none'} d-lg-block`">
            <div class="search__content input-group d-flex align-items-center">
                <span class="search-btn input-group-append bg-transparent border-0 p-0"></span>
                <b-icon icon="search" class="mr-2"></b-icon>
            <input
                class="search-text border-0 bg-transparent"
                type="text"
                v-model="search"
                placeholder="Chercher un utilisateur"
                ref="searchInput"
                aria-label="Chercher un utilisateur."
                />
            </div>    
        </div>
        <button
            class="search-btn-mobile position-fixed border-0 p-0 bg-transparent d-lg-none d-xl-none"
            type="button"
            @click="triggerInput"
            aria-label="Chercher"
        ><b-icon icon="search"></b-icon>
        </button>
        <div
            v-if="usersList.lentgh"
            class="users-list card border-0 position-fixed">
            
            <div v-for="user in usersList">
                <router-link :to="{ name: 'UserProfile', params: { userId: user.id } }">
                    <div class="d-flex align-items-center">
                        <div class="d-flex text-center">
                            <ProfileImage 
                                :src="user.imageUrl"
                                customeClass="like-profile-picture"
                                divCustomClass="div-like-picture" 
                            />
                        </div>
                        <p>{{ user.firstName }} {{ user.lastName }}</p> 
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import ProfileImage from './ProfileImage'

export default {
    name: 'IserSearch',
    components: {
        ProfileImage
    },
    data () {
        return {
            search: '',
            userList: [],
            visible: false
        }
    },
    watch: {
        async search (value) {
            if (value.length <2 ) {
                this.usersList = []
                return
            }
            const res = await apiClient.get(`api/users?search=${value}`)
            this.usersList = res.users
        }
    },
    methods: {
        triggerInput () {
            this.visible = true
            this.$refs.searchInput.click()
        }
    }
}
</script>