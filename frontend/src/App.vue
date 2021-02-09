<template>
    <div id="app">
        <div id="nav" class="d-flex sticky-top justify-content-start justify-content-sm-center mb-3 p-3">
            <router-link to="/">
                <img id="logo" 
                :src="require('./assets/logos/icon-left-font-monochrome-white2.png')"
                alt="logo Groupomania" />
            </router-link>
        </div>
        <NotificationAlert />
        <router-view />
    </div>
</template>

<script>
import NotificationAlert from '../src/components/NotificationAlert'

export default {
    name: 'App',
    components: {
        NotificationAlert
    }
}
</script>