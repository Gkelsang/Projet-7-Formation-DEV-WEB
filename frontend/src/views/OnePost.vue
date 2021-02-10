<template>
  <div>
    <Menu />
    <!-- Affiche le post -->
    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6">
        <Post v-if="post" :post="post" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// Importations //
import { apiClient } from '../services/ApiClient'
import router from '../router/index'
import Post from '../components/Post'
import Menu from '../components/Menu'

// Exportation des modules //
export default {
  name: 'OnePost',
  components: {
    Post, Menu
  },
  data () {
    return {
      post: null
    }
  },
  watch: {
    $route (to, from) {
      this.loadPost()
    }
  },
  async mounted () {
    this.loadPost()
  },

  methods: {
    async loadPost () {
      const res = await apiClient.get(`api/posts/${this.$route.params.postId}`)
      this.post = res.post
    }
  }
}
</script>

<style lang="scss"></style>
