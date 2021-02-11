<template>
  <div>
    <DeleteAccountButton @onDeleteAccount="confirmDeletion" />
  </div>
</template>

<script>
// Importations //
import { apiClient } from '../services/ApiClient'
import DeleteAccountButton from '../components/DeleteAccountButton'

// Exportation du module //
export default {
  name: 'UserDeleteAccount',
  components: {
    DeleteAccountButton
  },
  props: ['userProfile'],

  methods: {
    async confirmDeletion () {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
        await apiClient.delete(`api/users/${this.userProfile.id}`)
        window.location.reload()
      }
    }
  }
}
</script>

<style lang="scss"></style>
