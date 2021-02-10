<template>
  <div id="app">
    <div id="nav" class="d-flex sticky-top justify-content-start justify-content-sm-center p-10">
      <router-link to="/">
        <img id="logo" :src="require('./assets/logos/Fichier1.png')" alt="logo Groupomania"/>
      </router-link>
    </div>
    <NotificationAlert />
    <router-view />
  </div>
</template>

<script>
// Importations //
import NotificationAlert from '../src/components/NotificationAlert'

// Exportation de l'appli //
export default {
  name: 'App',
  components: {
    NotificationAlert
  }
}
</script>

<style lang="scss">
// Config général de l'appli //
#app {
  text-align: center;
  background-color: #323639;
};

// Config général de la navigation //
#nav {
  background: #323639;
  z-index: 1;
  border-bottom: solid 5px #D1515A;
  #logo {
    max-width: 50%;
  }
}

// Responsive //
@media screen and (min-width: 280px) and (max-width: 767px) {
  body,
  .btn,
  .form-control {
    font-size: 13px !important;
  }

  #nav #logo {
    max-width: 180px;
  }
}

@media screen and (min-width: 767px) and (max-width: 991px) {
  #nav #logo {
    max-width: 200px;
  }
}

</style>
