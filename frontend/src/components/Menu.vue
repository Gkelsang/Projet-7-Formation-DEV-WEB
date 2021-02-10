<template>
  <div>
    <div>
      <UserSearch />
      <Notifications />
      <ProfileButton />
    </div>
  </div>
</template>

<script>
// Importations //
import ProfileButton from '../components/ProfileButton'
import UserSearch from '../components/UserSearch'
import Notifications from '../components/Notifications'

// Exportation du module //
export default {
  name: 'Menu',
  components: {
    ProfileButton, UserSearch, Notifications
  }
}
</script>
