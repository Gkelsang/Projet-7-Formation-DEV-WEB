<template>
  <div>
    <!-- Boutton pour afficher les notifications --> 
    <button
      @click="toggleActions"
      class="notification-btn d-flex position-fixed justify-content-center align-items-center p-0"
      aria-label="Afficher les notifications" >
      <span
        v-if="notificationsList.length"
        class="notifications-number position-absolute d-flex justify-content-center align-items-center"
        >{{ notificationsList.length }}</span>
      <b-icon icon="bell"></b-icon>
    </button>

    <!-- Permet d'afficher si notifications il y a, quel autre utilisateur est impliqué --> 
    <b-collapse
      v-if="notificationsList.length"
      id="notification-collapsed"
      v-bind:class=" `collapsed mt-2 position-fixed ${areActionsVisible && 'visible'}` " >

      <b-card class="border-0" @click="toggleActions">
        <div v-for="notification in notificationsList" :key="notification">

          <router-link :to="{ name: 'OnePost', params: { postId: notification.postId } }" @click.native="deleteNotification(notification)" >
            <div class="d-flex align-items-center">
              <div>
                <ProfileImage :src="notification.Sender.imageUrl" customClass="like-profile-picture" divCustomClass="div-like-picture" />
              </div>
              <p v-html="notification.content" class="card-text text-left py-2 mb-3" ></p>
              </div>
          </router-link>

        </div>
      </b-card>
    </b-collapse>

    <!-- Permet d'afficher le message suivant si il n'y a pas de notifications -->
    <b-collapse v-else id="notification-collapsed" v-bind:class=" `collapsed mt-2 position-fixed ${areActionsVisible && 'visible'}` " >
      <b-card class="border-0">
        <div class="d-flex align-items-center">
          <p class="card-text text-left py-2 mb-3">
            Vous n'avez pas de nouvelles notifications
          </p>
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
// Importations //
import { apiClient } from '../services/ApiClient'
import ProfileImage from './ProfileImage'

// Exportation du module //
export default {
  name: 'Notifications',
  components: {
    ProfileImage
  },
  props: {},
  data () {
    return {
      areActionsVisible: false,
      notificationsList: []
    }
  },
  async mounted () {
    setTimeout(() => this.fetchNotifications(), 100)
    this.interval = setInterval(() => this.fetchNotifications(), 10000)
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },
    async fetchNotifications () {
      const res = await apiClient.get(`api/notifications`)
      this.notificationsList = res.notifications
    },
    async deleteNotification (notificationToDelete) {
      const res = await apiClient.delete(`api/notifications/${ notificationToDelete.id }`
      )
      this.notificationsList = this.notificationsList.filter( 
        notification => notification.id !== notificationToDelete.id
      )
    }
  }
}
</script>

<style lang="scss">

// Config du boutton des notifications //
.notification-btn {
  top: 5%;
  right: 20%;
  box-shadow: 0px 1px 1px 1px #d1515a;
  background-color: #323639;
  border-radius: 100%;
  width: 3%;
  height: 6%;
  border: none;
  z-index: 2;
  &:hover {
    background-color: rgba(108, 117, 125, 0.2);
  }
  &:focus {
    outline: none;
  }
  .notifications-number {
    top: -8px;
    right: -4px;
    font-size: 12px;
    border-radius: 100%;
    background: #d1515a;
    color: yellow;
    height: 20px;
    width: 20px;
  }
}

#notification-collapsed {
  top: 11%;
  right: 10%  ;
  z-index: 2;
  .card-body {
    padding-bottom: 5px;
    border: solid 3px #323639;
  }
  
}

@media screen and (min-width: 320px) and (max-width: 769px) {
  .notification-btn {
    top: 0.75%;
    right: 10%;
    width: 32px;
    height: 32px;
    .notifications-number {
      top: -6px;
      height: 15px;
      width: 15px;
      font-size: 11px;
    }
  }

  #notification-collapsed {
    top: 45px;
    right: 64px;
    margin-left: 15px;
  }
}
</style>
