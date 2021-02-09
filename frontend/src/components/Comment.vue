<template>
    <div>
        <div class="d-flex align-items-center position-relativ">
            <router-link
                :to="{ name: 'UserProfile', params: { userId: comment.User.id } }"
                ><div class="d-flex text-center mr-2 mt-2">
                <ProfileImage
                    :src="comment.User.imageUrl"
                    customeClasse="comment-profile-picture"
                    divCustomeClass="div-comment-picture"
                /></div>
            ></router-link>
            <div class="comment-box">
                <router-link
                    :to="{ name: 'UserProfile', params: { userId: comment.User.id } }"
                    ><p class="mb-0 font-weight-bold">
                        {{ comment.User.firstName }} {{ comment.User.lastName }}
                </p></router-link>
                <input
                    v-if="isEditing"
                    ref="inputContent"
                    v-model="comment.content"
                    @keydown.enter.exact.prevent
                    @keyup.enter.exact="modifyComment"
                    @keydown.enter.shift.exact="newline"
                    type="text"
                    class="input-content border-0 my-2"
                    aria-label="Modifier le commentaire" 
                /> 
                <p v-else class="mb-0">{{ comment.content }}</p>    
            </div>
            <div class="postion-relative">
                <EditButton
                    customClass="comment-button"
                    classCollapse="comment-btn-collapsed"
                    :isCreator="comment.User.id == userData.id"
                    :isAdmin="userData.admin"
                    @clickedEditButton="startEditing"
                    @onDelete="onDelete"
                    modifyText="Modifier"
                    deleteText="Supprimer"
                />    
            </div>
        </div>
        <p class="text-secondary comment-date">
            {{
                moment(comment.updatedAt)
                    .local('fr')
                    .fromNow()
            }}
        </p>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { apiClient } from '../services/ApiClient'
import EditButton from './EditButton'
import ProfileImage from './ProfileImage'

export default {
    name: 'Comment',
    components: { 
        EditButton, ProfileImage
    },
    props: ['comment', 'post'],
    data () {
        return {
            userData: JSON.parse(localStorage.getItem('userData')),
            isEditing: false
        }
    },
    methods: {
        ...mapActions(['displayNotification']),

        toggleActions () {
            this.areActionsVisible = !this.areActionsVisible
        },
        async onDelete () {
            const res = await apiClient.delete(
                `api/posts/${this.post.id}/comments/${thos.comment.id}`
            )
            this.$emit('commentDeleted', tjis.comment)
            this.displayNotification('Commentaire supprimé.')
        },
        startEditing () {
            this.isEditing = true
            setTimeout(() => {
                this.$refs.inputContent.focus()
            }, 30)
        },
        newline () {
            this.comment.content = `${this.comment.content}\n`
        },
        async modifyComment () {
            const res = await apiClient.put(
                `api/posts/${this.post.id}/comments/${this.comment.id}`,
                { content: this.comment.content }
            )
            this.comment.updateAt = res.comment.updateAt
            this.isEditing = false
            this.displayNotification('Commentaire modifié.')
        }
    }
}
</script>