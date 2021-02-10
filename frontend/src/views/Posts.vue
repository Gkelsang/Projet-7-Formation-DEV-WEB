<template>
  <div id="posts">
    <Menu />
    <!-- Affiche le formulaire pour créer un post -->
    <b-row class="align-items-center text-center justify-content-center">
      <b-col cols="12" lg="6">
        <b-card class="mx-auto mb-2 mt-lg-3 mb-lg-5 border-0 shadow px-lg-3 pt-lg-4 bg-white rounded">
          <!-- Affiche le formulaire pour créer un post -->
          <CreatePost />
        </b-card>
      </b-col>
    </b-row>
    <!-- Affiche tout les posts publié sur le site -->
    <PostsList />
  </div>
</template>

<script>
// Importations //
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import { mapState, mapActions } from 'vuex'
import CreatePost from '../components/CreatePost'
import PostsList from '../components/PostsList'
import Menu from '../components/Menu'

// Exportation des modules //
export default {
  name: 'Posts',
  components: {
    CreatePost, PostsList, Menu
  },
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },

  computed: {
    ...mapState(['companyName'])
  }
}
</script>

<style lang="scss">
.card-body {
  padding-bottom: 0;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .card-body {
    padding: 0.7rem;
  }
}

.row {
  margin-left: 0;
  margin-right: 0;
}
</style>
