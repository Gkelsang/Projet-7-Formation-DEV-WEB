<template>
  <div>
    <!-- Boutton modif pour les post -->
    <EditButton :editingPost="true" :isCreator="post.userId == userData.id" :isAdmin="userData.admin" @onDelete="onDelete" :elementId="post.id" modifyText="Modifier la publication" deleteText="Supprimer la publication">

      <!-- Boutton global -->
      <b-modal :id="`modal-${post.id}`" title="Modifier la publication" ok-title="Enregistrer" ok-variant="light" @ok="onUpload" ok-only >

        <!-- Boutton pour changer l'image chargé -->
        <b-form>
          <PostForm :imgUrl="post.imageUrl" @onFileSelected="onFileSelected" v-model="content" />
        </b-form>

      </b-modal>
    </EditButton>
  </div>
</template>

<script>
// Importations //
import { apiClient } from '../services/ApiClient'
import { mapActions } from 'vuex'
import PostForm from './PostForm'
import EditButton from './EditButton'

// Exportations des modules //
export default {
  name: 'EditPost',
  components: {
    PostForm, EditButton
  },
  props: ['post'],
  data () {
    return {
      content: this.post.content,
      userData: JSON.parse(localStorage.getItem('userData')),
      selectedFile: null
    }
  },
  methods: {
    ...mapActions(['deletePost', 'modifyPost', 'displayNotification']),

    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },

    async onDelete () {
      await this.deletePost(this.post.id)
      this.displayNotification('Publication supprimée !')
    },

    onFileSelected (file) {
      this.selectedFile = file
    },

    async onUpload () {
      if (!this.content.trim().length) return
      await this.modifyPost({
        postId: this.post.id,
        selectedFile: this.selectedFile,
        content: this.content
      })
      this.displayNotification('Publication modifiée !')
    }
  }
}
</script>

<style lang="scss">


.btn-light {
  border: none;
  color: #323639;
  font-weight: 500;
  display: block;
  width: 100%;
}
</style>
