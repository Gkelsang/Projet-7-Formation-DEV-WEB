<template>
  <div>
    <b-card class="mx-auto p-lg-3 mb-2 mt-2 mb-lg-5 mt-lg-3 bg-white rounded" >
      <div class="d-flex align-items-center">
        <div class="d-flex mr-3">
          
          <!-- Permet d'afficher la PP de l'utilisateur qui à créer le post -->
          <router-link :to="{ name: 'UserProfile', params: { userId: post.User.id } }" >
            <ProfileImage :src="post.User.imageUrl" customClass="post-profile-picture" divCustomClass="div-post-picture" />
          </router-link>
        </div>

          <!-- Permet d'afficher le Nom + Prénom + date de publication de l'utilisateur qui a publié le post -->
        <div class="text-left">
          <router-link :to="{ name: 'UserProfile', params: { userId: post.User.id } }" >
            <p class="font-weight-bold mb-0">
              {{ post.User.firstName }} {{ post.User.lastName }}
            </p>
          </router-link>
          <p class="text-secondary">
            {{ moment(post.createdAt) .locale('fr') .format('LL') }}
          </p>
        </div>
      </div>

      <!-- Contenu du post -->
      <EditPost :post="post" />

      <!-- Contenu (text) du post -->
      <b-card-text class="text-left mt-3 mb-0 mb-lg-3" v-if="post.content">
        {{ post.content }}
      </b-card-text>

      <!-- Contenu (image) du post -->
      <div class="post d-flex align-items-center justify-content-center my-1 mb-lg-4" v-if="post.imageUrl" >
        <img v-b-modal="`modal-photo-${post.id}`" class="post__image" :src="post.imageUrl" alt="" />
        <b-modal :id="`modal-photo-${post.id}`" size="xl" class="modal-photo" header-class="header-style" >
          <div slot="modal-title"></div>
          <div class="d-flex align-items-center justify-content-center">
            <img class="modal-photo__img" :src="post.imageUrl" alt="" />
          </div>
          <div slot="modal-footer"></div>
        </b-modal>
      </div>

      <!-- Affiche le nombre de like du post -->
      <LikesList :post="post" :likesCount="likesCount" />

      <!-- Boutton pour liké ou disliké le post -->
      <div class="footer d-flex justify-content-around">
        <button @click="likeOrUnlikePost" class="react-btn footer-btn btn-block" aria-label="Liker ou disliker" >
          <svg v-if="likesThisPost" style="width:24px;height:24px" viewBox="0 0 24 24" >
            <path fill="rgb(32, 120, 244)"/>
          </svg>
          <svg v-else style="width:24px;height:24px" viewBox="0 0 24 24">
          </svg>
          <span :class="`ml-2 ${likesThisPost ? 'blue' : ''}`">J'aime</span>
        </button>

        <!-- Boutton pour commenter le post -->
        <button class="react-btn footer-btn btn-block" @click="focusInput(post)" aria-label="Commenter" >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor"/>
          </svg>
          <span class="ml-2">Commenter</span>
        </button>
      </div>
      
      <!-- Affiche les commentaires déjà présent pour cette publication -->
      <div class="line mb-3"></div>
      <CommentsList :post="post" />
    </b-card>
  </div>
</template>

<script>
// Importations //
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import EditPost from '../components/EditPost'
import ProfileImage from './ProfileImage'
import CommentsList from '../components/CommentsList'
import LikesList from '../components/LikesList'

// Exportation des modules //
export default {
  name: 'Post',
  components: {
    EditPost, ProfileImage, CommentsList, LikesList
  },
  props: ['post'],
  async mounted () {
    const res = await apiClient.get(`api/posts/${this.post.id}/like`)
    this.likesThisPost = res.like
  },
  data () {
    return {
      likesThisPost: false,
      likesCount: this.post.likesCount
    }
  },
  methods: {
    async likeOrUnlikePost () {
      const res = await apiClient.post(`api/posts/${this.post.id}/likes`)

      if (res.like !== this.likesThisPost) {
        this.likesCount += res.like ? 1 : -1
      }

      this.likesThisPost = res.like
    },

    focusInput () {
      document.getElementById(`comment-area-${this.post.id}`).focus()
    }
  }
}
</script>

<style lang="scss">
.div-post-picture {
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
}

.post-profile-picture {
  height: 50px;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .div-post-picture {
    width: 42px;
    height: 42px;
  }

  .post-profile-picture {
    height: 42px;
  }
}

.blue {
  color: rgb(32, 120, 244);
}
.react-btn {
  background: white;
  border: none;
  margin: 3px;
  color: #323639;
  border-radius: 0.25rem;
  font-weight: bold;
  padding: 0.375rem 0.75rem;
  &:focus {
    border: none !important;
    outline: none !important;
  }
  &:hover {
    color: #d1515a !important;
    background-color: rgba(108, 117, 125, 0.1) !important;
  }
}

.like-btn {
  color: #d1515a;
  font-weight: normal;
  &:hover,
  &:focus,
  &:active {
    color: lightgrey !important;
    font-weight: normal;
    background: none !important;
  }
}

.modal-photo {
  &__img {
    max-width: 100%;
    max-height: calc(100vh - 110px);
  }
}

.header-style {
  padding-bottom: 0;
  border-bottom: none;
}
</style>
